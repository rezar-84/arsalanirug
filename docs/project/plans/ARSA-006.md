---
status: active
owner: devops-sre
last-reviewed: 2026-09-01
---

# Plan — ARSA-006 Cloudflare Workers static assets

**Tier:** 1 **Depends on:** ARSA-002, ARSA-003

## Problem

The static Astro build has no committed Cloudflare deployment configuration, so a
Workers Build can deploy without knowing that `dist/` contains the site and generated
image assets.

## Outcome

The connected Cloudflare Workers Build has a reproducible configuration that uploads the
complete Astro `dist/` directory, including `/_astro/` image variants.

## Approach

Add `wrangler.jsonc` at the repository root with the Worker name, compatibility date,
and `assets.directory: ./dist`; keep the dashboard build/deploy commands as
`npm run build` and `npx wrangler deploy`. Update the architecture and charter to match
the selected Workers Static Assets target.

## Alternatives rejected

| Option | Why not |
| --- | --- |
| Cloudflare Pages-only configuration | The owner is using the current Workers Builds form, and Workers Static Assets supports this static site directly. |
| Upload source files or `public/` | Astro must first generate HTML and processed `/_astro/` image variants in `dist/`. |

## Affected surfaces

- **Code:** `wrangler.jsonc`
- **Data:** none
- **Contracts:** Cloudflare Workers Build configuration
- **Docs to update:** `charter.md`, `architecture.md`, backlog, worklog, ADR and review index

## Failure modes

If `npm run build` fails, deployment must not proceed. If `assets.directory` is missing
or points elsewhere, the Worker can publish HTML without generated assets; the config
keeps the path explicit. A bad deployment is reversible by redeploying the previous
Worker version or removing the new config and restoring the prior commit.

## Test strategy

- **Unit:** absent — no unit-testable logic is added.
- **Integration:** absent — no service integration is available locally.
- **Negative cases:** verify the configured directory is `./dist` and that a missing
  referenced asset is not silently treated as present.
- **Manual:** inspect generated HTML and verify referenced local image files exist.

## Rollback

Revert the ARSA-006 commit or restore the previous Worker version in Cloudflare. No
production deploy or rollback is performed in this work item.

## Out of scope

Production deployment, domain attachment, contact-form credentials, and replacement of
the placeholder inquiry channels remain gated by ARSA-002, ARSA-003, and owner approval.
The security audit's `sharp` finding was fixed in this implementation by upgrading the
dependency to `0.35.4` and regenerating the lockfile.

## Assumptions

The owner has selected Cloudflare Workers Static Assets for the connected repository;
this supersedes the earlier host-agnostic/Pages-shaped assumption for this deployment.

## Review

| Role | Verdict | Notes |
| --- | --- | --- |
| architect | Pass | Static output remains the application boundary; only deployment metadata is added. |
| security | Pass with conditions | The exposed dashboard API token must be revoked and replaced before deployment. |
| qa | Pass with conditions | Cloud deployment smoke test remains not run until owner authorises deployment. |
| devops-sre | Pass with conditions | Release runbook and non-production rollout remain pending hosting connection. |
