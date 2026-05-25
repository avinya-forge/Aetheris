# Release Notes


## v0.1.9-ui-audit — Kinetic UI Implementation
- [x] BUG: mapbox-gl-not-initialized | src/components/map/atlas.tsx
- [x] BUG: timeline-not-integrated | src/main.jsx
- [x] BUG: ghost-cards-unrendered | src/components/map/atlas.tsx
- [x] BUG: timeline-non-interactive | src/components/map/timeline.tsx
- [x] BUG: missing-responsive-layout | src/main.jsx


## v0.1.9-frontend — Frontend Core Logic Completion
- [x] TASK: sync-logic-slap | script/run.sh
- [x] TASK: architectural-sync | repo
- [x] TASK: standardize-schema-naming | lib/schema/
- [x] TASK: implement-caveman-skill | .claude/caveman.json
- [x] TASK: bootstrap-frontend | package.json, vite.config.js
- [x] TASK: init-mapbox-gl | src/components/map/atlas.tsx
- [x] TASK: implement-chromodynamic-logic | src/lib/chromodynamic.js
- [x] TASK: design-vector-glyphs | src/assets/glyphs/index.svg
- [x] TASK: implement-zoom-logic | src/lib/zoom-controller.js
- [x] TASK: render-3d-map-timeline | src/components/map/timeline.tsx
- [x] TASK: render-ghost-cards | src/components/ui/ghost-card.tsx
- [x] TASK: implement-events-service | src/lib/events-service.js
- [x] TASK: implement-synthesis-service | src/lib/synthesis-service.js
- [x] TASK: implement-ghost-card-service | src/lib/ghost-card-service.js
- [x] TASK: implement-health-service | src/lib/health-service.js
- [x] TASK: execute-visual-audit | backlog.md
- [x] TASK: fix-visual-bug-1 | src/
- [x] TASK: fix-cataloged-bugs | src/
- [x] TASK: fix-main-jsx-render-bug | src/main.tsx
- [x] TASK: configure-cloudflare-pages | .github/workflows/deploy.yml
- [x] TASK: deploy-cloudflare-workers | functions/edge-proxy.js
- [x] TASK: configure-cloudflare-kv | wrangler.toml
- [x] TASK: validate-offline-pwa | script/sw.js
- [x] TASK: implement-invite-gate | src/lib/invite.js
- [x] TASK: configure-cloudflare-access | cloudflare-access.json
- [x] TASK: wire-cloudflare-analytics | src/index.html
- [x] TASK: write-beta-onboarding | docs/beta-guide.md
- [x] TASK: convert-tests-to-esm | tests/
- [x] TASK: flatten-repository-logic | lib/, src/lib/
- [x] TASK: enforce-test-standards | tests/
- [x] TASK: implement-coverage-gate | script/test.js
- [x] TASK: resolve-version-drift | package.json
- [x] TASK: inject-worker-deterministic-time | functions/worker.mjs

## v0.1.9 — Arch Sync & Hierarchy Flattening
- [x] TASK: flatten-repository-logic | Flattened lib/ and src/lib/ into single-level directories for SSOT compliance.
- [x] TASK: convert-tests-to-esm | Refactored all 63+ tests to use ESM import syntax.
- [x] TASK: enforce-test-standards | Updated all assert calls to include mandatory descriptive failure messages (3+ arguments).
- [x] TASK: implement-coverage-gate | Integrated c8 coverage tracking with a strict 90% line coverage failure gate.
- [x] TASK: resolve-version-drift | Synchronized package.json and .state to version 0.1.9.
- [x] TASK: inject-worker-deterministic-time | Refactored Worker entry and Ingest cycle to support injectable time for deterministic testing.
- [x] TASK: fix-atlas-component-extension | Verified src/components/map/atlas.tsx naming.
- [x] TASK: verify-service-worker-caching | Confirmed offline PWA caching.

## v0.1.8 — E2E Verification
- [x] TASK: add-e2e-playwright-tests | Target: tests/e2e.spec.js | I/O: url -> status | Assert: map container renders | DONE
- [x] TASK: implement-github-actions-playwright | Target: .github/workflows/ci.yml | I/O: push -> run e2e | Assert: e2e job runs | DONE
