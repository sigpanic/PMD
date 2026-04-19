import { TestProtocol } from '../protocol/interface.ts';
import type { TestConfig, PersonalityType, TestResult, Option } from '../protocol/types.ts';

export interface DistributionResult {
  typeId: string;
  typeName: string;
  percentage: number;
  count: number;
}

export interface TestStatistics {
  averagePercentage: number;
  minPercentage: number;
  maxPercentage: number;
  stdDev: number;
  totalCombinations: number;
  personalityTypesCount: number;
  isReasonable: boolean;
}

export interface ValidationReport {
  config: TestConfig;
  distribution: DistributionResult[];
  statistics: TestStatistics;
  configIssues: string[];
  prototypeChecks: PrototypeCheck[];
  acceptanceChecks: AcceptanceCheck[];
  isReasonable: boolean;
}

export interface PrototypeCheck {
  typeId: string;
  typeName: string;
  supportPathResult: string;
  supportMatch: number;
  supportPassed: boolean;
  contrastPathResult: string;
  contrastPassed: boolean;
}

export interface AcceptanceCheck {
  id: string;
  label: string;
  expectedType: string;
  actualType: string;
  matchPercentage: number;
  passed: boolean;
}

/**
 * Generic test runner - 引用正式版 TestProtocol 引擎
 * 可用于 CI 自动验证和 AI Agent 手动验证
 */
export class GenericTestRunner {
  private protocol: TestProtocol;

  constructor(config: TestConfig) {
    this.protocol = new TestProtocol();
    this.protocol.registerTest(config);
  }

  /**
   * 计算所有可能的答案组合
   */
  private generateAllAnswerCombinations(questions: TestConfig['questions']): Record<string, string>[] {
    const questionIds = questions.map(q => q.id);
    const allOptions = questions.map(q => q.options.map(opt => opt.id));
    
    let combinations: string[][] = [[]];
    
    for (let i = 0; i < allOptions.length; i++) {
      const currentOptions = allOptions[i];
      const newCombinations: string[][] = [];
      
      for (const combination of combinations) {
        for (const option of currentOptions) {
          newCombinations.push([...combination, option]);
        }
      }
      
      combinations = newCombinations;
    }
    
    return combinations.map(combination => {
      const answers: Record<string, string> = {};
      questionIds.forEach((id, i) => {
        answers[id] = combination[i];
      });
      return answers;
    });
  }

  /**
   * 生成随机答案（用于小规模测试）
   */
  generateRandomAnswers(questions: TestConfig['questions']): Record<string, string> {
    const answers: Record<string, string> = {};
    for (const question of questions) {
      const randomIndex = Math.floor(Math.random() * question.options.length);
      answers[question.id] = question.options[randomIndex].id;
    }
    return answers;
  }

  /**
   * 使用 TestProtocol 运行测试并获取结果
   */
  runTest(answers: Record<string, string>): TestResult {
    const config = this.protocol.getRegisteredTests()[0];
    this.protocol.resetTest();
    this.protocol.startTest(config.id);
    
    Object.entries(answers).forEach(([qId, optId]) => {
      this.protocol.submitAnswer(qId, optId);
    });
    
    return this.protocol.getResult();
  }

  /**
   * 大规模枚举测试
   * @param maxCombinations 最大枚举数量限制（默认 5,000,000）
   */
  async runLargeScaleTest(maxCombinations: number = 5_000_000): Promise<ValidationReport> {
    const config = (this.protocol as any).tests[0];
    const configIssues = this.validateConfigIntegrity(config);
    const totalCombinations = config.questions.reduce((acc: number, q: any) => acc * q.options.length, 1);
    
    // 智能剪枝：如果组合数超过限制，采用随机抽样策略
    let combinationsToTest: Record<string, string>[] = [];
    let isSampled = false;
    
    if (totalCombinations > maxCombinations) {
      isSampled = true;
      // 直接随机生成，不先生成全部组合
      combinationsToTest = this.randomGenerateAnswers(config, maxCombinations);
    } else {
      combinationsToTest = this.generateAllAnswerCombinations(config.questions);
    }
    
    const resultDistribution: Record<string, number> = {};
    config.personalityTypes.forEach((type: PersonalityType) => {
      resultDistribution[type.id] = 0;
    });
    
    let processed = 0;
    const total = combinationsToTest.length;
    
    for (const answers of combinationsToTest) {
      const result = this.runTest(answers);
      resultDistribution[result.personality_type]++;
      
      processed++;
      if (processed % 10000 === 0) {
        console.log(`已处理 ${processed}/${total} (${((processed/total)*100).toFixed(2)}%)`);
      }
    }
    
    const distributionPercentages: Record<string, number> = {};
    Object.entries(resultDistribution).forEach(([typeId, count]) => {
      distributionPercentages[typeId] = (count / total) * 100;
    });
    
    const distribution: DistributionResult[] = Object.entries(distributionPercentages)
      .map(([typeId, percentage]) => {
        const type = config.personalityTypes.find((t: PersonalityType) => t.id === typeId);
        return {
          typeId,
          typeName: type.name,
          percentage,
          count: resultDistribution[typeId]
        };
      })
      .sort((a, b) => b.percentage - a.percentage);
    
    const percentages = Object.values(distributionPercentages);
    const avgPercentage = percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
    const minPercentage = Math.min(...percentages);
    const maxPercentage = Math.max(...percentages);
    const variance = percentages.reduce((sum, p) => sum + Math.pow(p - avgPercentage, 2), 0) / percentages.length;
    const stdDev = Math.sqrt(variance);
    
    const statistics: TestStatistics = {
      averagePercentage: avgPercentage,
      minPercentage,
      maxPercentage,
      stdDev,
      totalCombinations: isSampled ? totalCombinations : total,
      personalityTypesCount: config.personalityTypes.length,
      isReasonable: this.checkReasonable(percentages, avgPercentage)
    };

    const prototypeChecks = config.acceptanceCases?.length ? [] : this.runPrototypeChecks(config);
    const acceptanceChecks = this.runAcceptanceChecks(config);
    const prototypesPassed = prototypeChecks.every(item => item.supportPassed && item.contrastPassed);
    const acceptancePassed = acceptanceChecks.every(item => item.passed);
    const configValid = configIssues.length === 0;
    const isReasonable = statistics.isReasonable && prototypesPassed && acceptancePassed && configValid;
    
    return {
      config,
      distribution,
      statistics,
      configIssues,
      prototypeChecks,
      acceptanceChecks,
      isReasonable
    };
  }

  /**
   * 小规模随机测试
   */
  runSmallScaleTest(sampleCount: number = 20): any[] {
    const config = this.protocol.getRegisteredTests()[0];
    const results: Array<{ index: number; personality_type: string; personality_name: string; match_percentage: number }> = [];
    
    for (let i = 0; i < sampleCount; i++) {
      const answers = this.generateRandomAnswers(config.questions);
      const result = this.runTest(answers);
      const personalityType = config.personalityTypes.find(p => p.id === result.personality_type);
      results.push({
        index: i + 1,
        personality_type: result.personality_type,
        personality_name: personalityType ? personalityType.name : result.personality_type,
        match_percentage: result.match_percentage
      });
    }
    
    return results;
  }

  /**
   * 随机生成指定数量的答案组合（不预生成全部）
   */
  private randomGenerateAnswers(config: any, count: number): Record<string, string>[] {
    const results: Record<string, string>[] = [];
    for (let i = 0; i < count; i++) {
      results.push(this.generateRandomAnswers(config.questions));
    }
    return results;
  }

  /**
   * 智能抽样
   */
  private sampleCombinations(combinations: Record<string, string>[], maxCount: number): Record<string, string>[] {
    const sample: Record<string, string>[] = [];
    const step = Math.max(1, Math.floor(combinations.length / maxCount));
    
    for (let i = 0; i < combinations.length && sample.length < maxCount; i += step) {
      sample.push(combinations[i]);
    }
    
    return sample;
  }

  /**
   * 检查分布是否合理
   */
  private checkReasonable(percentages: number[], avgPercentage: number): boolean {
    let zeroValues = 0;
    let nicheValues = 0;
    
    for (const p of percentages) {
      if (p <= 0) {
        zeroValues++;
      }
      if (p < 1) {
        nicheValues++;
      }
    }
    
    // 验收标准：
    // 1. 所有类型都能被触发（无 0%）
    // 2. 最大值不超过 25%
    // 3. 允许少量稀有类型，但不能全部挤压到角落
    // 4. 标准差不超过 7
    const maxPercentage = Math.max(...percentages);
    const variance = percentages.reduce((sum, p) => sum + Math.pow(p - avgPercentage, 2), 0) / percentages.length;
    const stdDev = Math.sqrt(variance);
    const nicheAllowance = Math.max(1, Math.floor(percentages.length * 0.25));
    
    const reasonable = zeroValues === 0 &&
                      maxPercentage <= 25 &&
                      nicheValues <= nicheAllowance &&
                      stdDev <= 7;
    
    return reasonable;
  }

  private validateConfigIntegrity(config: TestConfig): string[] {
    const issues: string[] = [];
    const dimensionIds = new Set(config.dimensions.map(item => item.id));
    const typeIds = new Set(config.personalityTypes.map(item => item.id));
    const dimensionMentions = new Map<string, number>();

    config.dimensions.forEach(dimension => {
      dimensionMentions.set(dimension.id, 0);
    });

    config.questions.forEach(question => {
      question.options.forEach(option => {
        Object.keys(option.scores).forEach(dimensionId => {
          if (!dimensionIds.has(dimensionId)) {
            issues.push(`题目 ${question.id} 选项 ${option.id} 使用了未定义维度: ${dimensionId}`);
            return;
          }
          dimensionMentions.set(dimensionId, (dimensionMentions.get(dimensionId) || 0) + 1);
        });

        option.evidence?.supports?.forEach(item => {
          if (!typeIds.has(item.type)) {
            issues.push(`题目 ${question.id} 选项 ${option.id} 支持了未定义人格: ${item.type}`);
          }
        });

        option.evidence?.conflicts?.forEach(item => {
          if (!typeIds.has(item.type)) {
            issues.push(`题目 ${question.id} 选项 ${option.id} 冲突了未定义人格: ${item.type}`);
          }
        });
      });
    });

    config.dimensions.forEach(dimension => {
      const mentions = dimensionMentions.get(dimension.id) || 0;
      if (mentions === 0) {
        issues.push(`维度 ${dimension.id} 从未出现在题目中，结果无法观测`);
      } else if (mentions < 3) {
        issues.push(`维度 ${dimension.id} 只出现了 ${mentions} 次，区分度偏弱`);
      }
    });

    config.personalityTypes.forEach(type => {
      let supportCount = 0;
      config.questions.forEach(question => {
        question.options.forEach(option => {
          supportCount += option.evidence?.supports?.filter(item => item.type === type.id).length || 0;
        });
      });

      if (supportCount < 3) {
        issues.push(`人格 ${type.id} 只有 ${supportCount} 个显式支持证据，典型路径可能不稳定`);
      }
    });

    config.acceptanceCases?.forEach(testCase => {
      if (!typeIds.has(testCase.expectedType)) {
        issues.push(`验收案例 ${testCase.id} 指向了未定义人格: ${testCase.expectedType}`);
      }

      config.questions.forEach(question => {
        const optionIds = new Set(question.options.map(option => option.id));
        const selected = testCase.answers[question.id];
        if (!selected) {
          issues.push(`验收案例 ${testCase.id} 缺少题目 ${question.id} 的答案`);
          return;
        }
        if (!optionIds.has(selected)) {
          issues.push(`验收案例 ${testCase.id} 在题目 ${question.id} 使用了非法选项: ${selected}`);
        }
      });
    });

    return Array.from(new Set(issues));
  }

  private runPrototypeChecks(config: TestConfig): PrototypeCheck[] {
    return config.personalityTypes.map(type => {
      const supportAnswers = this.buildPrototypeAnswers(config, type, 'support');
      const supportResult = this.runTest(supportAnswers);
      const contrastAnswers = this.buildPrototypeAnswers(config, type, 'contrast');
      const contrastResult = this.runTest(contrastAnswers);

      return {
        typeId: type.id,
        typeName: type.name,
        supportPathResult: supportResult.personality_type,
        supportMatch: supportResult.match_percentage,
        supportPassed: supportResult.personality_type === type.id && supportResult.match_percentage >= 55,
        contrastPathResult: contrastResult.personality_type,
        contrastPassed: contrastResult.personality_type !== type.id
      };
    });
  }

  private runAcceptanceChecks(config: TestConfig): AcceptanceCheck[] {
    if (!config.acceptanceCases || config.acceptanceCases.length === 0) {
      return [];
    }

    return config.acceptanceCases.map(testCase => {
      const result = this.runTest(testCase.answers);
      return {
        id: testCase.id,
        label: testCase.label,
        expectedType: testCase.expectedType,
        actualType: result.personality_type,
        matchPercentage: result.match_percentage,
        passed: result.personality_type === testCase.expectedType
      };
    });
  }

  private buildPrototypeAnswers(
    config: TestConfig,
    type: PersonalityType,
    mode: 'support' | 'contrast'
  ): Record<string, string> {
    const answers: Record<string, string> = {};

    config.questions.forEach(question => {
      const hasExplicitEvidence = question.options.some(option => {
        const support = option.evidence?.supports?.some(item => item.type === type.id);
        const conflict = option.evidence?.conflicts?.some(item => item.type === type.id);
        return support || conflict;
      });

      const rankedOptions = [...question.options].sort((a, b) => {
        const scoreA = hasExplicitEvidence
          ? this.scoreOptionForType(a, type, config)
          : this.scoreNeutralOption(a, type, config);
        const scoreB = hasExplicitEvidence
          ? this.scoreOptionForType(b, type, config)
          : this.scoreNeutralOption(b, type, config);
        return mode === 'support' ? scoreB - scoreA : scoreA - scoreB;
      });

      answers[question.id] = rankedOptions[0].id;
    });

    return answers;
  }

  private scoreOptionForType(option: Option, type: PersonalityType, config: TestConfig): number {
    const support = option.evidence?.supports
      ?.filter(item => item.type === type.id)
      .reduce((sum, item) => sum + (item.weight || 1), 0) || 0;
    const conflict = option.evidence?.conflicts
      ?.filter(item => item.type === type.id)
      .reduce((sum, item) => sum + (item.weight || 1), 0) || 0;

    const dimensionAffinity = Object.entries(option.scores).reduce((sum, [dimensionId, rawScore]) => {
      const targetValue = type.template[dimensionId];
      if (targetValue === undefined) {
        return sum;
      }

      const weight = config.dimensionWeights?.[dimensionId] || 1;
      const preference = targetValue - 2;
      return sum + rawScore * preference * weight;
    }, 0);

    return support * 10 - conflict * 8 + dimensionAffinity;
  }

  private scoreNeutralOption(option: Option, type: PersonalityType, config: TestConfig): number {
    return Object.entries(option.scores).reduce((sum, [dimensionId, rawScore]) => {
      const targetValue = type.template[dimensionId];
      if (targetValue === undefined) {
        return sum;
      }

      const weight = config.dimensionWeights?.[dimensionId] || 1;
      const preference = targetValue - 2;
      return sum + rawScore * preference * weight;
    }, 0);
  }

  /**
   * 打印测试报告
   */
  printReport(report: ValidationReport) {
    console.log('\n' + '='.repeat(50));
    console.log(`测评验证报告: ${report.config.name}`);
    console.log('='.repeat(50));
    
    console.log('\n=== 结果分布 ===');
    report.distribution.forEach((item, index) => {
      console.log(`${index + 1}. ${item.typeName}: ${item.percentage.toFixed(2)}% (${item.count})`);
    });
    
    console.log('\n=== 统计信息 ===');
    console.log(`总组合数: ${report.statistics.totalCombinations.toLocaleString()}`);
    console.log(`人格类型数: ${report.statistics.personalityTypesCount}`);
    console.log(`平均百分比: ${report.statistics.averagePercentage.toFixed(2)}%`);
    console.log(`最小百分比: ${report.statistics.minPercentage.toFixed(2)}%`);
    console.log(`最大百分比: ${report.statistics.maxPercentage.toFixed(2)}%`);
    console.log(`标准差: ${report.statistics.stdDev.toFixed(2)}`);
    if (report.configIssues.length > 0) {
      console.log('\n=== 配置问题 ===');
      report.configIssues.forEach(issue => {
        console.log(`- ${issue}`);
      });
    }

    if (report.acceptanceChecks.length > 0) {
      console.log('\n=== 验收案例 ===');
      report.acceptanceChecks.forEach(item => {
        const mark = item.passed ? '✅' : '❌';
        console.log(`${mark} ${item.label}: 期望 ${item.expectedType} -> 实际 ${item.actualType} (${item.matchPercentage}%)`);
      });
    } else {
      console.log('\n=== 原型路径验证 ===');
      report.prototypeChecks.forEach(item => {
        const supportMark = item.supportPassed ? '✅' : '❌';
        const contrastMark = item.contrastPassed ? '✅' : '❌';
        console.log(
          `${item.typeName}: ${supportMark} 支持路径 -> ${item.supportPathResult} (${item.supportMatch}%) | ${contrastMark} 对立路径 -> ${item.contrastPathResult}`
        );
      });
    }

    console.log(`\n是否合理: ${report.isReasonable ? '✅ 通过' : '❌ 不通过'}`);
    console.log('='.repeat(50) + '\n');
  }
}

/**
 * 便捷函数：验证一个测试配置
 */
export async function validateTestConfig(config: TestConfig, options?: {
  maxCombinations?: number;
  printReport?: boolean;
}): Promise<ValidationReport> {
  const runner = new GenericTestRunner(config);
  const report = await runner.runLargeScaleTest(options?.maxCombinations);
  
  if (options?.printReport !== false) {
    runner.printReport(report);
  }
  
  return report;
}
