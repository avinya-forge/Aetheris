# Release Notes — Aetheris

## v0.1.17 — Kinetic Atlas UI & Edge Data Integration
- [x] TASK: remove-hardcoded-mapbox-token | Secured Mapbox token via environment variables and fallback patterns.
- [x] TASK: robust-worker-error-handling | All Worker errors now return standardized 500 JSON responses.
- [x] TASK: fix-atlas-coverage-gaps | Reached 95%+ coverage for Atlas.tsx via comprehensive prop-injection testing.
- [x] TASK: fix-worker-coverage-gaps | Reached 95%+ coverage for Cloudflare Worker entry points.
- [x] TASK: migrate-require-to-import-lib | Fully migrated lib/ to ES Modules (import/export).
- [x] TASK: split-cluster-identifier | Decoupled schema and logic in cluster identifier for better modularity.
- [x] TASK: modularize-ingest-cycle | Refactored ingest logic into smaller, testable Level 3 components.
- [x] TASK: ensure-client-io-purity | Audited all API clients to ensure they return raw JSON.
- [x] TASK: implement-chromodynamic-atmosphere | Background color now shifts dynamically based on Kp index.
- [x] TASK: kp-driven-marker-glow | Marker glow intensity now reacts to real-time space weather conditions.
- [x] TASK: implement-zoom-logic | Tiered visibility logic (Orbital/National/Local) implemented.
- [x] TASK: implement-heatwave-amber-overlay | Added amber tint overlay for extreme heat events.
- [x] TASK: use-svg-glyphs-for-markers | Replaced div markers with high-performance vector glyphs.
- [x] TASK: create-event-specific-glyphs | Added unique SVGs for weather, space, and news events.
- [x] TASK: implement-vector-glyph-library | Centralized glyph rendering logic in Atlas UI.
- [x] TASK: add-percentage-to-ghost-cards | Likelihood is now explicitly displayed on speculative cards.
- [x] TASK: connect-ui-to-backend-api | Frontend now fetches real events from Cloudflare edge.
- [x] TASK: connect-ghost-cards-to-api | Frontend now visualizes probability cones from edge cache.
- [x] TASK: implement-kv-persistence-for-ghost-cards | Ghost cards are now persisted in KV storage.
- [x] TASK: add-interpolated-flag-to-ingest | Stale events are now tagged for "Estimated" UI badges.

## v0.1.14 — Pre-Production Release & E2E Stabilization
- [x] TASK: review-and-clean-tests | Target: tests/ | I/O: audit -> code | Assert: No unused tests or flaky assertions | LOC: ~20
- [x] TASK: optimize-build-size | Target: vite.config.js | I/O: config -> build | Assert: JS bundles < 500KB | LOC: ~10
- [x] TASK: update-architecture-docs | Target: docs/architecture.md | I/O: codebase -> docs | Assert: matches current implementation | LOC: ~100
- [x] TASK: comprehensive-visual-audit | Identify bugs/glitches, add to backlog
- [x] TASK: verify-end-to-end-functionality | Core features work without glitches

[... remaining release notes ...]
