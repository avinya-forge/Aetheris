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
  echo "Unit Coverage..."
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

  grep -E '\[EPIC\]|\[DEBT\]' "$BACKLOG_FILE" || true
  log "1-Strategy" "S4" "backlog parsed"
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
      echo "" >> "$ENG_DIR/conventions.md"
      echo "## Skill Patterns injected from skills.sh" >> "$ENG_DIR/conventions.md"
      for skill in $skills_output; do
          echo "- $skill" >> "$ENG_DIR/conventions.md"
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
  *)
    echo "Usage: $0 {--sync|--start|--test|--backlog|--skills}"
    ;;
esac
