# Backlog — Aetheris
> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

## 🌌 6–8 Month Strategic Roadmap & Horizon Plan

| Horizon | Core Strategic Milestone | Lead Focus | Key Deliverables |
|:---:|:---|:---|:---|
| **Month 1–2** | **Predictive Intelligence & Multi-Source Synthesis** | Ingestion & Verification | Multi-agent probabilistic forecasting, NASA DONKI / NOAA expansion, zero-cost archive |
| **Month 3–4** | **Kinetic Atlas & Chromodynamic Visuals** | 3D WebGL & Geospatial | Orbital-to-local smooth zoom, Kp-driven atmospheric tinting, offline vector tiles |
| **Month 5–6** | **Global Real-Time Wire & Multi-Language Normalization** | GDELT & Extractive NLP | 30-word factual briefings in 8 languages, deduplication graph, entity clustering |
| **Month 7–8** | **Zero-Cost Edge Resilience & PWA Autonomous Sentinel** | Cloudflare Workers & Cache | Sub-50ms worldwide edge cache, offline sync, battery-friendly event stream |

---

## 📅 Active Epics & Tasks

## Epic: Kinetic Atlas WebGL Visualization (Months 3–4)
- [ ] TASK: atlas-webgl-memory-optimization | Target: src/components/map/atlas.tsx | I/O: optimization | Assert: implements strict garbage collection for vector instances during zoom transitions | LOC: ~120
- [ ] TASK: chromodynamic-tint-kp-index | Target: src/components/atmosphere.tsx | I/O: ui | Assert: conditionally renders SVG aura overlay using strict Kp indexing thresholds | LOC: ~100
- [ ] TASK: svg-marker-clustering-engine | Target: src/components/map/glyphs.tsx | I/O: feature | Assert: groups overlapping hazard markers at orbital level into clean count badges | LOC: ~150
- [ ] TASK: vector-tile-offline-cache-prep | Target: src/components/map/atlas.tsx | I/O: feature | Assert: intercepts tile requests to support offline vector caching | LOC: ~100

## Epic: Global News Deduplication & 30-Word Briefing Engine (Months 5–6)
- [ ] TASK: gdelt-wire-ingestion-worker | Target: functions/gdelt-fetcher.js | I/O: ingestion | Assert: queries GDELT 2.0 API with retry logic and respects rate limits | LOC: ~110
- [ ] TASK: extractive-briefing-nlp-module | Target: lib/summarizer.js | I/O: nlp | Assert: condenses input strings to <30 word summaries without hallucination | LOC: ~160
- [ ] TASK: event-deduplication-jaccard | Target: lib/dedup-engine.js | I/O: algorithm | Assert: calculates Jaccard similarity threshold (>0.85) to cluster identical events | LOC: ~90
- [ ] TASK: multilingual-classification-gate | Target: lib/classifier.js | I/O: logic | Assert: normalizes non-English category flags into unified taxonomy | LOC: ~120

## Epic: Zero-Cost Edge PWA Sentinel (Months 7–8)
- [ ] TASK: sw-indexeddb-tile-cache | Target: public/sw.js | I/O: pwa | Assert: caches and serves mapbox vector tiles from IndexedDB when offline | LOC: ~180
- [ ] TASK: cloudflare-worker-cron-ingest | Target: wrangler.toml | I/O: infra | Assert: configures and executes 60s sentinel ingest CRON trigger | LOC: ~40
- [ ] TASK: pwa-offline-notification-sync | Target: public/sw.js | I/O: pwa | Assert: syncs user notification preferences upon network reconnection | LOC: ~100
- [ ] TASK: e2e-playwright-sentinel-tests | Target: tests/e2e/atlas.spec.ts | I/O: test | Assert: verifies 100% functionality of offline map caching behavior | LOC: ~150
