# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 15: Critical Bug Fixes & Hardening
- [x] TASK: remove-hardcoded-mapbox-token | Target: src/components/map/atlas.tsx | I/O: code -> env | Assert: no pk. string in file | LOC: ~10
- [x] TASK: robust-worker-error-handling | Target: functions/worker.mjs | I/O: code | Assert: all errors return 500 JSON response | LOC: ~20
- [ ] TASK: optimize-pwa-cache-strategy | Target: script/sw.js | I/O: code | Assert: built assets (js/css) included in cache | LOC: ~30
- [ ] TASK: fix-ingest-error-handling | Target: functions/ingest-cycle.js | I/O: code | Assert: failed fetches don't crash loop | LOC: ~20

## Phase 4: Frontend — Kinetic Atlas UI
### Epic 4.2: Chromodynamic Visual System
- [ ] TASK: implement-chromodynamic-atmosphere | Target: src/components/map/atlas.tsx | I/O: code | Assert: background color shifts based on Kp index | LOC: ~30
- [ ] TASK: kp-driven-marker-glow | Target: src/components/map/atlas.tsx | I/O: code | Assert: markers glow more intense with high Kp | LOC: ~15

### Epic 4.3: Timeline Interface
- [ ] TASK: finalize-timeline-interface | Target: src/components/map/timeline.tsx | I/O: code | Assert: user can traverse historical data | LOC: ~50
- [ ] TASK: timeline-scrub-haptics | Target: src/components/map/timeline.tsx | I/O: code | Assert: mobile haptic feedback on scrub | LOC: ~15

### Epic 4.4: Frontend Data Service Layer
- [ ] TASK: implement-event-polling-service | Target: src/lib/events-service.js | I/O: code | Assert: periodic fetch from /api/events | LOC: ~40
- [ ] TASK: local-storage-event-cache | Target: src/lib/events-service.js | I/O: code | Assert: events persist across reloads | LOC: ~25

## Phase 16: Advanced Temporal Logic (History & Horizon)
- [ ] TASK: trend-analysis-macro-clusters | Target: lib/cluster-identifier.js | I/O: logic | Assert: identifies trends over 7d period | LOC: ~60
- [ ] TASK: ghost-card-predictive-modeling | Target: lib/probability-cones.js | I/O: logic | Assert: logic-based probability calculation | LOC: ~40
- [ ] TASK: review-kv-retention-policy | Target: functions/ingest-cycle.js | I/O: config | Assert: TTL supports 'History' phase requirements | LOC: ~10

## Phase 5: Zero-Cost Deployment — Edge + Beta
- [ ] TASK: cloudflare-edge-deployment-validation | Target: wrangler.toml | I/O: config | Assert: successful staging deploy | LOC: ~10
- [ ] TASK: limited-beta-access-gate | Target: src/main.jsx | I/O: code | Assert: invite code required for entry | LOC: ~40
- [ ] TASK: automated-smoke-test-pipeline | Target: .github/workflows/main.yml | I/O: config | Assert: E2E tests run on every PR | LOC: ~30
