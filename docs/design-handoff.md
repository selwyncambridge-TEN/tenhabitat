# TEN Habitat Design Handoff

This document records the live Figma design source for TEN Habitat and the handoff context for Claude Design or any other design agent.

## Live Figma Source

- Figma file: https://www.figma.com/design/w3otvdvP7LwujMS0DkUHIW/TENHabitat
- File key: `w3otvdvP7LwujMS0DkUHIW`
- Current design status: imported Canva-to-Figma designs are the active visual source for refinement.

Repo links document the source of truth, but they do not grant access. Claude Design must have Figma access through the connected Figma integration, the relevant Figma account/team, or a file share permission that allows it to inspect and edit the file.

## Page Links

| Page | Intent | Figma node |
| --- | --- | --- |
| `01 · Home` | Transition or splash entry into Venture Habitat | https://www.figma.com/design/w3otvdvP7LwujMS0DkUHIW/TENHabitat?node-id=0-1 |
| `02 · Venture Habitat` | Main Venture Habitat/homepage foundation | https://www.figma.com/design/w3otvdvP7LwujMS0DkUHIW/TENHabitat?node-id=44-2 |
| `03 · Builders` | Audience page for founders, entrepreneurs, and ecosystem builders | https://www.figma.com/design/w3otvdvP7LwujMS0DkUHIW/TENHabitat?node-id=44-3 |
| `04 · Backers` | Audience page for governments, development institutions, credit unions, and corporates | https://www.figma.com/design/w3otvdvP7LwujMS0DkUHIW/TENHabitat?node-id=44-4 |
| `05 · Investors` | Audience page for diaspora, investors, and capital partners | https://www.figma.com/design/w3otvdvP7LwujMS0DkUHIW/TENHabitat?node-id=44-5 |

## Responsive Frames

| Page | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| `01 · Home` | `89:2` | `98:5` | `98:7` |
| `02 · Venture Habitat` | `89:3` | `98:12` | `98:14` |
| `03 · Builders` | `89:4` | `98:19` | `98:21` |
| `04 · Backers` | `89:5` | `98:26` | `98:28` |
| `05 · Investors` | `89:6` | `98:33` | `98:35` |

## Current Design Notes

- Treat the Figma file as the active visual/design source.
- Treat visible claims and statistics in the current Figma pages as approved source content unless Selwyn Cambridge later revises them.
- Jost is the approved production font for the current website direction.
- The current designs need refinement into a coherent website system before implementation.
- Do not use exported SVG pages as production pages. Rebuild the site as semantic, responsive HTML/CSS with accessible text, optimized images, and real forms.

## Claude Design Developer Handoff

Claude Design generated a developer handoff package after the Figma refinement pass:

- Source archive: [`docs/handoffs/claude-design/developer-handoff.zip`](./handoffs/claude-design/developer-handoff.zip)
- Extracted handoff README: [`docs/handoffs/claude-design/design_handoff_ten_habitat_website/README.md`](./handoffs/claude-design/design_handoff_ten_habitat_website/README.md)
- Extracted HTML reference: [`docs/handoffs/claude-design/design_handoff_ten_habitat_website/TEN Habitat Website.dc.html`](<./handoffs/claude-design/design_handoff_ten_habitat_website/TEN Habitat Website.dc.html>)
- Extracted assets: [`docs/handoffs/claude-design/design_handoff_ten_habitat_website/assets/`](./handoffs/claude-design/design_handoff_ten_habitat_website/assets/)
- Extracted screenshots: [`docs/handoffs/claude-design/design_handoff_ten_habitat_website/screenshots/`](./handoffs/claude-design/design_handoff_ten_habitat_website/screenshots/)

## Claude Design Prompt

```text
Refine the current TEN Habitat Figma designs into a coherent, implementation-ready website system. Preserve the existing direction, approved copy, claims, and statistics.

Focus on:
1. Resolve the relationship between `01 · Home` and `02 · Venture Habitat`: either make `01 · Home` an intentional transition/splash entry into Venture Habitat, or merge its strongest seedling/logo transition elements into `02 · Venture Habitat`. Do not leave two competing homepage concepts.
2. Add a consistent site shell across the experience: header, navigation, active page states, footer, and clear routes for Home, Builders, Backers, Investors, and Join.
3. Establish one shared visual system: typography, spacing, buttons, cards, image treatments, section rhythm, and CTA styling.
4. Keep the warm Caribbean venture-building feel, but reduce Canva-like overlays, inconsistent photo treatments, and generic stock/corporate styling.
5. Fix responsive layouts, especially `05 · Investors` mobile, where imagery collapses and text becomes too dense.
6. Remove duplicate CTA sections and make each page's primary action clear.
7. Improve weak CTA copy such as "Check out what it is" with clearer actions like "Explore Venture Habitat", "Join the Founding Community", or role-specific CTAs.
8. Keep all text editable. Do not flatten text into images.
9. Preserve the intent of all five pages while making the result cleaner, more consistent, and ready to implement in code.

Do not redesign from scratch. Refine and strengthen the existing design direction.
```

## Access Checklist

Before handing work to Claude Design:

- Confirm Claude Design can open the Figma file URL.
- Confirm it can inspect the five page nodes listed above.
- Confirm whether it has edit permission or only view permission.
- Confirm it should refine the live file, not create a separate duplicate, unless Selwyn Cambridge requests a duplicate design branch.
