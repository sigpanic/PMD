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

### 生成你自己的主题

```bash
# 1. Clone 仓库
git clone git@github.com:sigpanic/XBTI.git
cd XBTI

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 告诉你的 AI Agent：
# "我想做一个 [你的主题] 人格测试，参考这个仓库的结构和验收标准"
# 
# AI 会自动生成：
# - 维度定义
# - 人格类型模板
# - 测评题目
# - 验证测试
```

---

## ✨ 核心特性

### 🎭 任意主题
从程序员到铲屎官，从社恐到社牛，只要你能定义，就能蒸馏

### 🧪 科学验证
基于向量空间模型和相似度匹配算法，确保结果准确可靠

### 🤖 AI 友好
提供完整的提示词模板和验收标准，AI 能自动生成完整测评

### 📊 开箱即用
内置 Vue 3 前端、自动化测试框架、GitHub Pages 部署配置

### 🔒 纯前端架构
纯前端运行，无需后端服务器。部署方便，隐私安全——所有测试数据都在本地处理，不会上传到任何服务器

---

## 📐 验收标准

仓库已提供完整的验收标准文档（`dev_test/test_rules.md`），每个生成的测评都必须通过严格的验证测试：

### 测试方法

1. **大规模枚举测试**
   - 生成所有可能的答案组合（例如 3^11 = 1,771,470 种）
   - 统计每个人格类型的分布比例
   - 验证是否所有类型都能被触发

2. **小规模随机测试**
   - 随机生成 20 条答案路径
   - 验证每条路径的结果是否合理
   - 确保题目选项与人格类型的映射关系正确

### 分布要求

| 指标 | 标准 |
|------|------|
| **平均值** | 100% ÷ 人格类型数量 |
| **波动范围** | 大部分类型在平均值 ±5% 内 |
| **最小值** | 允许有 1 个类型≥1%（稀有类型） |
| **最大值** | 不超过 30% |
| **全覆盖** | 100% 类型都能被触发 |

### 成功案例：程序员人格测试

- **人格类型**：12 种
- **总组合数**：1,771,470 种
- **平均分布**：8.33%
- **标准差**：5.10
- **最大占比**：16.60%（全栈瑞士军刀）
- **最小占比**：1.13%（AI 擦屁股工程师）
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

## 🎓 如何设计一个好的人格测试

### 正面设计原则

1. **从意义出发**
   - 每个人格类型都有明确的特点和实际场景
   - 维度全面覆盖目标领域的核心特征
   - 问题和选项能真实反映用户的选择

2. **接受不完美**
   - 分布不必绝对均匀
   - 允许稀有类型的存在（≥1% 即可）
   - 重点是人格类型的意义性，不是数据造假

3. **迭代优化**
   - 运行测试验证分布
   - 分析具体路径的合理性
   - 根据结果调整题目和模板

---

## 🔧 技术栈

- Vue 3 + Vite + TypeScript
- Pinia（状态管理）
- Vue Router（路由）
- ECharts（数据可视化）
- Element Plus（UI 组件）

---

## 📄 项目结构

```
XBTI/
├── src/                 # 源代码
│   ├── protocol/        # 协议层
│   ├── core/            # 核心引擎
│   ├── instance/        # 主题实例
│   ├── stores/          # 状态管理
│   └── views/           # Vue 组件
├── dev_test/            # 测试和验证工具
├── package.json
└── vite.config.js
```

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
