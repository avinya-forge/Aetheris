# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## 🚨 Critical Tech Debt & Active Bugs
- [x] TASK: bug-fix-market-data-mock-race-condition | Target: src/components/ui/health-dashboard.tsx | I/O: test/bugfix | Assert: ensure the useEffect mock properly resolves on init | LOC: ~20
---

## Phase 1: UI/UX Modernization & Bug Identification
- [x] TASK: ui-ux-text-focused-redesign | Target: src/components/ | I/O: feature | Assert: implement text-focused modern UI removing visual clutter | LOC: ~200
- [x] TASK: ui-ux-audit-and-bug-identification | Target: codebase | I/O: audit | Assert: identify and log UI layout and typography bugs | LOC: ~50
- [x] TASK: ui-ux-modernize-command-palette | Target: src/components/ui/command-palette.tsx | I/O: feature | Assert: update styles to dark slate translucent backgrounds and 6-8px border radius | LOC: ~50
- [x] TASK: ui-ux-modernize-health-dashboard | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: update styles to dark slate translucent backgrounds and 6-8px border radius | LOC: ~100
- [x] TASK: ui-ux-modernize-invite-gate | Target: src/components/ui/invite-gate.tsx | I/O: feature | Assert: update styles to dark slate translucent backgrounds and 6-8px border radius | LOC: ~30
- [x] TASK: bug-hunt-and-audit-phase1 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 2: High Priority (Vision Alignment & Core Integrity)
- [x] TASK: recurring-coverage-audit | Target: script/test.js | I/O: automation | Assert: gate fails if any file < 95% | LOC: ~20
- [x] TASK: implement-pwa-offline-fallback | Target: script/sw.js | I/O: code | Assert: PWA serves cached shell and fallback events when offline | LOC: ~60
- [x] TASK: bug-hunt-and-audit-phase2 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 3: Medium Priority (Additional Layers & Core Features)
- [x] TASK: live-ais-vessel-tracking | Target: src/components/map/atlas.tsx | I/O: feature | Assert: integrates AISStream for live vessel layers | LOC: ~100
- [x] TASK: subsea-cables-layer | Target: src/components/map/atlas.tsx | I/O: feature | Assert: renders 86 submarine cables | LOC: ~80
- [x] TASK: ai-datacenter-map | Target: src/components/map/atlas.tsx | I/O: feature | Assert: maps 313 AI datacenters | LOC: ~80
- [x] TASK: satellite-tracking-layer | Target: src/components/map/atlas.tsx | I/O: feature | Assert: live orbital positions using SGP4 | LOC: ~120
- [x] TASK: gps-jamming-zones | Target: src/components/map/atlas.tsx | I/O: feature | Assert: live RF-interference map | LOC: ~80
- [x] TASK: financial-market-monitor | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: live equities, FX, crypto and commodities | LOC: ~150
- [x] TASK: command-palette-navigation | Target: src/components/ui/command-palette.tsx | I/O: feature | Assert: ⌘K / Ctrl-K opens 154 commands | LOC: ~150
- [x] TASK: multi-monitor-views | Target: src/components/map/atlas.tsx | I/O: feature | Assert: World, Tech, Finance, Commodity, Energy lenses | LOC: ~150
- [x] TASK: bug-hunt-and-audit-phase3 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10
- [x] TASK: ai-analyst-chat | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: provides chat interface over live services with citations | LOC: ~150
- [x] TASK: scenario-engine-route-explorer | Target: src/components/map/atlas.tsx | I/O: feature | Assert: allows gaming disruptions before they hit | LOC: ~200
- [x] TASK: resilience-map-layer | Target: src/components/map/atlas.tsx | I/O: feature | Assert: shows resilience rankings for countries | LOC: ~100

## Phase 4: Historical & Predictive Depth
- [x] TASK: implement-deep-history-navigation | Target: src/components/map/timeline.tsx | I/O: code | Assert: users can select specific dates from archive | LOC: ~100
- [x] TASK: macro-cluster-visualization | Target: src/components/map/atlas.tsx | I/O: code | Assert: multi-day trends shown as distinct visual clusters | LOC: ~80
- [x] TASK: horizon-impact-clustering | Target: lib/cluster-identifier.js | I/O: code | Assert: groups predicted events by causal chain | LOC: ~70
- [x] TASK: archive-compression-strategy | Target: functions/ingest-cycle.js | I/O: code | Assert: historical data is gzipped before KV save | LOC: ~35
- [x] TASK: nowcasting-interpolator-integration | Target: lib/nowcast-interpolator.js | I/O: feature | Assert: Gemini fills data gaps and UI badges as 'Estimated' | LOC: ~80
- [x] TASK: open-meteo-aqi-cams-replacement | Target: lib/environmental.js | I/O: feature | Assert: replaces CAMS with Open-Meteo AQI | LOC: ~50
- [x] TASK: bug-hunt-and-audit-phase4 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 5: Low Priority (Optimization, Ecosystem & Resilience)
- [x] TASK: mcp-server-integration | Target: functions/worker.mjs | I/O: feature | Assert: exposes 39-tool MCP server for AI agents | LOC: ~200
- [x] TASK: implement-background-sync | Target: script/sw.js | I/O: code | Assert: uses Service Worker Background Sync API | LOC: ~40
- [x] TASK: compressed-kv-payloads | Target: functions/worker.mjs | I/O: code | Assert: uses Brotli/Gzip for event payloads | LOC: ~25
- [x] TASK: bug-hunt-and-audit-phase5 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 6: Deployment & User Access (Upcoming)
- [x] TASK: cloudflare-cron-ingest | Target: wrangler.toml | I/O: config | Assert: sets 1-minute cron trigger for ingest-cycle | LOC: ~30
- [x] TASK: safety-sentinel-ui-alerts | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: shows rational warnings for temp >= 40C or wind >= 100km/h | LOC: ~150
- [x] TASK: beta-invite-code-gate | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: requires hashed invite code from localStorage before viewing dashboard | LOC: ~120
- [x] TASK: bug-hunt-and-audit-phase6 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 7: Text-Only Intelligence Dashboard & Category Engine
- [x] TASK: text-only-category-taxonomy | Target: docs/vision.md | I/O: documentation | Assert: updates vision and category matrix | LOC: ~20
- [x] TASK: news-brief-category-mapping | Target: lib/news-mapper.js | I/O: logic | Assert: maps news articles to <=30 word factual briefs and categories | LOC: ~30
- [x] TASK: text-dashboard-category-filters | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: adds category tabs (Global, Markets, Environment, Local, Classifieds) and multi-location selection | LOC: ~150
- [x] TASK: bug-hunt-and-audit-phase7 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 8: Continuous Skill Orchestration & Quality Verification
- [x] TASK: automated-skill-analyzer-runner | Target: lib/skill-analyzer.js | I/O: feature | Assert: systematically executes and validates all repository skills across codebase | LOC: ~160
- [x] TASK: bug-hunt-and-audit-phase8 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10

## Phase 9: UI/UX Modernization & Accessibility
- [x] TASK: ui-update-typography-scale | Target: src/components/ | I/O: feature | Assert: update typography scale to match text-only modern standards | LOC: ~100
- [x] TASK: implement-css-container-queries | Target: src/components/ | I/O: feature | Assert: use CSS container queries for dynamic layout scaling | LOC: ~150
- [x] TASK: accessibility-a11y-verification | Target: src/components/ | I/O: feature | Assert: ensure ARIA labels and semantic HTML are flawless across all components | LOC: ~100
- [x] TASK: developer-presence-route | Target: src/components/ui/ | I/O: feature | Assert: implement a developer bio and links to github following UI Developer Bio skill | LOC: ~100
- [x] TASK: bug-hunt-and-audit-phase9 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10