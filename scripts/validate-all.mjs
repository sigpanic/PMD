#!/usr/bin/env node
/**
 * 验证所有测评配置的脚本
 * 用于 CI 自动化验证
 */

import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const instanceDir = join(rootDir, 'src/instance');

async function validateAll() {
  console.log('\n🔍 批量验证所有测评配置');
  console.log('='.repeat(50));
  
  // 获取所有 instance 文件
  const files = readdirSync(instanceDir).filter(f => f.endsWith('.ts'));
  
  if (files.length === 0) {
    console.log('⚠️  没有找到测评配置文件');
    process.exit(1);
  }
  
  let successCount = 0;
  let failCount = 0;
  const results = [];
  
  for (const file of files) {
    const fullPath = join(instanceDir, file);
    console.log(`\n📝 验证: ${file}`);
    console.log('-'.repeat(50));
    
    try {
      // 动态导入测评配置
      const module = await import(fullPath);
      const testConfig = module.default || Object.values(module)[0];
      
      if (!testConfig || !testConfig.questions || !testConfig.personalityTypes) {
        console.log(`❌ ${file}: 无效的测评配置文件`);
        failCount++;
        results.push({ file, success: false, error: 'Invalid config' });
        continue;
      }
      
      // 动态导入 testRunner
      const { GenericTestRunner } = await import(join(rootDir, 'src/core/testRunner.ts'));
      const runner = new GenericTestRunner(testConfig);
      
      const totalCombinations = testConfig.questions.reduce(
        (acc, q) => acc * q.options.length, 1
      );
      
      console.log(`  总组合数: ${totalCombinations.toLocaleString()}`);
      console.log(`  人格类型数: ${testConfig.personalityTypes.length}`);
      
      // 智能设置最大枚举数量
      const maxCombinations = totalCombinations <= 5_000_000 ? undefined : 2_000_000;
      
      const report = await runner.runLargeScaleTest(maxCombinations);
      
      if (report.configIssues.length > 0) {
        console.log(`  配置问题: ${report.configIssues.length}`);
      }

      if (report.acceptanceChecks?.length) {
        const passedAcceptance = report.acceptanceChecks.filter(item => item.passed).length;
        console.log(`  验收案例: ${passedAcceptance}/${report.acceptanceChecks.length}`);
      }

      if (report.isReasonable) {
        console.log(`✅ ${file}: 验证通过`);
        successCount++;
        results.push({
          file,
          success: true,
          config: testConfig.name,
          stats: report.statistics,
          acceptanceChecks: report.acceptanceChecks?.length || 0
        });
      } else {
        console.log(`❌ ${file}: 验证不通过`);
        failCount++;
        results.push({
          file,
          success: false,
          config: testConfig.name,
          stats: report.statistics,
          acceptanceChecks: report.acceptanceChecks?.length || 0,
          configIssues: report.configIssues
        });
      }
      
    } catch (error) {
      console.log(`❌ ${file}: 验证失败 - ${error.message}`);
      failCount++;
      results.push({ file, success: false, error: error.message });
    }
  }
  
  // 打印总结
  console.log('\n' + '='.repeat(50));
  console.log('📊 验证总结');
  console.log('='.repeat(50));
  console.log(`总计: ${files.length} 个测评`);
  console.log(`✅ 通过: ${successCount}`);
  console.log(`❌ 失败: ${failCount}`);
  
  if (failCount > 0) {
    console.log('\n失败的测评:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  ❌ ${r.file}: ${r.error || r.config}`);
      if (r.configIssues?.length) {
        r.configIssues.forEach(issue => {
          console.log(`     - ${issue}`);
        });
      }
    });
    process.exit(1);
  } else {
    console.log('\n✅ 所有测评验证通过');
  }
}

validateAll();
