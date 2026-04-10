# JULES.md — Autonomous Agent Standing Instructions

> **Who you are**: Jules, an AI coding agent running 4 scheduled sessions/day on the Aetheris repo.
> **Your job**: Each session = one full PDLC loop. Pick tasks → implement → test → audit → commit → PR.
> **Non-negotiable**: No untested code. No speculation. No unrequested features. SSOT always updated.

---

## 0. PRE-FLIGHT (every session, before anything else)

```bash
bash script/run.sh --status          # record baseline: pending=P, done=D
bash script/run.sh --test            # record baseline pass count N — must not drop
bash script/run.sh --backlog         # sync task status against filesystem
git log --oneline -5                 # understand recent work; do not repeat it
```

Read in this order:
1. `CLAUDE.md` — architecture, invariants, zero-cost stack
2. `docs/planning/backlog.md` — find active phase and pending tasks
3. `docs/rules/standards.md` — all 11 sections; enforce every rule
4. `docs/architecture/system_design.md` — data flow; don't break it

---

## 1. TASK SELECTION

### Phase priority (top-down; skip BLOCKED)
```
Phase 1 → Phase 2 → Phase 3 → Phase 4 (if unblocked) → Phase 5
```

### How to pick tasks this session
1. Find first phase with `[ ]` or `[READY]` tasks
2. Filter out `[BLOCKED]` — never attempt without explicit unblock instruction
3. Batch by LOC budget (≤ 300 LOC total per session):
   - LOC < 60  → take up to 3
   - LOC 60–150 → take up to 2
   - LOC > 150  → take 1 only
4. If a task has sub-bullets → implement ALL sub-bullets as part of that task
5. Prefer tasks with `[READY]` over `[ ]`
6. If previous session left a task `[IN-PROGRESS]` → finish it first

### Signals to stop picking more tasks
- LOC budget exhausted
- A task has an unresolved external dependency (API key not set, env not bootstrapped)
- Tests are failing from previous task and need a full fix cycle

---

## 2. IMPLEMENTATION LOOP

For **each selected task**, execute exactly this sequence:

### 2a. Read before writing
```bash
# If target file exists:
cat -n <target-file>                 # understand existing code
cat -n tests/<target>.test.js        # understand existing tests
```

### 2b. Implement
- Match **exactly**: Target path, I/O signature, Assert conditions in backlog task
- Named exports only: `module.exports = { fnName }` — never bare default
- `lib/data/` → pure transforms. No `require('fs')`, no `require('http')`, no network
- `lib/schema/` → definitions only. No logic, no conditionals
- `lib/data/*-client.js` → API clients only. No transforms in client files
- `lib/ai/` → AI client only. No business logic
- All constants: `SCREAMING_SNAKE_CASE`
- All functions: `camelCase`, verb-first (e.g., `parseKpIndex`, `filterByImpact`)

### 2c. Write test BEFORE marking done
- Path: `tests/<module-name>.test.js`
- Pattern:
  ```js
  const assert = require('assert');
  const { fn } = require('../lib/path/module.js');

  (async () => {  // wrap ALL async in IIFE — never top-level await in CommonJS
    try {
      // happy path
      assert.strictEqual(fn(input), expected, 'failure message required');
      // edge cases
      assert.strictEqual(fn(null), null, 'null input must not throw');
      // error path
      let threw = false;
      try { fn(badInput); } catch(_) { threw = true; }
      assert.strictEqual(threw, true, 'bad input must throw');

      console.log('PASS - <module-name>.test.js');
    } catch (err) {
      console.error('FAIL - <module-name>.test.js:', err.message);
      process.exit(1);
    }
  })();
  ```
- Every `assert` needs a 3rd argument (failure message)
- No network calls in tests — inject mock fetcher as parameter
- No `Date.now()` without injection — pass `now` param for determinism

### 2d. Run tests
```bash
bash script/run.sh --test
```
- **Pass count must be ≥ N** (baseline from pre-flight)
- If any FAIL → fix immediately before moving to next task
- Do NOT move on with a failing test

### 2e. Update SSOT
After each task passes:
1. `docs/planning/backlog.md` → change `[ ]` to `[x]`
2. `release-notes.md` → add line under current version:
   ```
   - [x] TASK: <name> | Target: <path> | I/O: <type> | Assert: <condition> | LOC: ~<n>
   ```
3. If entire Epic complete → note in roadmap.md phase status

---

## 3. AUDIT CHECKLIST (run after all tasks complete)

Check every file you touched or created:

```
[ ] lib/data/ file: no require('fs'), no require('http'), no side effects
[ ] lib/schema/ file: definitions only, no logic/conditionals/imports of other schemas (unless composition)
[ ] All module exports: named format module.exports = { fn }  — no bare module.exports = fn
[ ] New lib/ file: matching tests/*.test.js exists and passes
[ ] Ghost Card logic: isSpeculative===false gate before rendering
[ ] Prediction: patternMatchId non-null before surfacing
[ ] Impact gate: impactScore >= minImpactScore before surfacing to UI
[ ] Extractive synthesis: output ≤ 30 words, no hedge words (might/could/possibly)
[ ] Probability cones: likelihood capped at 95%, never "certain"
[ ] Nowcast/interpolated data: interpolated:true flag set, never labeled as "live"
[ ] API clients: injectable fetcher param for testability
[ ] Async tests: wrapped in (async () => { ... })() — never top-level await
[ ] Secrets: never hardcoded — use env vars or wrangler secrets
```

If any item fails → fix before committing.

---

## 4. COMMIT FORMAT

One commit per task (atomic). No monolithic commits.

```
type(scope): short imperative description

- what changed
- why it was needed
- tests added: <count>
```

**Types**: `feat` | `fix` | `refactor` | `test` | `docs` | `chore`

**Scope examples**: `data`, `schema`, `timeline`, `ai`, `edge`, `docs`, `tests`

**Examples**:
```
feat(data): implement Gemini 1.5 Flash client with rate-limit guard

- Add lib/ai/gemini-client.js with 15 RPM queue
- Add tests/gemini-client.test.js (mock API, 8 assertions)
- Follows extractive-only constraint, 30-word cap enforced
```

---

## 5. PULL REQUEST

One PR per Jules session. Create at end of session after all tasks committed.

**Branch**: `jules/session-YYYYMMDD-HH` (e.g., `jules/session-20260410-06`)

**Title**: `jules: [Phase X] epic-name — task-1, task-2`

**Body**:
```markdown
## Session Summary
- **Phase**: X
- **Tasks completed**: N
- **Tests added**: N (total now: N)
- **Baseline tests**: N → new total: N

## Tasks Implemented
- [x] TASK: name | Target: path
- [x] TASK: name | Target: path

## Audit
- All exports named: ✓
- All tests pass: ✓
- SSOT updated: ✓
- No speculative code: ✓

## Backlog delta
- Pending: was P → now P-N
- Done: was D → now D+N
```

---

## 6. WHAT NEVER TO DO

```
✗ Push to main (always PR)
✗ Merge your own PR
✗ Add features not in backlog.md
✗ Skip writing the test file
✗ Use --no-verify on commits
✗ Use top-level await in CommonJS .js files
✗ Call require('fs') or require('http') from lib/data/ transform files
✗ Hardcode API keys or secrets in source files
✗ Mark a task [x] before tests pass
✗ Surface isSpeculative:true data to UI
✗ Emit a prediction without patternMatchId
✗ Create lib/ files without matching tests/
✗ Add comments to code you didn't change
✗ Refactor code outside task scope
✗ Delete existing passing tests
```

---

## 7. SESSION CLOSE

```bash
bash script/run.sh --status          # verify done count increased
bash script/run.sh --test            # final pass — must be ≥ baseline N
bash script/run.sh --backlog         # sync epic files
```

Then create PR. Session complete.

---

## 8. CURRENT PHASE REFERENCE

| Phase | Status | Next task |
| :--- | :--- | :--- |
| 0 — Foundation | DONE | — |
| 1 — Signal Layer | ACTIVE | unify-schema-naming, migrate-tests-to-jest |
| 2 — Data Integration | ACTIVE | implement-nowcast-interpolator |
| 3 — Intelligence | SCHEDULED | integrate-gemini-flash → wire-extractive-synthesis |
| 4 — Frontend | BLOCKED | bootstrap-frontend (unblock first) |
| 5 — Deployment | PLANNED | configure-cloudflare-pages |

> **Note**: Always re-read `docs/planning/backlog.md` for current state. This table is a guide only.

---

## 9. SCHEDULED SESSION RHYTHM

| Session | UTC | Focus |
| :--- | :--- | :--- |
| A | 00:00 | Implement: pick + code 1–3 tasks, write tests |
| B | 06:00 | Implement + fix: continue or pick new, fix any failures |
| C | 12:00 | Implement + audit: code + full audit checklist |
| D | 18:00 | Implement + ship: complete tasks, sync SSOT, open PR |

Each session is independent and self-healing. Check git log to avoid repeat work.
