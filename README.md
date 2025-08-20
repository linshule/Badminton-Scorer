# Badminton-Scorer 🏸

一个基于 Taro + React 开发的羽毛球计分小程序，支持多平台运行（微信小程序、H5、支付宝小程序等）。

## 📱 体验小程序

扫描下方二维码体验小程序：

![小程序码](gh_7f12f1a21ef4_1280.jpg) <!-- 请替换为实际的小程序码图片路径 -->

## ✨ 功能特性

- 🎯 **实时计分**：支持标准的羽毛球21分制计分规则
- 🔄 **撤销操作**：支持撤销上一步操作，防止误操作
- 🔁 **交换场地**：支持比赛中交换场地功能
- 🏆 **多局比赛**：支持多局比赛记录（胜局统计）
- 📱 **响应式设计**：适配不同屏幕尺寸
- 📳 **触觉反馈**：操作时提供震动反馈，提升用户体验
- 🎨 **美观界面**：现代化的渐变背景和简洁的UI设计

## 🎮 使用说明

### 基本操作
- **点击玩家区域**：为对应玩家加分
- **撤销按钮**：撤销上一次加分操作
- **交换按钮**：交换双方场地和比分
- **下一局按钮**：当前局结束后开始新的一局
- **重置按钮**：重置整个比赛（包括所有局数）

### 计分规则
- 标准21分制：先得21分且领先至少2分者获胜
- 最高30分：当比分为29-29时，先得30分者获胜
- 发球规则：得分方获得发球权，发球区域根据得分自动判断（左/右）

## 🛠️ 技术栈

- **框架**：Taro 4.1.5 (多端统一开发框架)
- **UI库**：React 18.0.0
- **语言**：TypeScript
- **构建工具**：Vite
- **代码规范**：ESLint + Stylelint + Commitlint

## 📦 安装与运行

### 环境要求
- Node.js >= 14
- npm 或 yarn

### 配置说明

由于 appid 涉及隐私，项目中的 `project.config.json` 文件未包含有效的 appid。运行前，请自行创建或配置该文件：

```json
{
  "miniprogramRoot": "./dist",
  "projectname": "Badminton-Scorer",
  "description": "简易羽毛球计分小程序",
  "appid": "your_appid_here", // 请替换为您自己的小程序 appid
  "setting": {
    "urlCheck": true,
    "es6": false,
    "enhance": false,
    "compileHotReLoad": false,
    "postcss": false,
    "minified": false
  },
  "compileType": "miniprogram"
}
```

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
# 微信小程序开发模式
npm run dev:weapp

# H5开发模式  
npm run dev:h5

# 其他平台开发模式
# npm run dev:alipay    # 支付宝小程序
# npm run dev:swan      # 百度小程序
# npm run dev:tt        # 字节跳动小程序
# npm run dev:qq        # QQ小程序
```

### 构建生产版本
```bash
# 微信小程序构建
npm run build:weapp

# H5构建
npm run build:h5

# 其他平台构建
# npm run build:alipay    # 支付宝小程序
# npm run build:swan      # 百度小程序
# npm run build:tt        # 字节跳动小程序
# npm run build:qq        # QQ小程序
```

## 📁 项目结构

```
Badminton-Scorer/
├── config/                 # 构建配置
│   ├── dev.ts             # 开发环境配置
│   ├── index.ts           # 主配置文件
│   └── prod.ts            # 生产环境配置
├── src/
│   ├── app.config.ts      # 应用配置
│   ├── app.css           # 全局样式
│   ├── app.ts            # 应用入口
│   ├── index.html        # HTML模板
│   └── pages/
│       └── index/        # 首页
│           ├── index.config.ts  # 页面配置
│           ├── index.css       # 页面样式
│           └── index.tsx       # 页面组件
├── types/                 # TypeScript类型定义
│   └── global.d.ts       # 全局类型
├── package.json          # 项目依赖
└── tsconfig.json        # TypeScript配置
```

## 🎯 核心功能实现

### 状态管理
使用 React useReducer 管理复杂的比赛状态，包括：
- 玩家得分和胜局数
- 当前发球方
- 操作历史记录（支持撤销）
- 获胜者状态

### 羽毛球规则实现
- 21分制计分逻辑
- 2分领先获胜规则
- 30分封顶规则
- 发球方和发球区域计算

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 

期待为这个项目做出贡献！

---

⭐ 如果这个项目对你有帮助，请给它一个 star！你的支持是我们持续更新的动力。
