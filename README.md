# AI 你画我猜

一个基于智谱 AI GLM-4V 的画图猜测游戏。通过智能 AI 技术，实现实时图像识别和猜测功能。

## 功能特点

- 支持自由绘画：使用鼠标在画布上自由绘制
- 支持图片上传：可以上传本地图片进行识别
- AI 智能识别：使用智谱 AI GLM-4V 模型进行实时图像识别
- 历史记录查看：保存并展示历史游戏记录
- 清晰的用户界面：简洁直观的操作体验

## 运行步骤

1. 配置环境变量
   创建 `.env` 文件并添加:
   ```
   VITE_ZHIPU_API_KEY=your_apikey
   ```
   注意：需要在[智谱 AI 开放平台](https://open.bigmodel.cn/)申请 API Key

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动服务
   ```bash
   npm run dev
   ```
   启动后访问 http://localhost:5173

4. 构建生产版本
   ```bash
   npm run build
   ```

## 技术栈

- React：用于构建用户界面
- TypeScript：提供类型安全
- Vite：现代前端构建工具
- Canvas API：实现绘画功能
- 智谱 AI GLM-4V：提供图像识别能力

## 项目结构

```
├── src/
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 入口文件
│   ├── index.css        # 全局样式
│   └── env.d.ts         # 环境变量类型声明
├── public/              # 静态资源
├── index.html           # HTML 模板
└── package.json         # 项目配置
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License