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
import remarkGridColumnClass from "./src/plugins/remark-grid-column-class.ts";
import remarkAdmonitions from "./src/plugins/remark-admonitions.mjs";
import tailwindcss from "@tailwindcss/vite";
import compress from "astrojs-compress";

import expressiveCode from "astro-expressive-code";
import { imageConfig } from "./src/lib/image-config.js";
import { themeConfig } from "./src/config.js";

const plugins = {
  remarkPlugins: [
    remarkDirective,
    remarkGridColumnClass,
    remarkAdmonitions,
    remarkEmbeddedMedia,
    remarkMath,
  ],
  rehypePlugins: [
    rehypeKatex,
    rehypeCleanup,
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
    compress({
      HTML: {
        removeComments: false,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
  },
  output: "server",
  adapter: cloudflare({
    imageService: "compile",
  }),
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
      "https://github.com/khoiw04/cinnamon-theme/blob/main/wallhotkey.ahk",
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      NEWSLETTER_KHOI_BLOG_EN: envField.string({
        context: "server",
        access: "secret",
      }),
      NEWSLETTER_KHOI_BLOG_VI: envField.string({
        context: "server",
        access: "secret",
      }),
      PUBLIC_SITE_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      DEV_SITE_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      TURNSTILE_SITEKEY: envField.string({
        context: "server",
        access: "secret",
      }),
      TURNSTILE_SECRETKEY: envField.string({
        context: "server",
        access: "secret",
      }),
      WALINE_SITE_URL: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
