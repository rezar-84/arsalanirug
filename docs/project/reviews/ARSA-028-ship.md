---
status: active
owner: "Claude Opus 5 (reviewing agent)"
last-reviewed: 2026-09-16
---

# Review — ARSA-028 Remove the patchwork rugs and category

**Stage:** ship **Tier:** 1
**Reviewed:** commit range `1b94af6..9e3d235` (branch commit `2dea973`, merge commit
`9e3d235`, merged to local `main`, **not pushed**). Files: `src/i18n/ui.ts`,
`public/llms.txt`, `public/llms-full.txt`, deletion of
`src/content/rugs/{en,fa}/{aa,bb,hh,colorful-patch-work}.md` and
`src/assets/rugs/{aa,bb,hh,colorful-patch-work}/`. Surrounding code read:
`src/content.config.ts`, `src/components/FilterBar.astro`, `src/features/HomePage.astro`,
`src/pages/**/categories/[category].astro`, `astro.config.mjs`, `nginx.conf`,
`scripts/migrate.mjs`. Built and ran the site output: `npm run build` (exit 0, 487 pages),
`npx astro check` (0/0/0), `node scripts/audit.mjs` (490 pages, 0 errors),
`npx prettier --check .` (fails, see qa), `npm audit --audit-level=high` (0 vulnerabilities).
Inspected the rendered `dist/` — sitemap, homepage, category pages, 404.

**Tier rationale:** `charter.md` risk defaults — "Always Tier 1 here: … deleting or
bulk-editing catalog content".

---

## product-manager

**Verdict:** Pass with conditions

**Checked:** the owner's instruction ("remove patchworks") against the diff — all four
deleted entries carry `category: patch-work` and two are titled *Chehelteke* (Persian for
patchwork), so the selection matches the ask and nothing outside it was removed; the
scope change was stated to the owner before the commit. Compared the change against
`backlog.md` (no row), `worklog.md` (no entry), `docs/project/reviews/` (no design
review), and the prior decision in `worklog.md:456`/`:460` (ARSA-013, "keep every product
that is live on the old site"). Checked catalog counts and page counts quoted in
`project/` docs against the built output.

**Not checked:** whether the owner wants the four pieces archived rather than deleted, and
whether `selected-available-rugs` is intended to stay as an empty category — both are
owner decisions, not derivable from the repo. No product-brief or user-stories artifact
exists (charter: **Absent**), so there is no acceptance criteria document to check against.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | S3 | `docs/project/backlog.md`, `docs/project/worklog.md`, `docs/project/reviews/` | A Tier 1 catalog deletion was executed and merged to `main` with no backlog row, no worklog entry and no design review — this ship review is the first record of it. | ARSA-013's recorded decision to keep every live product is silently reversed; a later reader cannot reconstruct who asked or why. | Add the backlog row and worklog entry citing the owner's instruction of 2026-09-15; accept this file as the ship record and note the design review as skipped. |
| 2 | S3 | `docs/project/charter.md:67` | The charter states `checks.e2e` verifies "all 535 static pages". The build now produces 490 (490 + the 45 URLs this change removed = 535), so the change made the charter wrong. | The charter is the authoritative command reference; a stale figure invites "did we lose pages?" on every future run. | Drop the hard count or update it to 490. |
| 3 | S3 | `docs/project/backlog.md:25` | ARSA-005 says "the 29 rugs". The catalog held 32 before this change and holds 28 after — the row was already stale and is still wrong. | Copy work scoped against a wrong count. | Correct to 28, or remove the number. |

### Conditions

- [ ] Backlog row + worklog entry for ARSA-028 → ARSA-028
- [ ] Charter page count and ARSA-005 rug count corrected → ARSA-029

---

## architect

**Verdict:** Pass with conditions

**Checked:** the removal mechanism — `categorySlugs` (`src/i18n/ui.ts:28`) is a `const`
tuple consumed by `z.enum()` at `src/content.config.ts:16`, so deleting a member makes any
surviving entry in that category a build failure rather than a silent orphan; `astro check`
and the build both pass, which is positive evidence that no content references
`patch-work`. Traced every consumer of `categorySlugs`
(`FilterBar.astro:17`, `HomePage.astro:38,121`, and the nine `categories/[category].astro`
`getStaticPaths`) to confirm the route set shrinks consistently rather than leaving a
route with no label. Read `scripts/migrate.mjs` for re-run behaviour.

**Not checked:** no ADR is required for this change and none was written — the decision is
a content removal on the owner's instruction, not a structural one. `architecture.md`'s
"~30 rugs" (line 21, 100) still holds at 28 and was not touched.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 4 | S3 | `scripts/migrate.mjs:108-115` | `CATEGORY_MAP` emits `boutique`, `selected-available` and `patchwork` — none of which are members of `categorySlugs`. Removing `patch-work` adds a third dead value but the divergence predates this change. | The charter's risk defaults assert the Drupal migration is "one-off and re-runnable from the preserved dump"; a re-run would now emit content that fails the zod enum at `src/content.config.ts:16`, so that assertion is false. | Either align `CATEGORY_MAP` with `categorySlugs` and drop the `patch work` row, or mark the script archival in the charter and stop claiming re-runnability. |

---

## seo

**Verdict:** Block

**Checked:** every URL the change removes, enumerated from the route structure and
confirmed against `dist/` before and after: `/content/{aa,bb,hh,colorful-patch-work}` and
`/categories/patch-work`, each across all nine locales — **45 URLs**. Checked
`astro.config.mjs:15-22`, whose own comment records that `/content/<slug>` and
`/categories/<slug>` "match the old Drupal aliases exactly", i.e. these were live URLs on
the retired site; checked the existing redirect map for precedent (`/boutique-rugs`,
`/gallery`, `/news` all redirect to a parent rather than 404). Checked `nginx.conf:43-48`
(404 handling, no catch-all redirect). Checked the regenerated sitemap and
`public/llms-full.txt` for stale entries — none; hreflang alternates on surviving pages
are complete and reciprocal (9 + `x-default`). Ran the link crawl (`scripts/audit.mjs`,
490 pages, 0 errors) — no internal link points at a removed URL.

**Not checked:** whether these URLs currently hold index entries or inbound links.
`charter.md` records **Analytics / search data: none yet** and no `content-seo-plan`
artifact exists — both **Absent**, so the size of the loss is unmeasured, not zero. That
absence is why finding 5 is rated by the removal, not by observed traffic.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 5 | **S2** | `astro.config.mjs:18-22` | 45 public URLs are removed with no redirect map, on a site that deliberately preserves the retired site's alias structure and redirects its other retired paths to a parent. | Inbound links and retained index entries for the four products and the patchwork category land on the 404 page instead of the catalog; the equity the alias-preservation work existed to keep is dropped for those paths. Rated per the seo playbook: "Removing or moving a small number of URLs with no redirect map → S2". | Add to `redirects`: `/categories/patch-work` → `/categories/boutique-rugs` or `/products`, and the four `/content/<slug>` paths → `/products`; rebuild. Or record a deliberate 410/404 decision in an ADR with the owner's waiver. |
| 6 | S3 | `src/i18n/ui.ts:28-34`, `public/llms.txt:19-20` | `selected-available-rugs` holds 0 rugs yet stays in `categorySlugs`, so nine `/categories/selected-available-rugs` pages build, enter the sitemap, and render "0 pieces / No rugs match this selection" — while `llms.txt`, edited by this change, still advertises the category. This change removed exactly this condition for `patch-work` and left the identical one untouched. | Nine thin, indexable pages and a machine-readable index pointing at an empty collection. | Populate it, drop it from `categorySlugs` (add a redirect if so), or exclude zero-count categories from `getStaticPaths` and the sitemap. |

---

## qa

**Verdict:** Pass with conditions

**Checked:** ran the charter's check sequence in order. `checks.format`
(`npx prettier --check .`) — **fails**, 180 files including `src/i18n/ui.ts`;
confirmed pre-existing by checking the file's blob at `1b94af6`, which also fails.
`checks.lint`, `checks.unit`, `checks.integration`, `checks.contract` — **absent** per the
charter. `checks.typecheck` (`npx astro check`) — 0 errors, 0 warnings, 0 hints across 156
files. `checks.build` (`npm run build`) — exit 0, 487 pages. `checks.scan`
(`npm audit --audit-level=high`) — 0 vulnerabilities. `checks.a11y` / `checks.e2e`
(`node scripts/audit.mjs`) — 490 pages, 0 errors. Verified the claims made in the commit
message are the ones actually run, and checked the built output for the negative case:
no `patchwork`/`patch-work` string survives anywhere in `dist/`.

**Not checked:** there is no test suite to add a regression test to (charter: unit,
integration and contract all **absent**), so nothing guards against a future change
re-introducing a category with no entries — the condition in finding 6. Manual
verification in a browser was not performed; the evidence here is the built artifact and
the audit script.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 7 | S3 | repo-wide; `charter.md:58` | `checks.format` is a charter-named stage that has never been green (180 files). Pre-existing, not introduced here. | A named check that always fails cannot catch a regression, and trains the next run to skip it. | Run `npm run format:write` as its own tracked item, or narrow the check's scope. |
| 8 | S3 | commit `2dea973` | `checks.format` and `checks.scan` were not run before the commit and merge; the commit message names only build, `astro check` and the audit. | A Tier 1 change merged on a partial check sequence. The qa playbook rates "a stage the charter names, not run, with no reason given" S2; rated S3 because both stages have now been run and recorded above, so the unstated-skip condition no longer holds — the claims made were accurate for what they named, and no verification was claimed that was not performed. | Run the full sequence before merge on Tier 1/2; nothing further outstanding for this change. |

### Conditions

- [ ] `checks.format` brought green or rescoped → ARSA-030

---

## localisation

**Verdict:** Pass

**Checked:** all nine locale blocks in `src/i18n/ui.ts` for the removed `patch-work`
label — en:52, fa:166, tr:273, es:330, ja:387, de:444, and the single-line maps for
ru:501, ar:532, zh:563 — reading the diff line by line to confirm each locale lost exactly
one key and nothing else. The `satisfies Record<CategorySlug | "all", string>` constraint
on every block makes this exhaustive by construction: a locale that kept the key, or one
that lost a different key, fails `astro check`, which passes with 0 errors. Confirmed
`fa` and `ar` still render `dir="rtl"` with the Vazirmatn/Amiri stack (`audit.mjs` checks
`lang`/`dir` on all 490 pages). Confirmed the FA catalog stayed symmetric with EN: 28
entries each, identical category distribution.

**Not checked:** nothing was translated in this change — it only removes strings — so no
human translation review is required and none was sought.

**Findings:** none.

---

## ux-designer

**Verdict:** Pass

**Checked:** the surfaces the removal changes, in the built output. Home category pills
(`HomePage.astro:121`) render four, not five — `selected-available-rugs` is filtered out at
`counts[c] > 0`, which is existing behaviour, not a regression from this change. Home
showcase still renders a full hero + six cards (`dist/index.html`: 7 distinct
`/content/` links); the slot the worklog records as a Patchwork at ARSA-024 is now an
Oushak, produced by the existing selection logic with no gap in the grid. `FilterBar.astro:17`
keeps the active category visible even when empty, so the empty category page still offers
the full filter set and a "Clear" control rather than a dead end. 404 page exists and
carries navigation.

**Not checked:** no interactive/browser session; responsive behaviour at the charter's
360px–1400px range was not re-checked, because no layout, component or token changed —
only the number of items feeding existing lists.

**Findings:** none. The empty-category surface is rated once, under seo finding 6.

---

## accessibility

**Verdict:** Pass

**Checked:** `node scripts/audit.mjs` across all 490 built pages — DOCTYPE, `lang`, `dir`,
`<title>`, viewport meta and image `alt` on every page, 0 errors, including the pages whose
content changed (home, `/products`, the four surviving category indexes, and their eight
non-EN locale variants).

**Not checked:** keyboard path, focus order and visibility, contrast, and screen-reader
behaviour — none were re-verified, and the charter records **Assistive technologies
supported: none tested — a gap**. That gap is pre-existing and already recorded; this
change adds no new interactive control, so it does not widen it.

**Findings:** none.

---

## copywriter

**Verdict:** Pass

**Checked:** the only user-visible text this change writes rather than deletes —
`public/llms.txt:20`, where the category list now reads "oushak, moshk-abad,
new-moshk-abad, selected-available-rugs". Confirmed it stays truthful about what the site
contains, states no price, and makes no heritage or provenance claim (the charter's
project-specific copywriter checks). Confirmed no rug body copy, heritage text or brand
text was touched, and that the removed entries carried TODO placeholder bodies rather than
owner-written copy.

**Not checked:** the surviving FA rug titles and descriptions — unchanged here and already
tracked as ARSA-004.

**Findings:** none. That `llms.txt` still lists a category with nothing in it is rated
once, under seo finding 6.

---

## security

**Verdict:** Pass

**Checked:** the deleted files for anything that should not simply vanish — the eight
markdown entries hold only frontmatter (title, sku, dimensions, category, material, image
paths) and placeholder bodies, and the five deleted JPEGs are catalog photographs; no
credential, key or personal data was removed or exposed. No auth, input handling, session,
secret or config surface is touched by the diff. `npm audit --audit-level=high` reports 0
vulnerabilities. Confirmed `src/components/ContactForm.astro` and the Web3Forms key are
untouched.

**Not checked:** no threat model exists — a deliberate charter omission for a static site
with no auth and no stored personal data, recorded there with its reasoning. This review
accepts that omission rather than re-litigating it.

**Findings:** none.

---

## devops-sre

**Verdict:** Pass with conditions

**Checked:** the delivery state of the reviewed commits and the recovery path. `main` is
2 commits ahead of `origin/main`; `git push origin main` failed with
`Permission denied (publickey)` and `ssh-add -l` reports no identities, so the merge
exists only on this machine. Verified the rollback is real, not assumed: the deleted image
blobs are retained (`src/assets/rugs/aa/01.jpg` = 779,139 bytes at `9e3d235^1`) and the
markdown is recoverable, so `git revert -m 1 9e3d235` restores all thirteen files. Read
`nginx.conf` and the Dockerfile path — the build is unchanged, and the generated
`public/llms-full.txt` is committed in step with the content it describes.

**Not checked:** the revert was not executed. No deploy was performed or observed;
production is **not yet connected** (`charter.md` environments; ARSA-006 is In review).

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 9 | S3 | local `main` vs `origin/main` | The reviewed merge is unpushed; the remote still has the patchwork rugs. | The state reviewed here is not the state a deploy or another machine would take. Rated S3, not S1, deliberately: the devops-sre playbook rates an unexecuted rollback on a Tier 1 change S1, but that rung assumes a deployed environment, and by the ladder's own rule — rate by consequence if it reaches users — nothing is deployed, so no user can be reached. Recording the calibration mismatch as `02-role-reviews.md` requires. | Owner loads the SSH key and pushes, or the change stays local deliberately and the worklog says so. |

### Conditions

- [ ] Push `main` to `origin`, or record that it is intentionally held → ARSA-028

---

## Roles not engaged

| Role | Why not |
| --- | --- |
| brand-designer | No design token, layout, colour, radius or imagery rule changed. The home grid composition shifted by one card, but it is produced by the existing ARSA-024 selection logic and stays inside the parchment-gallery system; there is no new visual decision to review. |
| cro-analyst | No conversion path, form, CTA, pricing surface or funnel step is touched. The catalog is smaller, which is a scope question — rated under product-manager, not duplicated here. |
| privacy-legal | No personal data, tracking, consent, retention or legal text is involved; the site holds none (charter). The one public claim this change edits is `llms.txt`, reviewed by copywriter. |

---

## Outcome

**Overall:** **Block**

**Blocking findings:**

- **seo #5 (S2)** — 45 public URLs removed with no redirect map, on a site whose redirect
  policy deliberately preserves the retired Drupal aliases.

**Options:**

1. **Add the redirects** (~6 lines in `astro.config.mjs`): `/categories/patch-work` and the
   four `/content/<slug>` paths → `/products`, rebuild, re-review. Matches the existing
   precedent at `astro.config.mjs:18-22`.
2. **Decide 404/410 is correct** for withdrawn products, record it as an ADR, and have the
   owner waive finding 5 in writing with a tracked follow-up.
3. **Revert the merge** (`git revert -m 1 9e3d235`) and re-plan through intake.

**Recommendation:** option 1. It is the cheapest of the three, it is consistent with a
policy this repo already applies to three other retired paths, and nothing is deployed
yet — so it lands before the first publish rather than after. Option 2 is legitimate but
needs the owner's signature, not the reviewing agent's.

**Waivers:** none. The reviewing agent may not waive its own blocker
(`../../process/02-role-reviews.md`, "On a Block").

| Finding | Waived by | Reason | Follow-up |
| --- | --- | --- | --- |
| — | — | — | — |

---

## Re-review — 2026-09-16

The owner chose option 1 (fix, do not waive). Re-reviewed the fix commit against the
findings above, rebuilt, and re-ran the nginx container to check real HTTP responses.

| # | Role | Sev | Status |
| --- | --- | --- | --- |
| 5 | seo | S2 | **Resolved.** `astro.config.mjs` now redirects the four `/content/<slug>` paths and both withdrawn category paths across all nine locales; `nginx.conf` answers them with real `301`s to the locale's `/products`. Measured: `/content/aa` → 301 `/products`, `/fa/categories/patch-work` → 301 `/fa/products`, `/zh/categories/selected-available-rugs` → 301 `/zh/products`. Stubs are `noindex`, canonical to the target, and absent from the sitemap. |
| 6 | seo | S3 | **Resolved.** Category routes come from `getPopulatedCategories()` (`src/lib/rugs.ts`), so the nine empty `selected-available-rugs` pages no longer build or enter the sitemap; `public/llms.txt:20` no longer advertises the category. The slug stays in `categorySlugs`, so the pages return automatically if the owner fills it (U2). |
| 4 | architect | S3 | **Resolved.** `CATEGORY_MAP` values are now members of `categorySlugs`, the unreachable `"selected-available"` fallback is corrected, and `DROPPED_CATEGORIES` excludes "patch work" products instead of refiling them. `node --check` passes. |
| 1 | product-manager | S3 | **Resolved.** Backlog row ARSA-028 (Done) and a full worklog entry now exist. The missing design review is recorded rather than backfilled — writing one after the fact would be the fake-review anti-pattern. |
| 2 | product-manager | S3 | **Resolved.** `charter.md:67` no longer carries a hard page count. |
| 3 | product-manager | S3 | **Resolved.** ARSA-005 reads 28 rugs. |
| 8 | qa | S3 | **Resolved.** Full check sequence run and recorded in the worklog, all ten stages. |
| 7 | qa | S3 | **Resolved 2026-09-16 by ARSA-030.** `.prettierignore` scopes the check to code, 63 code files formatted, `npx prettier --check .` passes. The built output was diffed to confirm the reformat changes no page content. |
| 9 | devops-sre | S3 | **Open.** Still unpushed — `git push` fails on `Permission denied (publickey)`, which needs the owner's SSH key. |

### Raised during the re-review

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 10 | **S2** | `nginx.conf:43` (as it stood) | `try_files $uri $uri/ $uri.html /index.html =404` reached `/index.html` before `=404`, so **every** unknown or withdrawn URL returned **200 with the homepage** and the `error_page 404` below was unreachable. Found by serving `dist/` through the project's own `nginx:1.27-alpine` image, not by reading the config. Pre-existing since ARSA-026; ARSA-028 is the change that made it bite. | Withdrawn products would never have dropped out of an index, and a visitor following an old link landed on the homepage with no explanation; the custom 404 page had never been shown to anyone. | **Fixed** — the `/index.html` fallback is removed. Measured after: `/this-does-not-exist` → 404 serving "Page not found — Arsalani Rug". |
| 11 | **S2** | `src/i18n/ui.ts:43,100,103` + the other 8 locales; `public/llms.txt:4`; 486 built pages | "in the trade since 1866" / "a family craft since 1866" does not trace to `docs/source-copy.md`, which gives 1866 as Gholamhossein Arsalani's **birth** year and **1910** as the founding of the family weaving business. `llms.txt:44` states it correctly, so the site contradicts itself. Violates the charter's project-specific copywriter check ("dates … must trace to `docs/source-copy.md` or the owner — no invented heritage"). | A materially wrong brand-age claim on every page of a luxury catalogue whose goal is inquiries. | **Resolved 2026-09-16 — confirmed by the owner (Rezar86)**, who is an accepted source for provenance dates under the charter's own copywriter check. Copy unchanged; claim C2 closed with the owner named as its evidence. |

### Outcome of the re-review

**Overall:** Pass with conditions.

The blocking finding (#5) is resolved and verified against real HTTP responses. Finding
#10, found while verifying it, was also S2 and is fixed in the same pass. Finding #11 was
answered by the owner on 2026-09-16 — the charter accepts the owner as a source for
provenance dates, so the claim is sourced and the copy stands unchanged.

### Conditions

- [x] `checks.format` green or rescoped → ARSA-030 (done, 2026-09-16)
- [ ] `main` pushed to `origin` → ARSA-028
- [x] The "since 1866" claim confirmed by the owner, 2026-09-16 → ARSA-029 (closed)
