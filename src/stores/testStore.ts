import { defineStore } from 'pinia';
import { TestEngine } from '../core/testEngine';
import { themeManager } from '../xbti/themeManager';
import { programmerTest } from '../instance/programmerTest';
import { kinggloryTest } from '../instance/kinggloryTest';
import type { TestResult, TestConfig } from '../protocol/types';

themeManager.registerTheme(programmerTest);
themeManager.registerTheme(kinggloryTest);

export const useTestStore = defineStore('test', {
  state: () => ({
    testEngine: new TestEngine(),
    currentQuestionIndex: 0,
    answers: {} as Record<string, string>,
    result: null as TestResult | null,
    isTestStarted: false,
    isTestCompleted: false,
    currentThemeId: 'programmer' as string
  }),

  getters: {
    currentTheme: (state): TestConfig | null => {
      return themeManager.getTheme(state.currentThemeId) || null;
    },

    currentQuestion: (state) => {
      if (!state.isTestStarted) return null;
      const theme = themeManager.getTheme(state.currentThemeId);
      if (!theme) return null;
      return theme.questions[state.currentQuestionIndex];
    },

    progress: (state) => {
      if (!state.isTestStarted) return 0;
      const theme = themeManager.getTheme(state.currentThemeId);
      if (!theme) return 0;
      return ((state.currentQuestionIndex) / theme.questions.length) * 100;
    },

    isLastQuestion: (state) => {
      if (!state.isTestStarted) return false;
      const theme = themeManager.getTheme(state.currentThemeId);
      if (!theme) return false;
      return state.currentQuestionIndex === theme.questions.length - 1;
    },

    totalQuestions: (state) => {
      const theme = themeManager.getTheme(state.currentThemeId);
      return theme?.questions.length || 0;
    },

    allThemes: () => {
      return themeManager.getAllThemes();
    }
  },

  actions: {
    setTheme(themeId: string) {
      if (themeManager.getTheme(themeId)) {
        this.currentThemeId = themeId;
        this.resetTest();
      }
    },

    registerTheme(theme: TestConfig) {
      themeManager.registerTheme(theme);
    },

    startTest() {
      const theme = themeManager.getTheme(this.currentThemeId);
      if (!theme) return;

      this.testEngine.registerTest(theme);
      this.testEngine.startTest(theme.id);
      this.currentQuestionIndex = 0;
      this.answers = {};
      this.result = null;
      this.isTestStarted = true;
      this.isTestCompleted = false;
    },

    submitAnswer(optionId: string) {
      if (!this.isTestStarted || this.isTestCompleted) return;

      const currentQuestion = this.currentQuestion;
      if (!currentQuestion) return;

      this.answers[currentQuestion.id] = optionId;
      this.testEngine.submitAnswer(currentQuestion.id, optionId);

      // 先移动到下一题
      this.currentQuestionIndex++;

      // 检查是否还有下一题
      const theme = themeManager.getTheme(this.currentThemeId);
      if (!theme || this.currentQuestionIndex >= theme.questions.length) {
        // 没有下一题了，返回 true 表示应该完成测试
        return true;
      }
      
      // 还有下一题，返回 false
      return false;
    },

    completeTest() {
      if (!this.isTestStarted) return;

      this.result = this.testEngine.getResult();
      this.isTestCompleted = true;
    },

    resetTest() {
      this.testEngine.resetTest();
      this.currentQuestionIndex = 0;
      this.answers = {};
      this.result = null;
      this.isTestStarted = false;
      this.isTestCompleted = false;
    }
  }
});
