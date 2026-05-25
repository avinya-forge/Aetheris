# Aetheris — Claude Code Configuration

## System Summary
Aetheris is a zero-cost Temporal Intelligence & Environmental Sentinel that eliminates news noise via AI deduplication, primary-source meteorological data, and user-defined impact thresholds. It serves a limited beta group as a PWA deployed directly to the Cloudflare edge.

## Commands
```bash
npm run dev        # start local Vite dev server
npm test           # run all tests via Node script/test.js
npm run status     # show pending/done task count
npm run ingest     # trigger manual ingest cycle
npm run build      # Vite production build
npm run worker:dev # local wrangler worker dev server
```

## Repo Structure
```
package.json                   # scripts + dependencies
wrangler.toml                  # Cloudflare Worker config
CLAUDE.md                      # this file
AGENTS.md                      # instructions for agents
docs/
  arch-review.md               # arch review instructions
  backlog.md                   # phase → epic → task (granular SSOT)
  release-notes.md             # task log per version
  roadmap.md                   # Roadmap
  standards.md                 # coding + git + doc conventions
  system_design.md             # blueprint (data flow, stack, deployment)
lib/
  ai/                          # gemini-client and rate-limit queue
  data/                        # data processing pipeline (pure transforms)
  docs/                        # SSOT doc parser + generator
  schema/                      # JSON Schema definitions (PascalCase)
  timeline/                    # temporal state: store, traversal, cones
functions/
  edge-proxy.js                # Cloudflare Worker edge handler
  worker.mjs                    # CF Worker entry point (ESM)
  ingest-cycle.js              # Cron ingest logic
script/
  run.sh                       # master controller (idempotent)
  sw.js                        # PWA service worker
  test.js                      # test runner
  status.js                    # status checker
src/
  assets/                      # SVG glyphs and vectors
  components/                  # React components (map, ui)
  lib/                         # frontend logic (ui, services)
  main.jsx                     # frontend entrypoint
tests/                         # 1:1 test coverage with strict mirroring
```

## Zero-Cost Deployment Stack
| LAYER | TOOL | FREE LIMIT | PROJECTED USAGE | COST |
| :--- | :--- | :--- | :--- | :--- |
| Static hosting & Edge | Cloudflare Pages/Workers | 100k req/day | ~5k req/day | -bash |
| Relational DB | Supabase/D1 (Free Tier) | 5M rows / 500MB | ~10k rows | -bash |
| AI/LLM | Gemini Flash (API) | 1M tokens/day | ~100k tokens | -bash |
| Auth/gate | Clerk (Auth) | 10k MAU | ≤100 users | -bash |
| CI/CD | GitHub Actions | Unlimited (public) | ~100 min/mo | -bash |
| Source APIs | Meteo/NOAA/GDELT/DONKI | Variable | Under limits | -bash |
| **Total** | | | | **-bash/mo** |

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
**V-Score: 9/10**

## Component Mapping Status
| Component | Status ([BUILT] / [PLANNED] / [GAP]) | Notes |
| :--- | :--- | :--- |
| `docs/system_design.md` | [BUILT] | Architecture updated |
| `docs/backlog.md` | [BUILT] | Backlog updated |
| `docs/standards.md` | [BUILT] | Documentation depth flattened |
| `lib/schema/*.js` | [BUILT] | 11 JSON Schema draft 7 schemas |
| `lib/data/*.js` | [BUILT] | Pipeline modules, pure API clients |
| `lib/timeline/*.js` | [BUILT] | Temporal intelligence core |
| `functions/worker.mjs` | [BUILT] | CF Worker entry point |
| `src/` (Frontend) | [BUILT] | Phase 4 UI foundation established |
| `tests/*.test.js` | [BUILT] | 1:1 Coverage with strict mirroring |
| `package.json` | [BUILT] | Version v0.1.9 |

## Key Invariants
- No speculative predictions without `patternMatchId` (`isSpeculative: false` required).
- Named exports only (`module.exports = { name }`).
- 1:1 Test Coverage: Every source file must have a matching test.
- No top-level await in CommonJS.
