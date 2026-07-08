#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${TENHABITAT_NETLIFY_ENV_FILE:-$REPO_ROOT/.secrets/tenhabitat.env}"

usage() {
  cat <<'USAGE'
Usage:
  scripts/netlify-tenhabitat.sh <netlify-command> [args...]
  scripts/netlify-tenhabitat.sh link-tenhabitat

Runs Netlify CLI with TEN Habitat repo-scoped credentials only.

Setup:
  1. Copy .env.example to .secrets/tenhabitat.env.
  2. Set TENHABITAT_NETLIFY_AUTH_TOKEN to a token from an account that can access the TEN Habitat team.
  3. Set TENHABITAT_NETLIFY_SITE_ID after the TEN Habitat Netlify site/project exists.

Examples:
  scripts/netlify-tenhabitat.sh sites:list
  scripts/netlify-tenhabitat.sh status
  scripts/netlify-tenhabitat.sh link-tenhabitat
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ENV_FILE"
  set +a
fi

if [[ -z "${TENHABITAT_NETLIFY_AUTH_TOKEN:-}" ]]; then
  cat >&2 <<ERROR
Missing TENHABITAT_NETLIFY_AUTH_TOKEN.

Create $ENV_FILE from .env.example and set a token from an account that can access the TEN Habitat Netlify team.
This wrapper intentionally ignores global Netlify CLI login state.
ERROR
  exit 1
fi

if [[ -n "${NETLIFY_AUTH_TOKEN:-}" && "$NETLIFY_AUTH_TOKEN" != "$TENHABITAT_NETLIFY_AUTH_TOKEN" ]]; then
  echo "Ignoring ambient NETLIFY_AUTH_TOKEN and using TENHABITAT_NETLIFY_AUTH_TOKEN." >&2
fi

export NETLIFY_AUTH_TOKEN="$TENHABITAT_NETLIFY_AUTH_TOKEN"
cd "$REPO_ROOT"

case "${1:-}" in
  "")
    usage >&2
    exit 2
    ;;
  link-tenhabitat)
    if [[ -z "${TENHABITAT_NETLIFY_SITE_ID:-}" ]]; then
      echo "Missing TENHABITAT_NETLIFY_SITE_ID in $ENV_FILE." >&2
      exit 1
    fi
    exec netlify link --id "$TENHABITAT_NETLIFY_SITE_ID"
    ;;
  *)
    exec netlify "$@"
    ;;
esac
