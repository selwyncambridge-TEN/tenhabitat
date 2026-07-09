#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${TENHABITAT_NETLIFY_ENV_FILE:-$REPO_ROOT/.secrets/tenhabitat.env}"
NETLIFY_HOME="${TENHABITAT_NETLIFY_HOME:-$REPO_ROOT/.secrets/netlify-home}"
NETLIFY_CONFIG_HOME="${TENHABITAT_NETLIFY_CONFIG_HOME:-$REPO_ROOT/.secrets/netlify-config}"

usage() {
  cat <<'USAGE'
Usage:
  scripts/netlify-tenhabitat.sh <netlify-command> [args...]
  scripts/netlify-tenhabitat.sh login-request [message]
  scripts/netlify-tenhabitat.sh login-check <ticket-id> [args...]
  scripts/netlify-tenhabitat.sh verify-team
  scripts/netlify-tenhabitat.sh link-tenhabitat

Runs Netlify CLI with TEN Habitat repo-scoped credentials and state only.

Setup:
  1. Copy .env.example to .secrets/tenhabitat.env.
  2. Prefer setting TENHABITAT_NETLIFY_AUTH_TOKEN to a token from an account that can access the TEN Habitat team.
     If a token is unavailable, use login-request/login-check for repo-isolated OAuth state.
  3. Set TENHABITAT_NETLIFY_TEAM_ID to the TEN Habitat Netlify team ID.
  4. Set TENHABITAT_NETLIFY_SITE_ID after the TEN Habitat Netlify site/project exists.

Examples:
  scripts/netlify-tenhabitat.sh login-request
  scripts/netlify-tenhabitat.sh login-check <ticket-id>
  scripts/netlify-tenhabitat.sh verify-team
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

prepare_netlify_env() {
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
  fi

  if [[ -n "${TENHABITAT_NETLIFY_SITE_ID:-}" ]]; then
    export NETLIFY_SITE_ID="$TENHABITAT_NETLIFY_SITE_ID"
  fi

  if [[ -n "${TENHABITAT_NETLIFY_TEAM_ID:-}" ]]; then
    export TENHABITAT_EXPECTED_NETLIFY_TEAM_ID="$TENHABITAT_NETLIFY_TEAM_ID"
  fi
}

has_oauth_login() {
  local config_file="$NETLIFY_CONFIG_HOME/netlify/config.json"

  [[ -f "$config_file" ]] || return 1
  jq -e '.users | objects | to_entries[]? | .value.auth.token? | strings | length > 0' "$config_file" >/dev/null 2>&1
}

require_auth_context() {
  if [[ -z "${TENHABITAT_NETLIFY_AUTH_TOKEN:-}" ]] && ! has_oauth_login; then
    cat >&2 <<ERROR
Missing TEN Habitat Netlify auth context.

Preferred: set TENHABITAT_NETLIFY_AUTH_TOKEN in $ENV_FILE.
Fallback: run scripts/netlify-tenhabitat.sh login-request, authorize the URL, then run scripts/netlify-tenhabitat.sh login-check <ticket-id>.

This wrapper intentionally ignores global Netlify CLI login state and unrelated Netlify environment variables.
ERROR
    exit 1
  fi
}

prepare_netlify_env
cd "$REPO_ROOT"

case "${1:-}" in
  "")
    usage >&2
    exit 2
    ;;
  login-request)
    message="${2:-TEN Habitat local CLI/MCP access}"
    exec netlify login --request "$message" --json
    ;;
  login-check)
    if [[ -z "${2:-}" ]]; then
      echo "Usage: scripts/netlify-tenhabitat.sh login-check <ticket-id> [args...]" >&2
      exit 2
    fi
    ticket_id="$2"
    shift 2
    exec netlify login --check "$ticket_id" "$@"
    ;;
  verify-team)
    require_auth_context
    if [[ -z "${TENHABITAT_NETLIFY_TEAM_ID:-}" ]]; then
      echo "Missing TENHABITAT_NETLIFY_TEAM_ID in $ENV_FILE." >&2
      exit 1
    fi
    teams_json="$(netlify teams:list --json)"
    if printf '%s' "$teams_json" | jq -e --arg team_id "$TENHABITAT_NETLIFY_TEAM_ID" '.[] | select(.id == $team_id)' >/dev/null; then
      echo "OK: authenticated Netlify user can access TEN Habitat team $TENHABITAT_NETLIFY_TEAM_ID."
    else
      echo "ERROR: authenticated Netlify user cannot access expected TEN Habitat team $TENHABITAT_NETLIFY_TEAM_ID." >&2
      exit 1
    fi
    ;;
  link-tenhabitat)
    require_auth_context
    if [[ -z "${TENHABITAT_NETLIFY_SITE_ID:-}" ]]; then
      echo "Missing TENHABITAT_NETLIFY_SITE_ID in $ENV_FILE." >&2
      exit 1
    fi
    exec netlify link --id "$TENHABITAT_NETLIFY_SITE_ID"
    ;;
  *)
    require_auth_context
    exec netlify "$@"
    ;;
esac
