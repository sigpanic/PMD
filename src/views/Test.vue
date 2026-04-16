<template>
  <div class="test">
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress" :style="{ width: `${progress}%` }"></div>
      </div>
      <div class="progress-text">
        <span class="current">{{ currentQuestionIndex + 1 }}</span>
        <span class="separator">/</span>
        <span class="total">{{ totalQuestions }}</span>
      </div>
    </div>

    <div v-if="currentQuestion" class="question-container">
      <div class="question-header">
        <span class="question-label">问题 {{ currentQuestionIndex + 1 }}</span>
      </div>
      
      <h3 class="question-text">{{ currentQuestion.text }}</h3>
      
      <div class="options">
        <div
          v-for="option in currentQuestion.options"
          :key="option.id"
          class="option"
          :class="{ active: selectedOption === option.id }"
          @click="selectOption(option.id)"
        >
          <span class="option-letter">{{ option.id.toUpperCase() }}</span>
          <span class="option-text">{{ option.text }}</span>
        </div>
      </div>
      
      <div class="buttons">
        <button
          class="next-btn"
          :disabled="!selectedOption"
          @click="submitAnswer"
        >
          <span class="btn-text">{{ isLastQuestion ? '开始蒸馏' : '下一题' }}</span>
        </button>
      </div>
    </div>

    <!-- 蒸馏动画 -->
    <div v-if="showDistillation" class="distillation-animation">
      <div class="distillation-container">
        <div class="flask">
          <div class="liquid"></div>
          <div class="bubbles">
            <div v-for="i in 10" :key="i" class="bubble" :style="{ animationDelay: i * 0.2 + 's' }"></div>
          </div>
        </div>
        <p class="distillation-text">正在蒸馏你的人格...</p>
      </div>
    </div>

    <div v-else-if="!currentQuestion && !showDistillation" class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTestStore } from '../stores/testStore';

const router = useRouter();
const testStore = useTestStore();
const selectedOption = ref<string | null>(null);
const showDistillation = ref(false);

const currentQuestion = computed(() => testStore.currentQuestion);
const currentQuestionIndex = computed(() => testStore.currentQuestionIndex);
const isLastQuestion = computed(() => testStore.isLastQuestion);
const progress = computed(() => testStore.progress);
const totalQuestions = computed(() => testStore.totalQuestions);

const selectOption = (optionId: string) => {
  selectedOption.value = optionId;
};

const submitAnswer = () => {
  if (selectedOption.value) {
    const isCompleted = testStore.submitAnswer(selectedOption.value);
    selectedOption.value = null;
    
    if (isCompleted) {
      // 显示蒸馏动画
      showDistillation.value = true;
      // 2 秒后完成测试
      setTimeout(() => {
        testStore.completeTest();
        router.push('/result');
      }, 2000);
    }
  }
};

onMounted(() => {
  if (!testStore.isTestStarted) {
    router.push('/');
  }
});
</script>

<style scoped>
.test {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #333;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2c3e50);
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.progress-text .current {
  color: #3498db;
}

.question-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.question-header {
  margin-bottom: 1.5rem;
}

.question-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.question-text {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  color: #2c3e50;
  font-weight: 500;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.option {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 1.2rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.option:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.option.active {
  background: rgba(52, 152, 219, 0.1);
  border-color: #3498db;
}

.option-letter {
  font-size: 1rem;
  font-weight: 700;
  margin-right: 1rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3498db;
  color: white;
  border-radius: 50%;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  line-height: 1.4;
  color: #2c3e50;
  font-size: 1rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.next-btn {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.next-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #e9ecef;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading p {
  color: #7f8c8d;
  font-size: 1rem;
}

/* 蒸馏动画 */
.distillation-animation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.distillation-container {
  text-align: center;
  padding: 2rem;
}

.flask {
  position: relative;
  width: 150px;
  height: 200px;
  margin: 0 auto 2rem;
}

.flask::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 150px;
  background: linear-gradient(180deg, rgba(52, 152, 219, 0.2), rgba(52, 152, 219, 0.8));
  border-radius: 50px 50px 20px 20px;
}

.flask::after {
  content: '';
  position: absolute;
  bottom: 130px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 80px;
  background: linear-gradient(180deg, rgba(52, 152, 219, 0.8), rgba(52, 152, 219, 0.2));
  border-radius: 20px 20px 0 0;
}

.liquid {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 100px;
  background: linear-gradient(180deg, rgba(52, 152, 219, 0.6), rgba(52, 152, 219, 1));
  border-radius: 40px 40px 15px 15px;
  animation: boil 2s infinite;
}

@keyframes boil {
  0%, 100% { height: 100px; }
  50% { height: 110px; }
}

.bubbles {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 100px;
  overflow: hidden;
}

.bubble {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: rise 2s infinite;
}

@keyframes rise {
  0% {
    bottom: 0;
    opacity: 1;
    transform: translateX(-50%) scale(0.5);
  }
  100% {
    bottom: 100px;
    opacity: 0;
    transform: translateX(-50%) scale(1.5);
  }
}

.distillation-text {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 600;
}

@media (max-width: 768px) {
  .test {
    padding: 1rem;
  }

  .question-container {
    padding: 1.5rem;
  }

  .question-text {
    font-size: 1.2rem;
  }

  .option {
    padding: 1rem;
  }

  .next-btn {
    width: 100%;
    justify-content: center;
  }

  .progress-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .progress-bar {
    width: 100%;
  }
}
</style>
