# Backlog (V2 - 2026 Future Focus)

## Phase 3: Kinetic Atlas & UI/UX (Scheduled)
*Note: All UI tasks are currently [BLOCKED] by the lack of a frontend environment (React/Vite/Bundler).*

### TASK_2 | BLOCKED
- **Definition of Done**: implement-3d-map-timeline-ui | Target: components/map/ | I/O: Props -> UI | Assert: 0 err | LOC: ~260
- **Audit focus**: Visual standards and vector mapping per Aesthetic North Star.
- **Technical Context**: UI Core.
- **Engineering Log**:
  - Run 1: Blocked pending frontend environment.

### TASK_3 | BLOCKED
- **Definition of Done**: bootstrap-and-design-frontend | Target: UI Core | I/O: void -> App | Assert: starts | LOC: ~190
- **Audit focus**: React/Vite/Bundler setup.
- **Technical Context**: Frontend architecture.
- **Engineering Log**:
  - Run 1: Blocked pending architecture decision.

## Phase 4: Production & Sourcing (Scheduled)

### TASK_4 | DONE
- **Definition of Done**: implement-deployment-and-edge-backend | Target: functions/ | I/O: Data -> Response | Assert: 0 err | LOC: ~160
- **Audit focus**: Edge computing functions.
- **Technical Context**: Deployment architecture.
- **Engineering Log**:
  - Run 1: Completed previously.

### TASK_5 | BLOCKED
- **Definition of Done**: integrate-external-data-sources | Target: lib/data/ | I/O: REST -> JSON | Assert: 0 err | LOC: ~180
- **Audit focus**: API integration.
- **Technical Context**: External data sourcing.
- **Engineering Log**:
  - Run 1: Scheduled for Phase 4.

## Technical Debt / Refinement

### TASK_6 | READY
- **Definition of Done**: unify-schema-naming and migrate-tests-to-jest | Target: lib/schema/*.js, tests/*.test.js | I/O: void -> void | Assert: 0 err, >95% cov | LOC: ~250
- **Audit focus**: Schema naming conventions and Jest migration.
- **Technical Context**: Refactoring and test environment updates.
- **Engineering Log**:
  - Run 1: Batched to meet >50 LOC requirement.

## Phase 1: Signal-to-Noise Ratio (Active Focus)
# Epic 1: Autonomous Architecture & Documentation Engine

### TASK_1 | READY
- **Definition of Done**: `run.sh` sync logic uses new directory structure and applies AHA/SLAP to repetitive directory and file creation. `README.md` points to the new updated documentation paths.
- **Audit focus**: AHA/SLAP applied.
- **Technical Context**: `script/run.sh` and `README.md`.
- **Engineering Log**:
  - Run 1: Updating paths for clean sweep. | No counter argument needed.
