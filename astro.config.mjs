import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  // Only the preview workflow sets these; no final deployment is configured.
  site: process.env.PORTFOLIO_SITE_URL || undefined,
  base: process.env.PORTFOLIO_BASE_PATH || '/',
});
