# AGENTS.md — Instructions for Aetheris Engineering

## Coding Standards
- **Named Exports**: Always use named exports for library files (`lib/`).
- **I/O Purity**: API clients in `lib/` must return raw JSON. Mappers handle transformation.
- **Strict 1:1 Testing**: Every file in `lib/`, `functions/`, `script/`, or `src/lib/` must have a corresponding `.test.ts` or `.test.tsx` in `tests/`.
- **Failure Messaging**: All `assert` calls must include a failure message as the final argument.
- **Determinism**: Avoid `Date.now()` without injection.

## Documentation
- **Flat Documentation**: Keep all files in `docs/` at the root of the folder. No subdirectories.
- **SSOT**: The `docs/backlog.md` is the single source of truth for task status.

## Verification
- Run `npm test` before every commit.
- Target coverage is >= 90%.

## Learnings & Reflections
- **Batch Sync Protocol**: Successfully executed an 8.0 man-day batch task processing cycle. This involves grouping high-priority backlog epics into a single execution stream to maximize throughput.
- **Flat Documentation Supremacy**: Moving all `docs/` subdirectories to the root proved effective for simplifying the SSOT hierarchy. Future documentation must remain at the root of `docs/`.
- **1:1 Test Mirroring**: Enforcing a strict 1:1 test rule for frontend components and services ensures high aggregate coverage and makes the codebase more predictable.
- **Vite Sandbox Integration**: When testing React components in a Node-based runner, smoke tests that verify export types are preferred over full JSDOM rendering to avoid environment pollution.
- **Task Observer & Context Headroom**: Ensure autonomous multi-agent loops maintain awareness of the current token horizon. Regularly offload completed status logic to `.state` files to maintain efficiency, and periodically trigger `bug-hunter.js` to replenish the backlog with atomic, testable tasks.
