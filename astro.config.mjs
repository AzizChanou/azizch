import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
// import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: 'https://kyogre.dev',
  integrations: [mdx(), sitemap(), tailwind(), icon()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
      transformers: [],
    },
  },
});