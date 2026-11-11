import { defineConfig } from 'astro/config';

// Set PUBLIC_SITE_URL only when a real production domain is selected.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  site: process.env.PUBLIC_SITE_URL || undefined,
  vite: { server: { strictPort: true } },
});
