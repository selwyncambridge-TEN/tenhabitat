# Repository Git Hooks

This repository ships hooks in `.githooks/` so hook behavior is versioned and reviewable.

Git does not activate repository hooks automatically. Enable them once per checkout:

```bash
git config core.hooksPath .githooks
```

Verify the active hook path:

```bash
git config --get core.hooksPath
```

It should print:

```text
.githooks
```

## Installed Hooks

- `pre-commit` regenerates and stages `AGENTS.md` from the staged `CLAUDE.md` whenever `CLAUDE.md` is committed.

This keeps `CLAUDE.md` as the edited source of truth while preserving a generated `AGENTS.md` mirror for agent tooling.
