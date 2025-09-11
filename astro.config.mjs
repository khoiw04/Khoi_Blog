// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react';
import rehypeAddButtonClass from './src/lib/rehypeAddButtonClass.js';

import tailwindcss from '@tailwindcss/vite';

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  markdown: {
    rehypePlugins: [rehypeAddButtonClass]
  },
  integrations: [
    expressiveCode(),
    mdx({
      rehypePlugins: [rehypeAddButtonClass]
    }),
    sitemap(),
    react(),
    (await import("astro-compress")).default(),
  ],
  redirects: {
    '/': '/en'
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "en",
  },
  output: 'server',
  adapter: cloudflare({
    imageService: "compile"
  }),
});