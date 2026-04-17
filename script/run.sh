#!/usr/bin/env bash

# Aetheris Master Controller
# MODE: IDEMPOTENT | TERSE | 100%-INTEGRITY

set -e

# Globals
DOCS_DIR="docs"

# Output format
log() {
  local phase="$1"
  local scenario="$2"
  local status="$3"
  echo "[PHASE: $phase] | [SCENARIO: $scenario] | [STATUS: $status]"
}

sync_core_files() {
  # Initialize missing core docs (Flattened structure)
  local core_files=(
    "$DOCS_DIR/roadmap.md:# Roadmap"
    "$DOCS_DIR/system_design.md:# System Design"
    "$DOCS_DIR/standards.md:# Standards"
    "$DOCS_DIR/release-notes.md:# Release Notes"
    "$DOCS_DIR/backlog.md:# Backlog"
  )

  mkdir -p "$DOCS_DIR"

  for item in "${core_files[@]}"; do
    local file="${item%%:*}"
    local content="${item#*:}"
    if [ ! -f "$file" ]; then
      echo "$content" > "$file"
    fi
  done
}

# Ensure idempotent directory structure
sync() {
  log "1-Strategy" "S1" "syncing docs"
  sync_core_files
  log "1-Strategy" "S1" "sync complete"
}

# Env initialization
start() {
  log "1-Strategy" "S2" "starting env"
  sync
  echo "Env initialized. Note: Phase 4 Frontend Bootstrap is pending."
  log "1-Strategy" "S2" "env started"
}

# Unit Coverage
test() {
  log "1-Strategy" "S3" "running tests"
  for f in tests/*.test.js; do
    if [ -f "$f" ]; then
      node "$f"
    fi
  done
  log "1-Strategy" "S3" "tests passed"
}

# Backlog status
status() {
  log "1-Strategy" "S7" "checking status"
  local backlog_file="$DOCS_DIR/backlog.md"
  local pending_tasks=0
  local completed_tasks=0

  if [ -f "$backlog_file" ]; then
    pending_tasks=$(grep -c '\[ \] TASK' "$backlog_file" || echo 0)
    completed_tasks=$(grep -c '\[x\] TASK' "$backlog_file" || echo 0)
  fi

  echo "Project Status:"
  echo "Phase: 1-Strategy"
  echo "Pending Tasks: $pending_tasks"
  echo "Completed Tasks: $completed_tasks"
  log "1-Strategy" "S7" "status complete"
}

case "$1" in
  --sync)
    sync
    ;;
  --start)
    start
    ;;
  --test)
    test
    ;;
  --status)
    status
    ;;
  *)
    echo "Usage: $0 {--sync|--start|--test|--status}"
    ;;
esac
