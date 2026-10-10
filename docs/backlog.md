# Backlog — Aetheris

> **Schema**: [ ] TASK: name | Target: path | I/O: type | Assert: condition | LOC: size

---

## Phase 10: Production Monitoring & Data Ingestion Expansion
- [ ] TASK: implement-edge-health-monitor | Target: src/components/ui/health-dashboard.tsx | I/O: feature | Assert: displays edge latency and uptime metrics | LOC: ~100
- [ ] TASK: expand-local-crime-ingestion | Target: lib/news-mapper.js | I/O: logic | Assert: maps local regional crimes category correctly | LOC: ~40
- [ ] TASK: classifieds-automotive-feed | Target: lib/news-mapper.js | I/O: logic | Assert: maps automotive listings to text-only classifieds | LOC: ~40
- [ ] TASK: automated-db-pruning-worker | Target: functions/worker.mjs | I/O: feature | Assert: prunes historical KV entries older than 365 days | LOC: ~80
- [ ] TASK: bug-hunt-and-audit-phase10 | Target: codebase | I/O: audit | Assert: visual audit and bug hunter pass cleanly | LOC: ~10
