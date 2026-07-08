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

- (2026-07-08) Rule: Keep `DESIGN.md` as a substantive design contract with principles, anti-patterns, visual foundations, component rules, accessibility, and QA expectations; do not leave it as a thin placeholder when a fuller pattern is available.
  Why: The initial TEN Habitat design guide was too sparse compared with the stronger design-contract pattern used in reference repos.

## Code

- _(no rules yet)_

## Testing

- _(no rules yet)_

## Git & Releases

- _(no rules yet)_
