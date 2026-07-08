#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${TENHABITAT_NETLIFY_ENV_FILE:-$REPO_ROOT/.secrets/tenhabitat.env}"
NETLIFY_HOME="${TENHABITAT_NETLIFY_HOME:-$REPO_ROOT/.secrets/netlify-home}"
NETLIFY_CONFIG_HOME="${TENHABITAT_NETLIFY_CONFIG_HOME:-$REPO_ROOT/.secrets/netlify-config}"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ENV_FILE"
  set +a
fi

mkdir -p "$NETLIFY_HOME" "$NETLIFY_CONFIG_HOME"
chmod 700 "$NETLIFY_HOME" "$NETLIFY_CONFIG_HOME"

export HOME="$NETLIFY_HOME"
export XDG_CONFIG_HOME="$NETLIFY_CONFIG_HOME"

unset NETLIFY_AUTH_TOKEN
unset NETLIFY_PERSONAL_ACCESS_TOKEN
unset NETLIFY_SITE_ID
unset NETLIFY_TEAM_ID
unset NETLIFY_SITE_NAME
unset NETLIFY_SITE_URL

if [[ -n "${TENHABITAT_NETLIFY_AUTH_TOKEN:-}" ]]; then
  export NETLIFY_AUTH_TOKEN="$TENHABITAT_NETLIFY_AUTH_TOKEN"
  export NETLIFY_PERSONAL_ACCESS_TOKEN="$TENHABITAT_NETLIFY_AUTH_TOKEN"
elif ! jq -e '.users | objects | to_entries[]? | .value.auth.token? | strings | length > 0' "$NETLIFY_CONFIG_HOME/netlify/config.json" >/dev/null 2>&1; then
  cat >&2 <<ERROR
Missing TEN Habitat Netlify auth context.

Preferred: set TENHABITAT_NETLIFY_AUTH_TOKEN in $ENV_FILE.
Fallback: authorize repo-isolated OAuth with scripts/netlify-tenhabitat.sh login-request and login-check before starting this MCP wrapper.

This MCP wrapper intentionally ignores global Netlify CLI/MCP credentials and unrelated Netlify environment variables.
ERROR
  exit 1
fi

if [[ -n "${TENHABITAT_NETLIFY_SITE_ID:-}" ]]; then
  export NETLIFY_SITE_ID="$TENHABITAT_NETLIFY_SITE_ID"
fi

if [[ -n "${TENHABITAT_NETLIFY_TEAM_ID:-}" ]]; then
  export TENHABITAT_EXPECTED_NETLIFY_TEAM_ID="$TENHABITAT_NETLIFY_TEAM_ID"
fi

exec /home/chris/.local/bin/netlify-mcp-server
