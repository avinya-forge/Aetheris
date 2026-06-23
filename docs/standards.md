# Engineering Standards — Aetheris

## 1. SSOT & Documentation
- **Hierarchy**: `README.md` → `docs/roadmap.md` → `docs/backlog.md`
- No doc duplication. Flat hierarchy in `docs/`.
- Every PR touching `lib/` or `src/` must update `docs/backlog.md`.
- Backlog Schema (Mandatory): `[ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size`

## 2. Ultra-Lean Architectural Principles
- **Clean Layers**:
  - **Level 0 (Clients)**: `lib/data/*-client.js`. Pure I/O. Returns raw JSON. No transforms.
  - **Level 1 (Mappers)**: `lib/*-mapper.js`. Pure logic. Transforms raw JSON to Aetheris Schema.
  - **Level 2 (Logic)**: `lib/*.js`. Domain logic, filters, clusters. High test coverage.
  - **Level 3 (Orchestrators)**: `functions/*.js`. Glue logic. Minimal branching.
  - **Level 4 (Edge)**: `functions/worker.mjs`. Entry point. Error boundaries only.
- **Ultra-Lean Definition**:
  - Functions should ideally be < 20 lines.
  - Modules should have a single exported interface (Named Exports).
  - No side effects in `lib/` logic files.

## 3. Coding Conventions
- **Module Format**: ES Modules (ESM) preferred.
- **Exports**: Named exports only in `lib/`. Default exports allowed only in `worker.mjs` and `vite.config.js`.
- **Naming**:
  - Components: `PascalCase.tsx`
  - Logic/Libs: `kebab-case.js`
  - Tests: `mirror.test.js` or `.test.ts`
- **Error Handling**:
  - Use `try-catch` only at Level 3/4.
  - Level 0/1/2 should throw descriptive errors or return `null` for expected misses.

## 4. Testing & Quality Gate
- **1:1 Rule**: Every source file MUST have a matching test file.
- **Strict Coverage**: 95%+ aggregate line coverage.
- **Deterministic**: Inject `now` timestamps. Mock all network/KV.
- **Descriptive Asserts**: `assert(actual, expected, "Failure message explaining WHY")`

## 5. Automation & Hygiene (Recurring Patterns)
- **Bug Hunter**: Run `npx tsx script/bug-hunter.js` to check for secrets, default exports, and missing tests.
- **Sanitization**: Delete any file not explicitly tracked in the backlog or roadmap.
- **Flat-First**: If a subdirectory is created in `docs/` or `lib/`, flatten it immediately.

## 6. Data Invariants (Non-Negotiable)
- `isSpeculative: false` required for verified data.
- `patternMatchId` required for all forecasts.
- Ghost Cards capped at 95% likelihood.
- All interpolated data must badge `interpolated: true`.
