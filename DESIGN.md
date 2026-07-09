---
version: initial
name: TEN Habitat Design Contract
description: Agent-facing design contract for the TEN Habitat website.
owner: Selwyn Cambridge
status: draft
canonicalSources:
  operatingGuide: CLAUDE.md
  lessons: LEARNINGS.md
  visualReference: Live Figma file w3otvdvP7LwujMS0DkUHIW reviewed 2026-07-08
---

# TEN Habitat Design Contract

## Overview

This root `DESIGN.md` is the agent-facing design contract for the TEN Habitat website. It defines the design standards agents must preserve when creating pages, components, visual systems, content layouts, and interaction states for this repo.

This file does not invent the final brand. It sets the quality bar and the decision rules from the live Figma designs until Chris or Selwyn Cambridge provides final approved brand assets, photography, copy, typography, colors, and positioning. Once approved assets exist, update this file to make them canonical.

The TEN Habitat website should feel like a Caribbean venture-building community in transition: established, optimistic, founder-centered, and serious about converting entrepreneurial activity into investable businesses. It should not feel like a generic template, a copied SaaS landing page, a placeholder brochure, or a decorative page with unverified claims.

## Source Of Truth

Use this order for design decisions:

1. Approved brand assets, client-provided copy, client-approved imagery, and the live Figma designs reviewed on 2026-07-08.
2. Live Figma source and handoff notes in [`docs/design-handoff.md`](./docs/design-handoff.md).
3. Repo `DESIGN.md`.
4. Repo `CLAUDE.md` for workflow, safety, and verification rules.
5. Repo `LEARNINGS.md` for durable corrections.
6. Existing implemented components and tokens once the site is scaffolded.
7. Temporary design exploration notes, screenshots, or chat history.

If approved brand material conflicts with this draft guide, follow the approved brand material and update this guide in the same change.

## Working Principles

Use these principles to judge whether a page or component belongs in TEN Habitat before adding decoration:

- **Specificity:** Every visual choice should support TEN Habitat's actual identity, audience, and content. Do not use generic filler patterns as final design.
- **Clarity:** Navigation, page hierarchy, calls to action, and forms should be obvious without explanatory helper text.
- **Trust:** Use typography, spacing, imagery, and restraint to make the site feel credible and considered.
- **Warmth:** Keep the experience approachable and human. Avoid cold dashboard styling unless a future admin tool explicitly requires it.
- **Content truth:** Let confirmed content drive structure. Do not invent proof, services, metrics, locations, people, or promises to make a layout look complete.
- **Accessibility:** Treat readable contrast, keyboard access, semantic markup, labels, focus states, and responsive behavior as design requirements.

## Site Direction From Figma

The live Figma file establishes the current design and content direction:

- TEN Habitat is transitioning into **Venture Habitat**.
- The central proposition is a conversion layer for Caribbean entrepreneurial activity.
- The site should emphasize ordinary businesses becoming extraordinary through structure, capital access, community, and momentum.
- The main action is joining the founding community.
- The experience should split clearly into builder, backer, and investor paths.

Current Figma source:

- File: https://www.figma.com/design/w3otvdvP7LwujMS0DkUHIW/TENHabitat
- File key: `w3otvdvP7LwujMS0DkUHIW`
- Handoff details: [`docs/design-handoff.md`](./docs/design-handoff.md)

Initial route intent:

- `/` introduces Venture Habitat and the founding community.
- `/builders` speaks to founders, entrepreneurs, and entrepreneur support organizations.
- `/backers` speaks to governments, development institutions, credit unions, and corporates.
- `/investors` speaks to diaspora, investors, and capital partners.
- `/join` collects founding community interest with role selection.

Do not embed the exported SVG mockups as production pages. Rebuild the experience as semantic HTML/CSS with responsive sections, accessible text, optimized image assets, and real forms.

## Anti-Patterns

These patterns are banned from final TEN Habitat website work unless Chris explicitly approves a different direction:

- Generic centered hero with vague headline, two CTAs, and a decorative gradient.
- Stock-like hero imagery that does not reveal the actual subject, place, product, service, or client-approved atmosphere.
- "Trusted by" logo strips, testimonials, awards, certifications, or metrics without approved source material.
- Bento grids made from icon, heading, and paragraph rows when there is no real content structure behind them.
- Placeholder sections that read as final production copy.
- Reusing unrelated project language, visual motifs, brandmarks, colors, diagrams, or workflow patterns.
- Excessive glassmorphism, neon glow, bokeh blobs, decorative orbs, and background effects that make content harder to read.
- One-note palettes dominated by a single hue family.
- Oversized cards inside cards, floating page sections styled as cards, or layout chrome that competes with content.
- Multiple competing primary calls to action in the same viewport.
- Icon decoration in headings where the icon does not add meaning.
- Hover effects that scale or jump enough to shift layout.
- Text over images without verified contrast at mobile and desktop sizes.
- Hidden or vague form behavior, especially for contact or inquiry flows.

## Brand And Content Rules

- Use `TEN Habitat` consistently unless approved brand material specifies another form.
- Use `Venture Habitat` for the emerging offer/platform described by the current Figma designs.
- Treat Selwyn Cambridge as the client stakeholder. Do not invent biography, credentials, quotes, services, or claims.
- Claims and statistics shown in the current Figma pages are approved source content unless Chris or Selwyn Cambridge later revises them.
- Keep claims traceable to approved source material and avoid expanding them without approval.
- Do not imply regulatory, legal, environmental, financial, construction, real estate, or professional guarantees without approved source text.
- Draft copy must be visibly provisional in docs or kept out of production surfaces.
- If the design needs content that does not exist yet, create a content gap instead of inventing filler.
- Do not force a literal "ten" or numeric motif unless approved brand material supports it.

## Wordmark Test

Before shipping a page, cover the logo and confirm the page still feels identifiable through typography, rhythm, imagery, layout, and copy. If the page could belong to any generic site, improve those fundamentals before adding decoration.

## Visual Foundations

### Color

The mockups establish an energetic provisional palette:

- **Orange:** primary narrative energy and emphasis.
- **Yellow:** primary CTA and high-attention accent.
- **Green/teal:** builder and growth signals.
- **Blue/navy:** backer/institutional trust and data-layer sections.
- **Slate/blue-gray:** supporting body text and quiet structure.
- **White:** clean public-site canvas and breathing room.
- **Surface:** subtle raised or separated areas for repeated content, forms, and navigation.
- **Status:** success, warning, error, and info colors are reserved for state and risk, not decoration.

Rules:

- Use semantic tokens once a CSS system exists, such as `--color-canvas`, `--color-ink`, `--color-surface`, `--color-accent`, and status tokens.
- Do not hard-code raw colors throughout components after tokens exist.
- Do not let the orange/yellow palette flatten the site into a one-note theme; preserve white space, blue-gray structure, and photography.
- Do not use color as the only signifier for state.
- Verify text contrast against WCAG AA minimums.

### Typography

Typography should carry identity before decoration does.

- Use a distinctive, readable display face only after font licensing and brand fit are clear.
- Use a highly legible body face for paragraphs, navigation, forms, and dense content.
- Use monospace only for technical identifiers, timestamps, code, or machine-like labels if such content exists.
- Do not use viewport-width font sizing.
- Do not use negative letter spacing.
- Keep heading scale appropriate to the surface: hero-scale type belongs in true hero contexts, not compact panels.

### Layout

TEN Habitat pages should use clear public-site composition:

1. site header and navigation
2. first-viewport Venture Habitat identity and primary message
3. proof/context section with sourced metrics or community evidence
4. audience path cards for builders, backers, and investors
5. role-specific story and offer sections
6. founding community call to action or role-specific contact flow
7. footer with practical links and contact context

Rules:

- Use a strong alignment system. Prefer clean left edges for reading-heavy sections.
- Use whitespace before dividers. Add dividers only when spacing cannot clarify grouping.
- Keep section rhythm consistent across pages.
- Ensure the first viewport signals TEN Habitat clearly and leaves a hint of the next section visible on common mobile and desktop viewports.
- Do not make a landing page if Chris asks for a usable site page or tool; build the requested experience.

### Elevation And Depth

Depth should be restrained and purposeful:

- Use borders, spacing, tonal contrast, and typography before shadows.
- Use stronger depth for overlays, menus, dialogs, and popovers that physically sit above the page.
- Avoid decorative depth effects that compete with copy, photography, or calls to action.

### Shapes

Keep shape language consistent:

- Controls and compact surfaces: modest radius, usually 4px to 8px.
- Larger content cards or media frames: modest to medium radius, usually 8px to 12px.
- Pills and badges: full radius only when the content is truly badge-like.
- Do not mix sharp brutalist shapes and soft rounded shapes on the same page without an approved design reason.

## Components

Components should be reusable only when reuse is real. Do not build a design system before the site has enough repeated patterns to justify it.

### Navigation

- Navigation must show the current location when multiple pages exist.
- Mobile navigation must be keyboard-accessible and screen-reader-usable.
- Keep labels short and concrete.
- Do not hide essential navigation behind ambiguous icons.

### Buttons And Links

- Each screen should have one visually dominant primary action.
- Secondary actions must look secondary through placement, styling, and copy.
- Links should look like links in body content.
- Buttons should be reserved for actions, not navigation disguised as actions unless the visual hierarchy requires it.

### Cards And Repeated Items

- Use cards for repeated items, content summaries, contact methods, or framed media.
- Do not place UI cards inside larger decorative cards.
- Cards need stable dimensions or responsive constraints so content does not shift awkwardly.
- Avoid generic icon-heading-paragraph cards unless the content genuinely benefits from that structure.

### Forms

Forms must be explicit and trustworthy:

- Every field has a visible label.
- Required fields are clear.
- Validation errors are specific and accessible.
- Loading, success, and failure states are visible.
- Submit behavior explains what happens next.
- Do not collect information without a clear purpose.

### Media And Imagery

- Prefer real approved photography, client-supplied images, site/project imagery, or custom-generated assets that match the brief.
- Preserve the mockups' emphasis on Caribbean founders, business owners, community gatherings, and institutional/diaspora participation.
- Do not use dark, blurred, cropped, stock-like, or purely atmospheric media when the user needs to inspect the real subject.
- Keep image crops intentional across breakpoints.
- Provide useful alt text for informative images and empty alt text for decorative images.
- Do not create fake project images, fake team photos, fake client logos, or fake testimonials.

### Icons

- Use icons only when they clarify actions, navigation, or dense UI states.
- Prefer a consistent icon set once one is chosen.
- Do not use decorative icons in headings as a substitute for real visual identity.
- Icon-only buttons must have accessible names and visible focus states.

## Motion And Interaction

Motion should make the interface feel responsive, not performative:

- Use short, subtle transitions for menus, disclosures, hover states, and form feedback.
- Use one orchestrated reveal only when it improves first impression and does not delay content.
- Respect reduced-motion preferences.
- Do not animate layout in ways that cause text or controls to jump.
- Do not rely on motion to communicate essential information.

## Responsive Behavior

Design mobile-first, then enhance:

- Verify layouts at mobile, tablet, and desktop widths.
- Keep tap targets large enough for touch.
- Avoid horizontal overflow.
- Ensure text wraps cleanly and long words do not break containers.
- Do not simply shrink desktop compositions until they fit. Recompose sections when needed.

## Accessibility

Minimum standard:

- Semantic landmarks for header, nav, main, sections, and footer.
- Correct heading order.
- Keyboard access for all interactive controls.
- Visible focus states.
- Form labels and accessible error messages.
- Color contrast at WCAG AA or better.
- No content hidden from assistive technology unless it is truly decorative or duplicated.
- No auto-playing motion or media that cannot be paused.

Accessibility is not a polish pass. It is part of the design.

## Performance And Implementation

Design choices must be buildable and performant:

- Avoid oversized images and unbounded media.
- Prefer responsive images once the stack supports them.
- Avoid heavy animation libraries for simple transitions.
- Do not add client-side JavaScript for static content.
- Keep font loading intentional and limited.
- Preserve Core Web Vitals when adding visual richness.

## Design QA Checklist

Before marking visual work complete:

- `DESIGN.md` was read before making the change.
- The page matches the approved route/audience intent.
- The work uses approved content or clearly marked placeholders.
- No invented claims, services, metrics, testimonials, or credentials are present.
- Layout was checked on at least one mobile and one desktop viewport.
- Text does not overlap, clip, or overflow.
- Interactive elements have hover, focus, disabled, loading, success, and error states where relevant.
- Forms have labels, validation, and post-submit behavior.
- Color contrast is readable.
- Images have appropriate alt text.
- `AGENTS.md` remains in sync with `CLAUDE.md` when those files change.

## Do's And Don'ts

- Do update this file when durable colors, typography, spacing, component patterns, brand assets, or content rules change.
- Do document approved design decisions here instead of relying on chat memory.
- Do keep execution workflow in `CLAUDE.md`, not in this design contract.
- Do make the site feel specific to TEN Habitat through content, typography, rhythm, imagery, and restraint.
- Don't define a parallel design system in random component files once tokens exist.
- Don't use raw colors for state once semantic tokens exist.
- Don't use unapproved assets or invented claims to make a layout feel finished.
- Don't copy visual language from unrelated projects.
- Don't treat this draft as final brand direction after approved brand material arrives.
