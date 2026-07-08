# TEN Habitat

Website repository for TEN Habitat, developed for Selwyn Cambridge.

## Repo Setup

This repo uses `CLAUDE.md` as the human-edited agent operating guide. `AGENTS.md` is generated from it for agent tooling.

Enable the local sync hook once per checkout:

```bash
git config core.hooksPath .githooks
```

Regenerate the agent mirror manually:

```bash
bash scripts/regenerate-agents-md.sh
```

Check sync:

```bash
bash scripts/regenerate-agents-md.sh --check
```

## Root Docs

- `CLAUDE.md` - source-of-truth agent operating guide
- `AGENTS.md` - generated mirror of `CLAUDE.md`
- `LEARNINGS.md` - durable corrections and repo-specific lessons
- `DESIGN.md` - initial design direction and guardrails
