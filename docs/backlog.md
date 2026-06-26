# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 16: Ultra-Lean Refactoring & Tech Debt
### Epic 16.2: Clean Architecture Patterns
- [x] TASK: implement-standard-error-types | Target: lib/errors.js | I/O: code | Assert: centralized error classes | LOC: ~40
- [x] TASK: unify-test-extensions | Target: tests/ | I/O: chore | Assert: all tests use .test.js or .test.ts consistently | LOC: ~20

## Phase 19: Temporal Intelligence - History & Horizon
- [x] TASK: implement-macro-cluster-logic | Target: lib/cluster-identifier.js | I/O: code | Assert: groups events by multi-day trends | LOC: ~60
- [x] TASK: geopolitical-shift-detector | Target: lib/data/shift-detector.js | I/O: code | Assert: identifies significant change in GDELT intensity | LOC: ~50
- [x] TASK: add-aqi-to-open-meteo | Target: lib/open-meteo-client.js | I/O: code | Assert: fetches pm2_5, pm10, and ozone | LOC: ~30
- [x] TASK: map-aqi-to-hazard | Target: lib/weather-mapper.js | I/O: code | Assert: AQI values mapped to impactScore | LOC: ~20

## Phase 20: Kinetic Atlas UI - The Pulse Scrub
- [x] TASK: implement-timeline-scrub-logic | Target: src/components/map/timeline.tsx | I/O: code | Assert: scrubbing updates global 'focus' (past/present/horizon) | LOC: ~80
- [x] TASK: add-focus-state-to-store | Target: src/lib/store.js | I/O: code | Assert: global focus state available for Atlas filtering | LOC: ~20
- [x] TASK: atlas-focus-filtering | Target: src/components/map/atlas.tsx | I/O: code | Assert: markers filtered based on timeline focus | LOC: ~30

## Phase 21: Autonomous Lifecycle & Health
- [x] TASK: implement-success-metrics-dashboard | Target: src/components/ui/health-dashboard.tsx | I/O: code | Assert: displays latency and signal-to-noise ratio | LOC: ~100
- [ ] TASK: track-ingest-latency | Target: functions/ingest-cycle.js | I/O: code | Assert: latency stats saved to KV | LOC: ~25
- [ ] TASK: signal-to-noise-monitor | Target: lib/impact-filter.js | I/O: code | Assert: counts filtered vs total events | LOC: ~15

## Phase 17: Recurring Health Patterns
- [ ] TASK: recurring-coverage-audit | Target: script/test.js | I/O: automation | Assert: gate fails if any file < 95% | LOC: ~20
- [ ] TASK: recurring-dependency-pruning | Target: package.json | I/O: audit | Assert: 0 unused deps (e.g. check undici) | LOC: ~10

## Phase 22: Offline-First & Sync Refinement
- [ ] TASK: implement-background-sync | Target: script/sw.js | I/O: code | Assert: uses Service Worker Background Sync API | LOC: ~40
- [ ] TASK: compressed-kv-payloads | Target: functions/worker.mjs | I/O: code | Assert: uses Brotli/Gzip for event payloads | LOC: ~25
