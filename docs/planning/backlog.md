# Backlog (V2 - 2026 Future Focus)

## Phase 3: Kinetic Atlas & UI/UX (Active Focus)
*Note: All UI tasks are currently [BLOCKED] by the lack of a frontend environment (React/Vite/Bundler).*

- [BLOCKED] TASK: bootstrap-frontend-environment | Target: package.json | I/O: void -> JSON | Assert: npm-start-functional | LOC: ~50
- [ ] TASK: implement-chromodynamic-logic | Target: lib/ui/chromodynamic.js | I/O: Kp-Index -> ColorSpec | Assert: 0 err, >95% cov | LOC: ~40
- [ ] TASK: design-vector-glyphs | Target: assets/glyphs/index.svg | I/O: void -> SVG | Assert: Clean-SVG | LOC: ~100
- [ ] TASK: init-mapbox-gl | Target: components/map/atlas.tsx | I/O: Config -> MapInstance | Assert: 0 err | LOC: ~60
- [ ] TASK: implement-layer-zoom-logic | Target: lib/ui/zoom-controller.js | I/O: ZoomLevel -> LayerVisibility | Assert: 0 err, >95% cov | LOC: ~30
- [NEEDS-SPLIT] [ ] TASK: render-3d-map-timeline | Target: components/map/timeline.tsx | I/O: Props -> ReactElement | Assert: 0 err, >95% cov | LOC: ~120
- [ ] TASK: render-ghost-cards | Target: components/ui/ghost-card.tsx | I/O: ProbabilityData -> ReactElement | Assert: 0 err, >95% cov | LOC: ~50

## Phase 4: Production & Sourcing (Scheduled)

- [BLOCKED] TASK: implement-deploy-logic | Target: script/run.sh | I/O: --deploy -> Cloud-Status | Assert: 0 err | LOC: ~30
- [ ] TASK: implement-service-worker-cache | Target: script/sw.js | I/O: WebRequest -> Response | Assert: Offline-Functional | LOC: ~50
- [ ] TASK: implement-edge-computed-back-end | Target: functions/edge-proxy.js | I/O: Data -> Response | Assert: 0 err, >95% cov | LOC: ~80
- [ ] TASK: integrate-gdelt-monitor | Target: lib/data/gdelt-client.js | I/O: REST -> JSON | Assert: 0 err, >95% cov | LOC: ~60
- [ ] TASK: integrate-reuters-wire | Target: lib/data/reuters-client.js | I/O: Feed -> JSON | Assert: 0 err, >95% cov | LOC: ~60
- [ ] TASK: fetch-cams-atmospheric-data | Target: lib/data/cams-client.js | I/O: REST -> JSON | Assert: 0 err, >95% cov | LOC: ~60

## Technical Debt / Refinement

- [DEBT] TASK: unify-schema-naming | Target: lib/schema/*.js | I/O: void -> void | Assert: 0 err | LOC: ~50
- [DEBT] TASK: migrate-tests-to-jest | Target: tests/*.test.js | I/O: CustomAssert -> JestExpect | Assert: 0 err, >95% cov | LOC: ~200
