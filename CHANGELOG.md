# Nimbus Studio 更新日志

本仓库公开的 Nimbus Studio 项目，用中文记录实际完成的功能和可验证的发布工作。日期按仓库提交日期记录。

## 2026-11-07 — 文档研究和阅读体验

- 新增阅读进度、收藏/移除/清空、本地阅读清单、复制链接和 GitHub Issue 反馈。
- 增加 OpenAPI 3.1 规格，用于描述三个静态演示 API。
- 提供竞品研究、设计规范、内容组织、架构、回归清单和迭代计划。
- 按阅读任务组织侧栏，修复固定导航定位与中文文案。
- 强化静态产物检查：验证 OpenAPI 文件、JSON 端点和页面链接。
- 增加每周静态质量巡检、GitHub Actions 非破坏性版本更新建议 PR 和反馈/PR 模板；npm 版本升级须兼容性审查。

## 2026-11-07 — Nimbus Studio 首轮产品化

- 首页采用独立橙灰视觉品牌，统一图标、字体与基础 Token。
- 添加组件实验室、API 请求实验室、配置生成器与文档示例。
- 接入 Astro 7、Nimbus 0.19.3、Pagefind 与 GitHub Pages。
- 使用 pnpm 锁文件，CI 自动进行类型检查、MDX lint、构建与静态页面验证。

## 范围声明

本站的请求示例使用静态 JSON Fixture，收藏功能只使用浏览器 localStorage；暂无后端数据库、用户登录、云端同步或跨设备收藏功能。有关计划中的功能，参阅 [docs/ROADMAP.md](docs/ROADMAP.md)。
