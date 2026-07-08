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

## Project Isolation

TEN Habitat is a client project for Selwyn Cambridge and should be cleanly handover-ready.

- Use a dedicated Netlify site/project for TEN Habitat.
- Use a dedicated Netlify Database for TEN Habitat.
- Use dedicated environment variables, deploy hooks, analytics, forms, and domain/DNS settings.
- Do not link this repo to unrelated Netlify sites, databases, teams, deploy pipelines, or analytics resources.
- Keep setup documented so Selwyn can take full control of the repo, deployment, database, and domain when the project is handed over.

## Netlify Access

Do not use the global Netlify CLI login or a non-TEN Habitat MCP server for this repo. Use the repo wrapper so every Netlify command is authenticated with TEN Habitat credentials.

Create a Netlify personal access token from an account that can access the TEN Habitat team:

1. Open Netlify user settings.
2. Go to OAuth / personal access tokens.
3. Create a token for TEN Habitat local development.
4. Store it only in the local secret file below.

Create local credentials:

```bash
cp .env.example .secrets/tenhabitat.env
```

Set these values in `.secrets/tenhabitat.env`:

```bash
TENHABITAT_NETLIFY_AUTH_TOKEN=...
TENHABITAT_NETLIFY_SITE_ID=...
```

Check the TEN Habitat account/project with:

```bash
scripts/netlify-tenhabitat.sh sites:list
scripts/netlify-tenhabitat.sh status
```

When `sites:list` shows the TEN Habitat project, copy its project/site ID into `TENHABITAT_NETLIFY_SITE_ID`. Link this checkout to the TEN Habitat Netlify project only after the site ID is confirmed:

```bash
scripts/netlify-tenhabitat.sh link-tenhabitat
```

If `netlify status` without the wrapper shows a non-TEN Habitat account or site, ignore that result for this repo and use the wrapper instead.

## Netlify MCP Access

Use the TEN Habitat MCP wrapper, not the global Netlify MCP server:

```bash
scripts/netlify-mcp-tenhabitat.sh
```

For MCP clients that support repo-local JSON config, copy `.mcp.example.json` to `.mcp.json`. `.mcp.json` is ignored by git.

For Codex on this machine, the MCP server should be registered in `~/.codex/config.toml` as `netlify_tenhabitat` with this command:

```toml
[mcp_servers.netlify_tenhabitat]
command = "/home/chris/projects/tenhabitat/scripts/netlify-mcp-tenhabitat.sh"
startup_timeout_sec = 60.0
```

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
