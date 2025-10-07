import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import rehypeFigureTitle from 'rehype-figure-title'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs'
import { remarkModifiedTime } from './src/plugins/remark-modified-time.mjs'
import robotsTxt from 'astro-robots-txt';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://kyogre.dev',
  integrations: [mdx(), sitemap(), icon(), react(), (await import("@playform/compress")).default({
    JSON: false
  }), robotsTxt()],

  markdown: {
    shikiConfig: {
      theme: 'aurora-x',
      transformers: [],
    },
    remarkPlugins: [remarkReadingTime, remarkModifiedTime],
    rehypePlugins: [rehypeFigureTitle, rehypeAccessibleEmojis],
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        ...(import.meta.env.PROD ? { 'react-dom/server': 'react-dom/server.edge' } : {}),
      },
    },
  },

  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.jsonc',
      persist: {
        path: './.cache/wrangler/v3',
      },
    },
  }),
});