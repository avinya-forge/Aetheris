# Backlog — Aetheris

> **SSOT**: README.md → roadmap.md → **backlog.md** (this file) → epic_*.md
> **Schema**: `[ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size`
> **Statuses**: `[x]` done · `[ ]` pending · `[BLOCKED]` external dep · `[DEBT]` tech debt · `[READY]` next up

---

## Phase 0: Foundation — Core Logic Engine (DONE)
*All 30 tasks completed in v0.1.1–v0.1.3. Logged in release-notes.md.*

### Epic 0.1: Data Processing Pipeline
- [x] TASK: implement-cluster-analyzer | Target: lib/data/cluster-analyzer.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~35
- [x] TASK: implement-cluster-identifier | Target: lib/data/cluster-identifier.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: implement-wire-deduplicator | Target: lib/data/wire-deduplicator.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: implement-trend-analyzer | Target: lib/data/trend-analyzer.js | I/O: Array -> Object | Assert: 0 err, >95% cov | LOC: ~20
- [x] TASK: implement-impact-filter | Target: lib/data/impact-filter.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~35
- [x] TASK: implement-threshold-filter | Target: lib/data/threshold-filter.js | I/O: Event, Threshold -> Boolean | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: implement-pattern-matcher | Target: lib/data/pattern-matcher.js | I/O: Object -> Boolean | Assert: 0 err, >95% cov | LOC: ~10
- [x] TASK: implement-prediction-filter | Target: lib/data/prediction-filter.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~10
- [x] TASK: implement-kp-parser | Target: lib/data/kp-parser.js | I/O: Object -> Object | Assert: 0 err, >95% cov | LOC: ~20
- [x] TASK: implement-hazard-evaluator | Target: lib/data/hazard-evaluator.js | I/O: Object -> String | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: implement-extractive-synthesis | Target: lib/data/extractive-synthesis.js | I/O: Array -> String | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: implement-safety-sentinel | Target: lib/data/safety-sentinel.js | I/O: Object -> String | Assert: 0 err, >95% cov | LOC: ~40

### Epic 0.2: Schema Definitions
- [x] TASK: define-forecast-schema | Target: lib/data/forecast-schema.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-threshold-schema | Target: lib/data/threshold-schema.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-ghost-card-schema | Target: lib/schema/ghost-card.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~20
- [x] TASK: define-24h-summary-schema | Target: lib/schema/24h-summary.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: define-environmental-schema | Target: lib/schema/environmental.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-geopolitical-schema | Target: lib/schema/geopolitical.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-summary-schema | Target: lib/schema/summary.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-safety-rule-schema | Target: lib/schema/safety-rule.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-nowcast-schema | Target: lib/schema/nowcast.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-macro-cluster-schema | Target: lib/schema/macro-cluster.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-cluster-schema | Target: lib/schema/cluster.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15

### Epic 0.3: Temporal Intelligence Core
- [x] TASK: init-timeline-store | Target: lib/timeline/store.js | I/O: void -> State | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: implement-time-traversal | Target: lib/timeline/traversal.js | I/O: State -> State | Assert: 0 err, >95% cov | LOC: ~45
- [x] TASK: implement-probability-cones | Target: lib/timeline/probability-cones.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~40

### Epic 0.4: Infrastructure & Docs Automation
- [x] TASK: parse-docs-state | Target: lib/docs/parser.js | I/O: DirPath -> DocsState | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: populate-missing-docs | Target: lib/docs/generator.js | I/O: DocsState -> void | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: implement-recursive-expansion | Target: script/run.sh | I/O: CLI -> State | Assert: 0 err | LOC: ~20
- [x] TASK: implement-service-worker-cache | Target: script/sw.js | I/O: WebRequest -> Response | Assert: offline-functional | LOC: ~50
- [x] TASK: implement-edge-computed-backend | Target: functions/edge-proxy.js | I/O: Data -> Response | Assert: 0 err, >95% cov | LOC: ~80

---

## Phase 1: Signal Layer — Docs & Schema Hygiene (ACTIVE)

### Epic 1.1: Autonomous Documentation Engine
*Goal: run.sh fully syncs SSOT structure; README paths canonical.*

- [READY] TASK: sync-run-sh-paths | Target: script/run.sh | I/O: CLI -> DirState | Assert: AHA/SLAP applied, 0 err | LOC: ~30
  - Apply AHA/SLAP to eliminate repetitive dir/file creation patterns
  - README.md must point to current docs structure post-sync
  - Active epic audit: `[ ]` → `[x]` auto-toggle when target file exists

### Epic 1.2: Schema & Test Debt Resolution
*Goal: unified naming convention across all schemas; Jest as test runner.*

- [READY] TASK: unify-schema-naming | Target: lib/schema/*.js | I/O: void -> void | Assert: 0 err, consistent camelCase | LOC: ~50
  - Audit all 9 schema files for naming inconsistencies
  - Align exported field names to camelCase throughout
  - Update any dependent data-layer imports

- [READY] TASK: migrate-tests-to-jest | Target: tests/*.test.js | I/O: assert -> jest.expect | Assert: 0 err, >95% cov | LOC: ~200
  - Replace native `assert` with `jest.expect` across all 40+ test files
  - Add `package.json` with `"test": "jest"` script
  - Ensure coverage reporter outputs >95% for `lib/data/` and `lib/schema/`

---

## Phase 2: Data Integration — Free APIs (NEXT)

### Epic 2.1: Environmental Data (Zero-Cost)
*Goal: live weather, space weather, and atmospheric data via free public APIs.*

- [x] TASK: integrate-open-meteo | Target: lib/data/open-meteo-client.js | I/O: Coords -> WeatherJSON | Assert: 0 err, >95% cov | LOC: ~60
- [x] TASK: integrate-noaa-swpc | Target: lib/data/noaa-swpc-client.js | I/O: void -> SpaceWeatherJSON | Assert: 0 err, >95% cov | LOC: ~50
- [x] TASK: integrate-nasa-donki | Target: lib/data/nasa-donki-client.js | I/O: DateRange -> SpaceEventsJSON | Assert: 0 err, >95% cov | LOC: ~55

### Epic 2.2: Geopolitical Data (Zero-Cost)
*Goal: real-time global event monitoring via free GDELT API.*

- [x] TASK: integrate-gdelt | Target: lib/data/gdelt-client.js | I/O: Filters -> EventsJSON | Assert: 0 err, >95% cov | LOC: ~65

### Epic 2.4: Ingest Pipeline Infrastructure
*Goal: sniffer agent with cross-cycle dedup and source scheduling.*

- [x] TASK: implement-source-ranker | Target: lib/data/source-ranker.js | I/O: SourcesMeta -> RankedSources | Assert: 0 err, >95% cov | LOC: ~45
- [x] TASK: implement-event-fingerprint | Target: lib/data/event-fingerprint.js | I/O: Event, KV -> Boolean | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: implement-ingest-cycle | Target: functions/ingest-cycle.js | I/O: env -> IngestResult | Assert: 0 err, >95% cov | LOC: ~110
- [x] TASK: implement-cloudflare-worker | Target: functions/worker.js | I/O: Request -> Response | Assert: 0 err | LOC: ~60
- [x] TASK: add-wrangler-config | Target: wrangler.toml | I/O: void -> void | Assert: cron+KV configured | LOC: ~30

### Epic 2.3: Nowcasting Gap-Fill
*Goal: interpolate 6-hour gaps between model updates using Gemini.*

- [ ] TASK: implement-nowcast-interpolator | Target: lib/data/nowcast-interpolator.js | I/O: StaleData -> NowcastJSON | Assert: 0 err, isInterpolated=true | LOC: ~60
  - Detect stale data: timestamp delta > 6h
  - Prompt Gemini 1.5 Flash with last known state to extrapolate gap
  - Populate `lib/schema/nowcast.js` with `interpolated: true` flag
  - Never surface interpolated data as "live" — always badge as "Estimated"

---

## Phase 3: Intelligence Layer — AI Synthesis (SCHEDULED)

### Epic 3.1: Live AI Synthesis Pipeline
*Goal: wire Gemini 1.5 Flash to live data for real-time 30-word briefs.*

- [ ] TASK: integrate-gemini-flash | Target: lib/ai/gemini-client.js | I/O: Prompt -> String | Assert: 0 err, latency <2s | LOC: ~50
  - Use `@google/generative-ai` SDK (free tier: 15 RPM)
  - Strict prompt: "Summarize in ≤30 words. No speculation. Facts only."
  - Rate-limit guard: queue requests, max 15/min
  - Error fallback: return last known synthesis if API fails

- [ ] TASK: wire-extractive-synthesis | Target: lib/data/extractive-synthesis.js | I/O: LiveArray -> String | Assert: ≤30 words, 0 err | LOC: ~25
  - Connect `gemini-client.js` to existing `extractive-synthesis.js`
  - Input: deduplicated + clustered event array from pipeline
  - Assert: output never exceeds 30 words; strip speculative language

- [ ] TASK: wire-safety-sentinel | Target: lib/data/safety-sentinel.js | I/O: LiveEnvData -> Warning | Assert: triggers on temp≥40°C|wind≥100kmh | LOC: ~20
  - Connect `open-meteo-client.js` → `hazard-evaluator.js` → `safety-sentinel.js`
  - Inject rational warning into UI event stream when threshold breached

- [ ] TASK: wire-probability-cones | Target: lib/timeline/probability-cones.js | I/O: LiveForecasts -> GhostCards | Assert: likelihood ≤95%, isSpeculative=false | LOC: ~20
  - Connect live forecast data (NASA DONKI + GDELT trends) to cone generator
  - Ghost Cards: semi-transparent, always show %, cap at 95%

---

## Phase 4: Frontend — Kinetic Atlas UI (SCHEDULED)
*All tasks blocked by frontend environment bootstrap.*

### Epic 4.1: Frontend Bootstrap
*Goal: React + Vite PWA environment wired to lib/ logic.*

- [BLOCKED] TASK: bootstrap-frontend | Target: package.json, vite.config.js | I/O: void -> DevServer | Assert: npm run dev starts, 0 err | LOC: ~80
  - Init Vite + React + TypeScript project
  - Install: mapbox-gl, @google/generative-ai, idb (IndexedDB)
  - Configure PWA plugin (vite-plugin-pwa) with sw.js
  - Wire `--test` command to Jest via npm scripts

- [BLOCKED] TASK: init-mapbox-gl | Target: src/components/map/atlas.tsx | I/O: Config -> MapInstance | Assert: 0 err, renders | LOC: ~60
  - Use Mapbox GL JS free tier (public token, usage-limited)
  - Init map: dark style, globe projection, disable scroll zoom on mobile
  - Expose map instance via React context for zoom-level consumers

### Epic 4.2: Chromodynamic Visual System
*Goal: vector-only UI that shifts atmosphere based on data state.*

- [BLOCKED] TASK: implement-chromodynamic-logic | Target: src/lib/ui/chromodynamic.js | I/O: KpIndex -> ColorSpec | Assert: 0 err, >95% cov | LOC: ~40
  - Kp ≥ 8: UI atmosphere → deep purple (EXTREME aurora probability)
  - Kp ≥ 6: UI atmosphere → electric violet (HIGH)
  - Kp ≥ 5: UI atmosphere → indigo (MODERATE)
  - Kp < 5: UI atmosphere → dark slate (LOW/normal)
  - Heatwave: amber tint overlay

- [BLOCKED] TASK: design-vector-glyphs | Target: src/assets/glyphs/index.svg | I/O: void -> SVG | Assert: clean-SVG, no raster | LOC: ~100
  - SVG-only: storm, aurora, heatwave, flood, solar-flare, conflict glyphs
  - Each glyph: 24×24 viewBox, single path, no fills (stroke-only)

- [BLOCKED] TASK: implement-zoom-logic | Target: src/lib/ui/zoom-controller.js | I/O: ZoomLevel -> LayerVisibility | Assert: 0 err, >95% cov | LOC: ~30
  - Level 1 (< zoom 4): orbital — solar storms, trade routes, conflict zones
  - Level 2 (zoom 4–8): national — legislative shifts, nationwide weather fronts
  - Level 3 (> zoom 8): local — fire alerts, roadworks, localized heat domes

### Epic 4.3: Timeline Interface
*Goal: temporal traversal UI replacing list-scroll paradigm.*

- [BLOCKED] TASK: render-3d-map-timeline | Target: src/components/map/timeline.tsx | I/O: Props -> ReactElement | Assert: 0 err, >95% cov | LOC: ~120
  - Horizontal scrub bar: Past (48h) ←→ Present ←→ Horizon (48h)
  - Dragging updates `lib/timeline/traversal.js` currentFocus
  - Animate map layer transitions when crossing time tiers

- [BLOCKED] TASK: render-ghost-cards | Target: src/components/ui/ghost-card.tsx | I/O: GhostCard -> ReactElement | Assert: 0 err, opacity<1, shows% | LOC: ~50
  - Render probability cones as semi-transparent map overlays
  - Always display likelihood percentage in card header
  - Speculative=true cards: never render (filtered at data layer)

---

## Phase 5: Zero-Cost Deployment — Edge + Beta (PLANNED)

### Epic 5.1: Cloudflare Edge Deployment
*Goal: full zero-cost production deployment on Cloudflare free tier.*

- [ ] TASK: configure-cloudflare-pages | Target: .github/workflows/deploy.yml | I/O: git push -> CF Pages | Assert: auto-deploy on main push | LOC: ~40
  - GitHub Actions → Cloudflare Pages via `cloudflare/pages-action`
  - Build: `npm run build` (Vite output: dist/)
  - Environment secrets: `CF_API_TOKEN`, `CF_ACCOUNT_ID`

- [ ] TASK: deploy-cloudflare-workers | Target: functions/edge-proxy.js | I/O: Request -> Response | Assert: <50ms p95, 0 err | LOC: ~30
  - Configure `wrangler.toml` for Workers deployment
  - Route: `api.aetheris.app/*` → edge-proxy.js
  - Bind KV namespace `AETHERIS_CACHE` for data caching

- [ ] TASK: configure-cloudflare-kv | Target: wrangler.toml | I/O: Data -> KVStore | Assert: cache hit > 80% | LOC: ~20
  - TTLs: weather 1h, space weather 15min, GDELT 15min, NASA 30min
  - KV namespace: `AETHERIS_CACHE` (free tier: 100k reads/day)
  - Stale-while-revalidate pattern for seamless cache refresh

- [ ] TASK: validate-offline-pwa | Target: script/sw.js | I/O: void -> OfflineApp | Assert: loads without network | LOC: ~20
  - Verify service worker caches: index.html, main.js, main.css, glyphs
  - Test: Chrome DevTools → Network → Offline → reload must succeed
  - Cache strategy: stale-while-revalidate for data, cache-first for assets

### Epic 5.2: Limited Beta Access
*Goal: controlled rollout to ≤50 users with zero infrastructure cost.*

- [ ] TASK: implement-invite-gate | Target: src/lib/auth/invite.js | I/O: Code -> Boolean | Assert: invalid code rejected, valid granted | LOC: ~30
  - Simple invite-code validation (hashed list, no server needed)
  - Store accepted code in `localStorage` to persist session
  - 20 invite codes for first cohort; regenerate per cohort

- [ ] TASK: configure-cloudflare-access | Target: cloudflare-access.json | I/O: Email -> AccessGrant | Assert: only allowlisted emails pass | LOC: ~15
  - Cloudflare Access free tier: up to 50 users
  - Policy: email allowlist (beta testers)
  - Fallback: invite-code gate as secondary layer

- [ ] TASK: wire-cloudflare-analytics | Target: src/index.html | I/O: PageView -> Analytics | Assert: events visible in CF dashboard | LOC: ~10
  - Add Cloudflare Web Analytics snippet (privacy-first, no cookies)
  - Track: page load, timeline scrub, ghost card interactions
  - Dashboard: Cloudflare → Analytics → Web Analytics (free)

- [ ] TASK: write-beta-onboarding | Target: docs/beta-guide.md | I/O: void -> Guide | Assert: covers all features | LOC: ~80
  - How to traverse timeline (scrub, not scroll)
  - How to set interest thresholds
  - How to read ghost cards and probability percentages
  - Known limitations: data latency, nowcasting badge meaning

---

## Technical Debt Register

| ID | Task | Target | Priority |
| :-- | :-- | :-- | :-- |
| DEBT-1 | unify-schema-naming | lib/schema/*.js | High (blocks Phase 2) |
| DEBT-2 | migrate-tests-to-jest | tests/*.test.js | Medium |
| DEBT-3 | add-cluster-schema-test | tests/cluster.test.js | Medium |
| DEBT-4 | wire-deploy-logic-to-run-sh | script/run.sh | Low |
