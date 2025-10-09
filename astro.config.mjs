import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
// import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: 'https://kyogre.dev',
  integrations: [mdx(), sitemap(), icon(), react()],

  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
      transformers: [],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});