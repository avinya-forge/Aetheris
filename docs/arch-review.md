# Generic Prompt — Architectural Vision Corrector + Zero-Cost Deployment Planner

> **Purpose**: Drop into any repo. Claude analyzes, audits, fixes flaws, then formulates a zero-cost production deployment plan and updates all documentation to match reality.
> **Usage**: Paste the prompt block below directly to Claude in the target repo.

---

## PROMPT (copy everything between the fences)

```
You are a senior software architect. This repo may have architectural drift between what the code does and what the docs say. Your job is to close that gap and produce a zero-cost production deployment plan. Execute the following phases in order. Do not skip any phase.

─── PHASE 1: ANALYZE ────────────────────────────────────────────────────────

Read in order:
1. All *.md files at root and in docs/ (vision, roadmap, backlog, architecture)
2. All source files in lib/, src/, functions/, scripts/ — understand what's actually built
3. All test files — note coverage gaps and missing tests
4. package.json / pyproject.toml / go.mod — understand real tech stack
5. Any deployment configs (wrangler.toml, vercel.json, netlify.toml, Dockerfile, .github/workflows/)

Produce a mental map:
- BUILT: what actually exists in source (with file paths)
- PLANNED: what docs say should exist
- GAP: delta between built and planned
- STACK: actual tech stack (language, runtime, framework, infra)

─── PHASE 2: AUDIT ──────────────────────────────────────────────────────────

For every source file, check:

CODE QUALITY
[ ] Exports: named pattern only (module.exports = { fn } / export { fn }) — no bare defaults
[ ] I/O purity: transform modules must have zero side effects, no filesystem, no network
[ ] Schema files: definitions only — no logic, no conditionals
[ ] API clients: injectable fetcher/client param for testability
[ ] Async: never top-level await in CommonJS — wrap in async IIFE
[ ] Constants: SCREAMING_SNAKE_CASE; functions: camelCase verb-first
[ ] No hardcoded secrets, API keys, or tokens in source

TESTS
[ ] 1:1 rule: every source file has a matching test file
[ ] All asserts have failure messages (3rd arg)
[ ] Tests are deterministic: no network calls, mock all external deps, no Date.now() without injection
[ ] Pass count never drops when new code is added

DOCS/SSOT
[ ] backlog status matches filesystem (if file exists → task should be [x])
[ ] No duplicate truth (single backlog, single roadmap, single system design)
[ ] No stale references to moved/deleted paths

Report every violation with: file path + line number + what's wrong + exact fix.

─── PHASE 3: FIX ────────────────────────────────────────────────────────────

Fix ALL violations found in Phase 2. Rules:
- Fix atomically: fix export → fix test import in same step
- Run tests after each fix: pass count must not drop
- Mark each fix with a comment in the commit message
- Do not touch code outside the scope of fixing a violation
- Add missing test files for any source file that has none

─── PHASE 4: ZERO-COST DEPLOYMENT PLAN ──────────────────────────────────────

Based on the actual stack identified in Phase 1, formulate a deployment plan using ONLY free tiers. Match each layer to the cheapest-viable tool:

SELECTION RULES (prefer top of each list):
- Static hosting:   Cloudflare Pages > GitHub Pages > Netlify free
- Edge compute:     Cloudflare Workers (100k req/day) > Vercel Edge free
- Key-value cache:  Cloudflare KV > Upstash Redis free (10k req/day)
- Relational DB:    Cloudflare D1 (SQLite, 5M rows) > PlanetScale free > Supabase free
- Object storage:   Cloudflare R2 (10GB free) > Backblaze B2 free
- AI/LLM:           Gemini 1.5 Flash (1M tokens/day) > Groq free > OpenAI free tier
- Auth/gate:        Cloudflare Access (50 users free) > Clerk free (10k MAU)
- Scheduled jobs:   Cloudflare Workers Cron > GitHub Actions (2000 min/month public)
- CI/CD:            GitHub Actions (public repo unlimited) > GitLab CI free
- Monitoring:       Cloudflare Analytics > Plausible community > Umami free
- Email:            Resend free (3k/month) > Brevo free

For each layer in use, output:
  LAYER | TOOL | FREE LIMIT | PROJECTED USAGE | MONTHLY COST
Compute total. Must be $0/month at beta scale (≤100 users).

Identify the deployment trigger chain:
  git push → CI build → deploy → cache warm → health check

─── PHASE 5: DOCUMENT ───────────────────────────────────────────────────────

Update (create if missing) these files to reflect post-fix reality:

CLAUDE.md (root)
- Project summary (1 paragraph)
- All shell commands to run tests, lint, build, deploy
- Full repo structure (generated from actual filesystem)
- Zero-cost stack table (from Phase 4)
- Data flow diagram (ASCII)
- Key invariants (do-not-break rules)
- Coding standards summary

docs/architecture/system_design.md
- Corrected data flow matching actual code
- Zero-cost deployment architecture diagram
- Cost breakdown table ($0 target)
- Tech stack table with rationale
- Known gaps + planned fixes

docs/planning/backlog.md
- Phase → Epic → Task hierarchy
- Every task: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: ~n
- Status synced to filesystem (built = [x], planned = [ ], blocked = [BLOCKED])
- Tech debt register at bottom

docs/planning/roadmap.md
- Phase list with status (DONE / ACTIVE / NEXT / SCHEDULED / PLANNED)
- Each phase: 2–5 epics
- Version history table

docs/rules/standards.md
- Naming conventions table (by file type)
- Module responsibility rules (what each layer may/may not do)
- Test rules (1:1, coverage target, determinism)
- Git workflow (branch naming, commit format, PR rules)
- Deploy rules (secrets handling, cache TTLs, no direct push to main)

─── PHASE 6: COMMIT ─────────────────────────────────────────────────────────

Commit strategy:
- One commit per phase (not one giant commit)
- Format: type(scope): description
  - Phase 2 fixes → fix(arch): correct N export violations, add M missing tests
  - Phase 4–5 → docs(arch): zero-cost deployment plan + corrected SSOT

Push to feature branch. Do NOT push to main. Do NOT create PR unless asked.

─── HARD RULES ──────────────────────────────────────────────────────────────

NEVER:
- Add features not in existing backlog
- Skip writing tests for new/fixed code
- Hardcode secrets or API keys
- Mark a task [x] before its test passes
- Push to main
- Use --no-verify
- Create files in source dirs without matching tests
- Break the SSOT hierarchy (roadmap → backlog → epic files)

ALWAYS:
- Read before writing (understand existing code first)
- Run tests before and after every change
- Keep pass count ≥ baseline
- Update backlog status to match filesystem reality
- One responsibility per module
```

---

## WHAT THIS PROMPT DOES (summary)

| Phase | Action | Output |
|---|---|---|
| 1 Analyze | Reads all code + docs | Mental map: built vs planned |
| 2 Audit | Checks 15+ quality rules | Violation report with line numbers |
| 3 Fix | Corrects all violations | Passing tests, clean exports |
| 4 Zero-cost plan | Maps stack to free tiers | $0/month cost breakdown |
| 5 Document | Updates 5 core doc files | SSOT synced to reality |
| 6 Commit | Atomic commits per phase | Feature branch, no PR |

## EXPECTED OUTPUTS

- All tests pass (count ≥ baseline)
- Zero export violations (all named exports)
- Zero missing test files
- CLAUDE.md fully describes actual repo
- system_design.md has zero-cost deployment diagram
- backlog.md status matches filesystem
- $0/month deployment plan with free-tier tool selection

## TOKEN BUDGET

This prompt is ~700 tokens. Reserve ~3000 tokens for repo analysis and ~1500 for doc generation. Works within 8k context window for small-medium repos; for large repos use Claude with extended context.
