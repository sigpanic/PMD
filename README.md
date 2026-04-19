# PMD - Personality Model Distillation System

**人格蒸馏系统**

> Distill Personality, Understand Yourself
> 
> 蒸馏人格，理解自我

[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-brightgreen)](https://sigpanic.github.io/XBTI/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🎯 什么是 PMD

PMD（Personality Model Distillation）是一个**通用的人格测评生成系统**。

不想手动设计题目？没问题。**Clone 这个仓库，告诉 AI Agent 你想做什么主题的人格蒸馏，它会自动生成完整的测评系统。**

从程序员人格到游戏玩家定位，从铲屎官性格到社恐程度评估——只要你能想到主题，就能生成测评。

---

## 🚀 快速开始

### 在线体验

访问 [https://sigpanic.github.io/XBTI/](https://sigpanic.github.io/XBTI/) 立即测试

### 用 AI Agent 生成你的主题

```bash
# 1. Clone 仓库
git clone git@github.com:sigpanic/XBTI.git
cd XBTI

# 2. 安装依赖
npm install

# 3. 告诉你的 AI Agent：
# "我想做一个 [你的主题] 人格测试，请参考 prompts.md 文件"
# 
# AI 会：
# 1. 阅读项目协议和验收标准
# 2. 自动搜集相关信息和灵感
# 3. 生成完整的测评配置
# 4. 运行验证测试
# 5. 迭代优化直到通过验收
```

---

## ✨ 核心特性

### 🎭 任意主题
从程序员到铲屎官，从社恐到社牛，只要你能定义，就能蒸馏

### 🧪 科学验证
基于向量空间模型和相似度匹配算法，确保结果准确可靠

### 🤖 AI 友好
提供完整的提示词、协议定义和验收标准，AI 能自动生成完整测评

### 📊 开箱即用
内置 Vue 3 前端、自动化测试框架、GitHub Pages 部署配置

### 🔒 纯前端架构
纯前端运行，无需后端服务器。部署方便，隐私安全——所有测试数据都在本地处理，不会上传到任何服务器

---

## 📐 验证系统

仓库提供了一套完整的验证系统，确保每个测评既**分布合理**，又**路径解释有意义**：

### AI Agent 工作流

1. **阅读 `prompts.md`** - AI Agent 提示词和完整工作流指南
2. **Clone 仓库并启动开发环境**
3. **告诉 AI Agent**：我想做一个 [你的主题] 人格测试，请参考 prompts.md
4. **AI 自动完成**：
   - 阅读 `src/protocol/types.ts` 理解数据结构
   - 阅读 `src/instance/programmerTest.ts` 学习完整配置
   - 搜集相关领域的信息和灵感
   - 设计维度、人格类型、题目
   - 为每个选项补充 `evidence`（显式支持/冲突哪些人格）
   - 为每个人格写 1 条 `acceptanceCase`（典型用户路径）
   - 运行大规模枚举测试验证分布
   - 运行验收案例验证结果语义
   - 迭代优化直到通过验收

### 测评方法

1. **大规模枚举测试**：生成所有可能的答案组合，统计分布比例（智能剪枝优化）
2. **验收案例测试**：运行配置中定义的典型路径，验证每条路径的结果是否符合预期
3. **小规模随机测试**：随机生成 20 条路径，辅助人工 spot check

### 验收标准

| 指标 | 标准 |
|------|------|
| **全覆盖** | 100% 类型都必须能被触发 |
| **最大值** | ≤25% |
| **稀有类型** | `<1%` 的人格数量不能超过总人格数的 25% |
| **标准差** | ≤7 |
| **路径语义** | 100% `acceptanceCases` 必须命中预期人格 |

### 成功案例

**程序员人格测试：**
- 人格类型：12 种
- 总组合数：1,594,323
- 平均分布：8.33%
- 标准差：5.77
- 最大占比：16.53%（码奸）
- 稀有类型：3 个（均有专属验收案例）
- 验收案例：12/12 命中
- ✅ 所有验收标准通过

---

## 🛠️ 已实现的主题

### 1. 程序员人格测试
评估 AI 时代程序员的定位和竞争力

**12 种人格类型**：
- 全栈瑞士军刀 - AI 是我的技能外挂
- Vibe Coding 大师 - 我不写代码，我 vibe
- 已死的前端兄弟 - 我不需要 AI，我只要 jQuery
- AI 擦屁股工程师 - AI 生成代码，我来擦屁股
- 码奸 - 我是码奸，我骄傲
- 技能蒸馏师 - 知识就是力量，蒸馏就是魔法
- ... 更多

### 2. 王者荣耀人格测试
峡谷玩家定位评估

**8 种人格类型**：
- 祖安皇帝 - 我喷故我在
- 团队核心 - 团队第一，个人第二
- 操作怪 - 秀就完事了
- 战术大师 - 智商碾压
- ... 更多

---

## 📄 项目结构

```
XBTI/
├── src/
│   ├── protocol/        # 协议层和引擎
│   ├── core/            # 通用测评核心
│   ├── instance/        # 测评配置（程序员、王者等）
│   ├── stores/          # 状态管理
│   └── views/           # Vue 组件
├── scripts/
│   ├── validate.js      # AI Agent 验证脚本
│   └── validate-all.mjs # CI 批量验证
├── .github/
│   └── workflows/
│       └── validate.yml # CI 自动验证
├── prompts.md           # AI Agent 提示词
└── dev_test/            # 开发临时测试
```

---

## 🔧 技术栈

- Vue 3 + Vite + TypeScript
- Pinia（状态管理）
- Vue Router（路由）
- ECharts（数据可视化）
- Element Plus（UI 组件）

---

## 📝 License

MIT License

---

## 📬 联系方式

- **GitHub**: [@sigpanic](https://github.com/sigpanic)
- **项目地址**: [https://github.com/sigpanic/XBTI](https://github.com/sigpanic/XBTI)
- **在线演示**: [https://sigpanic.github.io/XBTI/](https://sigpanic.github.io/XBTI/)

---

**PMD - 蒸馏人格，理解自我**

*Distill Personality, Understand Yourself*
