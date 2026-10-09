import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  // Deployment builds use the repository’s stable GitHub Pages path.
  site: process.env.PORTFOLIO_SITE_URL || undefined,
  base: process.env.PORTFOLIO_BASE_PATH || '/',
});
