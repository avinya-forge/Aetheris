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

## Epic: Multi-Agent Predictive Analysis & Context Scaling
- [x] TASK: agentic-scenario-simulation | Target: lib/scenario-simulator.js | I/O: feature | Assert: integrates cross-verifying scenario impact strictly conforming to logic-based Probability Cones | LOC: ~150
- [x] TASK: bug-hunt-and-audit-predictive-analysis | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly for new predictive features | LOC: ~10
- [ ] TASK: context-headroom-adaptive-compression | Target: lib/context-manager.js | I/O: optimization | Assert: compresses historical prompt context dynamically when approaching LLM window limits | LOC: ~120
- [x] TASK: multi-agent-consensus-engine | Target: lib/consensus-engine.js | I/O: feature | Assert: requires 3 independent sensor agreement before flagging extreme anomalies | LOC: ~160

## Epic: Security & Integrity Guardrails
- [ ] TASK: enforce-zero-cost-historical-store | Target: functions/ingest-cycle.js | I/O: optimization | Assert: zero-cost permanent historical archive compressed as daily JSON | LOC: ~80
- [ ] TASK: audit-owasp-secrets-and-sanitization | Target: codebase | I/O: security | Assert: ensure no existing code violates OWASP standards, no hardcoded secrets, and strict input sanitization | LOC: ~50
- [ ] TASK: edge-rate-limiting-guardrail | Target: functions/edge-proxy.js | I/O: security | Assert: prevent DDoS and abuse with Cloudflare Workers token bucket rate limiter | LOC: ~70
- [ ] TASK: sha256-payload-signature-verification | Target: lib/verifier.js | I/O: security | Assert: verify cryptographic signatures for external NOAA and NASA payloads | LOC: ~90

## Epic: Kinetic Atlas WebGL Visualization (Months 3–4)
- [ ] TASK: webgl-globe-renderer-optimizations | Target: src/components/map/atlas.tsx | I/O: feature | Assert: maintains steady 60fps on mobile viewports during orbital rotation | LOC: ~180
- [ ] TASK: chromodynamic-kp-atmosphere-transition | Target: src/components/atmosphere.tsx | I/O: ui | Assert: transitions UI aura smoothly between Indigo, Violet, and Deep Purple based on Kp Index | LOC: ~110
- [ ] TASK: vector-glyphs-layer-clustering | Target: src/components/map/glyphs.tsx | I/O: feature | Assert: aggregates overlapping hazard glyphs at orbital zoom levels with clean SVG badges | LOC: ~140

## Epic: Global News Deduplication & 30-Word Briefing Engine (Months 5–6)
- [ ] TASK: gdelt-wire-ingest-stream | Target: functions/gdelt-fetcher.js | I/O: ingestion | Assert: pulls breaking international dispatches with automated rate limiting | LOC: ~130
- [ ] TASK: factual-extractive-summarizer | Target: lib/summarizer.js | I/O: nlp | Assert: condenses multi-paragraph reports into <= 30 words strictly avoiding sensationalism | LOC: ~150
- [ ] TASK: semantic-similarity-deduplication | Target: lib/dedup-engine.js | I/O: algorithm | Assert: deduplicates identical news events across 20+ syndicates with Jaccard/cosine indexing | LOC: ~120

## Epic: Zero-Cost Edge PWA Sentinel (Months 7–8)
- [ ] TASK: service-worker-offline-tile-cache | Target: public/sw.js | I/O: pwa | Assert: enables complete offline atlas browsing from IndexedDB cache when disconnected | LOC: ~160
- [ ] TASK: cloudflare-cron-trigger-resilience | Target: wrangler.toml | I/O: infra | Assert: executes 60-second sentinel ingest cycles within free tier worker CPU limits | LOC: ~40
- [ ] TASK: end-to-end-playwright-sentinel-suite | Target: tests/e2e/atlas.spec.ts | I/O: test | Assert: verifies 100% passes across Chromium, Firefox, and WebKit | LOC: ~150
