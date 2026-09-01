# arsalanirug.com

Luxury catalog site for **Arsalani Rug** — hand-knotted Persian rugs from Qom, a family
craft since 1866. Replaces the retired Drupal 7/Ubercart site. Bilingual EN + FA (RTL),
fully static, catalog + inquiry only (prices on request, no e-commerce).

Agents: read `AGENTS.md` first, then `docs/project/charter.md`.

## Stack

Astro 7 (static output, built-in i18n: root = EN, `/fa/` = Persian) + Tailwind CSS 4.
Content lives in typed content collections (`src/content/rugs/{en,fa}/*.md`); UI strings
for both locales in `src/i18n/ui.ts`. Design tokens in `src/styles/global.css`.

```
npm install
npm run dev        # local dev
npm run build      # static build → dist/
npx astro check    # typecheck
```

## Deploy

Any static host. Cloudflare Pages settings: build `npm run build`, output `dist`,
Node 22. `public/_headers` carries immutable caching for hashed assets. Nothing needs
env vars.

## Migration

`scripts/migrate.mjs` is the one-off importer from the old Drupal dump at
`~/Documents/arsalani-rug` (kept as a read-only archive). `npm run migrate -- --dry-run`
prints the kept/excluded product list; the full run re-encodes photos into
`src/assets/rugs/` and (re-)emits content entries. Existing markdown will be
overwritten — check `git status` after re-running.

## Open items (placeholders in the code)

- **WhatsApp number** (`src/i18n/ui.ts` → `contact.whatsapp`): currently the old Qom
  landline; replace with the real WhatsApp business number (ARSA-002).
- **Web3Forms key** (`src/components/ContactForm.astro`): register info@arsalanirug.com
  at web3forms.com (free) and replace the placeholder — the form does not deliver until
  then (ARSA-003).
- FA rug entries are `draft: true` (EN shown on /fa/ via fallback) pending translation
  review (ARSA-004); EN rug descriptions are TODO placeholders (ARSA-005).
