// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Served from a custom domain, so base stays at the root.
  site: 'https://mswjs.ndjp.net',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
