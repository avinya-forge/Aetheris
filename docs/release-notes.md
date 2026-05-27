# Release Notes


## v0.1.9-ui-audit — Kinetic UI Implementation
- [x] BUG: mapbox-gl-not-initialized | src/components/map/atlas.tsx
- [x] BUG: timeline-not-integrated | src/main.jsx
- [x] BUG: ghost-cards-unrendered | src/components/map/atlas.tsx
- [x] BUG: timeline-non-interactive | src/components/map/timeline.tsx
- [x] BUG: missing-responsive-layout | src/main.jsx


## Phase 2: Nowcasting & AQI Upgrades (COMPLETED)
- [x] TASK: implement-aqi-api | Target: lib/open-meteo-client.ts | I/O: lat/lon -> AQI | Assert: fetches AQI | LOC: ~20
- [x] TASK: implement-nowcast-in-ingest | Target: functions/ingest-cycle.js | I/O: staleEvents -> interpolated | Assert: processes stale data via nowcaster | LOC: ~30
- [x] TASK: render-nowcast-badge | Target: src/components/ui/ghost-card.tsx | I/O: interpolated -> Badge | Assert: renders 'Estimated' badge | LOC: ~10

## Phase 6: Urgent Bug Hunt & Stability (CRITICAL) (COMPLETED)
- [x] TASK: fix-sw-cache-fallback | Target: script/sw.js | I/O: fetch -> cache/network | Assert: network-first fallback logic exists | LOC: ~10
- [x] TASK: fix-edge-proxy-types | Target: functions/edge-proxy.js | I/O: data -> valid | Assert: strict payload type checking | LOC: ~5
- [x] TASK: fix-run-sh-errors | Target: script/run.sh | I/O: err -> exit 1 | Assert: better error handling for npm commands | LOC: ~5
- [x] TASK: fix-chromodynamic-bounds | Target: src/lib/chromodynamic.js | I/O: kpIndex<0 -> throw/clamp | Assert: handles negative input | LOC: ~5
- [x] TASK: fix-ghost-card-props | Target: src/components/ui/ghost-card.tsx | I/O: undefined -> default | Assert: gracefully handles missing title/likelihood | LOC: ~5
- [x] TASK: fix-atlas-mapbox-error | Target: src/components/map/atlas.tsx | I/O: token -> map error | Assert: error boundary or catch for invalid mapbox token | LOC: ~10
- [x] TASK: fix-atlas-memory-leak | Target: src/components/map/atlas.tsx | I/O: unmount -> clean | Assert: no unhandled promise rejection/leak on unmount | LOC: ~15

## v0.1.9-arch-sync — Future Maintenance
- [x] TASK: improve-branch-coverage | Target: functions/ingest-cycle.js | Assert: branch cov > 80%
- [x] TASK: migrate-lib-parser-to-esm | Target: lib/parser.ts | Assert: consistency

## Phase 0: Foundation — Core Logic Engine (DONE)
- [x] EPIC: Data Processing Pipeline | 14 modules (cluster, dedup, synth) | DONE
- [x] EPIC: Schema Definitions | 11 JSON Schemas (standardized) | DONE
- [x] EPIC: Temporal Intelligence | Timeline store, traversal, cones | DONE
- [x] EPIC: Infrastructure & Docs | sync, start, test, status | DONE

## Phase 1: Architectural Sync & Standards (DONE)
- [x] TASK: sync-logic-slap | Target: script/run.sh | I/O: slap -> logic | Assert: clean sync | DONE
- [x] TASK: architectural-sync | Target: repo | I/O: audit -> pristine | Assert: 100% test pass, named exports | DONE
- [x] TASK: standardize-schema-naming | Target: lib/schema/ | I/O: camelCase exports | Assert: consistent across 11 files | DONE
- [x] TASK: implement-caveman-skill | Target: .claude/caveman.json | I/O: profile -> simple language | Assert: active | DONE

## Phase 4: Frontend — Kinetic Atlas UI (DONE)

### Epic 4.1: Frontend Bootstrap
- [x] TASK: bootstrap-frontend | Target: package.json, vite.config.js | I/O: void -> DevServer | Assert: npm run dev starts, 0 err | DONE
- [x] TASK: init-mapbox-gl | Target: src/components/map/atlas.tsx | I/O: Config -> MapInstance | Assert: 0 err, renders | DONE

### Epic 4.2: Chromodynamic Visual System
- [x] TASK: implement-chromodynamic-logic | Target: src/lib/chromodynamic.js | I/O: KpIndex -> ColorSpec | Assert: 0 err, >95% cov | DONE
- [x] TASK: design-vector-glyphs | Target: src/assets/glyphs/index.svg | I/O: void -> SVG | Assert: clean-SVG, no raster | DONE
- [x] TASK: implement-zoom-logic | Target: src/lib/zoom-controller.js | I/O: ZoomLevel -> LayerVisibility | Assert: 0 err, >95% cov | DONE

### Epic 4.3: Timeline Interface
- [x] TASK: render-3d-map-timeline | Target: src/components/map/timeline.tsx | I/O: Props -> ReactElement | Assert: 0 err, >95% cov | DONE
- [x] TASK: render-ghost-cards | Target: src/components/ui/ghost-card.tsx | I/O: GhostCard -> ReactElement | Assert: 0 err, opacity<1, shows% | DONE

### Epic 4.4: Frontend Data Service Layer
- [x] TASK: implement-events-service | Target: src/lib/events-service.js | I/O: Filters -> EventArray | Assert: 0 err, filters by impact | DONE
- [x] TASK: implement-synthesis-service | Target: src/lib/synthesis-service.js | I/O: ClusterId -> Brief | Assert: ≤30 words, 0 err | DONE
- [x] TASK: implement-ghost-card-service | Target: src/lib/ghost-card-service.js | I/O: void -> GhostCardArray | Assert: all likelihood ≤95%, isSpeculative=false | DONE
- [x] TASK: implement-health-service | Target: src/lib/health-service.js | I/O: void -> HealthStatus | Assert: 0 err, returns version+uptime | DONE

### Epic 4.5: Visual Audit & Bug Hunt
- [x] TASK: execute-visual-audit | Target: backlog.md | I/O: void -> TaskList | Assert: all bugs cataloged | DONE
- [x] TASK: fix-visual-bug-1 | Target: src/ | I/O: Bug -> Fix | Assert: map renders | DONE
- [x] TASK: fix-cataloged-bugs | Target: src/ | I/O: BugList -> CleanCode | Assert: 0 known visual bugs | DONE
- [x] TASK: fix-main-jsx-render-bug | Target: src/main.tsx | I/O: Bug -> CleanCode | Assert: Atlas map renders | DONE

## Phase 5: Zero-Cost Deployment — Edge + Beta (PLANNED)

### Epic 5.1: Cloudflare Edge Deployment
- [x] TASK: configure-cloudflare-pages | Target: .github/workflows/deploy.yml | I/O: git push -> CF Pages | DONE
- [x] TASK: deploy-cloudflare-workers | Target: functions/edge-proxy.js | I/O: Request -> Response | DONE
- [x] TASK: configure-cloudflare-kv | Target: wrangler.toml | I/O: Data -> KVStore | DONE
- [x] TASK: validate-offline-pwa | Target: script/sw.js | I/O: void -> OfflineApp | DONE

### Epic 5.2: Limited Beta Access
- [x] TASK: implement-invite-gate | Target: src/lib/invite.js | I/O: Code -> Boolean | DONE
- [x] TASK: configure-cloudflare-access | Target: cloudflare-access.json | I/O: Email -> AccessGrant | DONE
- [x] TASK: wire-cloudflare-analytics | Target: src/index.html | I/O: PageView -> Analytics | DONE
- [x] TASK: write-beta-onboarding | Target: docs/beta-guide.md | I/O: void -> Guide | DONE

## Architectural Sync & Drift Resolution (COMPLETED)
- [x] TASK: convert-tests-to-esm | Target: tests/ | I/O: require -> import | Assert: all tests use ES imports | DONE
- [x] TASK: flatten-repository-logic | Target: lib/, src/lib/ | I/O: nested -> flat | Assert: 0 nested subfolders | DONE
- [x] TASK: enforce-test-standards | Target: tests/ | I/O: assert -> assert(val, val, msg) | Assert: all asserts have 3+ args | DONE
- [x] TASK: implement-coverage-gate | Target: script/test.js | I/O: test -> test + c8 | Assert: fails if < 90% | DONE
- [x] TASK: resolve-version-drift | Target: package.json | I/O: 0.1.8 -> 0.1.9 | Assert: matches .state | DONE
- [x] TASK: inject-worker-deterministic-time | Target: functions/worker.mjs | I/O: Date.now() -> injection | Assert: deterministic | DONE

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
