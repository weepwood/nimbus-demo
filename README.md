# Nimbus Demo

基于 [Cloudflare Nimbus](https://github.com/cloudflare/nimbus) 与 [Astro](https://astro.build/) 构建的中文开发者文档演示站点。项目从 Nimbus 官方 `template` Starter（templates-v0.8.3）初始化，保留框架自带导航、Pagefind 搜索、MDX、暗色主题、文档目录和 Agent 友好的 Markdown 输出。

**在线地址（需启用 GitHub Pages）：** https://weepwood.github.io/nimbus-demo/

## 技术栈

- Astro 7、Nimbus 0.19.3、MDX
- Tailwind CSS 4、TypeScript、CSS Variables
- Pagefind 文档搜索，Shiki 高亮，Nimbus 内置 MDX 组件
- GitHub Actions：代码检查、构建与 Pages 部署

## 开发

要求 Node.js **22.23.4+**，建议 Node.js 24 和 pnpm 10。

```bash
corepack enable
pnpm install
pnpm dev
```

访问 Astro 输出的本地地址。此演示配置了 `base: "/nimbus-demo"`，本地路径也包含该前缀。

```bash
pnpm run typecheck
pnpm run build
pnpm run lint:docs
pnpm run preview
```

> 第一次安装时会生成 pnpm-lock.yaml；建议将其提交以便后续构建可复现。本仓库的 CI 当前以非冻结模式安装依赖。

## 演示内容

| 页面 | 内容 |
|---|---|
| 首页 | Nimbus 视觉展示与文档入口 |
| 快速开始 | 安装、运行与修改首页 |
| 组件展厅 | Aside、Steps、Tabs、Card、PackageManagers |
| 设计系统 | OKLCH、语义 Token、明暗主题 |
| 文档写作 | Frontmatter、MDX 与 Partial |
| 架构解析 | 内容集合、Astro 构建与输出机制 |
| 部署指南 | GitHub Pages 与静态部署 |

## GitHub Pages

仓库的 `.github/workflows/deploy.yml` 会在推送 main 后进行 Pages 构建与发布。首次使用请到仓库 **Settings → Pages → Build and deployment → GitHub Actions** 启用发布方式。若 GitHub Actions 或 Pages 权限受限制，请先在仓库设置中允许它们。

站点域名和子路径集中配置在 `astro.config.ts`。自定义域名或迁移部署平台时需要同步修改站点 URL、`base` 和演示页链接。

## 来源和授权

- [cloudflare/nimbus](https://github.com/cloudflare/nimbus) — MIT License
- 官方 Starter 的可修改源代码被纳入此仓库，后续演示页与主题样式为本项目定制。
- 本仓库 `LICENSE` 沿用 Nimbus 的 MIT 授权文本；第三方依赖各自遵循其许可证。

该项目是个人技术展示，与 Cloudflare 官方没有关联。
