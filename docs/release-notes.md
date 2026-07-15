# Release Notes — Aetheris

## v0.1.15 — Additional Layers & Core Features
- [x] TASK: implement-deep-history-navigation | Target: src/components/map/timeline.tsx | I/O: code | Assert: users can select specific dates from archive | LOC: ~100
- [x] TASK: implement-pwa-offline-fallback | Target: script/sw.js | I/O: code | Assert: PWA serves cached shell and fallback events when offline | LOC: ~60
- [x] TASK: fix-mapbox-token-fallback | Target: src/components/map/atlas.tsx | I/O: bugfix | Assert: Atlas renders properly when Mapbox token is missing via mocked static map fallback, removing "Map failed to load." error. | LOC: ~10
- [x] TASK: worker-test-fetch-error | Target: tests/worker.test.ts | I/O: bugfix | Assert: fix "Worker Fetch Error: Error: fail" in `worker.test.ts` mocking logic. | LOC: ~10
- [x] TASK: command-palette-navigation | Target: src/components/ui/command-palette.tsx | I/O: feature | Assert: ⌘K / Ctrl-K opens 154 commands | LOC: ~150
- [x] TASK: live-ais-vessel-tracking | Target: src/components/map/atlas.tsx | I/O: feature | Assert: integrates AISStream for live vessel layers | LOC: ~100
- [x] TASK: subsea-cables-layer | Target: src/components/map/atlas.tsx | I/O: feature | Assert: renders 86 submarine cables | LOC: ~80
- [x] TASK: ai-datacenter-map | Target: src/components/map/atlas.tsx | I/O: feature | Assert: maps 313 AI datacenters | LOC: ~80
- [x] TASK: satellite-tracking-layer | Target: src/components/map/atlas.tsx | I/O: feature | Assert: live orbital positions using SGP4 | LOC: ~120
- [x] TASK: gps-jamming-zones | Target: src/components/map/atlas.tsx | I/O: feature | Assert: live RF-interference map | LOC: ~80
- [x] TASK: financial-market-monitor | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: live equities, FX, crypto and commodities | LOC: ~150
- [x] TASK: multi-monitor-views | Target: src/components/map/atlas.tsx | I/O: feature | Assert: World, Tech, Finance, Commodity, Energy lenses | LOC: ~150

## v0.1.21 — Vision Alignment & Maintenance
- [x] TASK: improve-probability-cone-logic | Target: lib/probability-cones.js | I/O: logic | Assert: likelihood accounts for source rank diversity | LOC: ~50
- [x] TASK: atlas-performance-tuning | Target: src/components/map/atlas.tsx | I/O: optimization | Assert: zoom transitions maintain 60fps with 500+ markers | LOC: ~50
- [x] TASK: enforce-30-word-synthesis-gate | Target: lib/extractive-synthesis.js | I/O: code | Assert: synthesizeSources throws if AI result > 30 words | LOC: ~15
- [x] TASK: recurring-dependency-pruning | Removed 'undici' from package.json as it's redundant with Node 20+ fetch.
- [x] TASK: align-atlas-zoom-logic | Atlas zoom filtering now strictly follows 3-level hierarchy (Orbital, National, Local).
- [x] TASK: extractive-synthesis-guardrails | AI synthesis now requires a minimum of 20 validated sources as per Vision Standard 4.
- [x] TASK: unified-speculation-property | Refactored 'speculative' to 'isSpeculative' across entire pipeline for architectural consistency.
- [x] TASK: atmosphere-heatwave-trigger | Heatwave atmospheric tint now triggers at 40°C threshold.
- [x] TASK: enhanced-bug-hunter | Automated bug hunter now validates AI synthesis word count and source count rules.

## v0.1.20 — Investor Demo Readiness & Historical Depth
- [x] TASK: implement-ui-auto-refresh | UI now polls API every 60s to ensure data freshness for demos.
- [x] TASK: enhance-atlas-popups | Map markers now show AI-synthesized cluster summaries on click.
- [x] TASK: implement-historical-archiving | Ingest cycle now saves daily snapshots to 'events:archive:YYYY-MM-DD'.
- [x] TASK: historical-api-support | Worker API now supports date-based queries for historical retrieval.
- [x] TASK: visual-polish-demo | HealthDashboard enhanced with pulse animations and GhostCards with smooth transitions.
- [x] TASK: connect-timeline-to-history | Main app now triggers historical fetches when user selects 'Past' focus.

## v0.1.17 — Kinetic Atlas UI & Edge Data Integration
[... previous release notes ...]
