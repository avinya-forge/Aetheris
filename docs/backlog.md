# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 1: High Priority (Vision Alignment & Core Integrity)
- [ ] TASK: improve-probability-cone-logic | Target: lib/probability-cones.js | I/O: logic | Assert: likelihood accounts for source rank diversity | LOC: ~50
- [ ] TASK: recurring-coverage-audit | Target: script/test.js | I/O: automation | Assert: gate fails if any file < 95% | LOC: ~20
- [ ] TASK: bug-hunt-and-audit-phase1 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 2: Medium Priority (Additional Layers & Core Features)
- [ ] TASK: worldmonitor-parity-analysis | Target: docs/backlog.md | I/O: documentation | Assert: lists all features from worldmonitor.app to replicate | LOC: ~20
- [ ] TASK: live-ais-vessel-tracking | Target: src/components/map/atlas.tsx | I/O: feature | Assert: integrates AISStream for live vessel layers | LOC: ~100
- [ ] TASK: subsea-cables-layer | Target: src/components/map/atlas.tsx | I/O: feature | Assert: renders 86 submarine cables | LOC: ~80
- [ ] TASK: ai-datacenter-map | Target: src/components/map/atlas.tsx | I/O: feature | Assert: maps 313 AI datacenters | LOC: ~80
- [ ] TASK: satellite-tracking-layer | Target: src/components/map/atlas.tsx | I/O: feature | Assert: live orbital positions using SGP4 | LOC: ~120
- [ ] TASK: gps-jamming-zones | Target: src/components/map/atlas.tsx | I/O: feature | Assert: live RF-interference map | LOC: ~80
- [ ] TASK: financial-market-monitor | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: live equities, FX, crypto and commodities | LOC: ~150
- [ ] TASK: command-palette-navigation | Target: src/components/ui/command-palette.tsx | I/O: feature | Assert: ⌘K / Ctrl-K opens 154 commands | LOC: ~150
- [ ] TASK: multi-monitor-views | Target: src/components/map/atlas.tsx | I/O: feature | Assert: World, Tech, Finance, Commodity, Energy lenses | LOC: ~150
- [ ] TASK: bug-hunt-and-audit-phase2 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 3: Historical & Predictive Depth
- [ ] TASK: implement-deep-history-navigation | Target: src/components/map/timeline.tsx | I/O: code | Assert: users can select specific dates from archive | LOC: ~100
- [ ] TASK: macro-cluster-visualization | Target: src/components/map/atlas.tsx | I/O: code | Assert: multi-day trends shown as distinct visual clusters | LOC: ~80
- [ ] TASK: horizon-impact-clustering | Target: lib/cluster-identifier.js | I/O: code | Assert: groups predicted events by causal chain | LOC: ~70
- [ ] TASK: archive-compression-strategy | Target: functions/ingest-cycle.js | I/O: code | Assert: historical data is gzipped before KV save | LOC: ~35
- [ ] TASK: bug-hunt-and-audit-phase3 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 4: Low Priority (Optimization, Ecosystem & Resilience)
- [ ] TASK: mcp-server-integration | Target: functions/worker.mjs | I/O: feature | Assert: exposes 39-tool MCP server for AI agents | LOC: ~200
- [ ] TASK: implement-background-sync | Target: script/sw.js | I/O: code | Assert: uses Service Worker Background Sync API | LOC: ~40
- [ ] TASK: compressed-kv-payloads | Target: functions/worker.mjs | I/O: code | Assert: uses Brotli/Gzip for event payloads | LOC: ~25
- [ ] TASK: bug-hunt-and-audit-phase4 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10
