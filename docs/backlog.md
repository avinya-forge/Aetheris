# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 9: Quality & Coverage Stabilization (CRITICAL)
- [x] TASK: fix-atlas-branch-coverage | Target: src/components/map/atlas.tsx | I/O: props -> coverage | Assert: line coverage > 70% | LOC: ~30
- [x] TASK: fix-timeline-state-coverage | Target: src/components/map/timeline.tsx | I/O: events -> coverage | Assert: line coverage > 90% | LOC: ~20
- [x] TASK: implement-kp-parser-tests | Target: lib/kp-parser.js | I/O: rawData -> coverage | Assert: coverage reached 100% | LOC: ~20
- [x] TASK: deep-clean-coverage-gap | Target: repo | I/O: 94% -> 95% | Assert: npm test passes with 95% gate | LOC: ~50
- [ ] TASK: audit-lib-io-purity | Target: lib/ | I/O: audit -> verified | Assert: all API clients return raw JSON | LOC: ~100
- [x] TASK: enforce-standard-asserts | Target: tests/ | I/O: audit -> 3-arg asserts | Assert: all tests use descriptive failure messages | LOC: ~200
- [ ] TASK: repository-health-audit | Target: repo | I/O: audit -> pristine | Assert: no unused artifacts or temp files | LOC: ~20

## Phase 10: Specific Coverage Gaps
- [ ] TASK: fix-gemini-client-uncovered | Target: lib/gemini-client.js | I/O: mock-response -> lines 38-39 | Assert: coverage > 95% | LOC: ~10
- [ ] TASK: fix-generator-uncovered | Target: lib/generator.js | I/O: mock-data -> lines 43-48 | Assert: coverage > 95% | LOC: ~10

## Phase 8: Deep Codebase Quality & Standards Audit
- [ ] TASK: chore-review-file-1 | Target: src/lib/ | I/O: audit -> clean | Assert: file 1 complies with standard | LOC: ~10
- [ ] TASK: chore-review-file-2 | Target: src/lib/ | I/O: audit -> clean | Assert: file 2 complies with standard | LOC: ~10
- [ ] TASK: chore-review-file-3 | Target: src/lib/ | I/O: audit -> clean | Assert: file 3 complies with standard | LOC: ~10
