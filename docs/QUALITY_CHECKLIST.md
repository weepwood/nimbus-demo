# 质量验收与回归测试清单

记录最后更新：2026-11-07。

## 自动化（GitHub Actions 强制）

- [ ] pnpm 锁文件冻结安装成功
- [ ] Astro 检查：没有 TypeScript 或 MDX 错误
- [ ] Nimbus 文档 lint：frontmatter / internal-link 通过
- [ ] 页面预渲染：首页、文档、实验室、收藏列表均生成
- [ ] 站内链接不脱离项目 `/nimbus-demo` base
- [ ] Pagefind 搜索静态入口、robots、sitemap、llms 路由生成
- [ ] `openapi.json` 语法正确，描述的三个 GET 端点与 Fixture 存在、字段一致
- [ ] 关键 SEO canonical 与基本 HTML 结构存在
- [ ] CI 成功且 GitHub Pages deploy job 成功

## 手动（必须在真实浏览器确认）

按 320、375、768、1024、1440px 宽度观察浅色与深色：

- [ ] Header 不遮挡正文；导航、搜索和菜单不横向溢出
- [ ] Docs sidebar 固定，目录滚动和 active 状态正确
- [ ] Ctrl/⌘+K 打开搜索；键盘上下选择；Esc 关闭，焦点恢复
- [ ] Tab/Shift+Tab 可以访问收藏、链接复制、GitHub 问题入口
- [ ] 阅读进度随文章滚动，短文也不误报超过 100%
- [ ] 收藏本页 → 阅读清单显示 → 移除/清空 → 按钮状态更新
- [ ] 浏览器 localStorage 禁用时展示失败提示
- [ ] API Lab 访问 3 个 endpoint，状态码/耗时/JSON 正确；断网失败有提示
- [ ] 配置生成器输入域名、base、仓库后导出代码，错误输入被阻止
- [ ] 开启 prefers-reduced-motion，没有强制滚动动画
- [ ] 移动端触摸 target、代码横向滚动与宽表格不超出视口
- [ ] 真实视觉截图无异常裁切、乱码、字体替换或对比度不足

## 文档核验

- [ ] 快速开始可从零克隆、安装、运行到预览
- [ ] API 文档说明了静态 Fixture 的边界
- [ ] 设计规范与实际 CSS token 一致
- [ ] 更新日志只列已经发布的功能
- [ ] 外部参考链接可访问，相关授权归属明确

自动测试无法替代此页的手工视觉/键盘验收；完成一项后应附浏览器、系统、日期、截图或 Issue 链接。
