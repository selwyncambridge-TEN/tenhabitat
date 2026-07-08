#!/usr/bin/env bash
# Regenerate AGENTS.md from CLAUDE.md with an auto-generated marker header.
#
# Usage:
#   bash scripts/regenerate-agents-md.sh                # write AGENTS.md from working-tree CLAUDE.md
#   bash scripts/regenerate-agents-md.sh --check        # exit 0 if in sync, 1 if drift
#   bash scripts/regenerate-agents-md.sh --from-staged  # write from staged CLAUDE.md blob

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
CLAUDE_MD="${REPO_ROOT}/CLAUDE.md"
AGENTS_MD="${REPO_ROOT}/AGENTS.md"

MODE="write"
USE_STAGED=0

for arg in "$@"; do
  case "$arg" in
    --check)
      MODE="check"
      ;;
    --from-staged)
      USE_STAGED=1
      ;;
    *)
      echo "error: unknown argument: $arg" >&2
      exit 2
      ;;
  esac
done

if [[ ! -f "$CLAUDE_MD" && "$USE_STAGED" == "0" ]]; then
  echo "error: $CLAUDE_MD not found" >&2
  exit 2
fi

get_claude_content() {
  if [[ "$USE_STAGED" == "1" ]]; then
    git show :CLAUDE.md
  else
    cat "$CLAUDE_MD"
  fi
}

generate() {
  cat <<'HEADER'
<!--
  AUTO-GENERATED from CLAUDE.md
  DO NOT EDIT DIRECTLY - edit CLAUDE.md instead
-->

HEADER
  get_claude_content
}

if [[ "$MODE" == "check" ]]; then
  if [[ ! -f "$AGENTS_MD" ]]; then
    echo "error: AGENTS.md does not exist" >&2
    exit 1
  fi

  TMP="$(mktemp)"
  trap 'rm -f "$TMP"' EXIT
  generate > "$TMP"

  if ! diff -q "$TMP" "$AGENTS_MD" >/dev/null 2>&1; then
    echo "error: AGENTS.md is out of sync with CLAUDE.md" >&2
    echo "Run: bash scripts/regenerate-agents-md.sh" >&2
    diff -u "$AGENTS_MD" "$TMP" || true
    exit 1
  fi

  echo "OK: AGENTS.md in sync with CLAUDE.md"
  exit 0
fi

generate > "$AGENTS_MD"
echo "Wrote $AGENTS_MD ($(wc -l < "$AGENTS_MD") lines)"
