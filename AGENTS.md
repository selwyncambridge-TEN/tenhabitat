<!--
  AUTO-GENERATED from CLAUDE.md
  DO NOT EDIT DIRECTLY - edit CLAUDE.md instead
-->

# TEN Habitat Website

## Repo Operating Contract

### Role

This repository is the website codebase for TEN Habitat, developed for Selwyn Cambridge. It owns the public web experience, project documentation, brand/design implementation, and deployment configuration for this site.

This work is independent. Do not import assumptions, issue workflows, board governance, copy, design language, or architecture from unrelated repositories unless Chris explicitly asks for a specific reusable mechanic.

### Source Of Truth

When sources disagree, use this order:

1. Current user instruction in the active session.
2. Repo `CLAUDE.md`.
3. Generated repo `AGENTS.md`.
4. Repo `DESIGN.md`, `README.md`, and any future ADRs or specs.
5. Repo `LEARNINGS.md`.
6. Older chat or memory.

If the conflict affects safety, credentials, publishing, destructive commands, client-facing claims, or production deployment, ask Chris before proceeding.

### First Reach

| Task type | First file/dir to read |
| --- | --- |
| Agent workflow or repo rules | `CLAUDE.md`, `LEARNINGS.md` |
| Generated agent instructions | `AGENTS.md`, `scripts/regenerate-agents-md.sh` |
| Visual design or brand work | `DESIGN.md` |
| Project overview | `README.md` |
| Website implementation | Existing app/source files once they exist |
| Git hook behavior | `.githooks/README.md`, `.githooks/pre-commit` |

### Do Not

- Do not hand-edit `AGENTS.md`; edit `CLAUDE.md` and regenerate the mirror.
- Do not add content that claims TEN Habitat services, pricing, team details, locations, guarantees, certifications, statistics, or launch dates unless Chris or a client-approved source provides them.
- Do not commit real credentials, API keys, service tokens, private client documents, private media, or environment-specific secrets.
- Do not add unrelated project names, workflows, links, or business assumptions to this repository.
- Do not publish, deploy, push, or open pull requests unless Chris explicitly asks.

### Current State

This repo is in initial setup. Treat product copy, information architecture, technical stack, hosting, analytics, forms, CMS, and deployment as undecided until confirmed in repo files or by Chris.

## Quick Reference

- **Project**: TEN Habitat website
- **Client**: Selwyn Cambridge
- **Purpose**: Public-facing website development
- **Status**: Initial repository setup
- **Primary docs**: `CLAUDE.md`, `AGENTS.md`, `LEARNINGS.md`, `DESIGN.md`, `README.md`

## Engineering Rules

### Think Before Coding

Before implementing, inspect the relevant files and state assumptions clearly. If multiple interpretations are plausible and choosing silently could change client-facing behavior, ask Chris.

### Keep Changes Small

Make the smallest coherent change that satisfies the request. Avoid unrelated refactors, formatting churn, speculative helpers, premature abstractions, and features that were not requested.

### Work From Existing Patterns

Once this repo has source code, prefer existing project conventions over introducing new structure. If no convention exists yet, choose boring, standard patterns that will be easy to replace as the project matures.

### Verify Before Reporting Done

Run the narrowest relevant checks before reporting completion:

- Documentation/config only: `bash scripts/regenerate-agents-md.sh --check`, `git diff --check`, and a search for forbidden unrelated project references.
- JavaScript/TypeScript website work: inspect `package.json`, then run the repo's lint, type-check, test, and build scripts if they exist.
- UI work: run the app locally and inspect the changed page in a browser before claiming it works.

If a check cannot run because the project has not been scaffolded yet, say that explicitly.

### Git Discipline

- Commit only when Chris asks for a commit.
- Do not push unless Chris explicitly asks.
- Prefer feature/setup branches for reviewable work instead of committing directly on `main`.
- Before committing, review `git status` and `git diff --cached`.

### Secrets And Client Material

Use `.env.local` or other ignored local files for secrets. Do not commit private credentials, private client assets, unpublished copy decks, contracts, invoices, or other sensitive material unless Chris explicitly marks them as public and repo-safe.

## Design Work

Before visual or UI changes, read `DESIGN.md`. Keep the site polished, accessible, responsive, and specific to TEN Habitat. Do not rely on generic stock-style content or vague placeholder marketing unless the task is explicitly exploratory.

## LEARNINGS.md

Read `LEARNINGS.md` at the start of each task. When Chris corrects an agent mistake, add or update one concise rule there before continuing.

## AGENTS.md Sync Mechanism

`CLAUDE.md` is the human-edited source of truth. `AGENTS.md` is the generated mirror consumed by agent tooling.

Regenerate manually:

```bash
bash scripts/regenerate-agents-md.sh
```

Check sync:

```bash
bash scripts/regenerate-agents-md.sh --check
```

Enable the repo hook in this checkout:

```bash
git config core.hooksPath .githooks
```

The pre-commit hook regenerates and stages `AGENTS.md` whenever staged `CLAUDE.md` changes.
