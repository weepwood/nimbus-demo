# Nimbus Studio 设计系统 v1

## 目标

建立介于 Cloudflare Developers 的信息密度与 Fumadocs 的组件精致度之间的视觉语言：克制、快速、可访问、可持续维护。这里使用 **Nimbus Studio 独立品牌**，不冒充 Cloudflare。

## 颜色

| 语义 | Light | Dark | 实际 Token |
|---|---|---|---|
| 页面背景 | `#fff` | `#141416` | `--nb-background` |
| 主要文字 | `#202124` | `#f5f5f4` | `--nb-foreground` |
| 面板 | `#fff` | `#1b1b1d` | `--nb-card` |
| 次级表面 | `#f8f8f7` | `#202023` | `--nb-muted` |
| 分隔线 | `#e9e8e5` | `#343437` | `--nb-border` |
| 品牌强调文字 | `#bd520c` | `#ffab70` | `--nb-brand` |
| 视觉标识橙 | `#f48120` | `#ff994a` | `--nd-orange` |

对比度：**不能假设**所有混色文本满足 WCAG AA；新增组件应在浏览器中分别验证 light/dark 和状态色。颜色不能成为唯一状态信号。

## 布局

- 桌面：固定顶栏（56px）、左侧 sidebar、主内容、右侧 TOC；文章正文最大约 48rem。
- 窄屏：隐藏桌面侧栏，提供可操作的移动导航；控制面板改为纵向；避免横向滚动。
- Header：导航文字 12–14px、品牌 17px、图标 16–18px。
- UI Panel：圆角约 10px、1px 分隔，主视觉靠层级/留白而不是大阴影。
- 文档阅读：尽量少嵌套卡片；标题间留明确垂直间隔；代码和宽表单独滚动。
- 顶部阅读进度条不参与布局高度，只作为视觉辅助，且不抢占键盘焦点。

## 字体

`src/styles/globals.css` 中的 `--nb-font-sans` 和 `--nb-font-mono` 为所有组件的主要来源。

- Inter Variable：拉丁文本与界面数字（当前项目使用 @fontsource-variable 本地包）。
- 中文：`Noto Sans CJK SC`、`PingFang SC`、`Microsoft YaHei` 等系统字体回退。
- JetBrains Mono Variable：终端、代码、配置路径及数据读取。
- 字重 400/500/600/700 够用；尽量避免中文大段使用 750 以上字重。
- 排版时优先用 rem，代码示例仍要支持水平滚动。

## 图标与交互

- 只采用同一套 `ph:` Phosphor 图标，SVG 继承 `currentColor`。
- 图标按钮必须有 `aria-label`，例如“阅读清单”“搜索”“切换主题”。
- 文档链接尽量是文字和图标组合，不使用抽象符号替代导航名称。
- 点击区域建议 >= 36px，并提供 `:focus-visible` 边框。
- 对话框沿用 Nimbus 原生 `<dialog>` 逻辑，Escape 关闭并正确管理焦点。
- 有异步动作时展示 loading/error/success；Clipboard 与 localStorage 权限失败必须提示。
- 禁止无控制的背景动画；所有装饰动画尊重 reduced-motion。

## 组件边界

| 组件文件 | 作用 |
|---|---|
| `src/components/Header.astro` | 品牌、全站搜索、基础导航与阅读清单入口 |
| `src/components/ui/*` | Nimbus Starter 自有组件源码 |
| `src/components/reading/ReadingActions.astro` | 收藏/分享/提交问题 |
| `src/components/reading/ReadingProgress.astro` | 仅文档正文显示的阅读进度 |
| `src/pages/reading-list.astro` | 本地收藏管理 |
| `src/pages/playground.astro` | 可交互的 UI 令牌实验 |
| `src/styles/globals.css` | 全局语义令牌、Tailwind 映射 |
| `src/styles/demo.css` | 品牌、首页与导航扩展 |
| `src/styles/lab.css` | 演示页面 |
| `src/styles/reading.css` | 文档阅读工具 |

## 验收时检查

移动端 320/375/768px、桌面 1024/1440px；浅色、深色；键盘 Tab/Shift+Tab、Enter、Escape、Ctrl/⌘+K；对表单错误使用 aria-live；阅读收藏开关正确反映 aria-pressed。

任何 CSS 调整只要影响全站，必须重复检查 Header、正文、代码块、Dialog、实验室和移动端菜单。

## 动效系统

动效从信息反馈出发而不是装饰：hover/press 140ms、层级切换 220ms、入场 340ms；统一用 `--nd-motion-*` 和 `--nd-ease-*` 令牌控制。

详细规范和实测清单见 [MOTION_SYSTEM.md](MOTION_SYSTEM.md)。需要调整动画时优先修改 `src/styles/motion.css`，不要为每个页面临时定义不同时间和缓动。
