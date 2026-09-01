---
status: active
owner: "Rezar86"
last-reviewed: 2026-09-01
---

# Project charter — arsalanirug

## Identity

| | |
| --- | --- |
| **Project** | arsalanirug |
| **What it is** | The online catalogue for Iranian hand-crafted Qom rugs and carpets from the high-end, long-heritage Arsalani brand (family craft since 1866). Catalog + inquiry only — no e-commerce; prices on request. Replaces a retired Drupal 7/Ubercart site. |
| **Work item prefix** | `ARSA` |
| **Repository** | git@github.com:rezar-84/arsalanirug.git |
| **Accountable human** | Rezar86 |

## Stack

**Authoritative.** Every process document refers to these indirectly, so that the process
itself stays portable, and `architecture.md` links here rather than restating them — one
table, so it cannot drift.

| Concern | This project uses |
| --- | --- |
| Language / runtime | TypeScript / Node ≥ 22.12 |
| Package manager | npm |
| Framework(s) | Astro 7 (static output, built-in i18n) + Tailwind CSS 4 (`@tailwindcss/vite`) |
| Data store(s) | none — content lives in Astro content collections (`src/content/rugs/{en,fa}/*.md`) |
| Auth | none — public site, no accounts |
| Hosting | Cloudflare Workers Static Assets (build `npm run build`, assets `./dist`, Node 22) |
| CI | none yet |
| Test tooling | none yet — verification is `astro check` + `astro build` (see Commands) |

The reasoning lives in the ADRs; the shape lives in `architecture.md`. This table is for
lookup.

## Constraints

| | |
| --- | --- |
| **Team / who maintains this** | one owner (Rezar86) with AI agents; no on-call |
| **Operational capacity** | static hosting only — nothing that needs a server, database, or monitoring |
| **Budget ceiling** | free-tier services only (static CDN hosting, Web3Forms free tier) |
| **Latency / throughput** | not specified — static CDN delivery is assumed sufficient |
| **Existing platform commitments** | domain arsalanirug.com; source photos/data from the old Drupal dump in `~/Documents/arsalani-rug` |
| **Timeline** | none fixed |

## Commands

**Authoritative.** Exact commands, runnable from the repository root.

| Stage | Command |
| --- | --- |
| Install | `npm install` |
| Run locally | `npm run dev` |
| `checks.format` | absent — no formatter configured yet |
| `checks.lint` | absent — no linter configured yet |
| `checks.typecheck` | `npx astro check` |
| `checks.unit` | absent — no unit-testable logic beyond the one-off migration script |
| `checks.integration` | absent — static site, no services |
| `checks.contract` | absent — no consumed or exposed API |
| `checks.build` | `npm run build` |
| `checks.scan` | `npm audit` |
| `checks.a11y` | absent — manual review against WCAG 2.2 AA; no automated tooling yet (gap) |
| `checks.e2e` | absent — manual spot-check via `npm run preview` (gap) |

## Environments

| Environment | Purpose | Deployed from | Who may deploy |
| --- | --- | --- | --- |
| production (arsalanirug.com) | live site | `main` → static host (not yet connected) | Rezar86 |

| | |
| --- | --- |
| **Default branch** | main |
| **Direct commits to it** | allowed |

### Managed platform

| | |
| --- | --- |
| **Platform** | none |
| **Sync model** | git only |
| **Platform-owned files** | none |
| **Platform instruction file** | none |
| **Deploys** | static build uploaded/connected by the owner |

## Active roles

| Role | Active | Active if | Reason if inactive |
| --- | --- | --- | --- |
| product-manager | ☑ | always | |
| architect | ☑ | always | |
| security | ☑ | always | |
| qa | ☑ | always | |
| ux-designer | ☑ | there is any interface, including a CLI | |
| brand-designer | ☑ | there is a visual interface | |
| copywriter | ☑ | there is any user-visible text | |
| accessibility | ☑ | there is any interface | |
| seo | ☑ | content is publicly discoverable | |
| cro-analyst | ☑ | there is a conversion or activation goal | |
| devops-sre | ☑ | it deploys or runs somewhere | |
| privacy-legal | ☑ | personal data, tracking, or public claims exist | |
| localisation | ☑ | it ships in more than one language | |

**Project-specific role checks** — additions to a role's playbook for this project only.

| Role | Additional check |
| --- | --- |
| brand-designer | Changes stay within the parchment-gallery design system (tokens and rules in `src/styles/global.css`): cream canvas, hairline espresso borders, no shadows, pill (100px) / arch (900px) radius vocabulary, madder-crimson as the single accent. |
| copywriter | Never state or imply a price. Rug provenance, dates, and family-history claims must trace to `docs/source-copy.md` or the owner — no invented heritage. |
| localisation | Every EN string change checks its FA counterpart in `src/i18n/ui.ts`; FA pages must render RTL with the FA font stack (Vazirmatn/Amiri). |

**Project-specific roles**

| Role | Mission | Engage when | Checks |
| --- | --- | --- | --- |
| | | | |

## Risk defaults

| | |
| --- | --- |
| **Always Tier 1 here** | public brand/heritage copy (EN and FA), contact details, the inquiry channels (WhatsApp number, form endpoint, email), deleting or bulk-editing catalog content |
| **Never Tier 1 here** | auth/tenancy/payments (none exist — static catalog site with no accounts or checkout); data migration (the Drupal migration is one-off and re-runnable from the preserved dump) |
| **Human approval required for** | production deploys, anything touching personal data, anything outward-facing (public posts, emails, announcements) |
| **Approvers** | Rezar86 |
| **Staleness threshold** | 90 days |

## Standards & targets

| | |
| --- | --- |
| **Accessibility target** | WCAG 2.2 AA |
| **Assistive technologies supported** | none tested — a gap |
| **Supported platforms / browsers / sizes** | evergreen browsers, mobile-first responsive 360px–1400px+ |
| **Performance budgets** | none set formally; images ship via astro:assets (avif/webp, responsive widths) |
| **Primary outcome** | contacts and quotes (WhatsApp taps, form submissions, calls/emails) |
| **Jurisdictions / regimes** | site serves visitors globally incl. EU; contact form collects name/email/phone only |
| **Data categories held** | none held by the site itself (static, no analytics). Inquiry submissions transit Web3Forms to info@arsalanirug.com — that mailbox is the only store. |

### Languages & localisation

| | |
| --- | --- |
| **Ships in** | en, fa, tr, es, ja, de (tr/es/ja/de: full UI strings; long-form pages fall back to English pending translation) |
| **Source language** | en |
| **Writing directions** | bidirectional — fa is RTL (`dir="rtl"`, logical CSS properties throughout); tr/es/ja/de are LTR |
| **Message catalogue** | `src/i18n/ui.ts` (UI strings, both locales); long-form content per-locale in `src/content/rugs/{en,fa}/` and `src/features/HeritagePage.astro` |
| **Translation workflow** | AI-drafted FA, reviewed by the owner before an entry drops `draft: true` |
| **Terminology / glossary** | rug-trade terms (Zarcharak, Lachak Torang, Gabbeh…) stay transliterated in EN and native in FA; owner decides disputes |

## Sources of truth

| Thing | Where |
| --- | --- |
| Brand guidelines | design tokens + rules in `src/styles/global.css` (adapted from the "Claude Type" parchment-gallery style reference) |
| Design tokens | `src/styles/global.css` `@theme` block |
| Analytics / search data | none yet |
| Content source | `src/content/rugs/` (catalog), `docs/source-copy.md` (heritage source text), old dump at `~/Documents/arsalani-rug` (read-only archive) |
| Secrets | none — the Web3Forms access key is public by design |
| Issue tracker | `docs/project/backlog.md` |

## Artifacts in use

☐ product-brief ☐ discovery-audit ☐ user-stories ☑ architecture ☐ data-model-api
☐ design-system ☐ content-seo-plan ☐ measurement-plan ☐ security-privacy
☐ threat-model ☐ test-plan ☐ release-runbook

Deliberate omissions: no threat-model/security-privacy (static site, no auth, no stored
personal data); no data-model-api (no API); test-plan and release-runbook deferred until
CI and hosting are connected.
