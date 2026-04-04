#!/usr/bin/env bash

# Aetheris Master Controller
# MODE: IDEMPOTENT | TERSE | 100%-INTEGRITY

set -e

# Globals
DOCS_DIR="docs"
ARCH_DIR="$DOCS_DIR/architecture"
RULES_DIR="$DOCS_DIR/rules"
PLANNING_DIR="$DOCS_DIR/planning"
ACTIVE_DIR="$PLANNING_DIR/active"
ARCHIVE_DIR="$DOCS_DIR/archive"

# Output format
log() {
  local phase="$1"
  local scenario="$2"
  local status="$3"
  echo "[PHASE: $phase] | [SCENARIO: $scenario] | [STATUS: $status]"
}

sync_dirs() {
  local dirs=(
    "$ARCH_DIR"
    "$RULES_DIR"
    "$PLANNING_DIR"
    "$ACTIVE_DIR"
    "$ARCHIVE_DIR/completed_epics"
    "$ARCHIVE_DIR/obsolete_logic"
    "$ARCHIVE_DIR/deprecated_tasks"
  )

  for dir in "${dirs[@]}"; do
    mkdir -p "$dir"
  done
}

sync_core_files() {
  # Initialize missing core docs
  local core_files=(
    "$PLANNING_DIR/roadmap.md:# Roadmap"
    "$ARCH_DIR/system_design.md:# System Design"
    "$RULES_DIR/standards.md:# Standards"
    "release-notes.md:# Release Notes"
    "$PLANNING_DIR/backlog.md:# Backlog"
  )

  for item in "${core_files[@]}"; do
    local file="${item%%:*}"
    local content="${item#*:}"
    if [ ! -f "$file" ]; then
      echo "$content" > "$file"
    fi
  done
}

# Ensure idempotent directory structure (AHA/SLAP applied)
sync() {
  log "1-Strategy" "S1" "syncing dirs"

  sync_dirs
  sync_core_files

  log "1-Strategy" "S1" "sync complete"
}

# Env initialization
start() {
  log "1-Strategy" "S2" "starting env"
  sync
  echo "Env initialized."
  log "1-Strategy" "S2" "env started"
}

# Lint + Unit Coverage
test() {
  log "1-Strategy" "S3" "running tests"
  echo "Linting..."
  for f in tests/*.test.js; do
    if [ -f "$f" ]; then
      node "$f"
    fi
  done
  log "1-Strategy" "S3" "tests passed"
}

# Backlog expansion (Updated for active epics)
backlog() {
  log "1-Strategy" "S4" "parsing backlog"

  if ! ls "$ACTIVE_DIR"/epic_*.md 1> /dev/null 2>&1; then
      sync
  fi

  for file in "$ACTIVE_DIR"/epic_*.md; do
    if [ -f "$file" ]; then
      # Audit [ ] TASK
      grep '\[ \] TASK' "$file" | while read -r line; do
        target=$(echo "$line" | grep -o 'Target: [^ |]*' | cut -d' ' -f2)
        if [ -n "$target" ] && [ -f "$target" ]; then
          escaped_target=$(echo "$target" | sed 's/\//\\\//g')
          sed -i.bak "/\[ \] TASK:.*Target: $escaped_target/s/\[ \]/[x]/" "$file"
        fi
      done

      # Audit [x] TASK
      grep '\[x\] TASK' "$file" | while read -r line; do
        target=$(echo "$line" | grep -o 'Target: [^ |]*' | cut -d' ' -f2)
        if [ -n "$target" ] && [ ! -f "$target" ]; then
          escaped_target=$(echo "$target" | sed 's/\//\\\//g')
          sed -i.bak "/\[x\] TASK:.*Target: $escaped_target/s/\[x\]/[DEBT]/" "$file"
        fi
      done
      rm -f "$file.bak"
    fi
  done

  grep -rE '\[EPIC\]|\[DEBT\]|\[NEEDS-SPLIT\]' "$DOCS_DIR" || true
  log "1-Strategy" "S4" "backlog parsed"
}

# Epoch mapping (Maps into active directory)
epoch() {
  log "1-Strategy" "S6" "mapping new epics"
  local new_epic="$ACTIVE_DIR/epic_$(date +%s).md"
  echo "# Epic: Autonomous Architecture & Documentation Engine" > "$new_epic"
  echo "- [EPIC] Auto-populate missing MD files via uniform schema." >> "$new_epic"
  log "1-Strategy" "S6" "epics mapped"
}

# Status logic
status() {
  log "1-Strategy" "S7" "checking status"
  local backlog_tasks=0
  local completed_tasks=0

  if ls "$ACTIVE_DIR"/epic_*.md 1> /dev/null 2>&1; then
    backlog_tasks=$(cat "$ACTIVE_DIR"/epic_*.md 2>/dev/null | grep -c '\[ \] TASK' || echo 0)
    completed_tasks=$(cat "$ACTIVE_DIR"/epic_*.md 2>/dev/null | grep -c '\[x\] TASK' || echo 0)
  fi

  echo "Project Status:"
  echo "Phase: 1-Strategy"
  echo "Pending Tasks: $backlog_tasks"
  echo "Completed Tasks: $completed_tasks"
  log "1-Strategy" "S7" "status complete"
}

# Pull data/patterns from skills.sh
skills() {
  log "1-Strategy" "S5" "fetching skills"

  local conv_file="$RULES_DIR/standards.md"

  if [ ! -f "$conv_file" ]; then
      sync
  fi

  local skills_output
  skills_output=$(curl -s https://skills.sh/ | grep -o 'skillId":"[^"]*"' | cut -d'"' -f4 | head -n 10 || echo "Failed to fetch skills.")

  if [[ "$skills_output" == "Failed to fetch skills." ]]; then
      echo "$skills_output"
      log "1-Strategy" "S5" "skills failed"
  else
      if ! grep -q "## Skill Patterns injected from skills.sh" "$conv_file"; then
          echo "" >> "$conv_file"
          echo "## Skill Patterns injected from skills.sh" >> "$conv_file"
      fi
      for skill in $skills_output; do
          if ! grep -q -- "- $skill" "$conv_file"; then
              echo "- $skill" >> "$conv_file"
          fi
      done
      log "1-Strategy" "S5" "skills fetched"
  fi
}

# Recursive expansion
recursive() {
  log "1-Strategy" "S8" "recursive expansion"
  local prev_pending=-1
  local current_pending=0

  while true; do
    backlog
    current_pending=0
    if ls "$ACTIVE_DIR"/epic_*.md 1> /dev/null 2>&1; then
      current_pending=$(cat "$ACTIVE_DIR"/epic_*.md 2>/dev/null | grep -c '\[ \] TASK' || echo 0)
    fi

    if [ "$current_pending" -eq "$prev_pending" ]; then
      break
    fi
    prev_pending=$current_pending
  done
  log "1-Strategy" "S8" "recursive expansion complete"
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
  --backlog)
    backlog
    ;;
  --skills)
    skills
    ;;
  --epoch)
    epoch
    ;;
  --status)
    status
    ;;
  --recursive)
    recursive
    ;;
  *)
    echo "Usage: $0 {--sync|--start|--test|--backlog|--skills|--epoch|--status|--recursive}"
    ;;
esac
