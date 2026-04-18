# Aetheris — Claude Code Configuration

## Project
Temporal Intelligence & Environmental Sentinel. Eliminates news noise via AI deduplication, primary-source meteorological data, and user-defined impact thresholds. Target: zero-cost PWA deployed to Cloudflare edge, serving limited beta group.

## Commands
```bash
npm run start      # start local worker dev server
npm test           # run all .test.js files via Node
npm run status      # show pending/done task count
npm run ingest      # trigger manual ingest cycle
```

## Repo Structure
```
package.json                   # scripts + dependencies
wrangler.toml                  # Cloudflare Worker config
CLAUDE.md                      # this file
docs/
  README.md                    # vision + pulse table (SSOT entry)
  release-notes.md             # task log per version
  JULES.md                     # instructions
  arch-review.md               # arch review
  architecture/
    system_design.md           # blueprint (data flow, stack, deployment)
  planning/
    backlog.md                 # phase → epic → task (granular SSOT)
    roadmap.md                 # Roadmap
  rules/
    standards.md               # coding + git + doc conventions
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
[Primary Sources: NOAA, GDELT, NASA, Open-Meteo]
       |
       v (Raw JSON)
[lib/data/*-client.js]
       |
       v (Internal Mappings)
[Mappers: weather, news, space-weather]
       |
       v (Event Pipeline)
[Deduplication] -> [Clustering] -> [Impact Filtering]
       |
       v (AI Enrichment)
[Gemini 1.5 Flash] -> [Extractive Synthesis]
       |
       v (Storage)
[Cloudflare KV] <- [Event Fingerprinting]
       |
       v (Serving)
[Cloudflare Workers] -> [PWA Frontend]
```

## Repo Consistency
**V-Score: 10/10**

## Component Status
| Component | Status | Notes |
| :--- | :--- | :--- |
| `lib/schema/*.js` | [BUILT] | 11 JSON Schema draft 7 schemas |
| `lib/data/*.js` | [BUILT] | Pipeline modules, pure API clients |
| `lib/timeline/*.js` | [BUILT] | Temporal intelligence core |
| `functions/worker.js` | [BUILT] | CF Worker edge handler |
| `src/` (Frontend) | [GAP] | Blocked by Phase 4 UI bootstrap |
| `tests/*.test.js` | [BUILT] | 1:1 Coverage with strict mirroring |
| `package.json` | [BUILT] | Test script mapped to node runtime |
| `script/*.js` | [BUILT] | Automation scripts |

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

## Custom Skills
- **caveman**: Use the caveman profile (`.claude/caveman.json`) to explain complex systems or code snippets in simple, rudimentary terms to ensure baseline understanding before diving deep.
- **engineering**: Technical design and implementation rules for the Aetheris stack (Vite, React, Cloudflare Workers).
- **product**: Backlog management and milestone tracking using the `backlog.md` ledger.

## Automation & Commands
- **Sprint Mode**: Invoke `/backlog-sprint` (from `.claude/commands/backlog-sprint.md`) to execute a high-velocity 10-task implementation cycle.
- **Context Hygiene**: Run `/compact` regularly during sprints to keep the inference window narrow and accurate.
