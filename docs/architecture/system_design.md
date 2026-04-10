# System Design — Aetheris

## Core Architecture: The "Pulse" Time-Axis
Users do not scroll; they **traverse** a 3D-mapped timeline.

| Tier | Focus | AI Action |
| :--- | :--- | :--- |
| **Past (2h–48h)** | Rapid Response | Deduplication + 30-word extractive brief |
| **History (1w–1m)** | Trend Analysis | Macro-Cluster identification + geopolitical shifts |
| **Present** | Real-Time Flash | Live Kp Index (Aurora), Heatwave alerts, breaking wires |
| **Horizon (0–48h)** | Predictive Modeling | Logic-based Probability Cones (Ghost Cards, never speculative) |

---

## Data Pipeline

```
Free Public APIs
  ├── Open-Meteo (weather, no key)
  ├── NOAA SWPC (space weather, public)
  ├── GDELT Project (geopolitical, public)
  └── NASA DONKI (space events, free key)
         │
         ▼
Cloudflare Worker (edge-proxy.js)
  ├── Validate payload
  ├── Check KV cache (stale-while-revalidate)
  └── Fan-out to API clients
         │
         ▼
lib/data/ Processing Pipeline
  ├── wire-deduplicator.js  → hash-based dedup of news wires
  ├── cluster-identifier.js → group events by topic, calc impactScore
  ├── impact-filter.js      → gate on impactScore >= minImpactScore
  ├── kp-parser.js          → Kp-index → aurora probability tier
  ├── hazard-evaluator.js   → temp/wind thresholds → safety warnings
  ├── extractive-synthesis.js → Gemini 1.5 Flash → ≤30 word brief
  ├── safety-sentinel.js    → inject rational hazard warnings
  └── probability-cones.js  → Ghost Cards from patternMatchId forecasts
         │
         ▼
lib/timeline/ State
  ├── store.js      → currentFocus: past | present | horizon
  └── traversal.js  → update focus on user scrub
         │
         ▼
Cloudflare KV Cache (TTL-based)
  │
  ▼
Service Worker (sw.js) — offline-first PWA cache
  │
  ▼
Kinetic Atlas UI (Mapbox GL / WebGL)
  ├── Chromodynamic atmosphere (Kp-driven colour)
  ├── Vector glyphs (no raster, no photos)
  ├── Zoom levels 1–3 (orbital → national → local)
  ├── Timeline scrub bar (not scroll)
  └── Ghost Cards (semi-transparent, % always visible)
```

---

## Data Sourcing: Ground Truth Protocol

### A. Environmental (Raw Physics) — All Free
| Source | API | Data | Key |
| :--- | :--- | :--- | :--- |
| Open-Meteo | `api.open-meteo.com/v1/forecast` | temperature, wind, precipitation | None |
| NOAA SWPC | `services.swpc.noaa.gov/json/planetary_k_index_1m.json` | Kp-index, solar wind | None (public) |
| NASA DONKI | `api.nasa.gov/DONKI/` | CME, solar flares, particle events | Free key |

### B. Geopolitical & News — All Free
| Source | API | Data | Key |
| :--- | :--- | :--- | :--- |
| GDELT Project | `api.gdeltproject.org/api/v2/doc/doc` | Global events, 100+ languages | None (public) |

### C. Banned Sources
- Reuters/AP (paid wire — use GDELT as proxy, GDELT includes AP/Reuters articles)
- Copernicus CAMS (registration wall — replace with Open-Meteo AQI endpoint)

---

## UI/UX: Kinetic Atlas

### Zoom Logic
| Level | View | Content |
| :--- | :--- | :--- |
| 1 — Orbital (zoom < 4) | Global/space | Solar storms, trade routes, conflict zones, aurora extent |
| 2 — National (zoom 4–8) | Country | Legislative shifts, nationwide weather fronts, regional alerts |
| 3 — Local (zoom > 8) | County | Fire alerts, roadworks, heat domes, hyper-local warnings |

### Visual Rules
- No stock photos, no list views
- Vector glyphs only (SVG, stroke-only, 24×24 viewBox)
- Chromodynamic atmosphere: UI background shifts with Kp index
  - Kp ≥ 8 → deep purple (EXTREME)
  - Kp ≥ 6 → electric violet (HIGH)
  - Kp ≥ 5 → indigo (MODERATE)
  - Kp < 5 → dark slate (normal)
  - Active heatwave → amber tint overlay

---

## AI Reasoning & Summarization

### Rules (Non-Negotiable)
- **Extractive Synthesis**: 20+ sources → ≤30-word factual brief. Zero speculation.
- **Safety Sentinel**: Trigger: temp ≥ 40°C or wind ≥ 100 km/h → rational warning injected.
- **Probability Cones**: `patternMatchId` required + `isSpeculative: false` required. Capped at 95%.
- **Ghost Cards**: Always semi-transparent. Always show %. Never rendered if `isSpeculative: true`.

### Gemini 1.5 Flash (Free Tier)
- Rate: 15 RPM / 1M tokens/day
- Prompt discipline: structured, output-constrained, no open-ended generation
- Fallback: return last cached synthesis if API rate-limited

---

## Zero-Cost Deployment Architecture

```
GitHub (source)
  │ push to main
  ▼
GitHub Actions (CI/CD — free public repo)
  │ npm run build (Vite → dist/)
  ▼
Cloudflare Pages (static hosting — free)
  │ serves: index.html, main.js, main.css, glyphs, sw.js
  ▼
Cloudflare Workers (edge compute — 100k req/day free)
  │ functions/edge-proxy.js
  │ binds: Cloudflare KV (AETHERIS_CACHE)
  ▼
Cloudflare KV (edge cache — 100k reads/day free)
  │ TTLs: weather 1h, space 15min, GDELT 15min
  ▼
Free Public APIs
  └── Open-Meteo · NOAA SWPC · GDELT · NASA DONKI
```

### Cost Breakdown (Monthly at Beta Scale, ≤50 Users)
| Service | Free Limit | Projected Usage | Cost |
| :--- | :--- | :--- | :--- |
| Cloudflare Pages | Unlimited builds | ~30 builds | $0 |
| Cloudflare Workers | 100k req/day | ~5k req/day | $0 |
| Cloudflare KV | 100k reads/day | ~20k reads/day | $0 |
| Cloudflare Access | 50 users | ≤50 users | $0 |
| Gemini 1.5 Flash | 15 RPM | ~2 RPM avg | $0 |
| Open-Meteo | Unlimited | ~500 req/day | $0 |
| NOAA SWPC | Unlimited | ~100 req/day | $0 |
| GDELT | Unlimited | ~200 req/day | $0 |
| NASA DONKI | 1000 req/hr | ~50 req/day | $0 |
| **Total** | | | **$0/month** |

---

## Beta Access Strategy

### Limited Group Rollout (≤50 Users)
1. **Layer 1 — Cloudflare Access**: email allowlist, free up to 50 seats
2. **Layer 2 — Invite Codes**: hashed code list in client bundle, `localStorage` persistence
3. **Cohorts**: 10-user batches; each cohort gets unique invite codes
4. **Feedback**: GitHub Issues (tagged `beta-feedback`); no extra tooling needed

---

## Feasibility & Known Gaps

| Gap | Fix | Status |
| :--- | :--- | :--- |
| Predictive Hallucination | Logic-based only: `patternMatchId` + `isSpeculative: false` gate | Implemented |
| Signal-to-Noise | `minImpactScore` user threshold + `impact-filter.js` | Implemented |
| Data Latency (6h gaps) | Nowcasting interpolator: Gemini fills gaps, badges as "Estimated" | Planned (Phase 2) |
| Mapbox cost at scale | Free tier sufficient for beta (50 users); re-evaluate post-beta | Planned |
| CAMS (registration wall) | Replace with Open-Meteo AQI + UV index endpoints | Planned (Phase 2) |

---

## Technical Stack (2026)
| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| Frontend | Vite + React + TypeScript | Fast builds, type safety, ecosystem |
| Map Rendering | Mapbox GL JS / WebGL | High-performance 3D vector maps |
| State | React Context + Timeline Store | Minimal, no Redux overhead |
| AI | Gemini 1.5 Flash | Fastest free-tier LLM |
| Edge | Cloudflare Workers | Sub-50ms globally, free tier |
| Cache | Cloudflare KV + Service Worker | Two-layer offline-first caching |
| CI/CD | GitHub Actions → Cloudflare Pages | Zero config, zero cost |
| Tests | Jest (post-migration) | Standard, coverage built-in |
