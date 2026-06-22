# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 15: High-Integrity Hardening & Coverage
- [x] TASK: remove-hardcoded-mapbox-token | Target: src/components/map/atlas.tsx | I/O: code -> env | Assert: no pk. string in file | LOC: ~10
- [x] TASK: robust-worker-error-handling | Target: functions/worker.mjs | I/O: code | Assert: all errors return 500 JSON response | LOC: ~20
- [ ] TASK: fix-atlas-coverage-gaps | Target: tests/atlas.test.tsx | I/O: test | Assert: Atlas coverage >= 95% | LOC: ~40
- [ ] TASK: fix-worker-coverage-gaps | Target: tests/worker.test.js | I/O: test | Assert: Worker coverage >= 95% | LOC: ~30

## Phase 16: Ultra-Lean Refactoring & Tech Debt
### Epic 16.1: ESM Purity & I/O Isolation
- [x] TASK: migrate-require-to-import-lib | Target: lib/*.js | I/O: refactor | Assert: no 'require' in lib/ | LOC: ~50
- [x] TASK: split-cluster-identifier | Target: lib/cluster-identifier.js | I/O: refactor | Assert: schema and logic in separate exports | LOC: ~15
- [ ] TASK: modularize-ingest-cycle | Target: functions/ingest-cycle.js | I/O: refactor | Assert: < 150 lines, logic moved to lib/ | LOC: ~100
- [ ] TASK: ensure-client-io-purity | Target: lib/*-client.js | I/O: audit | Assert: all clients return raw JSON | LOC: ~30

### Epic 16.2: Clean Architecture Patterns
- [ ] TASK: implement-standard-error-types | Target: lib/errors.js | I/O: code | Assert: centralized error classes | LOC: ~40
- [ ] TASK: unify-test-extensions | Target: tests/ | I/O: chore | Assert: all tests use .test.js or .test.ts consistently | LOC: ~20

## Phase 4: Frontend — Kinetic Atlas UI (Refinement)
- [ ] TASK: implement-chromodynamic-atmosphere | Target: src/components/map/atlas.tsx | I/O: code | Assert: background color shifts based on Kp index | LOC: ~30
- [ ] TASK: kp-driven-marker-glow | Target: src/components/map/atlas.tsx | I/O: code | Assert: markers glow more intense with high Kp | LOC: ~15

## Phase 17: Recurring Health Patterns
- [ ] TASK: recurring-coverage-audit | Target: script/test.js | I/O: automation | Assert: gate fails if any file < 95% | LOC: ~20
- [ ] TASK: recurring-dependency-pruning | Target: package.json | I/O: audit | Assert: 0 unused deps (e.g. check undici) | LOC: ~10
