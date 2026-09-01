// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://arsalanirug.com',

  // Fully static — inquiries go to Web3Forms/WhatsApp, so no server runtime.
  // Deployable to any static host (Cloudflare Pages: build `npm run build`, dir `dist`).
  output: 'static',

  // Old-site URLs that have no 1:1 page here. Product (/content/<slug>),
  // category (/categories/<slug>), /products, /about and /contact match the old
  // Drupal aliases exactly, so only these few need redirects.
  redirects: {
    '/boutique-rugs': '/categories/boutique-rugs',
    '/gallery': '/products',
    '/news': '/',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa', 'tr', 'es', 'ja', 'de', 'ru', 'ar', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // hreflang is emitted per-page in BaseLayout (only when the FA counterpart
  // exists); the sitemap just lists URLs.
  integrations: [sitemap()],
});
