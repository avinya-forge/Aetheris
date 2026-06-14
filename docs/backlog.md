# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 9: Quality & Coverage Stabilization (CRITICAL)
- [x] TASK: fix-atlas-branch-coverage | Target: src/components/map/atlas.tsx | I/O: props -> coverage | Assert: line coverage > 70% | LOC: ~30
- [x] TASK: fix-timeline-state-coverage | Target: src/components/map/timeline.tsx | I/O: events -> coverage | Assert: line coverage > 90% | LOC: ~20
- [x] TASK: implement-kp-parser-tests | Target: lib/kp-parser.js | I/O: rawData -> coverage | Assert: coverage reached 100% | LOC: ~20
- [x] TASK: deep-clean-coverage-gap | Target: repo | I/O: 94% -> 95% | Assert: npm test passes with 95% gate | LOC: ~50
- [x] TASK: fix-parser-coverage | Target: lib/parser.js | I/O: mock-content -> coverage | Assert: line coverage 100% | LOC: ~20
- [x] TASK: audit-lib-io-purity | Target: lib/ | I/O: audit -> verified | Assert: all API clients return raw JSON | LOC: ~100
- [x] TASK: enforce-standard-asserts | Target: tests/ | I/O: audit -> 3-arg asserts | Assert: all tests use descriptive failure messages | LOC: ~200
- [x] TASK: repository-health-audit | Target: repo | I/O: audit -> pristine | Assert: no unused artifacts or temp files | LOC: ~20

## Phase 10: Coverage Gap Closure (Next 10)
- [x] TASK: fix-gemini-client-uncovered | Target: lib/gemini-client.js | I/O: mock-response -> lines 38-39 | Assert: coverage 100% | LOC: ~10
- [x] TASK: fix-generator-uncovered | Target: lib/generator.js | I/O: mock-data -> lines 43-48 | Assert: coverage 100% | LOC: ~10
- [x] TASK: fix-24h-summary-coverage | Target: lib/24h-summary.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-environmental-coverage | Target: lib/environmental.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-forecast-coverage | Target: lib/forecast.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-geopolitical-coverage | Target: lib/geopolitical.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-ghost-card-lib-coverage | Target: lib/ghost-card.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-macro-cluster-coverage | Target: lib/macro-cluster.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-nowcast-lib-coverage | Target: lib/nowcast.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-safety-rule-coverage | Target: lib/safety-rule.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-summary-lib-coverage | Target: lib/summary.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5
- [x] TASK: fix-threshold-lib-coverage | Target: lib/threshold.js | I/O: tests -> 100% | Assert: coverage reached 100% | LOC: ~5

## Phase 8: Deep Codebase Quality & Standards Audit
- [x] TASK: audit-events-service | Target: src/lib/events-service.js | I/O: audit -> clean | Assert: named exports and 1:1 tests | LOC: ~20
- [x] TASK: audit-ghost-card-service | Target: src/lib/ghost-card-service.js | I/O: audit -> clean | Assert: named exports and 1:1 tests | LOC: ~20
- [x] TASK: audit-health-service | Target: src/lib/health-service.js | I/O: audit -> clean | Assert: named exports and 1:1 tests | LOC: ~20
- [x] TASK: audit-invite-service | Target: src/lib/invite.js | I/O: audit -> clean | Assert: named exports and 1:1 tests | LOC: ~20
- [x] TASK: audit-synthesis-service | Target: src/lib/synthesis-service.js | I/O: audit -> clean | Assert: named exports and 1:1 tests | LOC: ~20
- [x] TASK: audit-zoom-controller | Target: src/lib/zoom-controller.js | I/O: audit -> clean | Assert: named exports and 1:1 tests | LOC: ~20

## Phase 12: Rigorous Quality Assurance & Security
- [ ] TASK: full-ui-visual-audit | Target: src/components/ | I/O: UI -> bug backlog | Assert: all discovered bugs logged in backlog | LOC: ~0
- [x] TASK: implement-e2e-playwright-tests | Target: tests/e2e/ | I/O: browser interactions -> pass/fail | Assert: core user journeys verified via Playwright | LOC: ~200
- [ ] TASK: deep-cleaning-and-refactor | Target: lib/ | I/O: code -> cleaner code | Assert: orphaned files deleted, DRY principles applied | LOC: ~150
- [ ] TASK: comprehensive-security-audit | Target: repo | I/O: npm audit & manual review -> secure | Assert: 0 known vulnerabilities | LOC: ~50
- [x] TASK: automated-bug-hunter | Target: script/bug-hunter.js | I/O: repo -> analysis | Assert: routine static analysis checks established | LOC: ~120
- [ ] TASK: maintain-strict-coverage | Target: repo | I/O: code -> tests | Assert: >95% overall line coverage | LOC: ~0
