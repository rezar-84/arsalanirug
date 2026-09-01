---
status: active
owner: product-manager
last-reviewed: 2026-09-01
---

# Assumptions, unknowns & risks — arsalanirug

> The pressure valve that makes the no-fabrication rule workable
> (`../process/06-evidence-and-claims.md`). When a fact is needed and not available, the
> answer is a row here — never an invented value.

## Open assumptions

| # | Assumption | Why needed | What breaks if wrong | Who can confirm | Asked? | Since |
| --- | --- | --- | --- | --- | --- | --- |
| A6 | The owner-provided Toronto tel (+1 647-879-5149) is also the WhatsApp business line (it is now the only number on the site, so WhatsApp links use it) | inquiry CTAs | WhatsApp taps reach a non-WhatsApp line | Rezar86 | flagged in reply | 2026-09-01 |
| A1 | Deploy target is Cloudflare Workers Static Assets (owner selected the current Workers Builds flow 2026-09-01); the earlier host-agnostic/Pages-shaped note is superseded | ARSA-006 needs a target | deploy config/runbook aimed at the wrong host | Rezar86 | logged here | 2026-09-01 |
| A2 | The Drupal dump's dimensions are centimetres where `length_units` says so (spot-checked once against a photo filename) | specs tables show cm | wrong published rug sizes | Rezar86 | no | 2026-09-01 |
| A5 | "Use our own products" did not include showing prices — the live site displays prices, but the owner chose price-on-request at project start; the newer instruction was read as titles/URLs/logo, not a price reversal | rug pages show "Price on request" | owner actually wants prices shown | Rezar86 | flagged in reply | 2026-09-01 |
| A4 | The heritage narrative from the old About page (names, 1866/1910/1913/1987 dates, 302-toman anecdote, Hamid & Vahid as current leads) is accurate and approved for publication | heritage page EN+FA | published family-history claims wrong | Rezar86 | no | 2026-09-01 |

## Unknowns

| # | Question | Blocks | How we would find out | Owner |
| --- | --- | --- | --- | --- |
| U1 | The actual WhatsApp business number | ARSA-002 (links point at the old landline) | ask Rezar86 | Rezar86 |
| U2 | Which rugs are still physically in stock (data is from 2016–2019) | honest "Selected & Available" labelling | owner inventory check | Rezar86 |
| U3 | Persian brand voice preferences (formal دوم شخص جمع assumed) | ARSA-004 | owner review of drafted FA copy | Rezar86 |

## Unverified claims

| # | Claim | Where it appears | Evidence needed | From whom | Status |
| --- | --- | --- | --- | --- | --- |
| C1 | "some topline carpets in domestic and foreign museums" (old About page; toned to "the finest among them hang in museums" on /heritage) | `src/features/HeritagePage.astro` | which museums, or owner's confirmation to keep the claim | Rezar86 | open |

## Risks

| # | Risk | Impact | Likelihood | Mitigation / early warning | Owner |
| --- | --- | --- | --- | --- | --- |
| R1 | Contact form silently undelivered (placeholder Web3Forms key) if deployed before ARSA-003 | lost inquiries | high if deployed early | ARSA-006 depends on ARSA-003 in the backlog | devops-sre |
| R2 | 2016 photo quality undercuts the luxury positioning | weaker brand perception | medium | ARSA-011 re-shoot; hand-picked featured set uses the best shots | brand-designer |
| R3 | FA pages showing EN titles (fallback) read as unfinished to Persian visitors | brand perception in the home market | medium | ARSA-004 translation pass before launch promotion | copywriter |
| R4 | `sharp` dependency has one high-severity audit finding and the available fix is a breaking upgrade | vulnerable build dependency remains in the deployment toolchain | unknown | owner decision and reviewed dependency upgrade before release | security |

## Accepted risks

| # | Risk | Why accepted | Accepted by | Review on |
| --- | --- | --- | --- | --- |

## Resolved

| # | Was | Resolution | Date | What changed as a result |
| --- | --- | --- | --- | --- |
| A3 | Old contact details (Qom landline, Tehran/Qom bazaar addresses) still current | Superseded by owner instruction 2026-09-01: Tehran/Qom removed; Izmir + LA kept; Toronto (75 Oneida Cres, Richmond Hill, ON) + tel +1 647-879-5149 added | 2026-09-01 | contact/footer/schema/llms updated in all nine locales |
