# Engineering Standards — Aetheris

## 1. SSOT & Documentation

- **Hierarchy (strict)**: `README.md` → `docs/planning/roadmap.md` → `docs/planning/backlog.md` → `docs/planning/epic_*.md`
- No doc duplication. One place per truth. If it moves, update the ref.
- Every PR that touches `lib/` must update `docs/planning/backlog.md` task status.
- `docs/` structure is flat under each subdirectory — no nested active/archive subfolders.
- Backlog task schema (mandatory, no exceptions):
  ```
  [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size
  ```

## 2. File & Module Naming

| Type | Convention | Example |
| :--- | :--- | :--- |
| `lib/` modules | kebab-case | `cluster-identifier.js` |
| `lib/schema/` | kebab-case | `ghost-card.js` |
| `tests/` | mirror source + `.test.js` | `cluster-identifier.test.js` |
| React components | PascalCase `.tsx` | `GhostCard.tsx` |
| React lib utils | kebab-case `.ts` | `zoom-controller.ts` |
| Cloudflare Workers | kebab-case `.js` | `edge-proxy.js` |
| Constants | SCREAMING_SNAKE | `MAX_LIKELIHOOD = 95` |
| Functions | camelCase, verb-first | `parseKpIndex()`, `filterByImpact()` |
| Schema exports | camelCase object | `module.exports = { ghostCardSchema }` |

## 3. Module Rules

- One responsibility per file. If a file handles two concerns, split it.
- `lib/data/` — pure data transforms only. No I/O, no API calls, no side effects.
- `lib/schema/` — schema definitions only. No logic.
- `lib/timeline/` — temporal state only. No data fetching.
- `lib/ai/` — Gemini client only. No business logic.
- `lib/data/*-client.js` — API clients only. No transforms. Return raw JSON → caller transforms.
- No circular imports. Dependency direction: `functions/` → `lib/` (never reverse).

## 4. Testing

- **1:1 rule**: every file added to `lib/` requires a matching `tests/*.test.js` before the PR merges.
- Coverage target: **>95%** for all `lib/data/` and `lib/schema/` modules.
- Test runner: Jest (after DEBT-2 migration); native `assert` acceptable until then.
- Tests must be deterministic — no network calls, no `Date.now()` without mock, no random seeds.
- Test file structure:
  ```js
  const assert = require('assert');
  const { fn } = require('../lib/path/module.js');

  // describe intent, not implementation
  assert.deepStrictEqual(fn(input), expected, 'label');
  console.log('module-name test passed');
  ```
- No test should pass by accident. Every `assert` must have a meaningful failure message.

## 5. Data Layer Invariants

These rules are non-negotiable and gate all data surfaced to the UI:

| Rule | Enforcement |
| :--- | :--- |
| No speculative output | `isSpeculative: false` required; filter via `prediction-filter.js` |
| Pattern match required | `patternMatchId` must be non-null on all forecasts |
| Impact gate | `impactScore >= minImpactScore` checked by `impact-filter.js` before UI |
| Synthesis cap | Extractive briefs: ≤ 30 words, no invented facts |
| Ghost Card cap | Probability cones: likelihood capped at **95%** — never "certain" |
| Nowcast badge | Interpolated data must carry `interpolated: true`; UI must badge it |

## 6. AI / Gemini Integration

- Model: **Gemini 1.5 Flash only**. No other AI models.
- Prompts must be output-constrained: specify max words, format, and "facts only."
- Never pass raw user input into a Gemini prompt without sanitization.
- Rate limit: queue at 15 RPM. Never exceed free tier without explicit approval.
- Fallback: always return last cached synthesis if Gemini is unavailable.
- Zero tolerance for hallucination surfaced to UI — validate output word count + no hedge words ("might", "could", "possibly").

## 7. Schema Rules

- All schemas follow **JSON Schema draft 7** pattern.
- Every schema file exports a single named const: `module.exports = { xyzSchema }`.
- No inline schema definitions in data-layer files — always import from `lib/schema/`.
- Schema field names: camelCase throughout (e.g., `impactScore`, `patternMatchId`, `kpIndex`).
- New schema → add to `lib/docs/parser.js` `DEFAULT_REQUIRED_DOCS` if it becomes a top-level SSOT doc.

## 8. Git Workflow

- **Branch naming**: `feat/short-desc`, `fix/short-desc`, `chore/short-desc`, `docs/short-desc`
- **No direct push to `main`** — all changes via PR.
- **Atomic commits**: one logical change per commit. No "misc fixes" commits.
- **Commit message format**:
  ```
  type(scope): short imperative description

  - bullet of what changed
  - bullet of why
  ```
  Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`
- PR must not merge if: tests fail, coverage drops below 95%, or SSOT docs are out of sync.
- No `--no-verify` bypasses. Fix the hook, don't skip it.

## 9. Edge / Deployment Rules

- All API calls from the browser go via `functions/edge-proxy.js` — never direct from client.
- KV cache TTL must be set on every write. No TTL-less cache entries.
- Secrets (API keys, tokens) go in Cloudflare Workers environment variables — never in source.
- `.env` is gitignored. Use `.env.example` for documenting required vars.
- Service worker must cache: `index.html`, `main.js`, `main.css`, all SVG glyphs.

## 10. UI Rules (Phase 4+)

- No raster images. SVG vector glyphs only.
- No list views. Map-only interface.
- Ghost Cards: always semi-transparent (`opacity < 1`), always display likelihood `%`.
- Chromodynamic colours driven exclusively by Kp-index or hazard state — no arbitrary styling.
- Zoom-level content governed by `zoom-controller.js` — no hardcoded zoom checks in components.

## 11. Skills (from skills.sh)

- `project-management-pdlc` — phase-driven delivery lifecycle
- `software-engineering-sdlc` — atomic commits, SSOT, AHA/SLAP
- `data-engineering-etl` — pipeline: ingest → filter → cluster → synthesize
- `devops-iac` — idempotent scripts, Cloudflare Workers IaC
- `cloud-native-pwa` — service worker, offline-first, edge caching
- `ai-llm-fine-tuning` — Gemini 1.5 Flash, extractive-only synthesis
- `frontend-webgl-mapbox` — Mapbox GL JS, WebGL vector rendering
- `security-zero-trust` — Cloudflare Access, invite-code beta gate
- `performance-edge-computing` — Cloudflare KV, CDN cache, sub-50ms
- `uiux-minimalist-vector` — chromodynamic glyphs, no stock photos
