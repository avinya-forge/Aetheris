#!/usr/bin/env bash

set -e

sync() {
  mkdir -p docs
}

start() {
  sync
}

test() {
  npm test
}

status() {
  npm run status
}

case "$1" in
  --sync) sync ;;
  --start) start ;;
  --test) test ;;
  --status) status ;;
  *) echo "Usage: $0 {--sync|--start|--test|--status}" ;;
esac
