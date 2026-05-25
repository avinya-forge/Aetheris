# Release Notes

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
