# 迭代路线与决策记录

## 已完成：基础工程（2026-11-07）

- Nimbus Starter / Astro / MDX / Pagefind / Pages
- 站点与实验室、配置生成器、主题、统一 Phosphor 图标
- pnpm-lock、Typecheck、文档 lint、静态产物完整性测试

## 本轮：文档质量与阅读体验（2026-11-07）

- 参考 Cloudflare / Fumadocs / Starlight / Nextra / Mintlify 提炼结构原则
- 建立独立的设计规范、研究记录、内容策略、架构和测试清单
- 阅读进度、收藏/移除/清空、复制链接、GitHub Issue 反馈
- API OpenAPI 3.1 静态契约与构建检查
- 每周 GitHub Actions 文档健康检查、每月 GitHub Actions 非破坏性 Dependabot PR 与 npm 兼容性人工审查 与可复用的反馈模板
- 任务式侧栏（开始使用 / 组件设计 / 交互演示 / 参考资料）

## 本轮：动效与交互完善（2026-11-07）

- Motion Token 体系、按压/悬停/搜索/菜单动画，滚动入场
- 首页真实可点击的文档预览操作
- API Lab 取消请求、过期响应保护与超时文案
- Playground 可重播、可中断的 WAAPI 动画
- 阅读进度 transform 化、长文回到顶部
- Astro ClientRouter 生命周期清理与 Reduced Motion 策略

## 下一轮候选 P1（未实现）

1. 浏览器截图与交互 E2E：优先用 Playwright 固定环境建立 375/1440px 两组基线。
2. 文档链接细化：验证锚点、资源加载和 SEO。
3. 无障碍审计：axe-core 或 Lighthouse，键盘与色彩对比补测。
4. 真实 API Reference：使用 Nimbus api-reference recipe 基于 OpenAPI 生成 endpoint 页面，避免与现有静态示例冲突。
5. 文档版本与多语言：只有能维护翻译与版本目录时才开放切换。

## 不在当前范围

- 真实用户数据库、注册登录、付费或云同步
- 任意网址代理或可发送敏感凭据的 API Console
- 自动化把第三方文档全文镜像到仓库
- 承诺 ChatGPT 会在对话结束后自行持续修改代码

## 迭代门禁

每轮都必须：
1. 记录需求与设计取舍。
2. 提交实际代码与对应文档。
3. 自动构建、内容 lint、产物测试全部通过。
4. 部署成功、报告 commit SHA 与测试证据。
5. 更新 CHANGELOG；未实现内容只进入候选清单。
