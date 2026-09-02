---
status: active
owner: architect
last-reviewed: 2026-09-01
---

# Technical architecture — arsalanirug

> Describes what exists, not what was once planned. When the code and this document
> disagree, **the code is right and this document is a defect** — update it or mark it
> `stale` with a backlog item.

## Stack

**What** the project is built with is declared once, in `charter.md` → Stack. This
section records only **why**, and the choices the charter has no row for.

| Concern | Choice | Why this, not the obvious alternative | ADR |
| --- | --- | --- | --- |
| Framework | Astro 7, `output: 'static'`, no adapter | Catalog + inquiry needs no server; static build is the cheapest, fastest, most portable option and matches the sibling designbyzaaz.com so patterns are shared. Next.js/TanStack would add runtime for nothing. | — |
| Content store | Astro content collections (markdown per rug per locale) | ~30 rugs, one editor; a CMS or database is overhead. Frontmatter schema is typed via zod in `src/content.config.ts`. | — |
| i18n | Astro built-in i18n, root-EN + `/fa/` prefix, FA→EN fallback in `src/lib/rugs.ts` | Preserves old English URLs' SEO shape; FA catalog stays complete while translations are drafts. | — |
| Inquiry channel | Web3Forms (plain HTML POST) + WhatsApp deep links | No backend to run; the form works with JS disabled. WhatsApp is the rug trade's channel. | — |
| Images | astro:assets Picture (avif/webp, responsive widths); originals pre-shrunk to ≤2400px JPEG by the migration script | 2016 originals were up to 5MB; pre-shrinking keeps the repo and build times sane while astro:assets handles delivery variants. | — |
| Cache / queue | none | static site | — |
| Observability | none | static site; hosting provider analytics may be enabled later | — |

## Constraints that shaped this

- **One owner, no on-call** → fully static output; nothing can go down at 3am.
- **Free-tier budget** → no server hosting, no paid form service (Web3Forms free tier).
- **Source material is a dead Drupal 7 dump** → one-off `scripts/migrate.mjs` regex-parses
  the SQL (no MySQL server needed) and is re-runnable from the preserved dump.
- **Bilingual EN/FA** → logical CSS properties throughout; font stacks swap per `dir`.

## Shape

```
src/content/rugs/{en,fa}/*.md ─┐
src/i18n/ui.ts (strings)       ├─► astro build ─► dist/ (static) ─► CDN (arsalanirug.com)
src/assets/rugs/<slug>/*.jpg  ─┘
Visitor ─► page ─► WhatsApp deep link / tel: / mailto:
              └─► <form POST> ─► api.web3forms.com ─► info@arsalanirug.com
```

Deploy target: Dokploy containerized static hosting via multi-stage `Dockerfile`
(`node:22-alpine` runs `npm run build`, output served by `nginx:alpine` on port 80 with
clean URL routing, gzip compression, and caching headers), selected 2026-09-02.
Production deployment remains owner-approved.

## Components

| Component | Responsibility | Owns (data) | Depends on |
| --- | --- | --- | --- |
| `src/pages/` + locale route directories | thin locale routes | — | features |
| `src/features/*.astro` | full page bodies shared by both locales | long-form heritage copy | components, lib, content |
| `src/components/*.astro` | design-system pieces (Header, RugCard, Gallery, FilterBar, forms, CTAs) | — | i18n, lib |
| `src/lib/rugs.ts`, `src/lib/whatsapp.ts` | collection queries, locale fallback, WhatsApp URL building | — | astro:content, i18n |
| `src/i18n/ui.ts` | all UI strings, locale metadata, contact constants | UI strings, contact details | — |
| `src/data/brands.ts`, `src/data/regions.ts` | brand & weaving-region registries (multi-locale prose with EN fallback) | brand/region names + stories | i18n types |
| `src/content/rugs/` | the catalog | rug entries | — |
| `scripts/migrate.mjs` | one-off Drupal→collections migration | — | dump at `~/Documents/arsalani-rug`, sharp |

**Boundary rules:** pages never query collections directly — they pass locale to a
feature; features and components read strings only from `src/i18n/ui.ts`, never inline
bilingual text. Exceptions: long-form page copy in `src/features/*` content objects and
the brand/region registries in `src/data/` (both use the Partial-locale + EN-fallback
pattern). Contact details live only in `ui.ts`'s `contact` object.

## Data flow

**Catalog render (build time):** `getStaticPaths` → `getRugs`/`getRugsWithFallback`
(filters `draft: true`, FA falls back to EN entries) → static HTML with responsive
images. No runtime data access.

**Inquiry:** rug page → WhatsApp link prefilled with title/SKU/URL (plain anchor), or
contact form POST to Web3Forms → email to info@arsalanirug.com → redirect to
`/thank-you`. The site never stores the submission.

## External dependencies

| Service | Used for | Failure behaviour | Timeout | Fallback |
| --- | --- | --- | --- | --- |
| Web3Forms | contact form delivery | form POST fails → user sees Web3Forms error page | browser default | phone/email/WhatsApp shown beside the form |
| wa.me (WhatsApp) | inquiry deep links | link errors if WhatsApp absent | n/a | tel:/mailto: buttons alongside |
| fontsource packages | self-hosted fonts (build-time npm deps, nothing fetched at runtime) | n/a | system font stacks declared |

## Cross-cutting concerns

- **Identity & authorisation:** none — public static site.
- **Configuration:** all constants in source (`ui.ts` contact object, Web3Forms key in
  `ContactForm.astro`). No env vars at build.
- **Error handling:** 404 page; form failures surface from Web3Forms.
- **Logging & tracing:** none.
- **Background work:** none.
- **Caching:** CDN + `public/_headers` immutable rule for hashed `/_astro/*` assets.

## Known limitations

- Material filter is client-side show/hide; with ~30 rugs that is fine, but filtered
  views have no URLs and no SEO presence. Revisit if the catalog grows past ~100.
- FA rug entries are drafts falling back to EN; FA visitors see English rug titles until
  translation review lands (ARSA-004).
- Photo quality is mixed (2016 phone shots); the arch crop hides some of it, but several
  rugs need re-shooting for the site to read as truly luxury.
- No CI: checks run manually per the charter Commands table.

## Non-goals

- E-commerce (cart, checkout, prices) — the brand sells by inquiry; decided at project
  start, do not re-litigate.
- CMS/admin UI — content is edited as markdown in the repo.
- Blog/forum/FAQ from the old site — dropped as demo/spam content.
