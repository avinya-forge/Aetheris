#!/usr/bin/env bash

set -e

sync() {
  mkdir -p docs
}

start() {
  sync
}

test() {
  npm test || { echo "Tests failed"; exit 1; }
}

status() {
  npm run status || { echo "Status fetch failed"; exit 1; }
}

case "$1" in
  --sync) sync ;;
  --start) start ;;
  --test) test ;;
  --status) status ;;
  *) echo "Usage: $0 {--sync|--start|--test|--status}"; exit 1 ;;
esac
