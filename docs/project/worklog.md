---
status: active
owner: architect
last-reviewed: 2026-09-01
---

# Worklog — arsalanirug

> Append-only. **Newest entry at the top.** One entry per completed work item, written
> at the LOG step of the loop, using `../templates/worklog-entry.md`.

**Rules**

- Every entry names its `ARSA-###`.
- **Never rewrite history.** If an entry was wrong, append a correction that references
  it. The record of a mistaken belief is part of the record.
- The **Not done** section is mandatory.
- Verification is reported with real commands and real results.
- When this file gets long, move older entries to `worklog-archive/YYYY.md` and leave a
  pointer here. Do not truncate.

---

## ARSA-015 — Add Turkish, Spanish, Japanese, German locales — 2026-09-01

**Tier:** 2. **Request.** Owner: "add turkish, spanish, japanese and german".

**What was done.** `src/i18n/ui.ts` gained full UI-string translations for tr/es/ja/de
(nav, hero/home, catalog, specs, gallery/zoom, contact incl. localized locations,
footer, 404, WhatsApp message templates) plus localeMeta entries; `stripLocale`/
`alternatePath` generalized. BaseLayout now emits hreflang for all six locales + an
og:locale map; the header's two-way toggle became a dropdown language menu (details/
summary, click-outside close). `getRugsWithFallback` generalized so any non-EN locale
falls back to EN entries; long-form pages (Heritage/History/Guide) typed
Partial<Record<Locale,…>> with `?? content.en` fallback. Routes for the four locales
generated from the fa/ templates (9 pages each); astro.config locales updated; JA gets
a system-font stack (Hiragino/Yu Gothic body, Mincho for display) with no new webfont.
`formatDimensions` now formats numbers per locale.

**Verification.** `npx astro check` 0 errors; `npm run build` exit 0 — **283 pages**;
spot-checks: `<html lang="ja">`, localized titles (アルサラーニ・ラグ / Arsalani Halı /
Contacto / Gewebte Erbstücke), 7 hreflang alternates on the home page, 34 product pages
per locale; JA homepage screenshot confirms layout, fonts, and the language menu.

**Not done.** tr/es/ja/de long-form content (History/Guide/Heritage bodies, rug
descriptions) intentionally falls back to English — extends ARSA-004's translation
review; locations/addresses kept as transliterations; no per-locale font tuning beyond
the JA system stack.

---

## ARSA-014 (addendum, Tier 3) — 2026-09-01 — More motifs per owner ("you can add some more visual motifs"): extended `Motif.astro` with `rosette` (8-petal gol), `cypress` (sarv), `lachak` (corner spandrel), and `band` (repeating diamond frieze via SVG pattern). Applied sparingly, still mono/low-opacity: cypress pair flanking the home inquiry title, rosette + cypresses on /about, lachak corners on the contact form card + medallion behind locations, large faint boteh on 404/thank-you, divider under related-rugs, band above the footer copyright. Verified: astro check clean, build exit 0 (95 pages), each motif confirmed present in the built HTML of its page.

---

## ARSA-014 — Zoom lightbox, design polish, extracted palettes, motifs, History & Guide pages — 2026-09-01

**Tier:** 2. **Request** (owner, several messages): add a zoom function; improve the
design; extract colors from the rug photos and show them on product pages; add minimal
monochrome Persian rug motifs; add a visual history of the Persian rug travelling down
the page on a curving line (separate from the brand's /about page), Sasanian era to
today, with Kashan and Qom profiled specially; and a guide to terms, designs, regions
and quality with an artistic (non-classic) glossary.

**What was done.**
- **Zoom**: `Gallery.astro` rebuilt with a full-screen lightbox — click any gallery
  image to open; click/scroll zooms toward the cursor (up to 4×), drag pans (clamped),
  arrows/keys navigate, Esc/backdrop closes; hi-res 2200px variants served via
  `getImage`. Fixed a click-vs-dblclick conflict found in browser testing.
- **Palettes**: `scripts/extract-colors.mjs` — k-means (k=6) over 64px downsamples with
  near-white/near-black pixels dropped; top 5 colors written to a new `palette`
  frontmatter field on all 34 rugs (en+fa). Shown as swatch rows in `SpecsTable` and
  small dots on `RugCard`.
- **Motifs**: `Motif.astro` — line-art medallion, boteh, and a boteh divider, always
  currentColor at low opacity. Applied: faint medallions in the dark hero/quality/CTA
  panels, boteh dividers under section titles and in the footer.
- **Design polish**: breadcrumb + sticky specs column on rug pages, saffron kickers
  above home section titles, piece count on the catalog, brand logo in footer, card
  border hover.
- **/history** (`HistoryPage.astro`): "A Woven History" — seven eras from the Pazyryk
  carpet (c. 400 BC) through the Sasanian Spring of Khosrow, Safavid Ardabil (1539,
  Maqsud Kashani), Mohtasham/Manchester Kashan, Qom's rise (1930s), to UNESCO 2010 —
  connected by an S-curving SVG line with boteh nodes, entries alternating sides;
  closing panel on rugs as cultural preservation. EN + FA. Deliberately separate from
  /about.
- **/guide** (`GuidePage.astro`): designs (lachak-toranj, boteh, herati, gol farang,
  kheshti, afshan, gabbeh, tree of life — each with Persian calligraphy), featured Qom
  & Kashan profiles + six region tiles, five-step quality guide on a dark panel, and "A
  Weaver's Lexicon" — 12 terms in artistic column layout tied to catalogue SKUs
  (zarcharak, zaronim, kenareh, kork…). EN + FA.
- Nav/footer links added for both pages.

**Evidence.** Historical dates verified via web search against V&A (Ardabil, Maqsud
Kashani signature), Hermitage/standard references (Pazyryk c. 4th century BC), UNESCO
ICH listings (Kashan & Fars, 2010), and rug-trade references for Qom's 1930s origin and
Mohtasham-era imported merino ("Manchester Kashan").

**Verification.** `npx astro check` 0 errors/0 warnings; `npm run build` exit 0, 95
pages; lightbox exercised in Chrome (open → counter 1/4, zoom, wheel, arrow-key nav,
Esc close, scroll-lock restored); screenshots confirm motifs, curving timeline, lexicon
layout, palette swatches on the Lachak Torang Gerd page.

**Not done.** Rug-page images for the guide's design entries (text-only for now —
could later illustrate each motif with crops from our own rugs); FA content of both new
pages is AI-drafted and, like all FA copy, awaits owner review (ARSA-004 scope
broadened); glossary terms are not cross-linked to filtered catalog views.

---

## ARSA-013 (final, Tier 3) — 2026-09-01 — Owner reversed course: keep every product that is live on the old site. Restored "Colorful Patch work" (re-encoded from the archive with the watermark crop, entries recreated, still featured). Then imported the five remaining live products previously excluded as junk-titled — aa (s-6911, 225×183, 2 photos), bb (s-8559, 236×182), hh (s-8999, 225×170, patch-work), adxasxd (S-9443, 235×158, oushak), asfsdcf (s-9464, 232×175, boutique/silk-touch) — via a one-off script (same normalization as migrate.mjs; aliases as slugs). Their dump data confirms they are real rugs with placeholder titles; titles kept verbatim, retitling deferred to ARSA-005. "Acer Iconia" (the theme-demo tablet) stays excluded. Catalog: 34 entries. Verified: build exit 0, 91 pages, all six `/content/<slug>` pages present.

---

## ARSA-013 (addendum, Tier 3) — 2026-09-01 — Owner flagged "Colorful Patch work" (ZD032-131) as not a real product; removed its en/fa entries and `src/assets/rugs/colorful-patch-work/`. Catalog is now 28 rugs; the emptied Patch Work category auto-hides from the FilterBar. Verified: build exit 0 (79 pages), no "colorful" in dist, `/content/colorful-patch-work` no longer built.

---

## ARSA-013 (Tier 3) — 2026-09-01 — "remove fake products": verified none exist in the new site (grep of src/content and dist found no AA/bb/hh/aDXASXD/ASFSDCF/Acer; 29 genuine entries — they live only on the old Drupal site). Hid empty categories from the FilterBar so the rug-less "Selected & Available" pill no longer leads to an empty page (`src/components/FilterBar.astro`; the `/categories/selected-available-rugs` URL still exists). Verified: astro check 0 errors, build exit 0 (81 pages), pill absent from dist/products. Deferred: nothing.

---

## ARSA-012 — Match the live site: real titles, old URL structure, brand logo — 2026-09-01

**Tier:** 2. **Request.** Owner: "use our own products, url structure, logo — i fixed
main website ssl issue so scan the site learn more and fix."

**What was found.** With SSL fixed, https://arsalanirug.com (the old Drupal site) is
reachable and matches the dump byte-for-byte (the dump is dated today) — so the migrated
catalog was already the real inventory; what differed was presentation: I had stripped
the "Arsalani-" title prefix, invented cleaner slugs under `/rugs/`, and used `logo.png`
where the live site uses `logo_0.png` (the two files are identical white-on-transparent
calligraphy).

**What was done.**
- **Titles**: restored verbatim node titles from the dump (e.g. "Arsalani- Qom
  Golfarang") on all EN entries; drafted FA titles kept.
- **URL structure now matches the live site exactly**: products at
  `/content/<old-drupal-alias>` (entries renamed to the aliases from `url_alias`),
  categories at `/categories/<term-alias>` (internal category slugs unified to the old
  taxonomy aliases), catalog at `/products`, story page moved `/heritage` → `/about`
  (node 78's alias). Redirects for `/boutique-rugs`, `/gallery`, `/news`.
- **Rename collision fixed**: the two "Old Moshk Abad" rugs collide on slug; ZD062-102
  was clobbered during renaming and recreated as `old-moshk-abad-0` (its live alias) —
  catalog is back to 29 entries.
- **Logo**: live `logo_0.png` shipped as `/logo.png`; shown white (as designed) in the
  dark hero, CSS-`invert`ed in the cream nav.

**Verification.** `npx astro check` 0 errors/0 warnings; `npm run build` exit 0, 81
pages; curl probes 200 on `/content/arsalani-qom-golfarang/`, `/categories/boutique-rugs/`
(canonical + hreflang verified in HTML), `/about/`, `/fa/content/arsalani-qom-khesti/`,
and redirect stubs `/gallery/`, `/boutique-rugs/`; `dist/content` and `dist/fa/content`
each hold 29 pages; browser screenshot confirms both logo treatments.

**Not done.**
- Junk demo products still live on the old site (AA, bb, hh, aDXASXD, ASFSDCF, Acer
  Iconia) remain deliberately excluded; their `/content/...` URLs will 404 on the new
  site.
- Prices shown on the old site are still not displayed — per the owner's earlier
  price-on-request decision; flag to the owner in case ARSA-012's "use our own products"
  meant prices too.
- Old `/gallery` lifestyle photos still unmigrated (redirects to `/products`).

---

## ARSA-001 (addendum) — visual QA fixes after browser check — 2026-09-01

Live-preview review (Chrome via `npm run preview`) after the initial build found and
fixed:
- **Missing `sizes` on every `<Picture>`** — browsers assumed 100vw and fetched the
  largest (~1920px) variant for 320px cards. Added proper `sizes` to RugCard, Gallery,
  home hero, and heritage images.
- **Hero hidden behind scroll-reveal** — above-the-fold hero content depended on the
  IntersectionObserver opacity transition; on slow/software-rendered machines it painted
  dim. Removed `data-reveal` from hero elements; below-fold sections keep the reveal.
- **Watermarked photo** — `colorful-patch-work/01.jpg` had "11420 size 197 x 157" baked
  into the bottom; cropped the bottom 10% via sharp. Promoted qom-lachak-torang-gerd
  (`order: 1`) to the home hero slot.
- **FA titles drafted** — all 29 `src/content/rugs/fa/*.md` now carry Persian titles
  (still `draft: true` pending owner review, ARSA-004).

Verified: rebuild exit 0 (81 pages); screenshots of `/`, `/fa/`, `/rugs/` confirm cream
hero text, RTL layout with Amiri/Vazirmatn, arch cards, badges, and "Price on request"
rendering correctly.

---

## ARSA-001 — Bootstrap: new bilingual luxury site replacing Drupal — 2026-09-01

**Tier:** 2 (bootstrap; brand copy and inquiry channels are Tier 1 surfaces but nothing
is deployed — deploy approval is the Tier 1 gate, parked as ARSA-006).

**Request.** Replace the dead Drupal 7/Ubercart arsalanirug.com with a brand-new luxury
site. Owner decisions (interactive): Astro + Tailwind, catalog + inquiry (no e-commerce),
price on request, EN + FA, WhatsApp + form + email/phone inquiries, static host/CDN,
migrate the ~30 real rugs. Design: the "Claude Type" parchment-gallery style reference,
adapted (accent → madder crimson #8a1f2d, saffron #c99a3c secondary; fonts → Inter /
Cormorant / Vazirmatn / Amiri). Mid-build the owner pointed at the AI-SDLC kit installed
at `~/Projects/Websites/arsalanirug` (wrong folder) and asked to adopt it here.

**What was done.**
- Scaffolded Astro 7 + Tailwind 4 static project at `~/Projects/Websites/arsalanirug.com`
  (i18n root-EN + `/fa/`, patterns copied from sibling designbyzaaz.com, no adapter).
- Design tokens in `src/styles/global.css` (cream/ink/espresso/crimson/saffron, pill+arch
  radii, per-dir font swap); components: Header (frosted pill nav), RugCard (arched
  mihrab frame), Gallery, SpecsTable, InquiryCta, ContactForm (Web3Forms), FilterBar,
  Badge, Button, Footer.
- `scripts/migrate.mjs`: regex-parses the Drupal SQL dump (no MySQL), joins
  node→uc_products→taxonomy→file_managed, excludes 6 junk demo products, converts
  dimensions to cm, slugifies (SKU suffix on duplicate titles), re-encodes photos via
  sharp (≤2400px JPEG q82) into `src/assets/rugs/<slug>/`, emits en+fa markdown entries
  (fa as `draft: true`). Result: 29 rugs, 18MB assets. About-us text preserved to
  `docs/source-copy.md`; logo to `public/`.
- Pages (EN + FA mirrors): home (dark specimen hero, featured rugs, collections,
  heritage band, inquiry strip), `/rugs` + `/rugs/category/[category]` +
  `/rugs/[slug]` (flat URLs), `/heritage` (five-generation timeline rewritten from the
  old About page, EN + FA), `/contact` (4 locations, form, WhatsApp), thank-you, 404.
  SEO: canonical, hreflang en/fa/x-default, OG, JSON-LD Organization + Product (no
  offers — price on request), sitemap, robots.txt.
- Adopted the AI-SDLC kit v2.5.0: copied AGENTS.md/CLAUDE.md/.ai-sdlc/.claude/docs from
  the misplaced install (its `.git` left behind); filled charter, architecture, backlog,
  this worklog, assumptions-and-risks; AGENTS.md §9 project overrides.

**Verification.**
- `node scripts/migrate.mjs --dry-run` — kept 29 / excluded 6 (titles listed); dimension
  spot-check: Colorful Patch Work 197×157cm matches the source filename
  `11420 size 197 x 157.JPG`.
- `npm run build` — exit 0, "81 page(s) built", sitemap-index.xml created; dist 121MB
  (ARSA-010 tracks trimming).
- `npx astro check` — 0 errors, 0 warnings, 20 hints.
- format/lint/unit/integration/contract/scan/a11y/e2e: **absent** per charter Commands
  (`npm audit` not run this entry — recorded as not run).

**Reviews (Tier 2, surfaces touched).**
- architect: static output + collections + FA fallback verified against constraints
  (no server capacity, free tier) — pass.
- brand-designer: tokens and components implement the parchment-gallery system (hairline
  borders, no shadows, pill/arch radii, single crimson accent, quiet 400-weight UI) — pass.
- copywriter: heritage copy traces to `docs/source-copy.md` (names, dates, 302-toman
  anecdote); no prices stated anywhere; rug bodies are labelled TODO placeholders — pass
  with conditions (ARSA-005).
- localisation: FA strings complete in `ui.ts`; `dir="rtl"` + logical properties; FA
  rug entries draft with EN fallback — pass with conditions (ARSA-004).
- seo: hreflang pairs emitted for every page (FA fallback guarantees the URL exists);
  Product JSON-LD without offers — pass (ARSA-007 redirects deferred).
- security/privacy: no secrets in repo (Web3Forms key is public-by-design, placeholder);
  form collects name/email/phone only, nothing stored on-site — pass.

**Not done.**
- ARSA-002 WhatsApp number is the old Qom landline (placeholder, labelled in `ui.ts`).
- ARSA-003 Web3Forms key is a visible placeholder — the form will not deliver until set.
- ARSA-004 FA rug titles/descriptions are drafts (EN shown on /fa/ rug pages via fallback).
- ARSA-005 EN rug descriptions are TODO placeholders.
- ARSA-006 not deployed; no hosting connected. ARSA-007/009/010/011 deferred (see backlog).
- Lifestyle photos from the old `photo` nodes not migrated (mixed-quality 2016 phone
  shots; heritage page uses rug photography instead).
- The misplaced kit folder `~/Projects/Websites/arsalanirug` still exists; owner may
  delete it once satisfied the copy here is complete.
