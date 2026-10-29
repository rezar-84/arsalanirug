// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://arsalanirug.com",

  // Fully static — inquiries go to Web3Forms/WhatsApp, so no server runtime.
  // Deployable to any static host (Cloudflare Pages: build `npm run build`, dir `dist`).
  output: "static",

  // Old-site URLs that have no 1:1 page here. Product (/content/<slug>),
  // category (/categories/<slug>), /products, /about and /contact match the old
  // Drupal aliases exactly, so only these few need redirects.
  //
  // Withdrawn catalog paths (ARSA-028) keep their old-site aliases alive: the
  // four patchwork rugs and the emptied patch-work category. Same for
  // selected-available-rugs, whose index stops being built while it holds no
  // entries. nginx.conf serves these as real 301s; the generated stubs cover
  // any host that is not nginx.
  redirects: {
    "/boutique-rugs": "/categories/boutique-rugs",
    "/gallery": "/products",
    "/news": "/",
    "/content/aa": "/products",
    "/content/bb": "/products",
    "/content/hh": "/products",
    "/content/colorful-patch-work": "/products",
    ...Object.fromEntries(
      ["", "/fa", "/tr", "/es", "/ja", "/de", "/ru", "/ar", "/zh"].flatMap(
        (l) =>
          ["patch-work", "selected-available-rugs"].map((c) => [
            `${l}/categories/${c}`,
            `${l}/products`,
          ])
      )
    ),
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fa", "tr", "es", "ja", "de", "ru", "ar", "zh"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // hreflang is emitted per-page in BaseLayout; the sitemap just lists URLs.
  // Utility pages stay out of it (they are also noindex).
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/thank-you") && !page.includes("/404"),
    }),
  ],
});
