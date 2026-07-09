# LEARNINGS

Persistent repo-specific rules learned from Chris's corrections. Read this at the start of every task and follow every rule below.

When Chris corrects a mistake:

1. Apply the correction.
2. Update or append a rule here under the right section. Check whether an existing rule covers it first; if so, update that one instead of duplicating.
3. Show Chris the new rule before continuing.

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

- (2026-07-08) Rule: Preserve the Claude Design handoff’s splash-first routing: `/` should load the Splash entry page, and the Venture Habitat homepage should be a distinct home route such as `/home` unless Chris explicitly approves a different entry model.
  Why: The first implementation treated the splash as secondary `/welcome`, but Chris corrected that the landing page is supposed to be the Splash page.
- (2026-07-08) Rule: Keep `DESIGN.md` as a substantive design contract with principles, anti-patterns, visual foundations, component rules, accessibility, and QA expectations; do not leave it as a thin placeholder when a fuller pattern is available.
  Why: The initial TEN Habitat design guide was too sparse compared with the stronger design-contract pattern used in reference repos.
- (2026-07-08) Rule: Use Jost as the approved production font for the current TEN Habitat website direction.
  Why: Futura was the original Canva mockup font, but Chris later approved Jost after Claude Design produced the developer handoff using Jost.
- (2026-07-08) Rule: Treat the current Canva website SVG and PNG exports as transparency-aware assets; do not infer white or black section backgrounds from areas that may simply be transparent canvas.
  Why: Chris confirmed both the SVG and PNG pages were exported with transparent backgrounds, which means background reconstruction must inspect alpha and explicit SVG fills instead of relying on how a viewer composites the files.
- (2026-07-08) Rule: Treat the claims and statistics in the current TEN Habitat Figma/Canva pages as accurate approved source content unless Chris or Selwyn later revises them.
  Why: Chris corrected the design review assumption that the visible statistics still needed verification; they are accurate and approved.

## Code

- _(no rules yet)_

## Testing

- _(no rules yet)_

## Git & Releases

- (2026-07-08) Rule: Keep TEN Habitat deployment, database, analytics, domain, and environment configuration isolated for Selwyn Cambridge handover; never reuse unrelated Netlify resources or deployment pipelines.
  Why: The project is intended to be handed over fully to Selwyn, so cross-project contamination would make ownership, billing, secrets, and operations harder to transfer cleanly.
- (2026-07-08) Rule: Use TEN Habitat-specific Netlify authentication for this repo; do not rely on the global Netlify CLI login, ambient Netlify token, or MCP server if it is authenticated against another project.
  Why: The first Netlify access check showed the available CLI/MCP context was not TEN Habitat-scoped, which would risk linking, deploying, or configuring the wrong project.
- (2026-07-08) Rule: TEN Habitat Netlify wrappers must also isolate ambient Netlify team/site/project variables, not only auth tokens.
  Why: The shell environment may contain unrelated `NETLIFY_TEAM_ID` or `NETLIFY_SITE_ID` values that could make status, link, deploy, or MCP operations target the wrong Netlify project.
