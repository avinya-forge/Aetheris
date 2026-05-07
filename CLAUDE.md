# Aetheris — Claude Code Configuration

## System Summary
Aetheris is a zero-cost Temporal Intelligence & Environmental Sentinel that eliminates news noise via AI deduplication, primary-source meteorological data, and user-defined impact thresholds. It serves a limited beta group as a PWA deployed directly to the Cloudflare edge.

## Commands
```bash
npm run dev        # start local Vite dev server
npm test           # run all .test.js files via Node
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
docs/
  arch-review.md               # arch review instructions
  architecture/
    system_design.md           # blueprint (data flow, stack, deployment)
  planning/
    backlog.md                 # phase → epic → task (granular SSOT)
    roadmap.md                 # Roadmap
  release-notes.md             # task log per version
  rules/
    standards.md               # coding + git + doc conventions
lib/
  ai/                          # gemini-client and rate-limit queue
  data/                        # data processing pipeline (pure transforms)
  docs/                        # SSOT doc parser + generator
  schema/                      # JSON Schema definitions (PascalCase)
  timeline/                    # temporal state: store, traversal, cones
functions/
  edge-proxy.js                # Cloudflare Worker edge handler
  worker.js                    # CF Worker entry point (ESM)
  ingest-cycle.js              # Cron ingest logic
script/
  run.sh                       # master controller (idempotent)
  sw.js                        # PWA service worker
  test.js                      # test runner
  status.js                    # status checker
  ingest.js                    # ingest trigger script
src/
  main.jsx                     # frontend entrypoint
tests/                         # 1:1 .test.js per lib/ and functions/ module
```

## Zero-Cost Deployment Stack
| LAYER | TOOL | FREE LIMIT | PROJECTED USAGE | COST |
| :--- | :--- | :--- | :--- | :--- |
| Static hosting & Edge | Cloudflare Pages/Workers | 100k req/day | ~5k req/day | $0 |
| Relational DB | Supabase/D1 (Free Tier) | 5M rows / 500MB | ~10k rows | $0 |
| AI/LLM | Gemini Flash (API) | 1M tokens/day | ~100k tokens | $0 |
| Auth/gate | Clerk (Auth) | 10k MAU | ≤100 users | $0 |
| CI/CD | GitHub Actions | Unlimited (public) | ~100 min/mo | $0 |
| Source APIs | Meteo/NOAA/GDELT/DONKI | Variable | Under limits | $0 |
| **Total** | | | | **$0/mo** | <!-- Architecturally Verified -->

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
| `docs/architecture/system_design.md` | [BUILT] | Architecture updated |
| `docs/planning/backlog.md` | [BUILT] | Backlog updated |
| `docs/rules/standards.md` | [BUILT] | Documentation depth flattened |
| `lib/schema/*.js` | [BUILT] | 11 JSON Schema draft 7 schemas |
| `lib/data/*.js` | [BUILT] | Pipeline modules, pure API clients |
| `lib/timeline/*.js` | [BUILT] | Temporal intelligence core |
| `functions/worker.js` | [BUILT] | CF Worker edge handler |
| `src/` (Frontend) | [GAP] | Blocked by Phase 4 UI bootstrap |
| `tests/*.test.js` | [BUILT] | 1:1 Coverage with strict mirroring |
| `package.json` | [BUILT] | Test script mapped to node runtime |
| `script/*.js` | [BUILT] | Automation scripts |

## Key Invariants
- No speculative predictions without `patternMatchId` (`isSpeculative: false` required).
- No frontend code before Phase 4.
- No direct push to `main`.
- Never use top-level await in CommonJS.
- 1:1 Test Coverage: Every source file added must have a matching test.

## Coding Standards
- **Exports:** Named exports only (`module.exports = { name }`). Exception: `functions/worker.js` requires default export for Cloudflare ES modules.
- **I/O Purity:** No side effects in `lib/data/` transforms. Clients return raw data.
- **Constants:** Use `SCREAMING_SNAKE_CASE`.
- **Functions:** Use camelCase verb-first naming.
- **Schemas:** Must follow JSON Schema draft 7 format in `lib/schema/` with definitions only.
- **Tests:** Must be deterministic with no actual network calls and mock all external deps.

## Custom Skills
- **caveman**: Use the caveman profile (`.claude/caveman.json` and `.claude/skills/caveman/`) to explain complex systems or code snippets in simple, rudimentary terms to ensure baseline understanding before diving deep.
- **engineering**: Technical design and implementation rules for the Aetheris stack.
- **product**: Backlog management and milestone tracking using the `backlog.md` ledger.
- **vite-react**: Rules for Vite + React development, component naming, and vector rendering.
- **cloudflare-workers**: Instructions for Cloudflare Workers edge environment, ESM exports, and KV caching.
- **mapbox-gl**: Guidelines for high-performance 3D vector maps and avoiding Mapbox API cost overruns.


## Architectural Audit (Phase 1)
| Component | Status | Notes |
| :--- | :--- | :--- |
| `docs/architecture/system_design.md` | [BUILT] | Architecture updated |
| `docs/planning/backlog.md` | [BUILT] | Backlog verified |
| `docs/rules/standards.md` | [BUILT] | Documentation depth flattened |
| `lib/schema/*.js` | [BUILT] | 11 JSON Schema schemas present |
| `lib/data/*.js` | [BUILT] | Pipeline modules, pure API clients verified |
| `lib/timeline/*.js` | [BUILT] | Temporal intelligence core present |
| `functions/worker.js` | [BUILT] | CF Worker edge handler present |
| `src/` (Frontend) | [GAP] | Blocked by Phase 4 UI bootstrap |
| `tests/*.test.js` | [BUILT] | 1:1 Coverage with strict mirroring achieved |
| `package.json` | [BUILT] | Build scripts configured |
| `script/*.js` | [BUILT] | Automation scripts configured |

## ASCII Data Flow Diagram
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
