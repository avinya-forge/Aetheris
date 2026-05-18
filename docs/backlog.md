# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

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

---

## Phase 4: Frontend — Kinetic Atlas UI (SCHEDULED)
*All tasks blocked by frontend environment bootstrap.*

### Epic 4.1: Frontend Bootstrap
*Goal: React + Vite PWA environment wired to lib/ logic.*
- [x] TASK: bootstrap-frontend | Target: package.json, vite.config.js | I/O: void -> DevServer | Assert: npm run dev starts, 0 err | LOC: ~80
- [x] TASK: init-mapbox-gl | Target: src/components/map/atlas.tsx | I/O: Config -> MapInstance | Assert: 0 err, renders | LOC: ~60

### Epic 4.2: Chromodynamic Visual System
*Goal: vector-only UI that shifts atmosphere based on data state.*
- [x] TASK: implement-chromodynamic-logic | Target: src/lib/ui/chromodynamic.js | I/O: KpIndex -> ColorSpec | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: design-vector-glyphs | Target: src/assets/glyphs/index.svg | I/O: void -> SVG | Assert: clean-SVG, no raster | LOC: ~100
- [x] TASK: implement-zoom-logic | Target: src/lib/ui/zoom-controller.js | I/O: ZoomLevel -> LayerVisibility | Assert: 0 err, >95% cov | LOC: ~30

### Epic 4.3: Timeline Interface
*Goal: temporal traversal UI replacing list-scroll paradigm.*
- [x] TASK: render-3d-map-timeline | Target: src/components/map/timeline.tsx | I/O: Props -> ReactElement | Assert: 0 err, >95% cov | LOC: ~120
- [x] TASK: render-ghost-cards | Target: src/components/ui/ghost-card.tsx | I/O: GhostCard -> ReactElement | Assert: 0 err, opacity<1, shows% | LOC: ~50

### Epic 4.4: Frontend Data Service Layer
*Goal: bridge lib/ pipeline output to React UI components via typed service hooks.*
- [x] TASK: implement-events-service | Target: src/lib/services/events-service.js | I/O: Filters -> EventArray | Assert: 0 err, filters by impact | LOC: ~50
- [x] TASK: implement-synthesis-service | Target: src/lib/services/synthesis-service.js | I/O: ClusterId -> Brief | Assert: ≤30 words, 0 err | LOC: ~35
- [x] TASK: implement-ghost-card-service | Target: src/lib/services/ghost-card-service.js | I/O: void -> GhostCardArray | Assert: all likelihood ≤95%, isSpeculative=false | LOC: ~35
- [x] TASK: implement-health-service | Target: src/lib/services/health-service.js | I/O: void -> HealthStatus | Assert: 0 err, returns version+uptime | LOC: ~20

### Epic 4.5: Visual Audit & Bug Hunt
- [x] TASK: execute-visual-audit | Target: backlog.md | I/O: void -> TaskList | Assert: all bugs cataloged | LOC: ~0
- [x] TASK: fix-visual-bug-1 | Target: src/ | I/O: Bug -> Fix | Assert: map renders | LOC: ~10
- [x] TASK: fix-cataloged-bugs | Target: src/ | I/O: BugList -> CleanCode | Assert: 0 known visual bugs | LOC: ~100
- [x] TASK: fix-main-jsx-render-bug | Target: src/main.jsx | I/O: Bug -> CleanCode | Assert: Atlas map renders | LOC: ~10

---

## Phase 5: Zero-Cost Deployment — Edge + Beta (PLANNED)

### Epic 5.1: Cloudflare Edge Deployment
- [x] TASK: configure-cloudflare-pages | Target: .github/workflows/deploy.yml | I/O: git push -> CF Pages | Assert: auto-deploy on main push | LOC: ~40
- [x] TASK: deploy-cloudflare-workers | Target: functions/edge-proxy.js | I/O: Request -> Response | Assert: <50ms p95, 0 err | LOC: ~30
- [x] TASK: configure-cloudflare-kv | Target: wrangler.toml | I/O: Data -> KVStore | Assert: cache hit > 80% | LOC: ~20
- [x] TASK: validate-offline-pwa | Target: script/sw.js | I/O: void -> OfflineApp | Assert: loads without network | LOC: ~20

### Epic 5.2: Limited Beta Access
- [x] TASK: implement-invite-gate | Target: src/lib/auth/invite.js | I/O: Code -> Boolean | Assert: invalid code rejected, valid granted | LOC: ~30
- [x] TASK: configure-cloudflare-access | Target: cloudflare-access.json | I/O: Email -> AccessGrant | Assert: only allowlisted emails pass | LOC: ~15
- [x] TASK: wire-cloudflare-analytics | Target: src/index.html | I/O: PageView -> Analytics | Assert: events visible in CF dashboard | LOC: ~10
- [x] TASK: write-beta-onboarding | Target: docs/beta-guide.md | I/O: void -> Guide | Assert: covers all features | LOC: ~80

---

## Technical Debt & Maintenance (OPEN)
- [x] TASK: implement-schema-validator | Target: lib/data/schema-validator.js | I/O: Event -> Boolean | Assert: rejects invalid, 0 err | LOC: ~50
- [x] TASK: implement-circuit-breaker | Target: lib/data/circuit-breaker.js | I/O: SourceId, ErrorCount -> State | Assert: opens after 5 fails, closes after 60s | LOC: ~55
- [x] TASK: implement-staleness-detector | Target: lib/data/staleness-detector.js | I/O: Event -> Boolean | Assert: 0 err, detects >6h gap | LOC: ~30
- [x] TASK: improve-fingerprint-normalization | Target: lib/data/event-fingerprint.js | I/O: Event -> NormalizedFP | Assert: >90% content-dedup accuracy | LOC: ~20
- [x] TASK: implement-real-clustering | Target: lib/data/cluster-identifier.js | I/O: Events -> SemanticClusters | Assert: groups related events beyond topic | LOC: ~60
- [ ] TASK: migrate-to-typescript | Target: lib/ | I/O: JS -> TS | Assert: 0 type errors | LOC: ~1000

## Architectural Audit Gaps (AUTO-GENERATED)
- [x] TASK: fix-test-failure-messages | Target: tests/ | I/O: scan -> fix | Assert: all assert calls have 3+ arguments | LOC: ~200
- [x] TASK: fix-datenow-injection-drift | Target: src/lib/services/events-service.js | I/O: Date.now() -> injected | Assert: deterministic | LOC: ~20
- [x] TASK: resolve-module-type-warning | Target: functions/worker.js | I/O: js -> mjs | Assert: zero warnings | LOC: ~10
