# Nimbus Studio 动效与交互规范 · Motion System v1

> 更新时间：2026-11-07。采用轻量 CSS + Web Animations API，不引入额外动画框架。

## 设计目标

动画应回答：**发生了什么？界面响应了吗？内容去哪里了？**

避免“为了动而动”，优先反馈、空间连续性和可中断性，再考虑装饰效果。动画不能遮挡关键内容、延迟操作或者替代语义状态提示。

## 动效令牌

位于 `src/styles/motion.css`：

| 语义 | 默认值 | 适用场景 |
|---|---:|---|
| `--nd-motion-fast` | 140ms | Hover、按压、焦点和图标 |
| `--nd-motion-normal` | 220ms | 菜单、Modal 入场、Tabs 切换 |
| `--nd-motion-slow` | 340ms | 滚动入场与轻量布局变化 |
| `--nd-ease-out` | `cubic-bezier(.22,1,.36,1)` | 短距离进入 |
| `--nd-ease-standard` | `cubic-bezier(.2,.7,.2,1)` | 色彩/圆角/表面状态 |
| `--nd-ease-in-out` | `cubic-bezier(.65,0,.35,1)` | 双向状态转换 |

原则：进入更快趋近终点、状态更新更稳定；不使用大范围视差、无限循环闪烁或过度弹簧振荡。

## 实现矩阵

| 场景 | 行为 | 意图 | 降级 |
|---|---|---|---|
| 首页功能卡片 | 轻微抬升、图标偏移 | 让可点击性明确 | Touch 取消 hover 位移 |
| 主要按钮 | 轻按压缩放、图标移动 | 确认输入已被接受 | Reduced motion 直接切换状态 |
| 顶部导航 | 文本/边线颜色过渡 | 保持当前区域可辨 | 仍保留清晰的当前页样式 |
| 移动端菜单 | 6px 下移展开 | 表示层级进入 | 原生 `details` 即时打开 |
| 搜索弹窗 | 轻量缩放与淡入 | 聚焦搜索任务 | 原生 `dialog` 与键盘操作不变 |
| Tabs | 新内容 5px 淡入 | 呈现切换范围 | 无动画时仍切换可见内容 |
| 阅读进度 | `transform:scaleX()` | 显示文章阅读位置 | Reduced motion 保留数值位置，不增加补间 |
| 回到顶部 | 仅滚动后出现 | 长文导航 | Reduced motion 使用瞬时 `scrollTo` |
| API 请求 | 请求中状态、取消、错误/成功反馈 | 真实数据获取过程 | 文字状态优先于 shimmer |
| UI 组件实验室 | 140/220/360ms，可重复播放 | 学习不同响应速度 | Reduced motion 时跳过 Web Animations API |
| 首屏下方的内容 | 渐进式入场 | 帮助定位新模块 | 无 JS / reduced motion 时始终可见 |

## 可靠性与性能约束

1. 优先仅使用 `transform` 和 `opacity`，避免用 `width` 或频繁测量推动动画。阅读进度已从逐帧设置宽度改为 `scaleX`。
2. `IntersectionObserver` 仅针对初始视口外元素标注 pending；**未启用 JS、浏览器不支持 IO 或开启 Reduced Motion 时，内容保持可见**。
3. 不在触摸设备依赖 hover 位移传达状态；所有操作必须仍可点击/键盘访问。
4. 通过 Nimbus 的 `mount()` 生命周期注册事件并卸载：Astro ClientRouter 页面切换后，不残留旧页面监听器。
5. API Lab 的请求具有唯一 generation token；切换端点、取消请求或离开页面都会 `abort()`。旧请求即使迟到，也不会覆盖当前结果。
6. WAAPI 在再次触发播放前 `animation.cancel()`；移除页面时也取消。不能创建不可中断的动画队列。
7. 搜索和导航优先使用原生 `dialog`/`details` 和已有 Nimbus 语义，而非人为封装新焦点陷阱。
8. 不使用色彩作为唯一完成或错误信号；文本用 `role=status` / `aria-live` 表示结果。
9. 全部新增 CSS 动效包在 `prefers-reduced-motion: no-preference` 中，或通过 `prefers-reduced-motion: reduce` 明确关闭；动态效果试验额外检查 `matchMedia`。

## 文档与页面测试

- 首页预览里的搜索能真正打开 SearchDialog；模拟侧栏是实际链接；复制命令会调用 Clipboard API。
- API Lab：改变端点后旧请求被废弃；取消后显示 CANCELLED；超时显示 TIMEOUT；失败和成功文本可区分。
- Playground：重复播放不会累积动画；选择快速/标准/舒缓时 CSS 输出同步；系统启用减少动态效果时不播放。
- 长文：回到顶部只在滚动足够远后出现，按键可以触发；阅读进度不会随内容图片加载计算失真。
- 站点导航：`details` 菜单可以通过 Escape 或点击外部关闭，Escape 会将焦点返回 Summary。
- 375/768/1440px、明暗主题、键盘 Tab/Shift+Tab、Reduce Motion 下手动检查交互结果。

## 注意事项

静态构建和链接测试能确认组件存在、路由正确，但不能替代浏览器端动效时间线、焦点恢复、滚动性能或视觉回归。需要在真实 Chrome / Firefox / Safari 做交互验收，并以 Issue 记录异常。
