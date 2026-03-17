# Release Notes

## 0.1.1
- define-nowcast-schema | Target: lib/schema/nowcast.js
- define-interest-threshold-schema | Target: lib/data/threshold-schema.js
- implement-impact-filter | Target: lib/data/impact-filter.js
  - [P1] [HIGH-RISK] [x] TASK: define-forecast-schema | Target: lib/data/forecast-schema.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~30
  - [P1] [HIGH-RISK] [x] TASK: implement-historical-pattern-matcher | Target: lib/data/pattern-matcher.js | I/O: JSON -> boolean | Assert: 0 err, >95% cov | LOC: ~45
  - [P1] [HIGH-RISK] [x] TASK: filter-speculative-predictions | Target: lib/data/prediction-filter.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~40
  - [P1] [HIGH-RISK] [x] TASK: define-interest-threshold-schema | Target: lib/data/threshold-schema.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~30
  - [P1] [HIGH-RISK] [x] TASK: implement-impact-filter | Target: lib/data/impact-filter.js | I/O: Array -> Array | Assert: 0 err, >95% cov | LOC: ~45
  - [x] TASK: define-nowcast-schema | Target: lib/schema/nowcast.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~30
  - [x] TASK: define-safety-rule-schema | Target: lib/schema/safety-rule.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~30
  - [x] TASK: implement-hazard-evaluator | Target: lib/data/hazard-evaluator.js | I/O: Object -> String | Assert: 0 err, >95% cov | LOC: ~45
  - [P1] [HIGH-RISK] [x] TASK: define-summary-schema | Target: lib/schema/summary.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~45
  - [P1] [HIGH-RISK] [x] TASK: define-environmental-schema | Target: lib/schema/environmental.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~45
  - [P1] [HIGH-RISK] [x] TASK: define-geopolitical-schema | Target: lib/schema/geopolitical.js | I/O: void -> JSON | Assert: 0 err, >95% cov | LOC: ~45
