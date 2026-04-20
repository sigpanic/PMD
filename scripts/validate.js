#!/usr/bin/env node
/**
 * 测评验证 CLI 脚本
 * 会同时检查：
 * 1. 分布是否合理
 * 2. 配置完整性（维度覆盖、evidence、acceptanceCases）
 * 3. 验收案例是否命中预期人格
 * 
 * 用法：
 *   node --experimental-strip-types scripts/validate.js src/instance/yourThemeTest.ts
 *   node --experimental-strip-types scripts/validate.js src/instance/yourThemeTest.ts --small-scale
 *   node --experimental-strip-types scripts/validate.js src/instance/yourThemeTest.ts --max-combinations 10000000
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('用法:');
    console.log('  node --experimental-strip-types scripts/validate.js <test-file>');
    console.log('  node --experimental-strip-types scripts/validate.js <test-file> --small-scale');
    console.log('  node --experimental-strip-types scripts/validate.js <test-file> --max-combinations <number>');
    console.log('\n示例:');
    console.log('  node --experimental-strip-types scripts/validate.js src/instance/programmerTest.ts');
    process.exit(1);
  }
  
  const testFile = args[0];
  const isSmallScale = args.includes('--small-scale');
  const maxCombinationsArg = args.indexOf('--max-combinations');
  const maxCombinations = maxCombinationsArg > -1 ? parseInt(args[maxCombinationsArg + 1]) : undefined;
  
  const fullPath = join(rootDir, testFile);
  
  console.log(`\n🔍 验证测评: ${testFile}`);
  console.log('='.repeat(50));
  
  try {
    // 动态导入测评配置
    const module = await import(fullPath);
    const testConfig = module.default || Object.values(module)[0];
    
    if (!testConfig || !testConfig.questions || !testConfig.personalityTypes) {
      console.error('❌ 无效的测评配置文件');
      process.exit(1);
    }
    
    // 动态导入 testRunner
    const { GenericTestRunner } = await import(join(rootDir, 'src/core/testRunner.ts'));
    
    const runner = new GenericTestRunner(testConfig);
    
    if (isSmallScale) {
      // 小规模随机测试
      console.log('\n🎲 小规模随机测试 (20 条路径)');
      console.log('-'.repeat(50));
      
      // 打印完整题目
      console.log('\n=== 完整题目 ===');
      testConfig.questions.forEach(q => {
        console.log(`\n${q.id}: ${q.text}`);
        q.options.forEach(opt => {
          console.log(`  ${opt.id}: ${opt.text}`);
        });
      });
      
      console.log('\n');
      
      const results = runner.runSmallScaleTest(20);
      results.forEach(r => {
        console.log(`\n测试 ${r.index}: ${r.personality_name} (${r.match_percentage}%)`);
        console.log('  路径:');
        testConfig.questions.forEach(q => {
          const selectedOption = q.options.find(opt => opt.id === r.answers[q.id]);
          console.log(`    ${q.id}: [${selectedOption ? selectedOption.id : r.answers[q.id]}] ${selectedOption ? selectedOption.text : ''}`);
        });
      });
      
      const distribution = {};
      results.forEach(r => {
        distribution[r.personality_name] = (distribution[r.personality_name] || 0) + 1;
      });
      
      console.log('\n\n📊 分布统计:');
      Object.entries(distribution)
        .sort((a, b) => b[1] - a[1])
        .forEach(([name, count]) => {
          const percentage = ((count / results.length) * 100).toFixed(1);
          console.log(`  ${name}: ${count}/20 (${percentage}%)`);
        });

      console.log('\n请根据模拟的选项检查得到的结果是否合理');
      
    } else {
      // 大规模枚举测试
      const totalCombinations = testConfig.questions.reduce(
        (acc, q) => acc * q.options.length, 1
      );
      
      console.log(`\n📊 大规模枚举测试`);
      console.log(`  总组合数: ${totalCombinations.toLocaleString()}`);
      console.log(`  人格类型数: ${testConfig.personalityTypes.length}`);
      
      if (maxCombinations && totalCombinations > maxCombinations) {
        console.log(`  ⚠️  启用智能剪枝，最大枚举数: ${maxCombinations.toLocaleString()}`);
      }
      
      console.log('-'.repeat(50));
      
      const report = await runner.runLargeScaleTest(maxCombinations);
      runner.printReport(report);
      
      // 返回退出码
      if (!report.isReasonable) {
        process.exit(1);
      } else {
        console.log('✅ 验证通过');
      }
    }
    
  } catch (error) {
    console.error(`❌ 验证失败: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
