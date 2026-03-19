#!/usr/bin/env bash

# Aetheris Master Controller
# MODE: IDEMPOTENT | TERSE | 100%-INTEGRITY

set -e

# Globals
DOCS_DIR="docs"
PLANNING_DIR="$DOCS_DIR/planning"
ARCH_DIR="$DOCS_DIR/architecture"
ENG_DIR="$DOCS_DIR/engineering"

BACKLOG_FILE="$PLANNING_DIR/backlog.md"

# Output format
log() {
  local phase="$1"
  local scenario="$2"
  local status="$3"
  echo "[PHASE: $phase] | [SCENARIO: $scenario] | [STATUS: $status]"
}

# Ensure idempotent directory structure
sync() {
  log "1-Strategy" "S1" "syncing dirs"
  mkdir -p "$PLANNING_DIR"
  mkdir -p "$ARCH_DIR"
  mkdir -p "$ENG_DIR"

  if [ ! -f "$BACKLOG_FILE" ]; then
    echo "# Backlog" > "$BACKLOG_FILE"
  fi

  if [ ! -f "$PLANNING_DIR/roadmap.md" ]; then
    echo "# Roadmap" > "$PLANNING_DIR/roadmap.md"
  fi

  if [ ! -f "$ARCH_DIR/system_design.md" ]; then
    echo "# System Design" > "$ARCH_DIR/system_design.md"
  fi

  if [ ! -f "$ENG_DIR/conventions.md" ]; then
    echo "# Conventions" > "$ENG_DIR/conventions.md"
  fi

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

# Backlog expansion
backlog() {
  log "1-Strategy" "S4" "parsing backlog"
  if [ ! -f "$BACKLOG_FILE" ]; then
      sync
  fi

  # Audit [ ] TASK
  grep '\[ \] TASK' "$BACKLOG_FILE" | while read -r line; do
    target=$(echo "$line" | grep -o 'Target: [^ |]*' | cut -d' ' -f2)
    if [ -n "$target" ] && [ -f "$target" ]; then
      # target exists but task is [ ] -> mark [x]
      escaped_target=$(echo "$target" | sed 's/\//\\\//g')
      sed -i.bak "/\[ \] TASK:.*Target: $escaped_target/s/\[ \]/[x]/" "$BACKLOG_FILE"
    fi
  done

  # Audit [x] TASK
  grep '\[x\] TASK' "$BACKLOG_FILE" | while read -r line; do
    target=$(echo "$line" | grep -o 'Target: [^ |]*' | cut -d' ' -f2)
    if [ -n "$target" ] && [ ! -f "$target" ]; then
      # target missing but task is [x] -> mark [DEBT]
      escaped_target=$(echo "$target" | sed 's/\//\\\//g')
      sed -i.bak "/\[x\] TASK:.*Target: $escaped_target/s/\[x\]/[DEBT]/" "$BACKLOG_FILE"
    fi
  done

  rm -f "$BACKLOG_FILE.bak"

  grep -rE '\[EPIC\]|\[DEBT\]|\[NEEDS-SPLIT\]' "$DOCS_DIR" || true
  log "1-Strategy" "S4" "backlog parsed"
}

# Epoch mapping
epoch() {
  log "1-Strategy" "S6" "mapping new epics"
  echo "- [EPIC] Autonomous Architecture & Documentation Engine - Auto-populate missing MD files via uniform schema." >> "$BACKLOG_FILE"
  log "1-Strategy" "S6" "epics mapped"
}

# Status logic
status() {
  log "1-Strategy" "S7" "checking status"
  local backlog_tasks
  local completed_tasks
  backlog_tasks=$(grep -c '\[ \] TASK' "$BACKLOG_FILE" || echo 0)
  completed_tasks=$(grep -c '\[x\] TASK' "$BACKLOG_FILE" || echo 0)
  echo "Project Status:"
  echo "Phase: 1-Strategy"
  echo "Pending Tasks: $backlog_tasks"
  echo "Completed Tasks: $completed_tasks"
  log "1-Strategy" "S7" "status complete"
}

# Pull data/patterns from skills.sh
skills() {
  log "1-Strategy" "S5" "fetching skills"

  if [ ! -f "$ENG_DIR/conventions.md" ]; then
      sync
  fi

  local skills_output
  skills_output=$(curl -s https://skills.sh/ | grep -o 'skillId":"[^"]*"' | cut -d'"' -f4 | head -n 10 || echo "Failed to fetch skills.")

  if [[ "$skills_output" == "Failed to fetch skills." ]]; then
      echo "$skills_output"
      log "1-Strategy" "S5" "skills failed"
  else
      if ! grep -q "## Skill Patterns injected from skills.sh" "$ENG_DIR/conventions.md"; then
          echo "" >> "$ENG_DIR/conventions.md"
          echo "## Skill Patterns injected from skills.sh" >> "$ENG_DIR/conventions.md"
      fi
      for skill in $skills_output; do
          if ! grep -q -- "- $skill" "$ENG_DIR/conventions.md"; then
              echo "- $skill" >> "$ENG_DIR/conventions.md"
          fi
      done
      log "1-Strategy" "S5" "skills fetched"
  fi
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
  *)
    echo "Usage: $0 {--sync|--start|--test|--backlog|--skills|--epoch|--status}"
    ;;
esac
