# 技术架构与数据边界

## 项目目标

Nimbus Studio 是一个 **静态生成的开发者文档 + 交互工具演示**。不需要真实数据库、服务器登录、用户身份认证即可运行。文档和交互工具都可以直接交付到 GitHub Pages。

## 构建路径

```text
src/content/docs/*.mdx        src/pages/*.astro
          │                          │
          └────────────┬─────────────┘
                       ▼
             Astro + Nimbus 0.19.3
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   静态 HTML       Pagefind 索引    AI Markdown 索引
        │              │              │
        └──────────────┴──────────────┘
                       ▼
                    dist/
                       │
      GitHub Actions: check + build + lint + smoke
                       ▼
                  GitHub Pages
```

## 层次与所有权

- Nimbus npm 包：Astro integration、content schemas、URL 处理、AI 页面路由。
- 仓库内组件：`src/components/ui`、`src/layouts`、`src/styles`，这些由项目维护。
- 内容：`src/content/docs` 的 MDX；演示文档不依赖外部数据库。
- 实验室：`src/pages/playground.astro` 和 `src/pages/configurator.astro` 的浏览器本地状态。
- API Lab：`src/pages/api-lab.astro` 的真实 fetch，但数据来自三个静态端点。
- API 契约：`public/openapi.json`，用于描述三个 GET 响应。
- 收藏：`src/lib/reading-list.ts` 中的 localStorage 读写和验证，记录不离开用户浏览器。
- 文档反馈：跳转 GitHub Issue 预填页面 URL；本站无自动收集功能。

## 部署与限制

- Astro `site` 是 https://weepwood.github.io，`base` 是 `/nimbus-demo`。
- 页面内 MDX 链接由 Nimbus 处理 `base`；自定义 Astro 页面使用 `withBase`。
- GitHub Pages 交付静态资源，没有可接收 POST 的后端处理器。
- `/demo-api/status.json` 的 `ok=true` 是构建时 Fixture，不是服务器实时探活。

## 安全

- 客户端仅向本域名的允许列表 JSON 发 GET 请求，不接受任意网址作为 API 代理。
- 数据示例仅使用虚构用户，不放真实账号、身份信息或 Token。
- localStorage 写入失败时显示明确状态；使用前验证读取到的路径满足项目 base，杜绝以存储数据任意构造跳转。
- HTML 更新使用 `textContent` 和 `createElement`，不把存储内容作为未过滤 HTML 插入。
- 所有文档操作在浏览器交互后执行，不自动发起持久化或服务端动作。

## 构建与验收

```bash
pnpm install --frozen-lockfile
pnpm run check
```

check 串联 Astro 类型检查、静态构建、Nimbus 内容 lint 和产物链接/契约校验。部署工作流重复执行同一组检查。任何修改需看 GitHub Actions 是否完成，并验证实际发布的是目标 commit。

## 未来变更要求

如需接入真实后端，先完成身份验证、速率限制、环境变量和隐私声明的架构决策；如果要部署 OpenAPI 自动 Try it，需评估跨域授权与密钥传输安全，不应把 secret 放进静态网站 JS。
