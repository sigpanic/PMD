// 题目结构
export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice';
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  scores: Record<string, number>;
  evidence?: OptionEvidence;
}

export interface OptionEvidence {
  supports?: EvidenceRef[];
  conflicts?: EvidenceRef[];
}

export interface EvidenceRef {
  type: string;
  weight?: number;
  reason?: string;
}

// 维度结构
export interface Dimension {
  id: string;
  name: string;
  description: string;
  min_label: string;
  max_label: string;
}

// 人格类型结构
export interface PersonalityType {
  id: string;
  name: string;
  description: string;
  meme: string;
  template: Record<string, number>;
  constraints?: DimensionConstraint[];
}

export interface DimensionConstraint {
  dimension: string;
  min?: number;
  max?: number;
  weight?: number;
  hard?: boolean;
  description?: string;
}

// 测评结果结构
export interface TestResult {
  personality_type: string;
  match_percentage: number;
  dimensions: Record<string, number>;
  radar_chart: RadarChartData[];
  interpretation: string;
}

export interface RadarChartData {
  dimension: string;
  value: number;
}

// 测评接口
export interface TestInterface {
  startTest(testId: string): void;
  submitAnswer(questionId: string, optionId: string): void;
  getResult(): TestResult;
  resetTest(): void;
}

// 扩展接口
export interface ExtensionInterface {
  registerDimension(dimension: Dimension): void;
  registerPersonalityType(personalityType: PersonalityType): void;
  registerTest(test: TestConfig): void;
}

// 测评配置
export interface TestConfig {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  dimensions: Dimension[];
  personalityTypes: PersonalityType[];
  dimensionWeights?: Record<string, number>;
  maxScorePerDimension?: number;
  acceptanceCases?: AcceptanceCase[];
}

export interface AcceptanceCase {
  id: string;
  label: string;
  expectedType: string;
  answers: Record<string, string>;
  description?: string;
}
