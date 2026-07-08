---
version: initial
name: TEN Habitat Design Guide
description: Initial design direction and guardrails for the TEN Habitat website.
owner: Selwyn Cambridge
status: draft
---

# TEN Habitat Design Guide

## Purpose

This file captures the initial design rules for the TEN Habitat website. It is intentionally lightweight until Chris or Selwyn provides approved brand assets, copy, imagery, audience notes, and business positioning.

## Design Principles

- **Specific over generic:** The site should feel clearly made for TEN Habitat, not like a template with swapped text.
- **Calm and trustworthy:** Use visual choices that support credibility, clarity, and ease of reading.
- **Content-led:** Let confirmed client content drive page structure. Do not invent services, promises, locations, metrics, or proof points.
- **Accessible by default:** Maintain readable contrast, keyboard-friendly controls, semantic HTML, visible focus states, and responsive layouts.
- **Polished restraint:** Avoid excessive gradients, decorative clutter, unreadable overlays, and gimmicks that make the site harder to use.

## Brand And Content Rules

- Use `TEN Habitat` consistently unless Chris or approved brand material specifies another form.
- Treat Selwyn Cambridge as the client stakeholder. Do not invent public biography, credentials, quotes, or personal details.
- Use placeholder copy only when clearly marked as temporary in implementation or docs.
- Prefer real approved photography, brand assets, and content once available. Until then, use neutral placeholders that are easy to replace.

## Visual Direction

Until a formal brand system exists:

- Use a restrained, warm-neutral base with enough contrast for accessibility.
- Add color deliberately for navigation state, calls to action, links, and highlights.
- Keep typography clean, legible, and responsive without viewport-based font scaling.
- Use spacing and hierarchy to make pages easy to scan on mobile and desktop.
- Avoid one-note palettes dominated by a single hue family.

## UI Rules

- Buttons, links, forms, navigation, and cards must have clear interactive states.
- Do not put cards inside other cards unless a mature component system later requires it.
- Keep card radii modest and consistent.
- Use familiar icons only when they clarify an action; do not use icons as decoration.
- Ensure text never overlaps or clips in mobile or desktop layouts.

## Page And Component Expectations

For future website implementation:

- Build real pages, not a marketing shell that only describes planned functionality.
- Keep first-screen content focused on TEN Habitat's actual identity and offer once confirmed.
- Make forms explicit about what happens after submission.
- Include loading, empty, success, and error states for interactive features.
- Verify UI changes in a browser before reporting them complete.

## Updating This Guide

Update `DESIGN.md` when approved brand assets, typography, colors, page patterns, or content rules become durable. Keep execution steps and agent behavior in `CLAUDE.md`; keep correction history in `LEARNINGS.md`.
