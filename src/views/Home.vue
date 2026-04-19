<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <h1 class="title">PMD</h1>
      <p class="subtitle">人格蒸馏系统</p>
      <p class="tagline">Distill Personality, Understand Yourself</p>
    </div>

    <!-- 3D Carousel Section -->
    <div class="carousel-wrapper">
      <h2 class="section-title">选择蒸馏主题</h2>
      
      <div 
        class="carousel-scene"
        @wheel.prevent="handleWheel"
        @touchstart.passive="handleTouchStart"
        @touchmove.passive="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="carousel-viewport">
          <div 
            v-for="(theme, index) in displayThemes" 
            :key="theme.id"
            class="carousel-item"
            :class="{ active: index === currentIndex }"
            :style="getCardStyle(index)"
            @click="handleCardClick(theme, index)"
          >
            <div class="card-glassmorphism">
              <div class="card-content">
                <div class="icon-container">
                  <span class="theme-icon">{{ theme.icon }}</span>
                  <div class="icon-pulse"></div>
                </div>
                
                <h3 class="theme-name">{{ theme.name }}</h3>
                <p class="theme-desc">{{ theme.description }}</p>
                
                <button 
                  v-if="index === currentIndex && theme.id !== 'soon'"
                  class="action-button"
                  @click.stop="startTestWithTheme(theme, $event)"
                >
                  <span>开始蒸馏</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              
              <div class="card-reflection"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls (Below Carousel) -->
      <div class="navigation-controls">
        <button class="nav-arrow prev" @click="prevSlide" aria-label="上一张">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <div class="indicators-row">
          <button
            v-for="(theme, index) in displayThemes"
            :key="'dot-' + index"
            class="indicator-dot"
            :class="{ active: index === currentIndex }"
            @click="goToSlide(index)"
            :aria-label="`跳转到 ${theme.name}`"
          ></button>
        </div>
        
        <button class="nav-arrow next" @click="nextSlide" aria-label="下一张">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <!-- Keyboard Hint -->
      <div class="keyboard-hint">
        <kbd>←</kbd><kbd>→</kbd> 切换 · <kbd>Enter</kbd> 选择
      </div>
    </div>

    <!-- Features Grid -->
    <div class="features-grid">
      <div class="feature-card" v-for="(feature, idx) in featuresData" :key="idx">
        <div class="feature-icon-wrapper">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>

    <!-- About Section -->
    <div class="about-section">
      <div class="about-content">
        <h2>关于 PMD</h2>
        <p class="about-intro">本测评仅供娱乐，所有结果基于<strong>加权多维匹配算法</strong>生成：</p>
        
        <ul class="algorithm-list">
          <li>
            <span class="step-number">01</span>
            <div class="step-content">
              <strong>维度相似度计算（55%权重）</strong>
              <small>加权欧氏距离匹配用户得分与预设模板</small>
            </div>
          </li>
          <li>
            <span class="step-number">02</span>
            <div class="step-content">
              <strong>证据评分系统（45%权重）</strong>
              <small>选项显式支持/冲突动态调整分数</small>
            </div>
          </li>
          <li>
            <span class="step-number">03</span>
            <div class="step-content">
              <strong>约束校验机制</strong>
              <small>硬性/软性约束条件惩罚性降权</small>
            </div>
          </li>
        </ul>

        <p class="disclaimer-text">⚠️ 该算法不具备任何科学依据或心理学意义，请勿将结果当真。</p>
        
        <a href="https://github.com/sigpanic/PMD" target="_blank" rel="noopener noreferrer" class="github-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub 开源项目</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTestStore } from '../stores/testStore';

const router = useRouter();
const testStore = useTestStore();

const currentIndex = ref(0);
const isAnimating = ref(false);
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

const allThemes = computed(() => testStore.allThemes);

const displayThemes = computed(() => {
  const themes = allThemes.value.map(t => ({
    ...t,
    icon: t.id === 'programmer' ? '💻' : t.id === 'kingglory' ? '🎮' : '🚧'
  }));
  
  return [
    ...themes,
    { id: 'soon', name: '更多主题', description: '正在开发中...', icon: '🚧' }
  ];
});

const featuresData = [
  { icon: '🎭', title: '任意主题', description: '从程序员到铲屎官，从社恐到社牛，只要你能定义，就能蒸馏' },
  { icon: '🧪', title: '加权多维匹配', description: '维度相似度(55%) + 证据评分(45%) + 约束校验的多层次算法' },
  { icon: '🤖', title: 'AI 友好', description: '提供完整提示词、协议定义和验收标准，AI 自动生成测评' },
  { icon: '🔒', title: '纯前端架构', description: '无需后端服务器，数据本地处理，隐私安全有保障' }
];

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') prevSlide();
  else if (e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'Enter') {
    const theme = displayThemes.value[currentIndex.value];
    if (theme.id !== 'soon') startTestWithTheme(theme);
  }
};

const handleWheel = (e: WheelEvent) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;
  e.preventDefault();
  if (e.deltaX > 30) nextSlide();
  else if (e.deltaX < -30) prevSlide();
};

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX;
  isSwiping = false;
};

const handleTouchMove = (e: TouchEvent) => {
  touchEndX = e.touches[0].clientX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 10) {
    isSwiping = true;
  }
};

const handleTouchEnd = () => {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50 && isSwiping) {
    diff > 0 ? nextSlide() : prevSlide();
    return;
  }
  isSwiping = false;
};

const getPrevIndex = () => (currentIndex.value - 1 + displayThemes.value.length) % displayThemes.value.length;
const getNextIndex = () => (currentIndex.value + 1) % displayThemes.value.length;

const getCardStyle = (index: number) => {
  const total = displayThemes.value.length;
  let offset = index - currentIndex.value;
  
  // Normalize for circular effect
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  // CRITICAL FIX: Use only translateX for centering, no margin hacks
  if (offset === 0) {
    return {
      transform: `translateX(-50%) translateY(-50%) scale(1)`,
      left: '50%',
      top: '50%',
      opacity: 1,
      zIndex: 10,
      filter: 'blur(0px)'
    };
  }

  const absOffset = Math.abs(offset);
  const direction = offset > 0 ? 1 : -1;
  const translateX = direction * (320 + absOffset * 80);
  const scale = 0.82 - absOffset * 0.04;
  const rotateY = direction * -28 - absOffset * 8;
  const opacity = 0.55 - absOffset * 0.12;
  const blur = absOffset * 1.8;

  return {
    transform: `translateX(calc(-50% + ${translateX}px)) translateY(calc(-50% + ${absOffset * 12}px)) scale(${scale}) rotateY(${rotateY}deg)`,
    left: '50%',
    top: '50%',
    opacity: Math.max(opacity, 0.18),
    zIndex: 10 - absOffset,
    filter: `blur(${blur}px)`
  };
};

const prevSlide = () => {
  if (isAnimating.value || displayThemes.value.length <= 1) return;
  isAnimating.value = true;
  currentIndex.value = getPrevIndex();
  setTimeout(() => isAnimating.value = false, 650);
};

const nextSlide = () => {
  if (isAnimating.value || displayThemes.value.length <= 1) return;
  isAnimating.value = true;
  currentIndex.value = getNextIndex();
  setTimeout(() => isAnimating.value = false, 650);
};

const goToSlide = (index: number) => {
  if (isAnimating.value || index === currentIndex.value) return;
  isAnimating.value = true;
  currentIndex.value = index;
  setTimeout(() => isAnimating.value = false, 650);
};

const handleCardClick = (theme: any, index: number) => {
  if (index !== currentIndex.value) {
    goToSlide(index);
  } else if (theme.id !== 'soon') {
    startTestWithTheme(theme);
  } else {
    alert('更多主题正在开发中...敬请期待');
  }
};

const startTestWithTheme = (theme: any, event?: Event) => {
  if (event) event.stopPropagation();
  if (theme.id === 'soon') return;
  
  const cardEl = document.querySelector('.carousel-item.active') as HTMLElement;
  
  if (cardEl) {
    cardEl.classList.add('expanding');
    
    setTimeout(() => {
      testStore.setTheme(theme.id);
      testStore.startTest();
      router.push('/test');
    }, 900);
  } else {
    testStore.setTheme(theme.id);
    testStore.startTest();
    router.push('/test');
  }
};
</script>

<style scoped>
/* ===== Global Styles ===== */
.home {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1e293b;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
}

/* ===== Hero ===== */
.hero {
  text-align: center;
  padding: 4rem 2rem 2rem;
}

.title {
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.06em;
  margin-bottom: 0.75rem;
}

.subtitle {
  font-size: 1.35rem;
  color: #64748b;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.tagline {
  font-size: 1.05rem;
  color: #94a3b8;
  font-style: italic;
  font-family: 'SF Mono', Monaco, monospace;
}

/* ===== Carousel Wrapper ===== */
.carousel-wrapper {
  max-width: 1300px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}

.section-title {
  text-align: center;
  font-size: 1.65rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 3.5rem;
  letter-spacing: -0.02em;
}

.carousel-scene {
  position: relative;
  height: 480px;
  perspective: 1400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 120px; /* Generous space for side cards */
}

.carousel-viewport {
  position: relative;
  width: 100%;
  height: 430px;
  transform-style: preserve-3d;
  /* Remove centering from viewport - let items handle it */
}

/* FIXED: Clean centering with only translateX/Y(-50%) + left/top:50% */
.carousel-item {
  position: absolute;
  width: 340px;
  height: 400px;
  transition: all 0.65s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  transform-style: preserve-3d;
}

/* Transparent hit area to cover rotated corners */
.carousel-item::before {
  content: '';
  position: absolute;
  inset: -40px;
  z-index: 1;
}

.carousel-item:hover:not(.active) {
  filter: blur(0px) !important;
  opacity: 0.75 !important;
}

.carousel-item.expanding {
  transition: all 0.9s cubic-bezier(0.68, -0.15, 0.27, 1.25);
  transform: translateX(-50%) translateY(-50%) scale(1.2) rotateY(180deg) !important;
  opacity: 0 !important;
  z-index: 100 !important;
  filter: blur(20px) !important;
}

.card-glassmorphism {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 2px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;
}

.carousel-item.active .card-glassmorphism {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(14, 165, 233, 0.4);
  box-shadow: 
    0 20px 60px rgba(14, 165, 233, 0.18),
    0 4px 20px rgba(139, 92, 246, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 1);
}

.carousel-item.active:hover .card-glassmorphism {
  box-shadow: 
    0 25px 70px rgba(14, 165, 233, 0.25),
    0 8px 30px rgba(139, 92, 246, 0.15),
    inset 0 2px 0 rgba(255, 255, 255, 1);
  transform: translateY(-8px);
}

.card-content {
  padding: 2.8rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 2;
}

.icon-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.theme-icon {
  font-size: 5rem;
  display: block;
  animation: gentle-float 3.5s ease-in-out infinite;
  filter: drop-shadow(0 8px 24px rgba(14, 165, 233, 0.25));
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.icon-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95px;
  height: 95px;
  border: 2px solid rgba(14, 165, 233, 0.2);
  border-radius: 50%;
  animation: pulse-ring 3.5s ease-in-out infinite;
}

@keyframes pulse-ring {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.7; }
}

.theme-name {
  font-size: 1.55rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.7rem;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.theme-desc {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  min-height: 44px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.95rem 2.2rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 0.98rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.35);
  position: relative;
  overflow: hidden;
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.6s ease;
}

.action-button:hover::before {
  left: 100%;
}

.action-button:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 12px 35px rgba(14, 165, 233, 0.45);
}

.action-button svg {
  transition: transform 0.3s ease;
}

.action-button:hover svg {
  transform: translateX(3px);
}

.card-reflection {
  position: absolute;
  bottom: -50%;
  left: -50%;
  width: 200%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(14, 165, 233, 0.06) 0%, transparent 60%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.carousel-item.active:hover .card-reflection {
  opacity: 1;
}

/* ===== Navigation Controls (Below) ===== */
.navigation-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 2.5rem;
}

.nav-arrow {
  width: 52px;
  height: 52px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.nav-arrow:hover {
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  border-color: transparent;
  color: white;
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(14, 165, 233, 0.3);
}

.indicators-row {
  display: flex;
  gap: 10px;
}

.indicator-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #cbd5e1;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 0;
}

.indicator-dot.active {
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  transform: scale(1.3);
  box-shadow: 0 0 16px rgba(14, 165, 233, 0.4);
}

.indicator-dot:hover:not(.active) {
  background: #94a3b8;
  transform: scale(1.15);
}

.keyboard-hint {
  text-align: center;
  margin-top: 1.2rem;
  color: #94a3b8;
  font-size: 0.88rem;
  font-family: 'SF Mono', Monaco, monospace;
}

.keyboard-hint kbd {
  display: inline-block;
  padding: 0.25rem 0.55rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.82rem;
  margin: 0 0.15rem;
  font-family: inherit;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

/* ===== Features Grid ===== */
.features-grid {
  max-width: 1150px;
  margin: 5rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #0ea5e9, #8b5cf6, transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon-wrapper {
  font-size: 2.4rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
  font-size: 0.94rem;
}

/* ===== About Section ===== */
.about-section {
  max-width: 850px;
  margin: 4rem auto 5rem;
  padding: 0 2rem;
}

.about-content {
  background: white;
  border-radius: 22px;
  padding: 2.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.about-content h2 {
  font-size: 1.65rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.3rem;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-intro {
  color: #475569;
  line-height: 1.8;
  margin-bottom: 1.8rem;
  font-size: 1.02rem;
}

.algorithm-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1.8rem;
}

.algorithm-list li {
  display: flex;
  align-items: flex-start;
  gap: 1.3rem;
  padding: 1.1rem;
  margin-bottom: 0.85rem;
  background: #f8fafc;
  border-left: 3px solid #0ea5e9;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.algorithm-list li:hover {
  background: #f0f9ff;
  transform: translateX(6px);
}

.step-number {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0ea5e9;
  opacity: 0.5;
  font-family: 'SF Mono', Monaco, monospace;
  min-width: 34px;
}

.step-content strong {
  display: block;
  color: #1e293b;
  margin-bottom: 0.25rem;
  font-size: 0.98rem;
}

.step-content small {
  color: #64748b;
  font-size: 0.88rem;
  line-height: 1.4;
}

.disclaimer-text {
  color: #d97706;
  font-size: 0.94rem;
  padding: 1rem 1.3rem;
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  border-radius: 10px;
  margin-bottom: 1.8rem;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 1.8rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #334155;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.4s ease;
}

.github-link:hover {
  background: #0ea5e9;
  border-color: #0ea5e9;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.25);
}

.github-link svg {
  transition: transform 0.3s ease;
}

.github-link:hover svg {
  transform: scale(1.15) rotate(360deg);
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .keyboard-hint {
    display: none;
  }

  .carousel-scene {
    padding: 0 60px;
  }
}

@media (max-width: 768px) {
  .home {
    padding: 0;
  }

  .hero {
    padding: 3rem 1.5rem 1.5rem;
  }

  .title {
    font-size: 3.2rem;
  }

  .subtitle {
    font-size: 1.15rem;
  }

  .carousel-scene {
    height: 450px;
    padding: 0;
  }

  .carousel-viewport {
    height: 400px;
  }

  .carousel-item {
    width: calc(100vw - 40px);
    max-width: 330px;
    height: 380px;
    transform: translateX(-50%) translateY(-50%);
    opacity: 1;
    filter: blur(0px);
    left: 50%;
    top: 50%;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .carousel-item.expanding {
    transition: all 0.9s cubic-bezier(0.68, -0.15, 0.27, 1.25);
    transform: translateX(-50%) translateY(-50%) scale(1.2) rotateY(180deg) !important;
    opacity: 0 !important;
    z-index: 100 !important;
    filter: blur(20px) !important;
  }

  .card-content {
    padding: 2.2rem;
  }

  .theme-icon {
    font-size: 4rem;
  }

  .theme-name {
    font-size: 1.35rem;
  }

  .navigation-controls {
    gap: 1.2rem;
  }

  .nav-arrow {
    width: 46px;
    height: 46px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
  }

  .about-content {
    padding: 2rem 1.5rem;
  }

  .algorithm-list li {
    flex-direction: column;
    gap: 0.7rem;
  }
}
</style>
