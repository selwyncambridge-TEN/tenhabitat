# LEARNINGS

Persistent repo-specific rules learned from project corrections. Read this at the start of every task and follow every rule below.

When Selwyn Cambridge or the current repository owner corrects a mistake:

1. Apply the correction.
2. Update or append a rule here under the right section. Check whether an existing rule covers it first; if so, update that one instead of duplicating.
3. Show the new rule before continuing.

Each rule should be:

- A concrete do or don't.
- One or two sentences, scannable at a glance.
- Tagged with the date it was added: `YYYY-MM-DD`.

---

## Scope

`LEARNINGS.md` captures durable corrections, repo-specific quirks, repeated mistakes, and agent behavior lessons for the TEN Habitat website repo. It should point to canonical docs instead of duplicating large workflow, design, or architecture content.

---

## Format

```text
- (YYYY-MM-DD) Rule: <what to do or not do>.
  Why: <the incident or reason that prompted it>.
```

---

## Workflow

- (2026-07-08) Rule: When repurposing root configuration from another repo, preserve the strong general operating standards, not only the file structure or sync mechanics; rewrite project-specific sections for TEN Habitat instead of deleting the discipline.
  Why: The first setup kept the `CLAUDE.md` to `AGENTS.md` mechanism but made `CLAUDE.md` too skeletal, losing useful instructions about agent behavior, verification, safety, and engineering quality.

## Design

- (2026-07-08) Rule: Preserve the Claude Design handoff’s splash-first routing: `/` should load the Splash entry page, and the Venture Habitat homepage should be a distinct home route such as `/home` unless Selwyn Cambridge explicitly approves a different entry model.
  Why: The first implementation treated the splash as secondary `/welcome`, but the landing page is supposed to be the Splash page.
- (2026-07-08) Rule: Keep `DESIGN.md` as a substantive design contract with principles, anti-patterns, visual foundations, component rules, accessibility, and QA expectations; do not leave it as a thin placeholder when a fuller pattern is available.
  Why: The initial TEN Habitat design guide was too sparse compared with the stronger design-contract pattern used in reference repos.
- (2026-07-08) Rule: Use Jost as the approved production font for the current TEN Habitat website direction.
  Why: Futura was the original Canva mockup font, but Jost was later approved after Claude Design produced the developer handoff using Jost.
- (2026-07-08) Rule: Treat the current Canva website SVG and PNG exports as transparency-aware assets; do not infer white or black section backgrounds from areas that may simply be transparent canvas.
  Why: Both the SVG and PNG pages were exported with transparent backgrounds, which means background reconstruction must inspect alpha and explicit SVG fills instead of relying on how a viewer composites the files.
- (2026-07-08) Rule: Treat the claims and statistics in the current TEN Habitat Figma/Canva pages as accurate approved source content unless Selwyn Cambridge later revises them.
  Why: The visible statistics are accurate and approved source content.

## Code

- _(no rules yet)_

## Testing

- _(no rules yet)_

## Git & Releases

- (2026-07-08) Rule: Netlify production builds should run only for website/runtime/deployment inputs; docs-only, test-only, and agent-instruction-only changes must be ignored by the Netlify build-ignore gate.
  Why: Documentation and files unnecessary for building or deployment must not trigger GitHub-to-Netlify deploys.
- (2026-07-08) Rule: Keep TEN Habitat deployment, database, analytics, domain, and environment configuration isolated for Selwyn Cambridge ownership; never reuse unrelated Netlify resources or deployment pipelines.
  Why: The project is intended to be handed over fully to Selwyn, so cross-project contamination would make ownership, billing, secrets, and operations harder to transfer cleanly.
- (2026-07-08) Rule: Use TEN Habitat-specific Netlify authentication for this repo; do not rely on the global Netlify CLI login, ambient Netlify token, or MCP server if it is authenticated against another project.
  Why: The first Netlify access check showed the available CLI/MCP context was not TEN Habitat-scoped, which would risk linking, deploying, or configuring the wrong project.
- (2026-07-08) Rule: TEN Habitat Netlify wrappers must also isolate ambient Netlify team/site/project variables, not only auth tokens.
  Why: The shell environment may contain unrelated `NETLIFY_TEAM_ID` or `NETLIFY_SITE_ID` values that could make status, link, deploy, or MCP operations target the wrong Netlify project.
- (2026-07-09) Rule: Handoff-ready documentation must speak to Selwyn Cambridge as the project owner and avoid former-owner approval language, personal GitHub accounts, and machine-local paths.
  Why: Ownership transfer requires the repo to be usable from GitHub and from Selwyn's own machine without references to the previous local development environment.
