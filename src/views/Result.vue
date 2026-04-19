<template>
  <div class="result">
    <div v-if="result" class="result-container">
      <!-- Header -->
      <div class="result-header">
        <button class="back-home-btn" @click="restartTest">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          <span>重新测试</span>
        </button>
        
        <h1 class="result-title">人格蒸馏结果</h1>

        <button class="share-btn" @click="shareResult">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span>分享</span>
        </button>
      </div>

      <!-- Personality Card -->
      <div class="personality-card-section">
        <div class="personality-glass-card">
          <div class="p-left-col">
            <div class="percentage-circle">
              <svg class="ring-svg" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <circle 
                  class="ring-bg" 
                  cx="60" 
                  cy="60" 
                  r="54"
                  fill="none"
                  stroke="#f1f5f9"
                  stroke-width="7"
                />
                <circle 
                  class="ring-progress" 
                  cx="60" 
                  cy="60" 
                  r="54"
                  fill="none"
                  stroke="url(#ringGrad)"
                  stroke-width="7"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="strokeDashoffset"
                  stroke-linecap="round"
                />
              </svg>
              
              <div class="percentage-inner">
                <span class="percent-num">{{ result.match_percentage }}</span>
                <span class="percent-sign">%</span>
              </div>
            </div>
            
            <div class="purity-label-text">纯度</div>
          </div>

          <div class="p-right-col">
            <h2 class="personality-name">{{ getPersonalityName(result.personality_type) }}</h2>
            <p class="personality-meme">{{ getPersonalityMeme(result.personality_type) }}</p>
          </div>
        </div>
      </div>

      <!-- Radar Chart Section -->
      <div class="chart-section-block">
        <h3 class="section-title-heading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            <line x1="12" y1="22" x2="12" y2="15.5"/>
            <polyline points="22 8.5 12 15.5 2 8.5"/>
          </svg>
          维度分析
        </h3>
        <div ref="radarChartRef" class="chart-wrapper"></div>
      </div>

      <!-- Interpretation Section -->
      <div class="interpretation-block">
        <h3 class="section-title-heading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          详细解读
        </h3>
        <div class="interpretation-box">
          <p class="interpretation-text-content">{{ result.interpretation }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons-row">
        <button class="action-btn-primary" @click="restartTest">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          <span>重新蒸馏</span>
        </button>
        
        <button class="action-btn-secondary" @click="shareResult">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          <span>分享结果</span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="loading-view">
      <div class="spinner-ring"></div>
      <p>生成结果中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTestStore } from '../stores/testStore';
import * as echarts from 'echarts';

const router = useRouter();
const testStore = useTestStore();
const radarChartRef = ref<HTMLElement | null>(null);
let radarChart: echarts.ECharts | null = null;

const result = computed(() => testStore.result);

const circumference = 2 * Math.PI * 54;
const strokeDashoffset = computed(() => {
  const percentage = result.value?.match_percentage || 0;
  return circumference - (percentage / 100) * circumference;
});

const getPersonalityName = (personalityId: string) => {
  const theme = testStore.currentTheme;
  if (!theme) return '未知人格';
  const personality = theme.personalityTypes.find(p => p.id === personalityId);
  return personality ? personality.name : '未知人格';
};

const getPersonalityMeme = (personalityId: string) => {
  const theme = testStore.currentTheme;
  if (!theme) return '';
  const personality = theme.personalityTypes.find(p => p.id === personalityId);
  return personality ? personality.meme : '';
};

const restartTest = () => {
  testStore.resetTest();
  router.push('/');
};

const shareResult = () => {
  if (navigator.share) {
    navigator.share({
      title: 'PMD人格蒸馏结果',
      text: `我是${getPersonalityName(result.value?.personality_type || '')}，纯度${result.value?.match_percentage}%。快来蒸馏你的人格吧！`,
      url: window.location.origin
    });
  } else {
    const text = `我是${getPersonalityName(result.value?.personality_type || '')}，纯度${result.value?.match_percentage}%。快来蒸馏你的人格吧！${window.location.origin}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ 结果已复制到剪贴板');
    });
  }
};

// Simple, reliable radar chart initialization
const initRadarChart = () => {
  // Wait a bit for the DOM to be ready
  setTimeout(() => {
    if (!radarChartRef.value) return;
    if (!result.value) return;

    // Dispose old instance
    if (radarChart) {
      radarChart.dispose();
      radarChart = null;
    }

    const theme = testStore.currentTheme;
    if (!theme) return;

    // Initialize chart
    radarChart = echarts.init(radarChartRef.value);

    const dimensions = theme.dimensions;
    const indicator = dimensions.map(dim => ({
      name: dim.name,
      max: 3
    }));

    const seriesData = dimensions.map(dim => {
      return result.value?.dimensions[dim.id] || 1;
    });

    const option = {
      tooltip: {
        formatter: (params: any) => {
          const val = params.value;
          if (!val || !Array.isArray(val)) return '';
          return indicator.map((ind: any, i: number) => 
            `${ind.name}: ${Number(val[i]).toFixed(1)}`
          ).join('<br/>');
        }
      },
      radar: {
        indicator: indicator,
        shape: 'polygon',
        splitNumber: 3,
        axisName: {
          color: '#64748b',
          fontSize: 11,
          fontWeight: 500
        },
        splitLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              'rgba(14, 165, 233, 0.05)',
              'rgba(139, 92, 246, 0.05)',
              'rgba(139, 92, 246, 0.08)'
            ]
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        }
      },
      series: [{
        type: 'radar',
        data: [{
          value: seriesData,
          name: '你的得分',
          areaStyle: {
            color: 'rgba(14, 165, 233, 0.25)'
          },
          lineStyle: {
            width: 2.5,
            color: '#0ea5e9'
          },
          itemStyle: {
            color: '#0ea5e9',
            borderColor: '#fff',
            borderWidth: 2
          }
        }]
      }]
    };

    radarChart.setOption(option);
    
    // Resize after render
    setTimeout(() => {
      radarChart?.resize();
    }, 200);
  }, 300);
};

onMounted(() => {
  if (!testStore.isTestCompleted) {
    router.push('/');
  } else {
    initRadarChart();
  }

  window.addEventListener('resize', () => radarChart?.resize());
});
</script>

<style scoped>
/* ===== Global Styles ===== */
.result {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1e293b;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 2rem;
}

.result-container {
  max-width: 1050px;
  margin: 0 auto;
}

/* ===== Header ===== */
.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.8rem;
}

.back-home-btn,
.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.88rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.back-home-btn:hover,
.share-btn:hover {
  background: #f0f9ff;
  border-color: #bae6fd;
  color: #0ea5e9;
}

.result-title {
  font-size: 1.55rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
}

/* ===== Personality Card ===== */
.personality-card-section {
  margin-bottom: 2.8rem;
}

.personality-glass-card {
  background: white;
  border-radius: 26px;
  padding: 2.8rem;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.06),
    0 1px 4px rgba(0, 0, 0, 0.03);
  border: 1px solid #f1f5f9;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2.8rem;
  align-items: center;
}

.p-left-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3rem;
}

.percentage-circle {
  position: relative;
  width: 155px;
  height: 155px;
}

.ring-svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.ring-bg {
  fill: none;
  stroke: #f1f5f9;
  stroke-width: 7;
}

.ring-progress {
  fill: none;
  transition: stroke-dashoffset 2s cubic-bezier(0.23, 1, 0.32, 1);
}

.percentage-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.percent-num {
  font-size: 2.85rem;
  font-weight: 800;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.percent-sign {
  font-size: 1.15rem;
  color: #94a3b8;
  margin-left: 2px;
}

.purity-label-text {
  color: #94a3b8;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.p-right-col {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.personality-name {
  font-size: 2.1rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1.2;
  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.personality-meme {
  font-size: 1.1rem;
  color: #64748b;
  font-style: italic;
  line-height: 1.5;
}

/* ===== Chart & Interpretation Sections ===== */
.chart-section-block,
.interpretation-block {
  margin-bottom: 2.2rem;
}

.section-title-heading {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.3rem;
}

.section-title-heading svg {
  color: #0ea5e9;
}

.chart-wrapper {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  height: 400px;
  width: 100%;
}

.interpretation-box {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  border-left: 3px solid #0ea5e9;
}

.interpretation-text-content {
  color: #475569;
  line-height: 1.82;
  font-size: 1.02rem;
  margin: 0;
}

/* ===== Action Buttons ===== */
.action-buttons-row {
  display: flex;
  justify-content: center;
  gap: 1.3rem;
  margin-top: 2.8rem;
  flex-wrap: wrap;
}

.action-btn-primary {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1.05rem 2.1rem;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  border: none;
  border-radius: 13px;
  color: white;
  font-size: 0.98rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 7px 26px rgba(14, 165, 233, 0.32);
}

.action-btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 11px 38px rgba(14, 165, 233, 0.42);
}

.action-btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1.05rem 2.1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 13px;
  color: #334155;
  font-size: 0.98rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
}

.action-btn-secondary:hover {
  background: #f0f9ff;
  border-color: #bae6fd;
  color: #0ea5e9;
  transform: translateY(-3px);
}

/* ===== Loading ===== */
.loading-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 58vh;
  gap: 1.8rem;
}

.spinner-ring {
  width: 54px;
  height: 54px;
  border: 3px solid #e2e8f0;
  border-top-color: #0ea5e9;
  border-radius: 50%;
  animation: spin-animation 1s linear infinite;
  box-shadow: 0 0 18px rgba(14, 165, 233, 0.28);
}

@keyframes spin-animation {
  to { transform: rotate(360deg); }
}

.loading-view p {
  color: #94a3b8;
  font-size: 0.98rem;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .personality-glass-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .p-left-col {
    order: -1;
  }
}

@media (max-width: 768px) {
  .result {
    padding: 1.5rem;
  }

  .result-header {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .back-home-btn span,
  .share-btn span {
    display: none;
  }

  .result-title {
    order: -1;
    width: 100%;
    text-align: center;
    font-size: 1.35rem;
  }

  .personality-glass-card {
    padding: 2rem 1.5rem;
  }

  .personality-name {
    font-size: 1.75rem;
  }

  .chart-wrapper > div {
    height: 340px !important;
  }

  .action-buttons-row {
    flex-direction: column;
  }

  .action-btn-primary,
  .action-btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
