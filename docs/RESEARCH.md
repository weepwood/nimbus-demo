# 文档框架设计研究与选型记录

> 研究日期：2026-11-07。目的：为 Nimbus Studio 建立可追踪的设计依据，而非复制其他项目的源码或品牌。

## 1. 竞品与参考资料

| 项目 | 官方入口 | 可借鉴的机制 | 本项目的落实方式 | 不采用的内容 |
|---|---|---|---|---|
| Cloudflare Developers | https://developers.cloudflare.com/style-guide/ | 以读者任务组织内容；Overview/Get started 的稳定分层；组件应服务于内容表达 | 从首页引导到快速开始、教程、参考及排障；文章保留目录、代码示例 | 不复制 Cloudflare 标志、UI 源码、专有内容 |
| Fumadocs | https://www.fumadocs.dev/docs/ui | 可定制文档布局、搜索框、可移植组件、章节导航 | Nimbus 自有 Astro 组件；组件和工具页面明确分类 | 不引入 React + Fumadocs UI，避免并行组件栈 |
| Starlight | https://starlight.astro.build/ | Astro 内容集合、无障碍、清晰文档结构、暗色主题 | 保留内容 Schema、文档校验、系统主题偏好 | 不叠加两套 Astro docs integration |
| Nextra | https://nextra.site/docs/docs-theme/start | 页面目录、上/下篇、搜索与 compact 文档导航 | 保留 Nimbus TOC、侧栏和 pagination；改进阅读体验 | 不引入 Next.js 与 Nextra |
| Mintlify | https://www.mintlify.com/library/developer-documentation-101 | 从入门到生产落地的文档路径：quickstart、how-to、reference、examples、troubleshooting、changelog | 建立分类导航、OpenAPI 契约、更新日志和内容写作规范 | 不宣称提供 Mintlify 托管协作与 AI 搜索服务 |
| Nimbus | https://nimbus-docs.com/registry/ | 组件作为仓库内源码；功能按需安装；AI 友好输出和 mdx lint | 保持 Nimbus 0.19.3、MDX、Pagefind、llms.txt，专注拓展用户拥有的代码 | 不直接复制独立示例而忽略许可 |

参考 Nimbus 侧栏规范：https://nimbus-docs.com/navigation/sidebar/ 。
参考 Cloudflare 信息架构：https://developers.cloudflare.com/style-guide/documentation-content-strategy/information-architecture/ 。

## 2. 关键结论

1. **首页是路由页，文档是任务页。** 首页简短介绍价值并给出明确入口；任务步骤与参数不要全部塞进首页。
2. **阅读速度比卡片数量重要。** 主内容列统一行宽；长页面提供目录、阅读进度和正文操作，避免装饰性容器把文本挤窄。
3. **搜索和导航互补。** 搜索负责跨内容检索，左侧树按工作任务组织；搜索必须可以键盘操作并可在生产预览中测试。
4. **样例要真实标注边界。** API Lab 使用网络 Fetch，但响应数据是静态 Fixture；收藏使用 localStorage 而非账号；明确写出以免误导。
5. **设计令牌统一改变。** 原则是先编辑语义色和排版，再改组件，最后加页面级样式。不要新建互不兼容的 CSS 变量体系。
6. **一套依赖即可。** Astro + Nimbus 已具备绝大部分文档布局能力；不应为了模仿某个项目再引入 React UI 全家桶。

## 3. 具体的设计原则

- 色彩：米白/深灰表面 + 极少量橙色强调。橙色标记可操作与当前选择，不作为大面积背景色。
- 密度：侧边栏紧凑，文章正文阅读友好，工具页面可以适当高密度。
- 版式：12px/14px/16px/24px/32px 的主要间距节奏，避免任意数字造成漂移。
- 字体：Inter Variable 用于 Latin；中文使用本机 PingFang SC / Microsoft YaHei / Noto Sans CJK SC 回退；JetBrains Mono 用于代码。
- 图标：统一使用 Iconify/Phosphor SVG，16px 用于按钮，20px 用于功能导航。
- 交互：支持 focus-visible、aria-live、可取消动画、prefers-reduced-motion；不以 hover 作为唯一入口。
- 状态：用户操作一定有实际结果反馈；没有后端或云同步时明确告知本地行为。

## 4. 本轮修改的验收标准

1. 主要路由均能在 GitHub Pages 的 `/nimbus-demo/` 子路径下正确访问。
2. 部署文件中存在 Pagefind 索引、llms.txt、OpenAPI 规格与三个 JSON Fixture。
3. 阅读清单能添加/删除、清空；禁止存储时错误可见。
4. 文档能复制链接和打开上下文 GitHub 反馈。
5. 编译类型、Nimbus 内容 lint、静态链接、API 契约全部通过；CI 与 Pages 结果成功。
6. Chrome、Firefox、Safari 的响应式视觉及键盘实测应当作为人工验收项，不能仅凭构建成功宣称完成。

## 5. 后续候选，不等于已实现

- 经标准 OpenAPI Schema 生成的 API Reference 和参数试用；需确认 Nimbus 0.19.x 配方接口。
- 文档多语言与版本选择器（涉及多套内容和翻译维护，不能只加入一个开关）。
- 可选的云端反馈/收藏；需要先设计身份认证、隐私声明和后端架构。
- Playwright 真实浏览器的截图差异检查；在 CI 引入时先处理字体、截图环境和 flakiness。

本文件记录设计依据与范围，新增功能要与项目的 `CHANGELOG.md`、`docs/QUALITY_CHECKLIST.md` 一并更新。
