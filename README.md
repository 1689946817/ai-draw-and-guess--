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

## GitHub Pages 部署指南

本文档记录了将项目部署到 GitHub Pages 的完整流程，以及解决过程中遇到的关键问题。

### 部署步骤

1. 安装部署工具
```bash
npm install gh-pages --save-dev
```

2. 在 `package.json` 中添加部署脚本
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. 修改 `vite.config.ts` 中的基础路径配置
```typescript
export default defineConfig({
  base: './',  // 这一步很关键！确保资源使用相对路径
  // ...其他配置
})
```

4. 执行部署命令
```bash
npm run deploy
```

5. 在 GitHub 仓库设置中:
   - 进入 Settings > Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "gh-pages" 分支
   - 点击 Save

### 部署问题解析

在部署过程中，我们遇到了以下关键问题：

1. 初次部署失败的原因：
   - 没有使用专门的部署工具（gh-pages）
   - 资源路径配置不正确（没有设置 base: './'）
   - 手动管理分支容易出错
   - 部署流程不规范

2. 最终成功的关键因素：
   - 使用 gh-pages 工具自动管理部署
   - 正确配置资源基础路径（base: './'）
   - 规范化的部署流程（npm run deploy）
   - 工具自动处理 gh-pages 分支

### 参考资料

- [GitHub Pages 部署教程](https://blog.csdn.net/qq_20042935/article/details/133920722)
- [Vue项目部署到 GitHub Pages](https://blog.csdn.net/zuo_kaizheng/article/details/121659587)

### 维护说明

后续如需更新网站内容：

1. 本地修改代码
2. 运行 `npm run deploy` 命令
3. 等待几分钟后访问 GitHub Pages 地址即可看到更新

注意：部署后可能需要等待几分钟才能看到更新，这是正常现象。

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License