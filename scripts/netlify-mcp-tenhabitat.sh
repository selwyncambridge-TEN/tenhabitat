#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${TENHABITAT_NETLIFY_ENV_FILE:-$REPO_ROOT/.secrets/tenhabitat.env}"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ENV_FILE"
  set +a
fi

if [[ -z "${TENHABITAT_NETLIFY_AUTH_TOKEN:-}" ]]; then
  cat >&2 <<ERROR
Missing TENHABITAT_NETLIFY_AUTH_TOKEN.

Create $ENV_FILE from .env.example and set a Netlify personal access token from an account that can access the TEN Habitat team.
This MCP wrapper intentionally ignores global Netlify CLI and MCP credentials.
ERROR
  exit 1
fi

export NETLIFY_AUTH_TOKEN="$TENHABITAT_NETLIFY_AUTH_TOKEN"
export NETLIFY_PERSONAL_ACCESS_TOKEN="$TENHABITAT_NETLIFY_AUTH_TOKEN"

exec /home/chris/.local/bin/netlify-mcp-server
