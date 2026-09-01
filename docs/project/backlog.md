---
status: active
owner: product-manager
last-reviewed: 2026-09-01
---

# Backlog — arsalanirug

> **This table stays terse. One line per item.** Narrative — what happened, what was
> verified, what was discovered — goes in `worklog.md`, found via the ID.
>
> Column rules, the eight status values, and why the separation matters:
> `../process/07-traceability.md`.

## Now

| ID | Task | Tier | Owner role | Depends on | Status |
| --- | --- | --- | --- | --- | --- |

## Next

| ID | Task | Tier | Owner role | Depends on | Status |
| --- | --- | --- | --- | --- | --- |
| ARSA-004 | Translation review: FA rug titles/descriptions + FA/tr/es/ja/de long-form pages (History/Guide/Heritage) currently falling back to English | 1 | copywriter | — | Ready |
| ARSA-005 | Write real EN descriptions for the 29 rugs (bodies are TODO placeholders) | 2 | copywriter | — | Ready |

## Blocked

| ID | Task | Tier | Owner role | Depends on | Status | Who can unblock | Since |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Parked — awaiting a human

| ID | Task | Tier | Owner role | Depends on | Status | Waiting on whom | For what decision | Since |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ARSA-003 | Register Web3Forms for info@arsalanirug.com and replace the placeholder key in `src/components/ContactForm.astro` | 1 | devops-sre | — | Parked | Rezar86 | account registration (free) | 2026-09-01 |
| ARSA-006 | Connect hosting and deploy `dist/` through Cloudflare Workers Static Assets | 1 | devops-sre | ARSA-002, ARSA-003 | In review | Rezar86 | security audit finding, production deploy approval, and inquiry-channel dependencies | 2026-09-01 |

## Later

| ID | Task | Tier | Owner role | Depends on | Status | Becomes relevant when |
| --- | --- | --- | --- | --- | --- | --- |
| ARSA-009 | Automated a11y + e2e checks (fills the charter's absent stages) | 2 | qa | — | Deferred | CI exists |
| ARSA-010 | Trim dist size (currently 121MB — consider fewer image widths/formats) | 3 | devops-sre | — | Deferred | host imposes a size limit or builds get slow |
| ARSA-011 | Re-shoot weak 2016 phone photos | 2 | brand-designer | — | Deferred | owner can arrange photography |

## Done

| ID | Task | Tier | Owner role | Depends on | Status | Completed |
| --- | --- | --- | --- | --- | --- | --- |
| ARSA-025 | Multi-brand + multi-region architecture, catalog filter upgrade, houses/region strips, size guide | 2 | architect | — | Done | 2026-09-01 |
| ARSA-023 | Contact overhaul: remove Tehran/Qom, add Toronto (Richmond Hill) + tel +1 647-879-5149, all locales + schema + llms | 1 | product-manager | — | Done | 2026-09-01 |
| ARSA-002 | WhatsApp/phone placeholder — resolved by ARSA-023 with the owner-provided Toronto line (confirm it is the WhatsApp line, see A6) | 1 | product-manager | — | Done | 2026-09-01 |
| ARSA-021 | SEO pass: favicons/OG image, SKU-deduped titles, Product+Breadcrumb LD, noindex+sitemap filter, llms.txt | 2 | seo | — | Done | 2026-09-01 |
| ARSA-008 | Favicon set + OG default image — done within ARSA-021 | 3 | brand-designer | — | Done | 2026-09-01 |
| ARSA-018 | Replace the main hero image with `IMG_5840_0.jpg` and fit it to the arch frame | 2 | brand-designer | owner-provided image | Done | 2026-09-01 |
| ARSA-020 | Add Russian, Arabic, and Chinese UI locales with localized routes and language metadata | 2 | localisation | — | Done | 2026-09-01 |
| ARSA-017 | Set project approval gate to sole owner approval | 1 | product-manager | — | Done | 2026-09-01 |
| ARSA-015 | Locales tr/es/ja/de: full UI translations, language menu, per-locale routes/hreflang, EN fallback for long-form | 2 | localisation | — | Done | 2026-09-01 |
| ARSA-014 | Zoom lightbox, palette extraction, Persian motifs, design polish, /history + /guide pages (EN+FA) | 2 | ux-designer | — | Done | 2026-09-01 |
| ARSA-013 | Verify no fake products; owner kept full live catalog (34); junk-titled rugs imported, FilterBar hides empty categories | 3 | product-manager | — | Done | 2026-09-01 |
| ARSA-012 | Match live site: verbatim titles, old URL structure (`/content/`, `/categories/`, `/products`, `/about`), brand logo | 2 | architect | — | Done | 2026-09-01 |
| ARSA-007 | Old-URL redirects — resolved by ARSA-012 adopting the old URL structure natively; leftover paths (`/gallery`, `/boutique-rugs`, `/news`) redirect | 3 | seo | — | Done | 2026-09-01 |
| ARSA-001 | Bootstrap: new Astro/Tailwind bilingual site, design system, Drupal catalog migration (29 rugs), all pages, SDLC kit adopted | 2 | architect | — | Done | 2026-09-01 |

## Dropped

| ID | Task | Tier | Owner role | Depends on | Status | Why dropped | When |
| --- | --- | --- | --- | --- | --- | --- | --- |
| — | Migrate old FAQ/blog/news/forum/webform content | 3 | product-manager | — | Dropped | all demo, lorem-ipsum, or spam content (see worklog ARSA-001) | 2026-09-01 |
