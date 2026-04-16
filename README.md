# XBTI - 程序员人格测试

基于 SBTI（Super Brain Trust Initiative）的程序员人格测试系统，通过 11 道题目评估你在 AI 时代的程序员类型。

## 🎯 测试人格类型

- **全栈瑞士军刀** - 多面手，什么都会
- **Vibe Coding 大师** - 凭感觉编程
- **反蒸馏专家** - 拒绝 AI 封装
- **同事.skill** - 比同事更可靠
- **码奸** - AI 核心研发人员
- **技能蒸馏师** - 将知识封装为 Skill
- **古法编程大师** - 坚持传统开发方式
- **智能体指挥官** - 指挥 AI Agent 集群
- **已死的前端兄弟** - 被 AI 淘汰的程序员
- **量子态 Bug 猎人** - 同时存在于多个 Bug 中
- **高价值监督者** - 高成本但必要的监督
- **AI 擦屁股工程师** - 专门修复 AI 生成的代码

## 🚀 部署到 GitHub Pages

### 方法一：使用 GitHub Actions（推荐）

1. 推送代码到 master 分支，自动触发部署
2. 或在 GitHub Actions 中手动触发 "Deploy to GitHub Pages"

访问地址：`https://sigpanic.github.io/XBTI/`

### 方法二：本地部署

```bash
# 安装依赖
npm install

# 构建并部署
npm run deploy
```

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📊 测试结果分布

经过 1,771,470,000 种答案组合的验证，12 个人格类型的分布符合预期：
- 平均百分比：8.33%
- 标准差：5.10
- 最大占比：16.60%（全栈瑞士军刀）
- 最小占比：1.13%（AI 擦屁股工程师）

## 📝 技术栈

- Vue 3 + Vite
- TypeScript
- Pinia（状态管理）
- Vue Router（路由）
- ECharts（数据可视化）

## 📄 许可证

MIT
