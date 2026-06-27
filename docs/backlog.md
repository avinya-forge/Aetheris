# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 1: High Priority (Vision Alignment & Core Integrity)
- [ ] TASK: enforce-30-word-synthesis-gate | Target: lib/extractive-synthesis.js | I/O: code | Assert: synthesizeSources throws if AI result > 30 words | LOC: ~15
- [ ] TASK: atlas-performance-tuning | Target: src/components/map/atlas.tsx | I/O: optimization | Assert: zoom transitions maintain 60fps with 500+ markers | LOC: ~50
- [ ] TASK: improve-probability-cone-logic | Target: lib/probability-cones.js | I/O: logic | Assert: likelihood accounts for source rank diversity | LOC: ~50
- [ ] TASK: recurring-coverage-audit | Target: script/test.js | I/O: automation | Assert: gate fails if any file < 95% | LOC: ~20

## Phase 2: Medium Priority (Historical & Predictive Depth)
- [ ] TASK: implement-deep-history-navigation | Target: src/components/map/timeline.tsx | I/O: code | Assert: users can select specific dates from archive | LOC: ~100
- [ ] TASK: macro-cluster-visualization | Target: src/components/map/atlas.tsx | I/O: code | Assert: multi-day trends shown as distinct visual clusters | LOC: ~80
- [ ] TASK: horizon-impact-clustering | Target: lib/cluster-identifier.js | I/O: code | Assert: groups predicted events by causal chain | LOC: ~70
- [ ] TASK: archive-compression-strategy | Target: functions/ingest-cycle.js | I/O: code | Assert: historical data is gzipped before KV save | LOC: ~35

## Phase 3: Low Priority (Optimization & Resilience)
- [ ] TASK: implement-background-sync | Target: script/sw.js | I/O: code | Assert: uses Service Worker Background Sync API | LOC: ~40
- [ ] TASK: compressed-kv-payloads | Target: functions/worker.mjs | I/O: code | Assert: uses Brotli/Gzip for event payloads | LOC: ~25
