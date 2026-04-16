# Aetheris — Claude Code Configuration

## Project
Temporal Intelligence & Environmental Sentinel. Eliminates news noise via AI deduplication, primary-source meteorological data, and user-defined impact thresholds. Target: zero-cost PWA deployed to Cloudflare edge, serving limited beta group.

## Commands
```bash
bash script/run.sh --start      # init env + sync docs
bash script/run.sh --test       # run all .test.js files via Node
bash script/run.sh --status     # show pending/done task count
bash script/run.sh --backlog    # audit active epics against filesystem
bash script/run.sh --sync       # idempotent dir structure sync
bash script/run.sh --recursive  # expand backlog to convergence
bash script/run.sh --epoch      # map new epic into docs/planning/
bash script/run.sh --skills     # fetch skill patterns from skills.sh
```

## Repo Structure
```
CLAUDE.md                      # this file
README.md                      # vision + pulse table (SSOT entry)
release-notes.md               # task log per version
docs/
  architecture/system_design.md  # blueprint (data flow, stack, deployment)
  planning/
    roadmap.md                 # phase → epic list
    backlog.md                 # phase → epic → task (granular SSOT)
  rules/standards.md           # coding + git + doc conventions
lib/
  data/                        # data processing pipeline (pure transforms)
  schema/                      # JSON Schema definitions (PascalCase)
  timeline/                    # temporal state: store, traversal, cones
  docs/                        # SSOT doc parser + generator
  ai/                          # gemini-client and rate-limit queue
functions/
  edge-proxy.js                # Cloudflare Worker edge handler
  worker.js                    # CF Worker entry point (ESM)
  ingest-cycle.js              # Cron ingest logic
script/
  run.sh                       # master controller (idempotent)
  sw.js                        # PWA service worker
tests/                         # 1:1 .test.js per lib/ and functions/ module
```

## Zero-Cost Deployment Stack
| LAYER | TOOL | FREE LIMIT | PROJECTED USAGE | COST |
| :--- | :--- | :--- | :--- | :--- |
| Static hosting | Cloudflare Pages | Unlimited | ~30 builds | $0/mo |
| Edge compute | Cloudflare Workers | 100k req/day | ~5k req/day | $0/mo |
| Key-value cache | Cloudflare KV | 100k reads/day | ~20k reads/day | $0/mo |
| Relational DB | Supabase / D1 | 500MB | ~10MB | $0/mo |
| AI/LLM | Gemini 1.5 Flash | 15 RPM | ~2 RPM avg | $0/mo |
| Auth/gate | Clerk | 10,000 MAU | ≤50 users | $0/mo |
| CI/CD | GitHub Actions | 2000 min/mo | ~100 min/mo | $0/mo |
| Source APIs | Free APIs (Meteo/NOAA/GDELT/DONKI) | Variable | Under limit | $0/mo |
| **Total** | | | | **$0/mo** |

**Deployment Trigger Chain:**
`git push` → `CI build` → `deploy` → `cache warm` → `health check`

## Data Flow (ASCII)
```
[Free APIs] -> [Cloudflare Workers] -> [Cloudflare KV] -> [Supabase/D1]
      ^               |                        |                 |
      |               v                        v                 v
[Auth: Clerk] -> [PWA (Vite)] <------- [Gemini Flash] <--- [Event Sync]
```

## Repo Consistency
**V-Score: 10/10**

## Component Status
| Component | Status | Notes |
| :--- | :--- | :--- |
| `lib/schema/*.js` | [BUILT] | 9 JSON Schema draft 7 schemas |
| `lib/data/*.js` | [BUILT] | 14 Pipeline modules, API clients |
| `lib/timeline/*.js` | [BUILT] | Temporal intelligence core |
| `functions/worker.js` | [BUILT] | CF Worker edge handler |
| `src/` (Frontend) | [GAP] | Blocked by Phase 4 UI bootstrap |
| `tests/*.test.js` | [BUILT] | 1:1 Coverage for lib and functions |
| `package.json` | [BUILT] | Test script mapped to node runtime |

## Key Invariants
- No speculative predictions without `patternMatchId`.
- No frontend code before Phase 4.
- No direct push to `main`.
- Never use top-level await in CommonJS.

## Coding Standards
- Named exports only: `module.exports = { name };` (Exception: `functions/worker.js` requires default export for Cloudflare ES modules).
- I/O Purity: No side effects in `lib/data/` transforms. Clients return raw data.
- 1:1 test coverage for all `lib/`, `functions/`, and `script/` modules.
- Schemas: JSON Schema draft 7 in `lib/schema/`.
- Predictions: must have `patternMatchId`, `isSpeculative: false`.