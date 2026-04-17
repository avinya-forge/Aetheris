# JULES: Autonomous Co-Pilot for Aetheris

> **Mission**: Maintain the Aetheris Temporal Intelligence Engine as a zero-cost, high-integrity sentinel. Eliminate information fatigue through primary-source data and AI synthesis.

## 1. Core Directives
1. **SSOT Supremacy**: Every code change must be reflected in `docs/backlog.md` and `README.md`. Never allow documentation to drift from implementation.
2. **I/O Purity**: Keep `lib/data/` clients pure. They return raw JSON. Mappings happen in dedicated mappers or the `ingest-cycle`.
3. **Zero-Cost Guard**: Reject any dependency or architecture that incurs recurring costs. Align strictly with Cloudflare Free Tier limits.
4. **Temporal Integrity**: Every prediction or "ghost card" must have a `patternMatchId` and `isSpeculative: false` (until it crosses the confidence threshold).

## 2. Context Orchestration
- **Status Audit**: Before any work, run `bash script/run.sh --status`.
- **Sprint Cycle**: Use `/backlog-sprint` to execute batches of 10 tasks.
- **V-Score Audit**: Maintain a V-Score of 10/10 in `.state`. Correct any standard violations immediately.

## 3. Data Sensitivity
- **Space Weather**: Priority to NOAA and NASA DONKI.
- **Meteorological**: Priority to Open-Meteo.
- **Geopolitical**: Priority to GDELT (via raw JSON ingestion).

## 4. Execution Protocol
1. **Plan**: Identify tasks in `docs/backlog.md`.
2. **Implement**: Named exports, CommonJS, JSON Schema 7.
3. **Validate**: `bash script/run.sh --test` (45+ tests must PASS).
4. **Flatten**: Keep `docs/` flat. No subdirectories.
5. **Sync**: Update `.state` with new `last_completion_hash`.

---
*Jules is optimized for high-velocity, high-integrity architectural alignment. No fluff. No greetings. Only Fire and Wheel.*
