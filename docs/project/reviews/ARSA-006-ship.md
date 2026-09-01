---
status: blocked
owner: review-board
last-reviewed: 2026-09-01
---

# Review — ARSA-006 Cloudflare Workers static assets

**Stage:** ship **Tier:** 1
**Reviewed:** working-tree diff, `wrangler.jsonc`, generated `dist/`, local checks,
and dependency audit output.

## architect

**Verdict:** Pass

**Checked:** The deployment config points at the existing Astro static output and adds
no runtime, database, or application dependency.

**Not checked:** Cloudflare live routing; no deployment was performed.

### Findings

None.

## security

**Verdict:** Pass

**Checked:** The diff and repository for committed credentials, the Worker asset config,
and the actual `npm audit --audit-level=high` output.

**Not checked:** The replacement Cloudflare token's permissions; the exposed token must
be revoked outside the repository.

### Findings

None. `sharp` is now `0.35.4`; `npm audit --audit-level=high` reports 0 vulnerabilities.

## qa

**Verdict:** Pass with conditions

**Checked:** Build output, generated image references, and the negative condition that
the Worker asset directory must be `./dist`.

**Not checked:** Deployed URL, cache behaviour, and production image requests.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | S2 | Cloudflare deployment | No external smoke test exists because deployment is not authorised. | A deployment-specific asset regression could remain undetected. | Run preview and production smoke checks as an authorised release step. |

## devops-sre

**Verdict:** Pass with conditions

**Checked:** Build/deploy commands, `assets.directory`, rollback description, and the
absence of a production deploy.

**Not checked:** Actual rollout, external health, logs, or rollback execution.

### Findings

| # | Sev | Location | Finding | Consequence | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | S2 | Cloudflare Worker | Preview deployment and rollback are not yet executed. | Operational behaviour is unproven. | Perform an authorised non-production rollout before release. |

## Outcome

**Overall:** Pass with conditions

**Blocking findings:** none. Preview/production rollout and rollback remain conditions
for the separately authorised deployment release.

**Waivers:** none; S1 findings cannot be waived by an agent.
