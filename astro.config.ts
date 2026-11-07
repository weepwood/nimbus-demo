import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";

const nimbusConfig = defineNimbusConfig({
  // Canonical origin is separate from the GitHub Pages project base.
  site: "https://weepwood.github.io",
  title: "Nimbus Studio",
  description: "探索 Cloudflare Nimbus：组件、代码示例、交互工具与开发者文档",
  locale: "zh-CN",
  github: "https://github.com/weepwood/nimbus-demo",
  socialImage: "/social.svg",
  socialImageAlt: "Nimbus Studio developer documentation and interactive demos",
  editPattern: "https://github.com/weepwood/nimbus-demo/edit/main/{path}",
  // The home page leads the sidebar; every other page joins it automatically.
  sidebar: {
    items: [
      "index",
      {
        label: "入门与写作",
        icon: "ph:rocket-launch",
        collapsed: false,
        items: ["quickstart", "tutorial", "writing-pages", "faq"],
      },
      {
        label: "组件与体验",
        icon: "ph:squares-four",
        collapsed: false,
        items: ["components", "theme", "patterns", "search-guide", "reading-list-guide"],
      },
      {
        label: "交互演示",
        icon: "ph:flask",
        collapsed: false,
        items: [
          "showcase",
          { label: "UI 组件实验室", link: "/playground/" },
          { label: "API 请求实验室", link: "/api-lab/" },
          { label: "配置生成器", link: "/configurator/" },
          { label: "我的阅读清单", link: "/reading-list/" },
        ],
      },
      {
        label: "参考与更新",
        icon: "ph:code",
        collapsed: false,
        items: ["api-reference", "architecture", "research", "changelog", "deploy"],
      },
    ],
  },
});

export default defineConfig({
  site: "https://weepwood.github.io",
  base: "/nimbus-demo",
  // nimbus:adapter
  output: "static",
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss()],
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      // Authoring rules are opt-in by design — your repo, your taste. The
      // two below are the load-bearing pair: frontmatter has to validate
      // against the content schema for the page to render properly, and
      // broken internal links are 404s for your readers. Add the others
      // (heading hierarchy, code-block language, style, etc.) when you're
      // ready to enforce them — see `nimbus-docs lint --help`.
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      markdown: {
        // Wrap wide tables so they scroll instead of overflowing the page
        // (styled by `.nb-table-scroll` in src/styles/prose.css).
        hastPlugins: [tableScroll()],
        // `## Install {#install}` gives a heading a fixed id. A heading that
        // ends in other `{…}` text, such as `{account_id}` in a .md file, is
        // read as attributes too; remove this to keep it as text.
        features: { headingAttributes: true },
      },
    }),
  ],
});
