import type {
  TestInterface,
  ExtensionInterface,
  TestConfig,
  Dimension,
  PersonalityType,
  TestResult,
  DimensionConstraint
} from './types';

export class TestProtocol implements TestInterface, ExtensionInterface {
  private currentTest: TestConfig | null = null;
  private answers: Record<string, string> = {};
  private dimensions: Dimension[] = [];
  private personalityTypes: PersonalityType[] = [];
  private tests: TestConfig[] = [];
  private dimensionMaxScores: Record<string, number> = {};
  private evidenceExtremes: Map<string, { maxSupport: number; maxConflict: number }> = new Map();

  getRegisteredTests(): TestConfig[] {
    return [...this.tests];
  }

  startTest(testId: string): void {
    const test = this.tests.find(t => t.id === testId);
    if (!test) {
      throw new Error(`Test with id ${testId} not found`);
    }
    this.currentTest = test;
    this.answers = {};
    this.dimensionMaxScores = this.buildDimensionMaxScores(test);
    this.evidenceExtremes = this.buildEvidenceExtremes(test);
  }

  submitAnswer(questionId: string, optionId: string): void {
    if (!this.currentTest) {
      throw new Error('No test started');
    }
    this.answers[questionId] = optionId;
  }

  getResult(): TestResult {
    if (!this.currentTest) {
      throw new Error('No test started');
    }

    const dimensions = this.calculateDimensions();

    const { personalityType, matchPercentage } = this.calculatePersonalityMatch(dimensions);

    const radarChart = Object.entries(dimensions).map(([dimension, value]) => ({
      dimension,
      value
    }));

    const interpretation = this.generateInterpretation(personalityType);

    return {
      personality_type: personalityType.id,
      match_percentage: matchPercentage,
      dimensions,
      radar_chart: radarChart,
      interpretation
    };
  }

  getDetailedResult(): TestResult & {
    topMatches: Array<{ personalityType: PersonalityType; percentage: number }>;
    isHybrid: boolean;
    dominantTraits: string[];
  } {
    if (!this.currentTest) {
      throw new Error('No test started');
    }

    const dimensions = this.calculateDimensions();
    const dimensionWeights = this.currentTest.dimensionWeights || {};

    const allSimilarities = this.currentTest.personalityTypes.map(personalityType => ({
      type: personalityType,
      similarity: this.calculatePersonalityScore(dimensions, personalityType, dimensionWeights)
    }));

    allSimilarities.sort((a, b) => b.similarity - a.similarity);

    const top3 = allSimilarities.slice(0, 3).map(item => ({
      personalityType: item.type,
      percentage: Math.round(item.similarity * 100)
    }));

    const gap1to2 = allSimilarities[0].similarity - (allSimilarities[1]?.similarity || 0);
    const relativeGap = allSimilarities[0].similarity > 0 ? gap1to2 / allSimilarities[0].similarity : 0;
    const isHybrid = relativeGap < 0.15;

    const sortedDimensions = Object.entries(dimensions)
      .sort((a, b) => Math.abs(b[1] - 2) - Math.abs(a[1] - 2));
    const dominantTraits = sortedDimensions.slice(0, 3).map(([dim]) => dim);

    const baseResult = this.getResult();

    return {
      ...baseResult,
      topMatches: top3,
      isHybrid,
      dominantTraits
    };
  }

  resetTest(): void {
    this.currentTest = null;
    this.answers = {};
  }

  registerDimension(dimension: Dimension): void {
    this.dimensions.push(dimension);
  }

  registerPersonalityType(personalityType: PersonalityType): void {
    this.personalityTypes.push(personalityType);
  }

  registerTest(test: TestConfig): void {
    this.tests.push(test);
    test.dimensions.forEach(dimension => this.registerDimension(dimension));
    test.personalityTypes.forEach(personalityType => this.registerPersonalityType(personalityType));
  }

  private buildDimensionMaxScores(test: TestConfig): Record<string, number> {
    const maxScores: Record<string, number> = {};

    test.dimensions.forEach(dimension => {
      maxScores[dimension.id] = 0;
    });

    test.questions.forEach(question => {
      test.dimensions.forEach(dimension => {
        const bestOptionScore = question.options.reduce((best, option) => {
          return Math.max(best, option.scores[dimension.id] || 0);
        }, 0);
        maxScores[dimension.id] += bestOptionScore;
      });
    });

    return maxScores;
  }

  private buildEvidenceExtremes(test: TestConfig): Map<string, { maxSupport: number; maxConflict: number }> {
    const result = new Map<string, { maxSupport: number; maxConflict: number }>();

    test.personalityTypes.forEach(type => {
      let maxSupport = 0;
      let maxConflict = 0;

      test.questions.forEach(question => {
        let questionSupport = 0;
        let questionConflict = 0;

        question.options.forEach(option => {
          const support = option.evidence?.supports
            ?.filter(item => item.type === type.id)
            .reduce((sum, item) => sum + (item.weight || 1), 0) || 0;
          const conflict = option.evidence?.conflicts
            ?.filter(item => item.type === type.id)
            .reduce((sum, item) => sum + (item.weight || 1), 0) || 0;

          questionSupport = Math.max(questionSupport, support);
          questionConflict = Math.max(questionConflict, conflict);
        });

        maxSupport += questionSupport;
        maxConflict += questionConflict;
      });

      result.set(type.id, { maxSupport, maxConflict });
    });

    return result;
  }

  private calculateDimensions(): Record<string, number> {
    if (!this.currentTest) {
      throw new Error('No test started');
    }

    const dimensionScores: Record<string, number> = {};

    this.currentTest.dimensions.forEach(dimension => {
      dimensionScores[dimension.id] = 0;
    });

    this.currentTest.questions.forEach(question => {
      const selectedOptionId = this.answers[question.id];
      if (selectedOptionId) {
        const option = question.options.find(opt => opt.id === selectedOptionId);
        if (option) {
          Object.entries(option.scores).forEach(([dimensionId, score]) => {
            if (dimensionScores[dimensionId] !== undefined) {
              dimensionScores[dimensionId] += score;
            }
          });
        }
      }
    });

    Object.keys(dimensionScores).forEach(dimensionId => {
      const rawScore = dimensionScores[dimensionId];
      const maxScore = this.dimensionMaxScores[dimensionId] || this.currentTest?.maxScorePerDimension || 0;
      const normalizedScore = this.normalizeDimensionScore(rawScore, maxScore);
      dimensionScores[dimensionId] = Math.max(1, Math.min(3, normalizedScore));
    });

    return dimensionScores;
  }

  private normalizeDimensionScore(score: number, maxScore: number): number {
    if (maxScore <= 0) {
      return 2;
    }
    const ratio = Math.max(0, Math.min(1, score / maxScore));
    return 1 + ratio * 2;
  }

  private calculatePersonalityMatch(dimensions: Record<string, number>): { personalityType: PersonalityType; matchPercentage: number } {
    if (!this.currentTest) {
      throw new Error('No test started');
    }

    const dimensionWeights = this.currentTest.dimensionWeights || {};

    let bestMatch: PersonalityType | null = null;
    let highestSimilarity = -1;

    this.currentTest.personalityTypes.forEach(personalityType => {
      const similarity = this.calculatePersonalityScore(dimensions, personalityType, dimensionWeights);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = personalityType;
      }
    });

    if (!bestMatch) {
      throw new Error('No personality type found');
    }

    return {
      personalityType: bestMatch,
      matchPercentage: Math.round(highestSimilarity * 100)
    };
  }

  private calculatePersonalityScore(
    userDimensions: Record<string, number>,
    personalityType: PersonalityType,
    dimensionWeights: Record<string, number>
  ): number {
    const dimensionScore = this.calculateDimensionSimilarity(
      userDimensions,
      personalityType.template,
      dimensionWeights
    );
    const evidenceScore = this.calculateEvidenceScore(personalityType.id);
    const constraintMultiplier = this.calculateConstraintMultiplier(
      userDimensions,
      personalityType.constraints || []
    );

    const combinedScore = dimensionScore * 0.55 + evidenceScore * 0.45;
    return Math.max(0.01, Math.min(1, combinedScore * constraintMultiplier));
  }

  private calculateDimensionSimilarity(
    userDimensions: Record<string, number>,
    templateDimensions: Record<string, number>,
    dimensionWeights: Record<string, number>
  ): number {
    const commonDimensions = Object.keys(userDimensions).filter(key => templateDimensions[key] !== undefined);

    if (commonDimensions.length === 0) {
      return 0;
    }

    let weightedDistance = 0;
    let totalWeight = 0;

    commonDimensions.forEach(dimension => {
      const weight = dimensionWeights[dimension] || 1.0;
      const diff = Math.abs(userDimensions[dimension] - templateDimensions[dimension]);
      weightedDistance += (diff / 2) * weight;
      totalWeight += weight;
    });

    if (totalWeight === 0) {
      return 0;
    }

    return Math.max(0, 1 - weightedDistance / totalWeight);
  }

  private calculateEvidenceScore(typeId: string): number {
    if (!this.currentTest) {
      return 0;
    }

    let support = 0;
    let conflict = 0;

    this.currentTest.questions.forEach(question => {
      const selectedOptionId = this.answers[question.id];
      const option = question.options.find(item => item.id === selectedOptionId);
      if (!option?.evidence) {
        return;
      }

      support += option.evidence.supports
        ?.filter(item => item.type === typeId)
        .reduce((sum, item) => sum + (item.weight || 1), 0) || 0;

      conflict += option.evidence.conflicts
        ?.filter(item => item.type === typeId)
        .reduce((sum, item) => sum + (item.weight || 1), 0) || 0;
    });

    const extremes = this.evidenceExtremes.get(typeId);
    const supportRatio = extremes && extremes.maxSupport > 0 ? support / extremes.maxSupport : 0.5;
    const conflictRatio = extremes && extremes.maxConflict > 0 ? conflict / extremes.maxConflict : 0;
    const score = 0.15 + supportRatio * 0.9 - conflictRatio * 0.55;

    return Math.max(0, Math.min(1, score));
  }

  private calculateConstraintMultiplier(
    dimensions: Record<string, number>,
    constraints: DimensionConstraint[]
  ): number {
    let multiplier = 1;

    constraints.forEach(constraint => {
      const value = dimensions[constraint.dimension];
      if (value === undefined) {
        return;
      }

      const violation = this.getConstraintViolation(value, constraint);
      if (violation <= 0) {
        return;
      }

      const weight = constraint.weight || 1;
      const severity = Math.min(1, violation / 2);
      const floor = constraint.hard ? 0.02 : 0.45;
      const penalty = constraint.hard ? severity * 1.35 : severity * 0.45 * weight;
      multiplier *= Math.max(floor, 1 - penalty);
    });

    return multiplier;
  }

  private getConstraintViolation(value: number, constraint: DimensionConstraint): number {
    if (constraint.min !== undefined && value < constraint.min) {
      return constraint.min - value;
    }
    if (constraint.max !== undefined && value > constraint.max) {
      return value - constraint.max;
    }
    return 0;
  }

  private generateInterpretation(personalityType: PersonalityType): string {
    return personalityType.description;
  }
}
