# TEN Habitat

Website repository for TEN Habitat, owned by Selwyn Cambridge.

This site is the public transition into **Venture Habitat**: a founding-community and venture-building platform for converting Caribbean entrepreneurial activity into investable businesses.

## Approved Direction

Primary audiences:

- **Builders:** founders, entrepreneurs, and entrepreneur support organizations
- **Backers:** governments, development institutions, credit unions, and corporates
- **Investors:** diaspora, investors, and capital partners

Implemented routes:

- `/` - Splash entry page
- `/home` - main Venture Habitat homepage
- `/welcome` - redirect to `/` for compatibility with the earlier scaffold
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

## Current Website

The first production website pass has been implemented from the Claude Design developer handoff.

Included:

- Next.js App Router site shell with fixed responsive navigation and footer
- implemented pages for `/`, `/home`, `/builders`, `/backers`, `/investors`, and `/join`
- compatibility redirect from `/welcome` to `/`
- approved Jost typography and TEN Habitat color tokens
- approved handoff photography served from `public/images/`
- role-prefilled founding community form via `/join?role=builder`, `/join?role=backer`, or `/join?role=investor`
- Tailwind CSS v4 setup
- shadcn/ui configuration and utility foundation
- Netlify build configuration
- Netlify Function scaffold at `/api/community-signup`
- Netlify Database migration for `community_signups`
- Zod validation schema for signup submissions
- Playwright route, form, and mobile navigation coverage

## Design Source

The live Figma file is the current visual/design source for the TEN Habitat website:

- Figma file: https://www.figma.com/design/w3otvdvP7LwujMS0DkUHIW/TENHabitat
- File key: `w3otvdvP7LwujMS0DkUHIW`
- Handoff notes: [`docs/design-handoff.md`](./docs/design-handoff.md)

The Figma links in this repo document the source of truth but do not grant access. Claude Design or any other design agent must have Figma access through its connected integration, Figma account/team permissions, or a suitable shared file permission.

## Getting Started From GitHub

Prerequisites:

- Node.js 22 or newer
- pnpm 10.26.1 or newer
- Git

Clone the repository from the GitHub URL owned by Selwyn Cambridge:

```bash
git clone <tenhabitat-github-url>
cd tenhabitat
corepack enable
pnpm install
pnpm dev
```

Open the local URL printed by Next.js. For a production build check, run:

```bash
pnpm check
```

Common commands:

```bash
pnpm dev
pnpm build
pnpm type-check
pnpm lint
pnpm test:e2e
pnpm dev:netlify
```

## Presentation And Data Layer

The presentation layer should be mostly static, fast, semantic, and accessible. The live Figma designs are the visual source of truth, but they should still be rebuilt as semantic, responsive website sections rather than embedded as exported pages.

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

## Project Ownership And Isolation

TEN Habitat should remain cleanly owned and operated by Selwyn Cambridge.

- Use a dedicated Netlify site/project for TEN Habitat.
- Use a dedicated Netlify Database for TEN Habitat.
- Use dedicated environment variables, deploy hooks, analytics, forms, and domain/DNS settings.
- Do not link this repo to unrelated Netlify sites, databases, teams, deploy pipelines, or analytics resources.
- Keep setup documented so Selwyn can control the repo, deployment, database, and domain from his own GitHub, Netlify, and local development environment.

Ownership-transfer checklist:

- Transfer the GitHub repository to Selwyn Cambridge or the correct TEN Habitat GitHub owner.
- Confirm the Netlify site is connected to the transferred GitHub repository and the `main` production branch.
- Confirm Selwyn has access to the TEN Habitat Netlify team, site, database, domain/DNS settings, and environment variables.
- Create new local credentials on Selwyn's machine using `.env.example`; do not reuse another person's local `.secrets/` directory.
- Update local Git remotes on existing checkouts after the GitHub transfer if the repository URL changes.

## Netlify Access

Do not use the global Netlify CLI login or a non-TEN Habitat MCP server for this repo. Use the repo wrapper so every Netlify command is authenticated with TEN Habitat credentials.

Preferred path: create a Netlify personal access token from an account that can access the TEN Habitat team. Netlify documents PATs under user settings, not team/project settings:

1. Open Netlify user settings.
2. Go to Applications / personal access tokens.
3. Create a token for TEN Habitat local development.
4. Store it only in the local secret file below.

Create local credentials:

```bash
cp .env.example .secrets/tenhabitat.env
```

Set these values in `.secrets/tenhabitat.env`:

```bash
TENHABITAT_NETLIFY_AUTH_TOKEN=...
TENHABITAT_NETLIFY_TEAM_ID=...
TENHABITAT_NETLIFY_SITE_ID=...
```

If the personal access token UI is unavailable, use Netlify's agent login ticket flow through the repo wrapper:

```bash
scripts/netlify-tenhabitat.sh login-request
```

Open the returned authorization URL in the browser while logged into a Netlify user that can access the TEN Habitat team, then check the ticket:

```bash
scripts/netlify-tenhabitat.sh login-check <ticket-id>
```

This stores Netlify OAuth state under `.secrets/netlify-home` and `.secrets/netlify-config`, not in the global Netlify CLI location.

Check the TEN Habitat account/project with:

```bash
scripts/netlify-tenhabitat.sh verify-team
scripts/netlify-tenhabitat.sh sites:list
scripts/netlify-tenhabitat.sh status
```

When `sites:list` shows the TEN Habitat project, confirm the account/team matches `TENHABITAT_NETLIFY_TEAM_ID`, then copy the project/site ID into `TENHABITAT_NETLIFY_SITE_ID`. Link this checkout to the TEN Habitat Netlify project only after the team and site IDs are confirmed:

```bash
scripts/netlify-tenhabitat.sh link-tenhabitat
```

If `netlify status` without the wrapper shows a non-TEN Habitat account or site, ignore that result for this repo and use the wrapper instead.

## Netlify Build Filtering

Netlify uses `scripts/netlify-ignore-build.sh` from `netlify.toml` to avoid deployments for repo-only changes.

Builds run for website/runtime/deployment inputs such as `app/`, `components/`, `lib/`, `public/`, `netlify/`, package files, and build configuration. Builds are skipped when the push only changes docs, tests, agent instructions, Git hooks, Playwright config, or other files that are not required to build or deploy the website.

## Netlify MCP Access

Use the TEN Habitat MCP wrapper, not the global Netlify MCP server:

```bash
scripts/netlify-mcp-tenhabitat.sh
```

For MCP, prefer `TENHABITAT_NETLIFY_AUTH_TOKEN` because Netlify documents MCP clients around PAT input. If using the login-ticket fallback, verify the MCP readback shows the TEN Habitat team/project before using it for any read or write operation.

For MCP clients that support repo-local JSON config, copy `.mcp.example.json` to `.mcp.json`. `.mcp.json` is ignored by git.

For Codex, register the MCP server in your local `~/.codex/config.toml` as `netlify_tenhabitat`. Use the absolute path to this repository on your own machine:

```toml
[mcp_servers.netlify_tenhabitat]
command = "/absolute/path/to/tenhabitat/scripts/netlify-mcp-tenhabitat.sh"
startup_timeout_sec = 60.0
```

If your MCP client supports relative commands in a repo-local config, `.mcp.example.json` provides a portable example. Copy it to `.mcp.json` and adjust the command only if your client requires an absolute path.

Restart the MCP client after changing MCP configuration. In active sessions, newly added MCP servers may not appear until the next session starts.

## Local Secrets

Local-only tokens and secrets belong in `.secrets/tenhabitat.env`. The entire `.secrets/` directory is ignored by git.

Do not put real credentials in `.env.example`, `README.md`, `CLAUDE.md`, source files, commits, or chat-visible logs. Keep `.env.example` as a placeholder template only.

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
- `docs/design-handoff.md` - Figma source links, page nodes, responsive frame IDs, Claude Design prompt, and developer handoff links
- `docs/handoffs/claude-design/` - Claude Design developer handoff archive, extracted reference, assets, and screenshots
