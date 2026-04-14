# Aetheris — Claude Code Configuration

## Project
Temporal Intelligence & Environmental Sentinel. Eliminates news noise via AI deduplication, primary-source meteorological data, and user-defined impact thresholds. Target: zero-cost PWA deployed to Cloudflare edge, serving limited beta group.

## Data Flow (ASCII)
```
[Free APIs] -> [Cloudflare Workers] -> [KV / Supabase] -> [Gemini Flash]
      ^               |                    |                 |
      |               v                    v                 v
[Auth: Clerk] -> [PWA (Vite)] <------- [Service Worker / IndexedDB]
```

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
functions/
  edge-proxy.js                # Cloudflare Worker edge handler
  worker.js                    # CF Worker entry point (ESM)
  ingest-cycle.js              # Cron ingest logic
script/
  run.sh                       # master controller (idempotent)
  sw.js                        # PWA service worker
tests/                         # 1:1 .test.js per lib/ module
```

## Zero-Cost Deployment Stack
| Layer | Tool | Free Tier | Projected (Beta) |
| :--- | :--- | :--- | :--- |
| Frontend | Cloudflare Pages | Unlimited | $0 |
| Edge | Cloudflare Workers | 100k req/day | $0 |
| Auth | Clerk | 10,000 MAU | $0 |
| Database | Supabase / D1 | 500MB | $0 |
| Cache | Cloudflare KV | 100k reads/day | $0 |
| AI | Gemini 1.5 Flash | 15 RPM | $0 |
| CI/CD | GitHub Actions | 2000 min/mo | $0 |

## Coding Standards
- Named exports only: `module.exports = { name };`
- I/O Purity: No side effects in `lib/data/` transforms. Clients return raw data.
- 1:1 test coverage for all `lib/` and `functions/` modules.
- Schemas: JSON Schema draft 7 in `lib/schema/`.
- Predictions: must have `patternMatchId`, `isSpeculative: false`.

## Key Invariants
- No speculative predictions without `patternMatchId`.
- No frontend code before Phase 4.
- No direct push to `main`.
