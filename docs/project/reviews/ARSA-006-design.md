---
status: active
owner: review-board
last-reviewed: 2026-09-01
---

# Review — ARSA-006 Cloudflare Workers static assets

**Stage:** design **Tier:** 1
**Reviewed:** `docs/project/plans/ARSA-006.md`, `wrangler.jsonc`, charter,
architecture, and the current repository state.

## architect

**Verdict:** Pass

**Checked:** Static output boundary, dependency direction, hosting configuration shape,
and rollback choice. The configuration points at the existing Astro build output and
adds no application runtime or dependency.

**Not checked:** A production rollout; it is not authorised in this change.

### Findings

None.

## security

**Verdict:** Pass with conditions

**Checked:** `wrangler.jsonc` for credentials, dashboard token handling in the plan,
and whether static assets introduce an application input or authorisation surface.

**Not checked:** The Cloudflare token's actual permissions; it is external to this repo.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | S3 | Cloudflare dashboard token | A token was exposed in the conversation and must be rotated before deployment. | The credential may be usable by an unauthorised party. | Revoke it and create a replacement token. |

## qa

**Verdict:** Pass with conditions

**Checked:** Acceptance criteria and negative cases in the plan; local verification path
for generated HTML and image files.

**Not checked:** Cloudflare's deployed Worker; deployment is not part of this commit.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | S2 | Cloudflare deployment | No deployed smoke check can be performed before production deployment is authorised. | Missing images could remain undetected in the real environment. | Run post-deploy asset smoke checks as a separately authorised release step. |

## devops-sre

**Verdict:** Pass with conditions

**Checked:** Build/deploy commands, asset directory, reversibility, and operational
documentation. `dist/` is the correct generated asset boundary.

**Not checked:** Actual Cloudflare rollout, observability, and rollback execution.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | S2 | Cloudflare dashboard / `docs/project/architecture.md` | A non-production rollout and rollback have not yet been executed. | Deployment behaviour remains unproven. | Perform an authorised preview rollout and smoke test before production. |

## Outcome

**Overall:** Pass with conditions

**Blocking findings:** none for committing configuration; deployment conditions remain
open and are not waived by this review.

**Waivers:** none.
