# Epic 1: Autonomous Architecture & Documentation Engine

### TASK_1 | DONE
- **Definition of Done**: `run.sh` sync logic uses new directory structure and applies AHA/SLAP to repetitive directory and file creation. `README.md` points to the new updated documentation paths.
- **Audit focus**: AHA/SLAP applied — `sync_dirs()` now creates only 3 dirs (architecture, rules, planning). `ACTIVE_DIR` and `ARCHIVE_DIR` removed. All doc paths canonical.
- **Technical Context**: `script/run.sh` and `README.md`.
- **Engineering Log**:
  - Run 1: Removed ACTIVE_DIR/ARCHIVE_DIR globals, simplified sync_dirs to 3-dir array, updated epoch() to write epics directly to planning/. README paths verified correct.
