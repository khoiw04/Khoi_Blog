// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import playformInline from "@playform/inline";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import rehypeCleanup from "./src/plugins/rehype-cleanup.mjs";
import remarkEmbeddedMedia from "./src/plugins/remark-embedded-media.mjs";
import rehypeAddButtonClass from "./src/plugins/rehype-add-button-class.js";
import rehypeImageProcessor from "./src/plugins/rehype-image-processor.mjs";
import rehypeAstroRelativeLinks from "./src/plugins/rehype-astro-relative-links.js";
import rehypeOlStartCounter from "./src/plugins/rehype-ol-start-counter.ts";
import remarkGridColumnClass from "./src/plugins/remark-grid-column-class.ts";
import remarkAdmonitions from "./src/plugins/remark-admonitions.mjs";
import remarkCollapse from "./src/plugins/remark-collapse.ts";
import rehypeArrows from "./src/plugins/rehype-arrows-replace.ts";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";

import expressiveCode from "astro-expressive-code";
import { imageConfig } from "./src/lib/image-config.js";
import { themeConfig } from "./src/config.js";

const plugins = {
  remarkPlugins: [
    remarkDirective,
    remarkGridColumnClass,
    remarkAdmonitions,
    remarkEmbeddedMedia,
    remarkCollapse,
    remarkMath,
  ],
  rehypePlugins: [
    rehypeKatex,
    rehypeArrows,
    rehypeCleanup,
    rehypeOlStartCounter,
    rehypeImageProcessor,
    rehypeAddButtonClass,
    rehypeAstroRelativeLinks,
  ],
};

// https://astro.build/config
export default defineConfig({
  site: themeConfig.site.website,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
      wrap: false,
    },
    ...plugins,
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: imageConfig,
    },
  },
  integrations: [
    playformInline({
      Exclude: [(file) => file.toLowerCase().includes("katex")],
    }),
    expressiveCode(),
    mdx({
      ...plugins,
    }),
    sitemap({
      filter: (page) => !page.includes("/mail/"),
    }),
    react(),
    compress(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: "static",
  redirects: {
    "/go/zen": "https://zen-browser.app/",
    "/go/zed": "https://zed.dev/",
    "/go/glazewm": "https://github.com/glzr-io/glazewm",
    "/go/flow": "https://flowlauncher.com/",
    "/go/mica": "https://github.com/MicaForEveryone/MicaForEveryone",
    "/go/flux": "https://justgetflux.com/",
    "/go/translucent": "https://apps.microsoft.com/detail/9pf4kz2vn4w9",
    "/go/tacky": "https://github.com/lukeyou05/tacky-borders",
    "/go/autohotkey": "https://www.autohotkey.com/",
    "/go/zen-tab-search":
      "https://addons.mozilla.org/en-US/firefox/addon/zen-tab-search/",
    "/go/scripts/wallhotkey.ahk":
      "https://github.com/khoiw04/cinnamon-theme/blob/main/AutoHotKey/change-wallpaper.ahk",
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      NEWSLETTER_KHOI_BLOG_EN: envField.string({
        context: "server",
        access: "public",
      }),
      NEWSLETTER_KHOI_BLOG_VI: envField.string({
        context: "server",
        access: "public",
      }),
      PUBLIC_SITE_URL: envField.string({
        context: "server",
        access: "public",
      }),
      DEV_SITE_URL: envField.string({
        context: "server",
        access: "public",
      }),
      TURNSTILE_SITEKEY: envField.string({
        context: "server",
        access: "public",
      }),
      TURNSTILE_SECRETKEY: envField.string({
        context: "server",
        access: "secret",
      }),
      WALINE_SITE_URL: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },
});
