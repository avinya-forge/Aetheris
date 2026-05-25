# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 0: Foundation — Core Logic Engine (DONE)
- [x] EPIC: Data Processing Pipeline | 14 modules (cluster, dedup, synth) | DONE
- [x] EPIC: Schema Definitions | 11 JSON Schemas (standardized) | DONE
- [x] EPIC: Temporal Intelligence | Timeline store, traversal, cones | DONE
- [x] EPIC: Infrastructure & Docs | sync, start, test, status | DONE

## Phase 1: Architectural Sync & Standards (DONE)
- [x] TASK: sync-logic-slap | Target: script/run.sh | I/O: slap -> logic | Assert: clean sync | DONE
- [x] TASK: architectural-sync | Target: repo | I/O: audit -> pristine | Assert: 100% test pass, named exports | DONE
- [x] TASK: standardize-schema-naming | Target: lib/schema/ | I/O: camelCase exports | Assert: consistent across 11 files | DONE
- [x] TASK: implement-caveman-skill | Target: .claude/caveman.json | I/O: profile -> simple language | Assert: active | DONE

---

## Phase 4: Frontend — Kinetic Atlas UI (SCHEDULED)
*All tasks blocked by frontend environment bootstrap.*

### Epic 4.1: Frontend Bootstrap
- [x] TASK: bootstrap-frontend | Target: package.json, vite.config.js | I/O: void -> DevServer | Assert: npm run dev starts, 0 err | DONE
- [x] TASK: init-mapbox-gl | Target: src/components/map/atlas.tsx | I/O: Config -> MapInstance | Assert: 0 err, renders | DONE

### Epic 4.2: Chromodynamic Visual System
- [x] TASK: implement-chromodynamic-logic | Target: src/lib/chromodynamic.js | I/O: KpIndex -> ColorSpec | Assert: 0 err, >95% cov | DONE
- [x] TASK: design-vector-glyphs | Target: src/assets/glyphs/index.svg | I/O: void -> SVG | Assert: clean-SVG, no raster | DONE
- [x] TASK: implement-zoom-logic | Target: src/lib/zoom-controller.js | I/O: ZoomLevel -> LayerVisibility | Assert: 0 err, >95% cov | DONE

### Epic 4.3: Timeline Interface
- [x] TASK: render-3d-map-timeline | Target: src/components/map/timeline.tsx | I/O: Props -> ReactElement | Assert: 0 err, >95% cov | DONE
- [x] TASK: render-ghost-cards | Target: src/components/ui/ghost-card.tsx | I/O: GhostCard -> ReactElement | Assert: 0 err, opacity<1, shows% | DONE

### Epic 4.4: Frontend Data Service Layer
- [x] TASK: implement-events-service | Target: src/lib/events-service.js | I/O: Filters -> EventArray | Assert: 0 err, filters by impact | DONE
- [x] TASK: implement-synthesis-service | Target: src/lib/synthesis-service.js | I/O: ClusterId -> Brief | Assert: ≤30 words, 0 err | DONE
- [x] TASK: implement-ghost-card-service | Target: src/lib/ghost-card-service.js | I/O: void -> GhostCardArray | Assert: all likelihood ≤95%, isSpeculative=false | DONE
- [x] TASK: implement-health-service | Target: src/lib/health-service.js | I/O: void -> HealthStatus | Assert: 0 err, returns version+uptime | DONE

### Epic 4.5: Visual Audit & Bug Hunt
- [x] TASK: execute-visual-audit | Target: backlog.md | I/O: void -> TaskList | Assert: all bugs cataloged | DONE
- [x] TASK: fix-visual-bug-1 | Target: src/ | I/O: Bug -> Fix | Assert: map renders | DONE
- [x] TASK: fix-cataloged-bugs | Target: src/ | I/O: BugList -> CleanCode | Assert: 0 known visual bugs | DONE
- [x] TASK: fix-main-jsx-render-bug | Target: src/main.tsx | I/O: Bug -> CleanCode | Assert: Atlas map renders | DONE

---

## Phase 5: Zero-Cost Deployment — Edge + Beta (PLANNED)

### Epic 5.1: Cloudflare Edge Deployment
- [x] TASK: configure-cloudflare-pages | Target: .github/workflows/deploy.yml | I/O: git push -> CF Pages | DONE
- [x] TASK: deploy-cloudflare-workers | Target: functions/edge-proxy.js | I/O: Request -> Response | DONE
- [x] TASK: configure-cloudflare-kv | Target: wrangler.toml | I/O: Data -> KVStore | DONE
- [x] TASK: validate-offline-pwa | Target: script/sw.js | I/O: void -> OfflineApp | DONE

### Epic 5.2: Limited Beta Access
- [x] TASK: implement-invite-gate | Target: src/lib/invite.js | I/O: Code -> Boolean | DONE
- [x] TASK: configure-cloudflare-access | Target: cloudflare-access.json | I/O: Email -> AccessGrant | DONE
- [x] TASK: wire-cloudflare-analytics | Target: src/index.html | I/O: PageView -> Analytics | DONE
- [x] TASK: write-beta-onboarding | Target: docs/beta-guide.md | I/O: void -> Guide | DONE

---

## Architectural Sync & Drift Resolution (COMPLETED)
- [x] TASK: convert-tests-to-esm | Target: tests/ | I/O: require -> import | Assert: all tests use ES imports | DONE
- [x] TASK: flatten-repository-logic | Target: lib/, src/lib/ | I/O: nested -> flat | Assert: 0 nested subfolders | DONE
- [x] TASK: enforce-test-standards | Target: tests/ | I/O: assert -> assert(val, val, msg) | Assert: all asserts have 3+ args | DONE
- [x] TASK: implement-coverage-gate | Target: script/test.js | I/O: test -> test + c8 | Assert: fails if < 90% | DONE
- [x] TASK: resolve-version-drift | Target: package.json | I/O: 0.1.8 -> 0.1.9 | Assert: matches .state | DONE
- [x] TASK: inject-worker-deterministic-time | Target: functions/worker.mjs | I/O: Date.now() -> injection | Assert: deterministic | DONE

## Future Maintenance (OPEN)
- [ ] TASK: improve-branch-coverage | Target: functions/ingest-cycle.js | I/O: code -> tested branches | Assert: branch cov > 80% | LOC: ~50
- [ ] TASK: migrate-lib-parser-to-esm | Target: lib/parser.ts | I/O: require -> import | Assert: consistency | LOC: ~20
