#!/usr/bin/env bash
set -euo pipefail

log() {
  printf 'netlify-ignore-build: %s\n' "$*" >&2
}

should_build_for_path() {
  local path="$1"

  case "$path" in
    app/* | components/* | lib/* | public/* | netlify/* | src/* | styles/*)
      return 0
      ;;
    middleware.ts | middleware.js | instrumentation.ts | instrumentation.js | mdx-components.tsx)
      return 0
      ;;
    next.config.* | postcss.config.* | tailwind.config.* | tsconfig.json | tsconfig.*.json)
      return 0
      ;;
    package.json | pnpm-lock.yaml | pnpm-workspace.yaml | .npmrc | .nvmrc | .node-version)
      return 0
      ;;
    netlify.toml | scripts/netlify-ignore-build.sh)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

if [[ -z "${CACHED_COMMIT_REF:-}" || -z "${COMMIT_REF:-}" ]]; then
  log "missing Netlify commit refs; building conservatively"
  exit 1
fi

if [[ "$CACHED_COMMIT_REF" =~ ^0+$ || "$COMMIT_REF" =~ ^0+$ ]]; then
  log "initial or unknown commit range; building conservatively"
  exit 1
fi

if ! git rev-parse --verify "$CACHED_COMMIT_REF^{commit}" >/dev/null 2>&1; then
  log "cached commit $CACHED_COMMIT_REF is unavailable; building conservatively"
  exit 1
fi

if ! git rev-parse --verify "$COMMIT_REF^{commit}" >/dev/null 2>&1; then
  log "target commit $COMMIT_REF is unavailable; building conservatively"
  exit 1
fi

mapfile -t changed_paths < <(git diff --name-only "$CACHED_COMMIT_REF" "$COMMIT_REF" --)

if [[ "${#changed_paths[@]}" -eq 0 ]]; then
  log "no changed files detected; skipping build"
  exit 0
fi

for path in "${changed_paths[@]}"; do
  if should_build_for_path "$path"; then
    log "build required because $path changed"
    exit 1
  fi
done

log "only repo/documentation/test files changed; skipping build"
exit 0
