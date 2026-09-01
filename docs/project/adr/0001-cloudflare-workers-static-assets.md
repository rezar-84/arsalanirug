---
status: Proposed
owner: architect
last-reviewed: 2026-09-01
---

# ADR-0001 — Use Cloudflare Workers Static Assets

## Context

The site is an Astro static build. Its generated HTML, CSS, fonts, and responsive image
variants are emitted to `dist/`. The owner selected Cloudflare's current Workers Builds
flow for the repository.

## Decision

Deploy the static build through the `arsalanirug` Worker using Wrangler Static Assets
with `assets.directory` set to `./dist`. The build runs `npm run build`; Workers Builds
publishes with `npx wrangler deploy`.

## Alternatives considered

- Cloudflare Pages: still viable, but would require changing the currently selected
  Workers Build project and dashboard flow.
- A server runtime or CMS: rejected because the site is intentionally fully static.

## Consequences

The repository must keep `wrangler.jsonc` in sync with the build output. Static assets
are uploaded with the Worker, including Astro's hashed `/_astro/` image files. Production
deployment remains a human-approved action.

## Status and approval

Proposed pending the required human approval for the production hosting choice and
deployment.
