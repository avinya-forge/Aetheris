# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 15: High-Integrity Hardening & Coverage
- [x] TASK: remove-hardcoded-mapbox-token | Target: src/components/map/atlas.tsx | I/O: code -> env | Assert: no pk. string in file | LOC: ~10
- [x] TASK: robust-worker-error-handling | Target: functions/worker.mjs | I/O: code | Assert: all errors return 500 JSON response | LOC: ~20
- [x] TASK: fix-atlas-coverage-gaps | Target: tests/atlas.test.tsx | I/O: test | Assert: Atlas coverage >= 95% | LOC: ~40
- [x] TASK: fix-worker-coverage-gaps | Target: tests/worker.test.js | I/O: test | Assert: Worker coverage >= 95% | LOC: ~30

## Phase 16: Ultra-Lean Refactoring & Tech Debt
### Epic 16.1: ESM Purity & I/O Isolation
- [x] TASK: migrate-require-to-import-lib | Target: lib/*.js | I/O: refactor | Assert: no 'require' in lib/ | LOC: ~50
- [x] TASK: split-cluster-identifier | Target: lib/cluster-identifier.js | I/O: refactor | Assert: schema and logic in separate exports | LOC: ~15
- [x] TASK: modularize-ingest-cycle | Target: functions/ingest-cycle.js | I/O: refactor | Assert: < 150 lines, logic moved to lib/ | LOC: ~100
- [x] TASK: ensure-client-io-purity | Target: lib/*-client.js | I/O: audit | Assert: all clients return raw JSON | LOC: ~30

### Epic 16.2: Clean Architecture Patterns
- [ ] TASK: implement-standard-error-types | Target: lib/errors.js | I/O: code | Assert: centralized error classes | LOC: ~40
- [ ] TASK: unify-test-extensions | Target: tests/ | I/O: chore | Assert: all tests use .test.js or .test.ts consistently | LOC: ~20

## Phase 4: Frontend — Kinetic Atlas UI (Refinement)
- [x] TASK: implement-chromodynamic-atmosphere | Target: src/components/map/atlas.tsx | I/O: code | Assert: background color shifts based on Kp index | LOC: ~30
- [x] TASK: kp-driven-marker-glow | Target: src/components/map/atlas.tsx | I/O: code | Assert: markers glow more intense with high Kp | LOC: ~15
- [x] TASK: implement-zoom-logic | Target: src/components/map/atlas.tsx | I/O: code | Assert: View content changes at zoom 4 and 8 | LOC: ~40
- [x] TASK: implement-heatwave-amber-overlay | Target: src/components/map/atlas.tsx | I/O: code | Assert: Amber overlay appears when heatwave event exists | LOC: ~20
- [x] TASK: use-svg-glyphs-for-markers | Target: src/components/map/atlas.tsx | I/O: code | Assert: Markers use SVG instead of div | LOC: ~25
- [x] TASK: create-event-specific-glyphs | Target: src/assets/glyphs/ | I/O: asset | Assert: Separate SVGs for weather, space, news | LOC: ~50
- [x] TASK: implement-vector-glyph-library | Target: src/components/map/atlas.tsx | I/O: code | Assert: Markers switch SVG path based on event type | LOC: ~30
- [x] TASK: add-percentage-to-ghost-cards | Target: src/components/ui/ghost-card.tsx | I/O: code | Assert: Likelihood displayed as percentage text | LOC: ~10

## Phase 18: Integration & Data Flow
- [x] TASK: connect-ui-to-backend-api | Target: src/lib/events-service.js | I/O: code | Assert: Fetches from /api/events | LOC: ~20
- [x] TASK: connect-ghost-cards-to-api | Target: src/lib/ghost-card-service.js | I/O: code | Assert: Fetches from /api/ghost-cards | LOC: ~20
- [x] TASK: implement-kv-persistence-for-ghost-cards | Target: functions/ingest-cycle.js | I/O: code | Assert: Ghost cards saved to KV 'ghost_cards:latest' | LOC: ~30
- [x] TASK: add-interpolated-flag-to-ingest | Target: functions/ingest-cycle.js | I/O: code | Assert: Stale events get interpolated: true flag | LOC: ~15

## Phase 17: Recurring Health Patterns
- [ ] TASK: recurring-coverage-audit | Target: script/test.js | I/O: automation | Assert: gate fails if any file < 95% | LOC: ~20
- [ ] TASK: recurring-dependency-pruning | Target: package.json | I/O: audit | Assert: 0 unused deps (e.g. check undici) | LOC: ~10
