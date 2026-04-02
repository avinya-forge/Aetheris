# Backlog (V2 - 2026 Future Focus)

## Phase 3: Kinetic Atlas & UI/UX (Active Focus)
*Note: All UI tasks are currently [BLOCKED] by the lack of a frontend environment (React/Vite/Bundler).*

- [BLOCKED] TASK: implement-3d-map-timeline-ui | Target: components/map/ | I/O: Props -> UI | Assert: 0 err | LOC: ~260
- [BLOCKED] TASK: bootstrap-and-design-frontend | Target: UI Core | I/O: void -> App | Assert: starts | LOC: ~190

## Phase 4: Production & Sourcing (Scheduled)

- [x] TASK: implement-deployment-and-edge-backend | Target: functions/ | I/O: Data -> Response | Assert: 0 err | LOC: ~160
- [BLOCKED] TASK: integrate-external-data-sources | Target: lib/data/ | I/O: REST -> JSON | Assert: 0 err | LOC: ~180

## Technical Debt / Refinement

- [DEBT] TASK: unify-schema-naming | Target: lib/schema/*.js | I/O: void -> void | Assert: 0 err | LOC: ~50
- [DEBT] TASK: migrate-tests-to-jest | Target: tests/*.test.js | I/O: CustomAssert -> JestExpect | Assert: 0 err, >95% cov | LOC: ~200

## Phase 1: Signal-to-Noise Ratio
# Epic 1: Autonomous Architecture & Documentation Engine

### TASK_1 | READY
- **Definition of Done**: `run.sh` sync logic uses new directory structure and applies AHA/SLAP to repetitive directory and file creation. `README.md` points to the new updated documentation paths.
- **Audit focus**: AHA/SLAP applied.
- **Technical Context**: `script/run.sh` and `README.md`.
- **Engineering Log**:
  - Run 1: Updating paths for clean sweep. | No counter argument needed.
