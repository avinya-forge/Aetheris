<!-- SPRINT:backlog-sprint -->

> **Context hygiene**: This sprint works best on a fresh context. If you have many prior messages, run `/compact` now, then re-invoke `/backlog-sprint`.

# Backlog Sprint — Aetheris

Complete at least **10 backlog tasks** end-to-end: implemented, tested, clean, committed, and PR-raised. Follow every step below in order.

---

## Step 0 — Plan the Sprint

1. Read `docs/backlog.md` in full.
2. Identify the next pending `[ ]` tasks that:
   - Are **not gated** by incomplete prerequisite tasks
   - Are **concrete to implement** (not pure audit/planning tasks — those count only if they produce a code or doc artefact)
   - Belong to the **highest-priority epic** that has open work
3. Select at least **10 tasks**. If fewer than 10 are ungated, pick all available and note the gate.
4. Print a numbered sprint plan with task IDs before touching any code.
5. Add each task to a `TodoWrite` list as `pending`.

---

## Step 1 — Pre-Implementation Read

For each selected task, **before writing a single line of code**:
- Read every file referenced in the task description
- Read the relevant test file(s) in `tests/`
- Understand existing patterns (naming, imports, mock style) so new code is consistent

---

## Step 2 — Implement Tasks One by One

Work through the sprint plan in order. For **each task**:

### 2a — Implement
- Make the minimal change that satisfies the task description
- Do not add unrelated refactors, extra comments, or speculative abstractions
- Follow existing code patterns exactly (e.g., camelCase for schema exports)

### 2b — Write Tests
- Add or update the relevant file in `tests/`
- Minimum **2 meaningful test cases per new function / behaviour**
- Tests must use the existing mock patterns (see `tests/gdelt-client.test.js` or `tests/ingest-cycle.test.js` for reference)
- Edge cases count: empty input, invalid input, boundary values

### 2c — Test Gate
Run after every task:
```bash
bash script/run.sh --test
```
Zero errors required before moving to the next task. Fix any failures immediately.

### 2d — Mark Done
- In `docs/backlog.md`: change `- [ ] TASK: <name>` → `- [x] TASK: <name>` and append a one-line done note: `**Done**: <what was changed>`.
- In your `TodoWrite` list: mark the task `completed`.

---

## Step 3 — Full Quality Check

After **all** tasks are implemented:

```bash
bash script/run.sh --test
```

Fix every error before continuing. All 45+ tests must pass.

---

## Step 4 — Update Release Notes

Add a new version entry to `release-notes.md`:

```markdown
## [X.Y.Z] - YYYY-MM-DD (Backlog Sprint — [epic names])

### Tasks Completed
- [TASK-NAME]: <one-line summary>
- [TASK-NAME]: <one-line summary>
...

### Test Coverage
- X new test cases added
- All tests passing (Node.js runtime)

### Backlog
- All sprint items marked [x] in docs/backlog.md
```

Bump the version in `package.json` if appropriate.

---

## Step 5 — Commit

Group tasks into **1–3 logical commits**:

```
feat(<epic-slug>): implement <N> tasks — <TASK list>

<2–3 sentence summary of what changed and why>
```

Stage only files you actually changed. Never use `git add -A` blindly.

---

## Step 6 — Push & Raise PR

```bash
git push -u origin <current-branch>
```

Then create a PR via the GitKraken tools (`mcp_GitKraken_pull_request_create`) with:

**Title**: `feat: backlog sprint — [task names]`

**Body**:
```markdown
## Sprint Summary

| Task | Description | Tests Added |
|------|-------------|-------------|
| TASK-NAME | ... | 2 |
...

## Quality Gates
- [ ] All tasks implemented
- [ ] Unit tests: N new cases
- [ ] Pipeline: `bash script/run.sh --test` exits 0
- [ ] Backlog: all items marked [x]
- [ ] Release notes updated
```

---

## Non-Negotiable Quality Gate

**Do not push or raise the PR unless every box is checked:**

- [ ] ≥ 10 tasks completed (or all ungated tasks if fewer exist)
- [ ] Every task has ≥ 2 unit test cases
- [ ] `bash script/run.sh --test` passes all tests
- [ ] All sprint items marked `[x]` in `docs/backlog.md`
- [ ] `release-notes.md` updated with new version entry
- [ ] Commits are clean, descriptive, and scoped

If any gate fails, fix it before proceeding. Do not skip or defer.
