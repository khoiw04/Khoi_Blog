// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react';
import playformInline from '@playform/inline'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import rehypeKatex from 'rehype-katex'
import rehypeCleanup from './src/plugins/rehype-cleanup.mjs'
import remarkEmbeddedMedia from './src/plugins/remark-embedded-media.mjs'
import rehypeAddButtonClass from './src/plugins/rehype-add-button-class.js';
import rehypeImageProcessor from './src/plugins/rehype-image-processor.mjs'
import rehypeAstroRelativeLinks from './src/plugins/rehype-astro-relative-links.js';
import remarkAdmonitions from './src/plugins/remark-admonitions.mjs'
import tailwindcss from '@tailwindcss/vite';

import expressiveCode from 'astro-expressive-code';
import { imageConfig } from './src/lib/image-config.js';
import { themeConfig } from './src/config.js';

const plugins = {
    remarkPlugins: [remarkDirective, remarkAdmonitions, remarkEmbeddedMedia, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeCleanup, rehypeImageProcessor, rehypeAddButtonClass, rehypeAstroRelativeLinks]
}

// https://astro.build/config
export default defineConfig({
  site: themeConfig.site.website,
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      wrap: false
    },
    ...plugins
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: imageConfig
    },
  },
  integrations: [
    playformInline({
      Exclude: [(file) => file.toLowerCase().includes('katex')]
    }),
    expressiveCode(),
    mdx({
      ...plugins
    }),
    sitemap(),
    react(),
    (await import("astro-compress")).default(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
  },
  output: 'server',
  adapter: cloudflare({
    imageService: "compile"
  }),
});