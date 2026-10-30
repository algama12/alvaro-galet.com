import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alvaro-galet.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
