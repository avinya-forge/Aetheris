# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 6: Urgent Bug Hunt & Stability (CRITICAL)
- [ ] TASK: fix-sw-cache-fallback | Target: script/sw.js | I/O: fetch -> cache/network | Assert: network-first fallback logic exists | LOC: ~10
- [ ] TASK: fix-edge-proxy-types | Target: functions/edge-proxy.js | I/O: data -> valid | Assert: strict payload type checking | LOC: ~5
- [ ] TASK: fix-run-sh-errors | Target: script/run.sh | I/O: err -> exit 1 | Assert: better error handling for npm commands | LOC: ~5
- [ ] TASK: fix-chromodynamic-bounds | Target: src/lib/chromodynamic.js | I/O: kpIndex<0 -> throw/clamp | Assert: handles negative input | LOC: ~5
- [ ] TASK: fix-ghost-card-props | Target: src/components/ui/ghost-card.tsx | I/O: undefined -> default | Assert: gracefully handles missing title/likelihood | LOC: ~5
- [ ] TASK: fix-atlas-mapbox-error | Target: src/components/map/atlas.tsx | I/O: token -> map error | Assert: error boundary or catch for invalid mapbox token | LOC: ~10
- [ ] TASK: fix-atlas-memory-leak | Target: src/components/map/atlas.tsx | I/O: unmount -> clean | Assert: no unhandled promise rejection/leak on unmount | LOC: ~15


