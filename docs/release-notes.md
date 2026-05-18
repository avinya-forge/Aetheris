# Release Notes

## 0.1.4 - 2026-04-17 (Infrastructure Overhaul)
- [x] TASK: flatten-docs-directory | Target: docs/ | I/O: nested -> flat | Assert: 0 subdirs | DONE
- [x] TASK: consolidate-backlog-ssot | Target: docs/backlog.md | I/O: multiple -> single | Assert: all tasks present | DONE
- [x] TASK: implement-cross-platform-tools | Target: script/ | I/O: bash -> node | Assert: works on Windows/Linux | DONE
- [x] TASK: set-mission-control-protocol | Target: JULES.md | I/O: void -> instructions | Assert: defines JULES persona | DONE
- [x] TASK: bootstrap-wrangler-local | Target: wrangler.toml | I/O: void -> local-dev | Assert: ready on 8787 | DONE


## 0.1.3
- [x] TASK: parse-docs-state | Target: lib/docs/parser.js | I/O: DirPath -> DocsState | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: populate-missing-docs | Target: lib/docs/generator.js | I/O: DocsState -> void | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: implement-recursive-expansion | Target: script/run.sh | I/O: CLI -> State | Assert: 0 err | LOC: ~20
- [x] TASK: implement-pattern-matcher | Target: lib/data/pattern-matcher.js | I/O: Object -> Boolean | Assert: 0 err, >95% cov | LOC: ~10
- [x] TASK: implement-prediction-filter | Target: lib/data/prediction-filter.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~10
- [x] TASK: define-forecast-schema-canonical | Target: lib/schema/forecast.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: implement-impact-filter | Target: lib/data/impact-filter.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~35
- [x] TASK: define-threshold-schema-canonical | Target: lib/schema/threshold.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: init-timeline-store | Target: lib/timeline/store.js | I/O: void -> State | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: implement-time-traversal | Target: lib/timeline/traversal.js | I/O: State -> State | Assert: 0 err, >95% cov | LOC: ~45
- [x] TASK: implement-extractive-synthesis | Target: lib/data/extractive-synthesis.js | I/O: Array -> String | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: implement-safety-sentinel | Target: lib/data/safety-sentinel.js | I/O: Object -> String | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: implement-hazard-evaluator | Target: lib/data/hazard-evaluator.js | I/O: Object -> String | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: define-ghost-card-schema | Target: lib/schema/ghost-card.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~20
- [x] TASK: implement-probability-cones | Target: lib/timeline/probability-cones.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: define-24h-summary-schema | Target: lib/schema/24h-summary.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: define-environmental-schema | Target: lib/schema/environmental.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-geopolitical-schema | Target: lib/schema/geopolitical.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-summary-schema | Target: lib/schema/summary.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-safety-rule-schema | Target: lib/schema/safety-rule.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-nowcast-schema | Target: lib/schema/nowcast.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: define-macro-cluster-schema | Target: lib/schema/macro-cluster.js | I/O: void -> Object | Assert: 0 err, >95% cov | LOC: ~15
- [x] TASK: implement-cluster-identifier | Target: lib/data/cluster-identifier.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: implement-trend-analyzer | Target: lib/data/trend-analyzer.js | I/O: Array -> Object | Assert: 0 err, >95% cov | LOC: ~20
- [x] TASK: implement-wire-deduplicator | Target: lib/data/wire-deduplicator.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~30
- [x] TASK: implement-kp-parser | Target: lib/data/kp-parser.js | I/O: Object -> Object | Assert: 0 err, >95% cov | LOC: ~20

## 0.1.2
- [x] TASK: define-macro-cluster-schema
- [x] TASK: implement-cluster-identifier
- [x] TASK: implement-trend-analyzer
- [x] TASK: implement-wire-deduplicator
- [x] TASK: implement-kp-parser
- [x] TASK: parse-docs-state | Target: lib/docs/parser.js | I/O: DirPath -> DocsState | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: populate-missing-docs | Target: lib/docs/generator.js | I/O: DocsState -> void | Assert: 0 err, >95% cov | LOC: ~40
- [x] TASK: implement-recursive-expansion | Target: script/run.sh | I/O: CLI -> State | Assert: 0 err | LOC: ~20

## 0.1.1
- define-nowcast-schema | Target: lib/schema/nowcast.js
- define-interest-threshold-schema | Target: lib/schema/threshold.js
- implement-impact-filter | Target: lib/data/impact-filter.js
  - [P1] [HIGH-RISK] [x] TASK: define-forecast-schema-canonical | Target: lib/schema/forecast.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~30
  - [P1] [HIGH-RISK] [x] TASK: implement-historical-pattern-matcher | Target: lib/data/pattern-matcher.js | I/O: JSON -> boolean | Assert: 0 err, >95% cov | LOC: ~45
  - [P1] [HIGH-RISK] [x] TASK: filter-speculative-predictions | Target: lib/data/prediction-filter.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~40
  - [P1] [HIGH-RISK] [x] TASK: define-interest-threshold-schema | Target: lib/schema/threshold.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~30
  - [P1] [HIGH-RISK] [x] TASK: implement-impact-filter | Target: lib/data/impact-filter.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~45
  - [x] TASK: define-nowcast-schema | Target: lib/schema/nowcast.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~30
  - [x] TASK: define-safety-rule-schema | Target: lib/schema/safety-rule.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~30
  - [x] TASK: implement-hazard-evaluator | Target: lib/data/hazard-evaluator.js | I/O: Object -> String | Assert: 0 err, >95% cov | LOC: ~45
  - [P1] [HIGH-RISK] [x] TASK: define-summary-schema | Target: lib/schema/summary.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~45
  - [P1] [HIGH-RISK] [x] TASK: define-environmental-schema | Target: lib/schema/environmental.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~45
  - [P1] [HIGH-RISK] [x] TASK: define-geopolitical-schema | Target: lib/schema/geopolitical.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~45
- [x] TASK: implement-threshold-filter | Target: lib/data/threshold-filter.js | I/O: Event, Threshold -> Boolean | Assert: 0 err, >95% cov | LOC: ~40

## v0.1.5 - Kinetic Atlas Foundation
- **Frontend Bootstrap**: Initialized Mapbox GL integration and vector rendering components.
- **Chromodynamic System**: Implemented Kp-index driven visual atmosphere logic.
- **Timeline Engine**: Added 3D temporal traversal interface and Ghost Cards for speculative events.
- **Service Layer**: Established typed hooks for events, synthesis, health, and ghost-card data.
- **Architecture**: Flattened documentation hierarchy and enforced 1:1 test coverage across frontend modules.

## v0.1.6 — Architectural Sync Batch
- Fixed 60+ test failure messages across entire suite.
- Resolved Date.now() drift in events-service.js via injection.
- Renamed worker.js to worker.mjs to fix Node.js module warning.
- Implemented Chromodynamic background logic in Atlas map component.
- Achieved 100% test pass rate with 62 verified tests.
