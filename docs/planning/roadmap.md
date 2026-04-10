# Roadmap — Aetheris

> End goal: zero-cost PWA delivering temporal intelligence to a limited beta group, then open to public. No sensationalist news. Primary-source data. AI deduplication. User-defined thresholds.

## Phase 0: Foundation — Core Logic Engine (DONE v0.1.1–0.1.3)
- [x] [EPIC] Data Processing Pipeline — cluster, deduplicate, filter, synthesize (14 modules)
- [x] [EPIC] Schema Definitions — 9 JSON Schema draft 7 schemas
- [x] [EPIC] Temporal Intelligence Core — timeline store, traversal, probability cones
- [x] [EPIC] Infrastructure & Docs Automation — parser, generator, edge proxy, service worker

## Phase 1: Signal Layer — Docs & Schema Hygiene (ACTIVE)
- [EPIC] Autonomous Documentation Engine — run.sh AHA/SLAP, SSOT paths canonical
- [EPIC] Schema & Test Debt Resolution — unified naming, Jest migration

## Phase 2: Data Integration — Free APIs (NEXT)
- [EPIC] Environmental Data (Zero-Cost) — Open-Meteo, NOAA SWPC, NASA DONKI
- [EPIC] Geopolitical Data (Zero-Cost) — GDELT Project live integration
- [EPIC] Nowcasting Gap-Fill — Gemini interpolation for 6-hour model gaps

## Phase 3: Intelligence Layer — AI Synthesis (SCHEDULED)
- [EPIC] Live AI Synthesis Pipeline — Gemini 1.5 Flash wired to live data
- [EPIC] Safety Sentinel Live — hazard evaluator wired to real-time environmental feed
- [EPIC] Probability Cones Live — Ghost Cards from live forecasts + GDELT trends

## Phase 4: Frontend — Kinetic Atlas UI (SCHEDULED)
- [BLOCKED][EPIC] Frontend Bootstrap — Vite + React + TypeScript + Mapbox GL
- [BLOCKED][EPIC] Chromodynamic Visual System — vector glyphs, Kp-driven atmosphere
- [BLOCKED][EPIC] Timeline Interface — scrub bar, tier transitions, Ghost Card rendering

## Phase 5: Zero-Cost Deployment — Edge + Beta (PLANNED)
- [EPIC] Cloudflare Edge Deployment — Pages + Workers + KV, GitHub Actions CI/CD
- [EPIC] Limited Beta Access — ≤50 users via Cloudflare Access + invite codes
- [EPIC] Beta Instrumentation — Cloudflare Analytics, feedback loop via GitHub Issues

---

## Version History
| Version | Phase | Milestone |
| :--- | :--- | :--- |
| 0.1.1 | Phase 0 | Core schemas + signal-noise filters |
| 0.1.2 | Phase 0 | Cluster analysis + docs automation |
| 0.1.3 | Phase 0 | Full pipeline: synthesis, sentinel, cones, edge proxy |
| 0.2.x | Phase 1 | Schema hygiene + Jest migration |
| 0.3.x | Phase 2 | Live free API integration |
| 0.4.x | Phase 3 | AI synthesis wired to live data |
| 0.5.x | Phase 4 | Kinetic Atlas UI + Mapbox |
| 1.0.0 | Phase 5 | Zero-cost beta deployment, ≤50 users |
