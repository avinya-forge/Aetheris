# Aetheris — Resume & Technical Contribution Guide (`resume-guide.md`)

> **Purpose**: A comprehensive technical breakdown of Aetheris, detailing project scope, technical stack, human lead vs. AI agent contributions, engineering analytics, and AI skills demonstrated. Designed for direct ingestion into NotebookLM and profile/resume curation.

---

## 1. Executive Summary & Project Overview
**Aetheris** is an AI-driven, strictly text-only real-time global-to-local intelligence sentinel dashboard. It eliminates "Information Fatigue" and visual clutter by aggregating multi-domain feeds (geopolitics, financial markets, environmental hazards, local affairs, classifieds) and deploying AI extractive models to condense long-form news into precise, one-liner factual briefs (≤30 words) with real-time single-country and category targeting.

- **Primary Mission**: Zero visual clutter, zero raster photos/charts, signal-first intelligence.
- **Cost Target**: $0/month production deployment using free-tier Cloudflare Workers, Pages, KV, and Gemini 1.5 Flash.
- **Latency & Performance**: Sub-50ms edge response globally, 60fps WebGL map transitions with 500+ markers.

---

## 2. Technology Stack & Language Breakdown

| Layer | Technology / Tool | Rationale / Key Features |
| :--- | :--- | :--- |
| **Primary Languages** | TypeScript, JavaScript (ES2024 / Node 20+) | Native built-in `fetch`, TS type safety for UI components. |
| **Frontend UI** | React 18, Vite 8, CSS3 (Chromodynamic UI) | Minimal overhead, sub-second HMR, custom Kp-driven atmospheric tinting. |
| **Map Rendering** | Mapbox GL JS / WebGL | High-performance 3D vector map environment; strict zero-raster/vector-glyph policy. |
| **Real-Time Data** | WebSockets (`wss://stream.aisstream.io/v0/stream`) | Live AIS vessel tracking stream. |
| **Orbital Mechanics** | Custom SGP4 Propagation (`src/lib/sgp4.js`) | Lightweight mathematical satellite tracking without heavy npm dependencies. |
| **Edge Compute** | Cloudflare Workers & Pages | Edge API proxy (`functions/worker.mjs`), 1-minute Cron Triggers for background ingest. |
| **Storage & Cache** | Cloudflare Workers KV (`CompressionStream('gzip')`) | Compressed binary ArrayBuffer payloads for zero-cost permanent daily JSON archives. |
| **PWA Resilience** | Service Worker (`script/sw.js`) + IndexedDB | Offline-first Cache-First static asset and Network-First API fallback caching. |
| **AI / LLM Engine** | Gemini 1.5 Flash API + MCP (Model Context Protocol) | Extractive synthesis (≤30 words), 39-tool MCP server exposed at `/api/mcp`. |
| **Testing & Quality** | Node Native Runner (`node:assert`), `c8`, Playwright | >95% per-file test line coverage gate, 100% E2E Playwright verification suite. |

---

## 3. Clear Distinction of Contributions: Human vs. AI

### A. Human Engineer & Lead Product Architect Role
- **Product Vision & System Design**: Conceptualized the text-only sentinel philosophy, temporal axis traversal (Past, Present, Horizon), and zero-raster aesthetic rules.
- **Architectural Guardrails**: Established strict non-negotiable rules:
  - Vision Standard 4 (AI synthesis derived from 20+ sources, capped at 30 words).
  - Redundancy Scrub & lean dependency management (removal of `undici` in favor of native Node `fetch`).
  - Zero Speculation Rule (`isSpeculative: false` requirement for probability cones).
- **Tooling & Multi-Agent Orchestration**: Steered AI coding agents using **Jules (Google)**, **Antigravity**, **Cursor**, **Google AI Pro**, and **Claude**.
- **Strategic Direction**: Prioritized feature backlog items across Phases 1–6, evaluated PR reviews, and enforced strict LOC budget controls (PRs halted if single commit >150 LOC).

### B. AI Agents Contribution (Jules, Antigravity, Cursor, Google AI Pro, Claude)
- **Code Generation & Mutation**: Implemented feature modules in `lib/`, `functions/`, and `src/components/`.
- **Autonomous Multi-Agent Loop Execution**:
  - **HUNTER**: Static analysis scanning for hardcoded secrets and unhandled exceptions (`script/bug-hunter.js`).
  - **ARCHITECT**: AST parsing and dead code elimination.
  - **IMPLEMENTOR**: Mutating source code based on structured schema backlog items.
  - **TESTER**: Executing test suites (`npm run test`) and writing 1:1 unit tests to maintain >95% coverage gates.
- **Algorithmic Implementation**: Custom SGP4 orbital propagation math, AISStream WebSocket handlers, Brotli/Gzip KV payload compression, and MCP server tools.

---

## 4. Key AI Skills & Architectural Innovations Demonstrated
1. **Extractive Synthesis Discipline**: Prompt engineering and output constraining ensuring LLM outputs strictly yield ≤30-word factual briefs derived from 20+ sources without speculative hallucination.
2. **Model Context Protocol (MCP)**: Exposing 39-tool agentic MCP endpoint (`/api/mcp`) allowing AI assistants to query live environmental, geopolitical, and financial telemetry.
3. **Automated Code Quality & Coverage Gates**: Enforcing strict `c8` per-file 95% line coverage on native Node test runner and Playwright E2E visual verification scripts.
4. **Resilient Edge Ingestion & Caching**: Multi-tier caching strategy combining PWA Service Worker IndexedDB with Cloudflare Workers KV gzip payload compression.

---

## 5. Raw Engineering Analytics & Data Points for Resume/NotebookLM
- **Test Line Coverage**: Strictly enforced **>95% per-file** coverage across all `lib/`, `functions/`, `src/lib/`, and `src/components/` modules.
- **Latency Benchmark**: Sub-50ms global response time via Cloudflare Edge.
- **Data Reduction Ratio**: Summarizes lengthy 1,000+ word articles down to ≤30-word briefs (over **97% text clutter reduction**).
- **Map Performance**: Maintains **60fps** pan/zoom transitions with 500+ vector glyph markers rendered on WebGL canvas.
- **Operating Cost**: **$0.00/month** infrastructure overhead leveraging Cloudflare, Open-Meteo, NOAA SWPC, GDELT, and Gemini free tiers.

---

## 6. Bullet Points Ready for Resume & LinkedIn

- **Full-Stack / AI Lead Engineer**: "Architected and deployed *Aetheris*, an AI-driven, text-only global intelligence sentinel that aggregates multi-domain feeds, utilizing Gemini 1.5 Flash to synthesize complex news into ≤30-word factual briefs with sub-50ms edge latency."
- **Edge Computing & Cloud Architecture**: "Designed a $0/mo serverless edge pipeline using Cloudflare Workers, Pages, and KV with Web API Gzip stream compression (`CompressionStream`), serving real-time GDELT, NOAA, and Open-Meteo data globally."
- **AI Agentic Integration**: "Implemented a 39-tool Model Context Protocol (MCP) server enabling autonomous AI agent interactions over live geopolitical, environmental, and financial market telemetry."
- **High-Performance WebGL & Real-Time Systems**: "Developed a WebGL map UI with Mapbox GL, mathematical SGP4 satellite orbital propagation, and WebSocket live AIS vessel tracking maintaining 60fps rendering across 500+ dynamic vector markers."
- **Quality Engineering**: "Established automated CI/CD quality gates enforcing strict >95% per-file test coverage using Node native test runner and Playwright E2E visual verification."
