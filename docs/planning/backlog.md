# Backlog — Aetheris

> **Schema**: `[ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size`

---

## Phase 4: Frontend — Kinetic Atlas UI (SCHEDULED)
*All tasks blocked by frontend environment bootstrap.*

### Epic 4.1: Frontend Bootstrap
*Goal: React + Vite PWA environment wired to lib/ logic.*

- [ ] TASK: bootstrap-frontend | Target: package.json, vite.config.js | I/O: void -> DevServer | Assert: npm run dev starts, 0 err | LOC: ~80
- [ ] TASK: init-mapbox-gl | Target: src/components/map/atlas.tsx | I/O: Config -> MapInstance | Assert: 0 err, renders | LOC: ~60

### Epic 4.2: Chromodynamic Visual System
*Goal: vector-only UI that shifts atmosphere based on data state.*

- [ ] TASK: implement-chromodynamic-logic | Target: src/lib/ui/chromodynamic.js | I/O: KpIndex -> ColorSpec | Assert: 0 err, >95% cov | LOC: ~40
- [ ] TASK: design-vector-glyphs | Target: src/assets/glyphs/index.svg | I/O: void -> SVG | Assert: clean-SVG, no raster | LOC: ~100
- [ ] TASK: implement-zoom-logic | Target: src/lib/ui/zoom-controller.js | I/O: ZoomLevel -> LayerVisibility | Assert: 0 err, >95% cov | LOC: ~30

### Epic 4.3: Timeline Interface
*Goal: temporal traversal UI replacing list-scroll paradigm.*

- [ ] TASK: render-3d-map-timeline | Target: src/components/map/timeline.tsx | I/O: Props -> ReactElement | Assert: 0 err, >95% cov | LOC: ~120
- [ ] TASK: render-ghost-cards | Target: src/components/ui/ghost-card.tsx | I/O: GhostCard -> ReactElement | Assert: 0 err, opacity<1, shows% | LOC: ~50

### Epic 4.4: Frontend Data Service Layer
*Goal: bridge lib/ pipeline output to React UI components via typed service hooks.*

- [ ] TASK: implement-events-service | Target: src/lib/services/events-service.js | I/O: Filters -> EventArray | Assert: 0 err, filters by impact | LOC: ~50
- [ ] TASK: implement-synthesis-service | Target: src/lib/services/synthesis-service.js | I/O: ClusterId -> Brief | Assert: ≤30 words, 0 err | LOC: ~35
- [ ] TASK: implement-ghost-card-service | Target: src/lib/services/ghost-card-service.js | I/O: void -> GhostCardArray | Assert: all likelihood ≤95%, isSpeculative=false | LOC: ~35
- [ ] TASK: implement-health-service | Target: src/lib/services/health-service.js | I/O: void -> HealthStatus | Assert: 0 err, returns version+uptime | LOC: ~20


### Epic 4.5: Visual Audit & Bug Hunt
*Goal: Pre-emptively discover and catalog visual, UX, and logic bugs through a dedicated tool audit before new features.*

- [ ] TASK: execute-visual-audit | Target: docs/planning/backlog.md | I/O: void -> TaskList | Assert: all bugs cataloged | LOC: ~0
  - Perform manual visual walkthrough of Kinetic Atlas
  - Test map zoom bounds, ghost card overlapping, timeline scrubbing
  - Add newly discovered bugs to a `Phase 4.6: Bug Fixes` epic
- [ ] TASK: fix-cataloged-bugs | Target: src/ | I/O: BugList -> CleanCode | Assert: 0 known visual bugs | LOC: ~100
  - Resolve all tasks cataloged during the visual audit
---

## Phase 5: Zero-Cost Deployment — Edge + Beta (PLANNED)

### Epic 5.1: Cloudflare Edge Deployment
- [ ] TASK: configure-cloudflare-pages | Target: .github/workflows/deploy.yml | I/O: git push -> CF Pages | Assert: auto-deploy on main push | LOC: ~40
- [ ] TASK: deploy-cloudflare-workers | Target: functions/edge-proxy.js | I/O: Request -> Response | Assert: <50ms p95, 0 err | LOC: ~30
- [ ] TASK: configure-cloudflare-kv | Target: wrangler.toml | I/O: Data -> KVStore | Assert: cache hit > 80% | LOC: ~20
- [ ] TASK: validate-offline-pwa | Target: script/sw.js | I/O: void -> OfflineApp | Assert: loads without network | LOC: ~20

### Epic 5.2: Limited Beta Access
- [ ] TASK: implement-invite-gate | Target: src/lib/auth/invite.js | I/O: Code -> Boolean | Assert: invalid code rejected, valid granted | LOC: ~30
- [ ] TASK: configure-cloudflare-access | Target: cloudflare-access.json | I/O: Email -> AccessGrant | Assert: only allowlisted emails pass | LOC: ~15
- [ ] TASK: wire-cloudflare-analytics | Target: src/index.html | I/O: PageView -> Analytics | Assert: events visible in CF dashboard | LOC: ~10
- [ ] TASK: write-beta-onboarding | Target: docs/beta-guide.md | I/O: void -> Guide | Assert: covers all features | LOC: ~80

### Epic 5.3: CI/CD Pipeline
- [ ] TASK: create-ci-workflow | Target: .github/workflows/ci.yml | I/O: git push -> test run | Assert: all tests pass before deploy | LOC: ~50
- [ ] TASK: create-deploy-workflow | Target: .github/workflows/deploy.yml | I/O: main push -> CF Pages | Assert: auto-deploy on main merge | LOC: ~45

---

## Technical Debt & Maintenance (OPEN)

- [ ] TASK: implement-schema-validator | Target: lib/data/schema-validator.js | I/O: Event -> Boolean | Assert: rejects invalid, 0 err | LOC: ~50
- [ ] TASK: implement-circuit-breaker | Target: lib/data/circuit-breaker.js | I/O: SourceId, ErrorCount -> State | Assert: opens after 5 fails, closes after 60s | LOC: ~55
- [ ] TASK: implement-staleness-detector | Target: lib/data/staleness-detector.js | I/O: Event -> Boolean | Assert: 0 err, detects >6h gap | LOC: ~30
- [ ] TASK: improve-fingerprint-normalization | Target: lib/data/event-fingerprint.js | I/O: Event -> NormalizedFP | Assert: >90% content-dedup accuracy | LOC: ~20
- [ ] TASK: implement-real-clustering | Target: lib/data/cluster-identifier.js | I/O: Events -> SemanticClusters | Assert: groups related events beyond topic | LOC: ~60
- [ ] TASK: enforce-module-workers | Target: functions/worker.js | I/O: void -> ESM | Assert: 0 usage of require in ESM | LOC: ~10
- [ ] TASK: migrate-to-typescript | Target: lib/ | I/O: JS -> TS | Assert: 0 type errors | LOC: ~1000
- [ ] TASK: migrate-tests-to-jest | Target: tests/ | I/O: Native -> Jest | Assert: coverage reporting active | LOC: ~500
