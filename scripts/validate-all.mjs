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
      runner.printReport(report);

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
          configIssues: report.configIssues,
          distributionFailures: report.distributionFailures,
          configConstraintIssues: report.configConstraintIssues,
          failedAcceptance: report.acceptanceChecks?.filter(item => !item.passed) || [],
          failedPrototypes: report.prototypeChecks?.filter(item => !(item.supportPassed && item.contrastPassed)) || []
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
      console.log(`\n  ❌ ${r.file}: ${r.error || r.config}`);
      if (r.configIssues?.length) {
        console.log('    配置完整性问题:');
        r.configIssues.forEach(issue => {
          console.log(`     - ${issue}`);
        });
      }
      if (r.distributionFailures?.length) {
        console.log('    分布问题:');
        r.distributionFailures.forEach(f => {
          console.log(`     - ${f.message}`);
        });
      }
      if (r.configConstraintIssues?.length) {
        console.log('    配置约束问题:');
        r.configConstraintIssues.forEach(issue => {
          console.log(`     - ${issue.message} (期望: ${issue.expected}, 实际: ${issue.actual})`);
        });
      }
      if (r.failedAcceptance?.length) {
        console.log('    未通过的验收案例:');
        r.failedAcceptance.forEach(item => {
          console.log(`     - ${item.label}: 期望 ${item.expectedType} -> 实际 ${item.actualType} (${item.matchPercentage}%)`);
        });
      }
      if (r.failedPrototypes?.length) {
        console.log('    未通过的原型路径:');
        r.failedPrototypes.forEach(item => {
          if (!item.supportPassed) {
            console.log(`     - ${item.typeName} 支持路径: 命中 ${item.supportPathResult} (${item.supportMatch}%)`);
          }
          if (!item.contrastPassed) {
            console.log(`     - ${item.typeName} 对立路径: 命中 ${item.contrastPathResult}`);
          }
        });
      }
    });
    process.exit(1);
  } else {
    console.log('\n✅ 所有测评验证通过');
  }
}

validateAll();

