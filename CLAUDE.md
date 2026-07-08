# TEN Habitat Website

## Repo Operating Contract

### Role

This repository is the website codebase for TEN Habitat, developed for Selwyn Cambridge. It owns the public web experience, project documentation, brand/design implementation, and deployment configuration for this site.

This repo is independent. Reuse general engineering discipline from other work, but do not import unrelated project names, issue workflows, architecture, product claims, design language, hosting assumptions, or business rules unless Chris explicitly asks for a specific reusable mechanic.

### Authority And Conflict Resolution

When instructions disagree, use this order:

| Tier | Source |
| --- | --- |
| 1 | System/developer instructions from the active coding agent |
| 2 | Current user instruction in the active session |
| 3 | Repo `CLAUDE.md` |
| 4 | Generated repo `AGENTS.md` |
| 5 | Repo `DESIGN.md`, `README.md`, future ADRs, and accepted specs |
| 6 | Repo `LEARNINGS.md` |
| 7 | Older chat, memory, precedent, and assumptions |

Tiebreakers:

1. Higher authority wins.
2. If authority is equal, narrower scope wins.
3. If still tied, newer instruction wins.
4. If safety, credentials, destructive action, publishing, production, or client-facing claims are involved, do not resolve by guesswork. Ask Chris or choose the conservative path.

### First Reach

| Task type | First file/dir to read |
| --- | --- |
| Agent workflow or repo rules | `CLAUDE.md`, `LEARNINGS.md` |
| Generated agent instructions | `AGENTS.md`, `scripts/regenerate-agents-md.sh` |
| Visual design or brand work | `DESIGN.md` |
| Project overview | `README.md` |
| Website source work | Existing app/source files once they exist |
| Data layer / forms | `README.md`, Netlify database migrations once present, server action/function files once present |
| Git hook behavior | `.githooks/README.md`, `.githooks/pre-commit` |
| Package or command choice | `package.json`, lockfiles, config files, and scripts once present |

### Current State

This repo is in initial setup with an approved scaffold direction. Product positioning, initial routes, stack, hosting, forms, and database direction are now captured below and in `README.md`. Treat detailed final copy, final brand assets, production domain, analytics, and final form fields as undecided until confirmed by Chris or Selwyn Cambridge.

### Do Not

- Do not hand-edit `AGENTS.md`; edit `CLAUDE.md` and regenerate the mirror.
- Do not invent TEN Habitat services, pricing, team details, locations, guarantees, certifications, statistics, launch dates, or client biography.
- Do not commit real credentials, API keys, service tokens, private client documents, unpublished assets, private media, contracts, invoices, or environment-specific secrets.
- Do not add unrelated project names, workflows, links, architecture, or business assumptions to this repository.
- Do not link this repo to any unrelated Netlify site, team resource, database, deploy hook, analytics account, environment variable set, or deployment pipeline.
- Do not publish, deploy, push, open pull requests, create issues, send messages, or make client-visible changes unless Chris explicitly asks.
- Do not run destructive commands or shared-state-changing operations without explicit permission.

## Quick Reference

- **Project**: TEN Habitat website
- **Client**: Selwyn Cambridge
- **Purpose**: Public-facing Venture Habitat transition and founding-community website
- **Status**: Approved scaffold direction, not yet implemented
- **Primary docs**: `CLAUDE.md`, `AGENTS.md`, `LEARNINGS.md`, `DESIGN.md`, `README.md`

## Approved Product Direction

The transition-site mockups establish the working product direction:

- TEN Habitat is moving from The Entrepreneurial Network Habitat toward **Venture Habitat**.
- Venture Habitat is the missing conversion layer between Caribbean entrepreneurial activity and investable businesses.
- The core thesis: ordinary Caribbean businesses can become extraordinary when given structure, community, capital access, and growth momentum.
- The main public action is to join the founding community.

Primary audiences:

- **Builders:** founders, entrepreneurs, and entrepreneur support organizations.
- **Backers:** governments, development institutions, credit unions, and corporates.
- **Investors:** diaspora, investors, and capital partners.

Approved initial routes:

- `/` - main Venture Habitat landing page.
- `/builders` - builder audience page.
- `/backers` - institutional backer page.
- `/investors` - investor and diaspora partner page.
- `/join` - founding community signup with role selection.

## Approved Technical Scaffold

Use this stack unless Chris changes it:

- Next.js 16
- React 19
- TypeScript 6.0.3 stable
- Tailwind CSS
- shadcn/ui, used selectively for accessible primitives and forms
- Playwright for browser, screenshot, and responsive QA
- pnpm for package management
- Netlify hosting
- Netlify Functions or server actions for server-side form handling
- Netlify Database for simple relational data
- Zod for validation

Do not use TypeScript release candidates for this client site unless Chris explicitly approves. Verify current package versions before scaffolding because JavaScript tooling changes quickly.

## Presentation And Data Layer

Presentation layer:

- Keep public marketing pages mostly static and fast.
- Build semantic pages from the mockup direction instead of embedding exported SVG pages.
- Use real HTML, accessible forms, responsive images, and reusable sections.
- Use shadcn/ui for accessibility-sensitive primitives, not as the visual identity.

Data layer:

- Use Netlify Database for relational community-signup and inquiry data.
- Use `@netlify/database` as the database interface.
- Keep migrations under `netlify/database/migrations/` once tables exist.
- Route browser submissions through a server action or Netlify Function.
- Validate inputs with Zod before writing to the database.
- Never expose database writes, connection strings, or secrets to client-side code.
- Treat deploy previews as isolated database branches and production as the main database.

Likely v1 data records:

- founding community signup
- selected role: builder, backer, investor
- name
- email
- organization
- country or market
- interest area
- message
- source page or campaign metadata
- follow-up status

## Project Isolation And Handover

TEN Habitat is a client project for Selwyn Cambridge and must be operationally isolated from unrelated work.

Rules:

- Use a dedicated Netlify site/project for TEN Habitat.
- Use a dedicated Netlify Database for TEN Habitat.
- Use dedicated environment variables, deploy hooks, analytics, forms, and domain/DNS settings.
- Do not reuse unrelated Netlify sites, databases, teams, tokens, environment variables, analytics properties, deploy pipelines, or project-board workflows.
- Prefer handover-friendly configuration: document setup, keep secrets out of git, and avoid machine-local assumptions.
- Before linking or deploying through Netlify, verify the selected Netlify team/site belongs to the TEN Habitat project or is intended for Selwyn handover.

### Netlify CLI And MCP Isolation

Do not run bare `netlify` commands for TEN Habitat operations when the global CLI login or ambient environment may be authenticated to another team. Use the repo wrapper:

```bash
scripts/netlify-tenhabitat.sh <netlify-command>
```

The wrapper prefers `.secrets/tenhabitat.env` with `TENHABITAT_NETLIFY_AUTH_TOKEN` and ignores ambient Netlify auth and site variables. `.secrets/tenhabitat.env` must stay untracked.

If a personal access token is unavailable, use Netlify's agent login ticket flow through the repo wrapper:

```bash
scripts/netlify-tenhabitat.sh login-request
scripts/netlify-tenhabitat.sh login-check <ticket-id>
```

This stores OAuth state under `.secrets/netlify-home` and `.secrets/netlify-config`, not in the global Netlify CLI location.

Before linking, deploying, or using MCP for Netlify operations, verify the authenticated Netlify context can access the expected TEN Habitat team:

```bash
scripts/netlify-tenhabitat.sh verify-team
```

Set `TENHABITAT_NETLIFY_TEAM_ID` in `.secrets/tenhabitat.env` to the TEN Habitat team ID. Set `TENHABITAT_NETLIFY_SITE_ID` only once the TEN Habitat Netlify project/site ID is confirmed, then link this checkout with:

```bash
scripts/netlify-tenhabitat.sh link-tenhabitat
```

Do not use the Netlify MCP server for TEN Habitat reads or writes unless its readback shows the TEN Habitat team/site. If the MCP server only shows unrelated teams or projects, treat it as unavailable for this repo.

For MCP access, use the TEN Habitat-specific wrapper:

```bash
scripts/netlify-mcp-tenhabitat.sh
```

Codex should use a distinct `netlify_tenhabitat` MCP server entry that points at this wrapper. Do not repoint the global `netlify` MCP server or store a TEN Habitat token directly in shared MCP config.

For MCP, prefer `TENHABITAT_NETLIFY_AUTH_TOKEN` because Netlify documents MCP clients around PAT input. If using the login-ticket fallback, verify MCP readback shows the TEN Habitat team/project before relying on it.

### Local Secrets

Use `.secrets/tenhabitat.env` for repo-local tokens and secrets. Keep the entire `.secrets/` directory ignored by git.

Never put real credentials in tracked templates, docs, source files, commits, issue text, PR text, or command output summaries. `.env.example` is only a placeholder template.

---

# Hard Rules - Non-Negotiable

## 1. Ask Before Destructive Or Shared-State Commands

Never run irreversible or shared-state-changing commands without explicit permission. State the exact command, why it is needed, and wait for Chris to approve.

Always require confirmation for:

- `git push --force` or `git push --force-with-lease`
- `git reset --hard`, `git clean -fd`, `git checkout -- .`
- `git merge`, `git rebase`, or `git cherry-pick` onto `main` or onto any branch Chris is reviewing
- deleting local or remote branches
- amending commits that have already been pushed
- tag deletion or force-pushed tags
- `--no-verify` on commits or pushes
- commits or pushes directly to `main`
- `rm -rf`, data deletion, destructive migrations, dropping tables, or truncating data
- deployments, DNS changes, hosting changes, production env var changes, and secret changes
- package publishing, public GitHub activity, email, Slack, social posting, or any action visible to others

Safe by default: read-only commands, local edits, local builds, local tests, local lint, local type-check, and non-destructive inspection.

If unsure whether an action is destructive, ask.

## 2. Verify Before Reporting Complete

Before saying a task is complete, verify it directly:

- Run the script, test, build, lint, type-check, or sync check that matches the touched files.
- For documentation/config-only changes, run `bash scripts/regenerate-agents-md.sh --check`, `git diff --check`, and search for unrelated project references.
- For JavaScript or TypeScript work, inspect `package.json` and run the repo's relevant scripts. Do not guess command names.
- For UI work, load the page in a browser and check the changed behavior and layout on desktop and mobile.
- For forms, check success, validation, loading, and error states.
- For deployment work, verify the deployed or preview URL before telling Chris to use it.

Report outcomes honestly:

- If checks pass, say what passed.
- If checks fail, give the relevant command and failure summary.
- If checks cannot run because the project is not scaffolded or a dependency is missing, say that explicitly.
- Never skip, suppress, weaken, or hide a failing check to make the work look done.

## 3. Think Before Coding

Do not assume silently. Before implementing:

- Inspect relevant files, conventions, and existing helpers.
- State important assumptions.
- If multiple interpretations exist and the difference affects client-facing behavior, ask Chris.
- Prefer extending existing patterns over duplicating them.
- If a simpler approach solves the actual request, use it.

## 4. Preserve TEN Habitat Truth

Client-facing content must be grounded in approved sources. Do not invent facts to fill a page. When copy, imagery, brand rules, services, proof points, or calls to action are missing, use neutral placeholders only when clearly marked as temporary, or ask Chris for the source material.

---

# Medium Rules - Engineering Quality

## Senior Engineering Standard

Deliver production-quality work with the smallest clear implementation that fully satisfies the request.

Optimize in this order:

1. Correctness
2. Maintainability
3. Security
4. Simplicity

Brevity matters only when it improves clarity. Prefer boring, obvious code over impressive abstractions.

### 1. Core Engineering Standard

Produce code that is correct for expected and important edge cases, easy to read and review, secure by default, consistent with the existing codebase, and as small as the problem reasonably allows.

Do not introduce generic frameworks, factories, adapters, configuration systems, helper layers, or dependencies unless the current task clearly requires them.

### 2. Work From The Existing Codebase

Before editing, inspect the relevant files, naming conventions, patterns, tests, and dependency choices. Follow existing style unless it is clearly broken, unsafe, or inconsistent with the task.

Make localized changes. Do not rewrite, reformat, reorder, or refactor unrelated code. If you notice unrelated dead code or risk, mention it instead of changing it.

### 3. Planning And Assumptions

For complex, risky, or ambiguous tasks, use a brief task list and keep it current. Ask only when missing information blocks safe progress. Otherwise make a reasonable assumption, continue, and state it in the final response.

Do not over-plan small fixes.

### 4. Minimal Implementation Rule

Implement the narrowest complete solution. Prefer:

- one clear function over several tiny abstractions
- guard clauses over nested conditionals
- native language and framework features over custom utilities
- explicit data flow over hidden magic
- simple types over complex generics
- clear conditionals over clever one-liners

Do not optimize for line count at the expense of correctness, validation, safety, accessibility, tests, or maintainability.

### 5. No Avoidable Technical Debt

Do not leave TODOs, FIXMEs, placeholders, temporary shims, commented-out code, fake implementations, dead branches, unused variables, unused imports, unused files, unused dependencies, unnecessary abstractions, or unexplained behavior changes.

Fix root causes when they are in scope. Do not hide problems behind broad catches, unsafe casts, suppression comments, retries, vague fallbacks, or silently ignored errors.

### 6. Type Safety, Linting, Warnings, And Suppressions

Resolve relevant type errors, compiler errors, linter warnings, and failing tests caused or exposed by your changes. Avoid `any`, overly broad types, unsafe casts, non-null assertions, `@ts-ignore`, `# type: ignore`, `# noqa`, `eslint-disable`, and equivalent suppressions.

A narrow suppression is allowed only for broken third-party types, generated/vendor-owned code, or a true tooling false positive. It must be scoped narrowly, explain why it is necessary, preserve safe runtime behavior, and be tested where relevant.

### 7. Input Validation And Error Handling

Validate external, user-controlled, network, file, database, form, CMS, and environment inputs at boundaries. Guard against null or undefined values, empty strings, invalid IDs, invalid enum values, missing permissions, network failures, timeouts, unexpected response shapes, and missing environment variables.

Handle errors deliberately. Error messages should be useful, specific, and safe. Do not leak secrets, stack traces, private client data, or sensitive internals.

### 8. Security Standard

Do not introduce security regressions. Protect against injection, cross-site scripting, unsafe deserialization, broken authorization, secret leakage, unsafe redirects, CSRF where relevant, sensitive logging, and trust in client-only validation.

Use framework security defaults, safe escaping, server-side validation where applicable, least-privilege access, and parameterized queries if data storage is later added. Never expose secrets, private keys, `.env` values, or sensitive client material.

### 9. Testing Standard

Add or update tests when behavior changes and the repo has an applicable test setup. Write the smallest useful test set that gives confidence: primary success path, important edge cases, major failure states, and regression coverage for fixed bugs.

Avoid redundant boilerplate, brittle implementation-detail tests, excessive mocking, blind snapshots, and tests that only prove framework behavior.

### 10. Documentation And Comments

Write comments only when they clarify non-obvious intent, tradeoffs, business rules, security constraints, or unusual edge cases. Explain why, not what.

Update documentation when the task changes setup, usage, public behavior, deployment, API contracts, or operational expectations.

### 11. Dependencies

Do not add a dependency unless it is clearly justified by the task. Prefer existing project utilities, standard library features, framework-native APIs, or a small local implementation.

If a dependency is necessary, choose a mature, maintained, minimal package. Do not change package managers or lockfile formats unless Chris asks or the scaffold requires it.

### 12. Performance

Do not optimize prematurely, but avoid obvious waste: unbounded memory growth, blocking request paths, large unnecessary renders, repeated expensive recomputation, avoidable network calls, and loading large payloads when a smaller one is enough.

### 13. UI And Accessibility

For frontend work, preserve or improve accessibility. Use semantic HTML where possible and do not break keyboard navigation, focus states, labels, screen reader meaning, color contrast, loading states, empty states, error states, or responsive behavior.

Keep components small, readable, and aligned with `DESIGN.md`.

### 14. API, Data, And Content Contracts

Do not change public routes, environment variables, analytics names, form field names, event names, response shapes, CMS schemas, or content structure unless required.

When a contract must change, update affected callers, tests, types, validation, fixtures, mocks, documentation, and deployment notes.

### 15. Output Format And Verification Reporting

In final responses, include what changed, files touched, checks run, assumptions made, and real remaining risks. Keep it concise, but do not omit material failures or unverified areas.

Never claim checks passed unless they were actually executed.

### 16. Environment Awareness

Use the capabilities actually available in the current environment. If terminal access exists, inspect project scripts and run the narrowest relevant checks.

Use existing project commands instead of inventing new ones. For Node work, inspect `package.json` and lockfiles first. For Python work, inspect `pyproject.toml` or equivalent first.

### 17. File And Change Discipline

Keep changes tightly scoped. Before editing a file, know why it needs to change. Avoid unrelated formatting churn or restructuring.

When creating files, ensure they are necessary, consistently named, and placed according to repo conventions. When deleting files, ensure they are truly unused and remove references.

### 18. Refactoring Standard

Refactor only when it directly supports the requested change, removes real duplication, fixes a design problem, or reduces complexity. Preserve behavior unless the task explicitly requires a behavior change.

### 19. Framework And Language Conventions

Use project language and framework idioms. If this becomes a TypeScript/React/Next.js site, prefer strict types, precise props, focused components, server/client boundaries that match the framework, and derived values over duplicated state.

For Node.js, validate API-boundary inputs and avoid blocking request handlers. For Python, use simple functions, expected type hints, and explicit validation. For SQL or databases, use parameterized queries and safe migrations.

### 20. Definition Of Done

A task is done only when the requested behavior is implemented, the solution is minimal and readable, relevant warnings are resolved, appropriate checks are complete, existing behavior is preserved unless intentionally changed, security and validation fit the risk level, and no avoidable technical debt remains.

---

# Test Integrity And TDD Discipline

Existing tests are executable specifications. "Fix failing tests" means fix the implementation unless the test is demonstrably wrong for an approved requirement.

Never use `.skip`, `.only`, skipped suites, relaxed assertions, vague expectations, implementation-derived expected values, blind snapshot updates, hidden route mocks, or hard waits to force a green result.

Allowed test edits are additions, stronger assertions, infrastructure fixes that preserve assertion strength, and explicitly approved requirement changes. Prefer assertions on externally observable user outcomes, form contracts, accessibility outcomes, routing, and invariants over implementation details.

When modifying an existing test because the test itself is wrong, state the reason in the commit or final response.

---

# Frontend And Website Quality

## Website Experience

- Build the actual website experience, not a page that only describes planned functionality.
- Make first-viewport content clearly signal TEN Habitat once brand and copy are confirmed.
- Do not use generic filler claims, generic industry fluff, or template-like language as final copy.
- Prefer real approved imagery and assets. If assets are unavailable, use placeholders that are easy to replace and do not pretend to be final.
- Keep common workflows ergonomic: navigation, contact, inquiry, form submission, and content scanning should be obvious.

## Visual Design

- Read `DESIGN.md` before visual work.
- Use a restrained, distinctive design appropriate to TEN Habitat, not a one-note palette or generic SaaS layout.
- Avoid decorative clutter, unreadable overlays, excessive gradients, stock-like hero composition, and text that competes with imagery.
- Use stable dimensions and responsive constraints so hover states, icons, labels, and dynamic content do not shift layout.
- Do not scale font size with viewport width. Ensure text never clips, overlaps, or becomes unreadable.
- Use cards only for repeated items, modals, or genuinely framed tools. Do not nest cards inside cards.

## Interaction Details

- Use native accessible controls where possible.
- Use icons in buttons only when they clarify the action; provide labels or accessible names.
- Provide visible focus states, hover states, disabled states, loading states, success states, and error states where relevant.
- Forms must have labels, validation messages, and clear post-submit behavior.

## Browser Verification

For UI changes, run the site locally and inspect the changed pages in a browser. Check at least one desktop and one mobile viewport. If a local server or scaffold does not exist yet, state that UI verification was not possible.

---

# Content And Client Truth

TEN Habitat content must stay grounded in approved inputs from Chris, Selwyn Cambridge, or repo-tracked source material.

Rules:

- Do not invent services, neighborhoods, projects, testimonials, metrics, awards, credentials, press, pricing, team members, or company history.
- Do not imply regulatory, legal, environmental, financial, or construction claims without approved source text.
- Do not publish private client material unless Chris explicitly marks it as public and repo-safe.
- Mark provisional copy as draft in docs or keep it out of production surfaces.
- If content is missing, ask for it or create a clearly labeled content gap.

---

# Git Workflow

- Work on a branch for reviewable changes. Do not commit directly on `main` unless Chris explicitly asks.
- Commit only when Chris asks for a commit or the active task clearly includes committing.
- Do not push unless Chris explicitly asks.
- Before committing, run relevant checks, inspect `git status`, inspect the staged diff, and ensure no unrelated files are included.
- Do not use `--no-verify` unless Chris explicitly approves.
- Keep commits coherent: one purpose, clear message, no unrelated cleanup.

---

# Learning From Corrections

Read `LEARNINGS.md` at the start of each task.

When Chris corrects a mistake:

1. Apply the correction.
2. Update or append one concise rule in `LEARNINGS.md`.
3. Show Chris the new rule before continuing.

Rules in `LEARNINGS.md` should be concrete, dated, and scoped to this repo.

---

# Tools And Commands

- Prefer `rg` over `grep` for searching.
- Prefer `fd` over `find` when available.
- Use `jq` for JSON processing.
- Discover commands from project files before running them.
- For Node projects, prefer the package manager indicated by the lockfile. If scaffolding from scratch and Chris has not chosen otherwise, prefer `pnpm`.
- For browser/UI testing, use the available browser automation or Playwright and report what was actually checked.

---

# Final Response Standard

Keep final responses concise and factual. Include:

- what changed
- important files touched
- checks run and results
- whether anything was not verified
- whether anything was committed or left uncommitted

Do not claim success beyond what was verified. Do not bury failures after a positive summary.

---

# AGENTS.md Sync Mechanism

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
