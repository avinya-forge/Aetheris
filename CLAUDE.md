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
bash script/run.sh --epoch      # map new epic into active/
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
    active/epic_*.md           # active epic task files
  rules/standards.md           # coding + git + doc conventions
lib/
  data/                        # data processing pipeline (14 modules)
  schema/                      # JSON Schema definitions (9 schemas)
  timeline/                    # temporal state: store, traversal, cones
  docs/                        # SSOT doc parser + generator
functions/
  edge-proxy.js                # Cloudflare Worker edge handler
script/
  run.sh                       # master controller (idempotent)
  sw.js                        # PWA service worker
tests/                         # 1:1 .test.js per lib/ module
```

## SSOT Hierarchy
```
README.md (vision)
  └── docs/planning/roadmap.md (phases + epics)
        └── docs/planning/backlog.md (phase → epic → tasks)
              └── docs/planning/active/epic_*.md (audited task files)
```

## Skills (from skills.sh)
- `project-management-pdlc` — phase-driven delivery lifecycle
- `software-engineering-sdlc` — atomic commits, SSOT, AHA/SLAP
- `data-engineering-etl` — pipeline: ingest → filter → cluster → synthesize
- `devops-iac` — idempotent scripts, Cloudflare Workers IaC
- `cloud-native-pwa` — service worker, offline-first, edge caching
- `ai-llm-fine-tuning` — Gemini 1.5 Flash, extractive-only synthesis
- `frontend-webgl-mapbox` — Mapbox GL JS, WebGL vector rendering
- `security-zero-trust` — Cloudflare Access, invite-code beta gate
- `performance-edge-computing` — Cloudflare KV, CDN cache, sub-50ms
- `uiux-minimalist-vector` — chromodynamic glyphs, no stock photos

## Zero-Cost Deployment Stack
| Layer | Tool | Free Tier |
| :--- | :--- | :--- |
| Frontend Hosting | Cloudflare Pages | Unlimited (public repo) |
| Edge Functions | Cloudflare Workers | 100k req/day |
| Edge Cache | Cloudflare KV | 100k reads/day |
| Client Cache | Service Worker + IndexedDB | Unlimited |
| Weather API | Open-Meteo | Unlimited (no key) |
| Space Weather | NOAA SWPC API | Unlimited (public) |
| Geopolitical | GDELT Project API | Unlimited (public) |
| Space Events | NASA DONKI API | 1000 req/hr (free key) |
| AI Synthesis | Gemini 1.5 Flash | 15 RPM / 1M tokens/day |
| CI/CD | GitHub Actions | 2000 min/month (public) |
| Beta Access | Cloudflare Access | Free up to 50 users |

## Coding Standards
- Every `lib/` file → matching `tests/*.test.js` (native `assert` until Jest migration)
- Core data logic: >95% test coverage
- AI: Gemini 1.5 Flash only; 30-word extractive briefs, zero speculation
- Ghost Cards: always semi-transparent, always show %, never "certain"
- Schemas: JSON Schema draft 7 pattern
- Predictions: must have `patternMatchId`, `isSpeculative: false`
- Impact gate: `impactScore >= minImpactScore` before surfacing events

## Key Invariants (Do Not Break)
- No speculative predictions without `patternMatchId` + `isSpeculative: false`
- No frontend code before bootstrap task (`TASK_3`) is complete
- No direct push to `main` — use feature branches
- No new file in `lib/` without corresponding `tests/*.test.js`
- No SSOT fragmentation — single backlog, single roadmap, single system design
- Backlog schema: `[ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size`

## Data Flow
```
Free APIs (Open-Meteo, NOAA, GDELT, NASA DONKI)
  → Cloudflare Worker (edge-proxy.js)
  → Cluster + Deduplicate (lib/data/)
  → Impact Filter (impactScore gate)
  → Extractive Synthesis (Gemini 1.5 Flash, 30-word brief)
  → Safety Sentinel (hazard warnings)
  → Probability Cones (Ghost Cards, % likelihood)
  → Timeline Store (past / present / horizon)
  → Cloudflare KV (edge cache)
  → Service Worker (offline PWA cache)
  → Kinetic Atlas UI (Mapbox GL / WebGL)
```
