// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwind from "@astrojs/tailwind";


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'server', // Modo Server-Side Rendering
  adapter: node({
    mode: 'standalone', // Configuración para Node.js (standalone es comúnmente usado)
  }), // Adaptador para Node.js
  integrations: [mdx(), sitemap(), react(), tailwind()],
});