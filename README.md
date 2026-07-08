# TEN Habitat

Website repository for TEN Habitat, developed for Selwyn Cambridge.

This site is being scaffolded as the public transition into **Venture Habitat**: a founding-community and venture-building platform for converting Caribbean entrepreneurial activity into investable businesses.

## Approved Direction

Primary audiences:

- **Builders:** founders, entrepreneurs, and entrepreneur support organizations
- **Backers:** governments, development institutions, credit unions, and corporates
- **Investors:** diaspora, investors, and capital partners

Initial route plan:

- `/` - main Venture Habitat landing page
- `/builders` - builder audience page
- `/backers` - institutional backer page
- `/investors` - investor and diaspora partner page
- `/join` - founding community signup with role selection

Primary call to action: join the founding community.

## Approved Stack

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

## Presentation And Data Layer

The presentation layer should be mostly static, fast, semantic, and accessible. The SVG mockups from the transition site are visual references, not production source files.

The data layer should use Netlify Database for simple relational records such as founding community signups and inquiry messages. Browser submissions should go through server-side validation before writing to the database.

Likely v1 record fields:

- role: builder, backer, or investor
- name
- email
- organization
- country or market
- interest area
- message
- source page or campaign metadata
- follow-up status

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
