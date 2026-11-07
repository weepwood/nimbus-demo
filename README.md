# Nimbus Studio · 基于 Cloudflare Nimbus 的交互式文档演示

基于 [Cloudflare Nimbus](https://github.com/cloudflare/nimbus) 与 [Astro](https://astro.build/) 构建的中文开发者文档与交互体验站点。项目从 Nimbus 官方 `template` Starter（templates-v0.8.3）初始化，保留框架自带导航、Pagefind 搜索、MDX、暗色主题、文档目录和 Agent 友好的 Markdown 输出。

**在线站点：** https://weepwood.github.io/nimbus-demo/

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
pnpm run check
pnpm run preview
```

项目已提交 `pnpm-lock.yaml`，CI 使用 `pnpm install --frozen-lockfile`。更新依赖时请同步提交锁文件。

## 演示内容

| 页面 | 内容 |
|---|---|
| 首页 | Cloudflare 风格的独立品牌、功能导航与文档体验预览 |
| 快速开始 | 安装、运行与修改首页 |
| 组件展厅 | Aside、Steps、Tabs、Card、PackageManagers |
| 项目配置生成器 | 实时编辑、校验、复制及下载 Astro 配置 |
| 交互组件实验室 | 切换强调色、圆角、布局密度和字体、导出 CSS、测试状态反馈 |
| API 请求实验室 | 对公开静态 JSON 端点执行真实 GET、查看状态码、耗时、响应与异常 |
| 功能演示中心 | 所有可运行示例入口，按能力分类 |
| 文档模式 | 完整的安装、Tabs、Badge、Collapsible 与 API 示例 |
| 搜索与信息架构 | Pagefind 构建、键盘快捷键与内容组织建议 |
| 常见问题 | 路由、搜索、部署和主题排查 |
| 设计系统 | OKLCH、语义 Token、明暗主题 |
| 文档写作 | Frontmatter、MDX 与 Partial |
| 架构解析 | 内容集合、Astro 构建与输出机制 |
| 部署指南 | GitHub Pages 与静态部署 |

## GitHub Pages

仓库的 `.github/workflows/deploy.yml` 会在推送 main 后进行 Pages 构建与发布。首次使用请到仓库 **Settings → Pages → Build and deployment → GitHub Actions** 启用发布方式。若 GitHub Actions 或 Pages 权限受限制，请先在仓库设置中允许它们。

站点域名和子路径集中配置在 `astro.config.ts`。Nimbus MDX 中的逻辑链接无需手动添加 `base`，独立 Astro 页面则使用 `withBase`。自定义域名或迁移部署平台时需要同步修改站点 URL 与 `base`，并执行 `pnpm run check` 校验产物。

## 来源和授权

- [cloudflare/nimbus](https://github.com/cloudflare/nimbus) — MIT License
- 官方 Starter 的可修改源代码被纳入此仓库，后续演示页与主题样式为本项目定制。
- 本仓库 `LICENSE` 沿用 Nimbus 的 MIT 授权文本；第三方依赖各自遵循其许可证。

该项目是个人技术展示，与 Cloudflare 官方没有关联。

## 新增实际功能

- `/showcase/` — 查看所有示例功能
- `/playground/` — 交互式 UI 设计令牌实验室，配色、密度、圆角、字体与复制代码
- `/api-lab/` — 对本网站 3 个公开 JSON 静态接口发起真实 fetch 请求。**这不是线上业务 API，也不连接数据库。**
- `/configurator/` — Astro/Nimbus 配置生成器
- `/components/`、`/patterns/` — Nimbus UI 和文档模式示例

视觉设计采用云平台开发者文档常见的橙灰配色与高信息密度原则，但使用独立的 Nimbus Studio 标识，不代表 Cloudflare 官方产品。

## 文档与设计资源

- [竞品对照与设计决策](docs/RESEARCH.md)：Cloudflare / Fumadocs / Starlight / Nextra / Mintlify
- [设计系统](docs/DESIGN_SYSTEM.md)：语义色彩、字体、图标、响应式、无障碍
- [内容组织规范](docs/CONTENT_STRATEGY.md)：Overview、Quickstart、How-to、Reference、Troubleshooting
- [项目架构](docs/ARCHITECTURE.md)：构建、导航、API Fixture 与隐私边界
- [质量验收清单](docs/QUALITY_CHECKLIST.md)：自动与手工测试矩阵
- [迭代计划](docs/ROADMAP.md)：已实现和候选事项
- [项目更新日志](CHANGELOG.md)：发布能力与已知限制

## 阅读工具与 API 规范

- `/reading-list/`：使用浏览器本地存储管理收藏；不会同步到后端
- 文档页底部：收藏、复制链接、通过 GitHub Issue 反馈问题
- `/api-reference/`：三个公开静态 JSON 端点的文档
- `/openapi.json`：OpenAPI 3.1 规格文件

## 持续迭代机制

- `.github/workflows/weekly-audit.yml`：每周自动重新执行 `pnpm run check`，记录静态站点健康情况。定时检查**不会自动修改或部署代码**。
- `.github/dependabot.yml`：每月检查 npm 与 GitHub Actions 依赖更新，生成 PR 供审查，不自动合并。
- [功能 Bug 反馈](https://github.com/weepwood/nimbus-demo/issues/new/choose) 和 [设计体验反馈](https://github.com/weepwood/nimbus-demo/issues/new/choose)：提供可复现步骤、浏览器和截图。
- `.github/PULL_REQUEST_TEMPLATE.md`：统一功能、视觉、文档和回归验收要求。

注意：CI/Pages 成功不能代替真实浏览器下的 UI 截图、无障碍和交互验收；手动测试结果请记录在 Issue 或验收文档中。
