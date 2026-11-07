# 内容写作与信息架构规范

## 信息架构

参考 Cloudflare Style Guide 的稳定结构：https://developers.cloudflare.com/style-guide/documentation-content-strategy/information-architecture/

| 内容类型 | 读者问题 | 页面位置 |
|---|---|---|
| Overview | 这是什么？为什么使用？ | `/` |
| Get Started | 如何完成第一个可运行结果？ | `/quickstart/` |
| How-to | 如何实现某个具体目标？ | `/writing-pages/`、`/deploy/` |
| Concept | 这一机制为什么这样设计？ | `/architecture/`、`/theme/` |
| Reference | 参数、字段与行为是什么？ | `/api-reference/` |
| Examples | 我可以复制/运行什么？ | `/showcase/`、`/patterns/` |
| Troubleshooting | 为什么失败？怎么恢复？ | `/faq/` |
| Changelog | 最近改变了什么？ | `/changelog/` |

不要混用：一篇设计指南阐明取舍，一篇操作指南提供步骤；Reference 尽量完整中立。

## 文档最小 Frontmatter

```yaml
---
title: 有明确用途的页面标题
description: 描述读者将得到的结果
sidebar:
  order: 10
---
```

不要在一个目录内重复 `order` 但依赖其决定绝对顺序：若自定义 sidebar.items，遵从显式配置顺序。

## 文档结构模版

1. 开头一句直接说结果与前置条件。
2. 按照读者任务组织 H2，而不是用营销词。
3. 给出正确的代码、路径、输入和预期输出。
4. 明确失败场景和恢复动作；删掉无效截屏。
5. 提供指向下一步和相关参考的链接。
6. 区分真实 API 与模拟响应；模拟内容不能伪装为实时业务数据。

## 链接约定

在 MDX 中编写逻辑站内路径 `[组件](/components/)`；Nimbus 负责附加 `base`。在独立 Astro 页面使用 `withBase("/components/", import.meta.env.BASE_URL)`。**不要二次添加 `/nimbus-demo`**。

外部链接优先指向项目/文档官方网站，记载访问日期；避免把别的文档内容复制进仓库。

## MDX 组件规则

- Aside：警告、注意事项，不能成为正文唯一存储位置。
- Tabs：同一任务的不同平台版本，不用来隐藏不同主题。
- Steps：可验证的连续动作，每步都有结果。
- Code：给出完整命令、语言标注以及可能的执行环境。
- Card：用作导航或简短入口，而不是每个段落都装一张卡片。
- Collapsible：只包含补充内容，不隐藏关键步骤。

## 审核 checklist

- 标题可被搜索；描述明确。
- 代码路径和版本与仓库一致。
- 网络地址、命令、参数正确，样例可在当前环境执行。
- 注意隐私：不提交凭据，不做未披露的收集。
- 无障碍：图片 alt、图标 aria-label、tab 与按钮可键盘交互。
- lint:docs 与 verify:site 通过；新增 URL 已加入相关导航或入口。
