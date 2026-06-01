## v0.1.10 - Arch Sync Batch

### Feature additions and updates
- [x] TASK: fix-atlas-build | Target: src/components/map/atlas.tsx | I/O: react-map-gl -> module | Assert: build succeeds | LOC: ~5
- [x] TASK: migrate-services-to-esm | Target: src/lib/events-service.js,src/lib/ghost-card-service.js | I/O: module.exports -> export | Assert: exports work | LOC: ~10
- [x] TASK: fix-e2e-tests | Target: tests/e2e.spec.js | I/O: error -> pass | Assert: E2E tests pass | LOC: ~5
- [x] TASK: resolve-npm-audit | Target: package.json | I/O: audit -> 0 vulns | Assert: npm audit passes | LOC: ~10
- [x] TASK: sync-documentation-ssot | Target: docs/ | I/O: flat hierarchy -> verified | Assert: files copied | LOC: ~5
- [x] TASK: final-verification | Target: repo | I/O: build/tests -> pass | Assert: coverage > 95% | LOC: 0
- [x] TASK: fix-typescript-errors | Target: tests/*.ts | I/O: type err -> clean build | Assert: tsc --noEmit passes | LOC: ~200
- [x] TASK: configure-eslint | Target: eslint.config.js | I/O: none -> config | Assert: npx eslint . works | LOC: ~20
- [x] TASK: fix-linting-errors | Target: lib/, src/ | I/O: error -> fix | Assert: npx eslint . passes | LOC: ~500
- [x] TASK: review-dead-code-paths | Target: lib/ | I/O: files -> clean | Assert: delete unused modules | LOC: ~100
- [x] TASK: type-safety-frontend | Target: src/components/ | I/O: any -> typed | Assert: strong types | LOC: ~200
- [x] TASK: strict-typing-tests | Target: tests/*.ts | I/O: error -> compiled | Assert: npx tsc --noEmit reports 0 errors across 50+ test files | LOC: ~500
- [x] TASK: audit-dead-code-clients | Target: lib/data/* | I/O: unused clients -> removed | Assert: all pure JSON data clients are actually used or deleted | LOC: ~100
- [x] TASK: enforce-test-messages | Target: tests/ | I/O: assert(x, y) -> assert(x, y, msg) | Assert: all assert strictEqual/ok calls have 3 arguments | LOC: ~200
- [x] TASK: migrate-lib-to-esm | Target: lib/ | I/O: CJS -> ESM | Assert: memory explicitly mandates ESM migration of .ts files in lib/ | LOC: ~300
- [x] TASK: check-hardcoded-secrets | Target: lib/data/ | I/O: hardcoded -> env | Assert: no API keys hardcoded in code | LOC: ~50
- [x] TASK: review-sw-cache | Target: script/sw.js | I/O: cache logic -> robust | Assert: ensure network-first PWA fallback properly handles all routes | LOC: ~50
- [x] TASK: ensure-no-top-level-await | Target: functions/ | I/O: top level await -> handled | Assert: top-level await is prohibited in CJS files according to memory | LOC: ~20
- [x] TASK: component-tsx-enforcement | Target: src/components/ | I/O: jsx -> tsx | Assert: React components inside src/components/map/ must use .tsx extension | LOC: ~50
- [x] TASK: fix-test-dirname-esm | Target: tests/ | I/O: __dirname -> import.meta.url | Assert: test files must dynamically compute __dirname when using ESM | LOC: ~50
- [x] TASK: review-io-purity | Target: lib/ | I/O: impure -> pure | Assert: API clients in lib/ return raw JSON, mapping logic in dedicated mappers | LOC: ~150

