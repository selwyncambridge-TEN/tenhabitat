# Handoff: TEN Habitat — Venture Habitat Website

## Overview
A five-route marketing site for **TEN Habitat's Venture Habitat** launch — the "conversion layer between entrepreneurial activity and investable businesses" in the Caribbean. The site funnels three audiences (Builders, Backers, Investors) toward one action: joining the founding community.

Routes:
1. **Splash** (`#/splash`) — entry/transition page (seedling photo + logo + one CTA)
2. **Venture Habitat** (`#/home`) — the homepage
3. **Builders** (`#/builders`)
4. **Backers** (`#/backers`)
5. **Investors** (`#/investors`)
6. **Join** (`#/join`) — founding-community signup form

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing intended look and behavior, not production code to copy directly. Your task is to **recreate this design in your codebase's environment** (Next.js/React, Vue, Astro, etc.) using its established patterns; if no codebase exists yet, choose an appropriate modern framework (a statically-rendered React/Next.js site is a natural fit) and implement the designs there.

`TEN Habitat Website.dc.html` is the single-file prototype. The markup between `<x-dc>` and `</x-dc>` is plain HTML with inline styles (plus `{{ }}` template holes bound to the logic class at the bottom of the file); all layout, spacing, color, and type values in it are the source of truth.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and interactions are final. Recreate pixel-perfectly. All copy in the prototype is approved — do not rewrite it.

**Content caveat:** the statistics (500+ founders, US$6M+ raised, 1,000+ jobs, US$350M invested, 70% undercapitalised, <3% export) are estimates pending verification before launch. The prototype has a `showStats` flag that hides them globally — build the real site so these figures are easy to remove or update (CMS field or config flag).

## Design Tokens

### Colors
| Token | Value | Use |
|---|---|---|
| Cocoa (ink dark) | `#1A1008` | Nav, footer, dark sections, splash bg |
| Ink | `#191919` | Headings/body on light, button text on gold |
| Deep navy | `#0B1F2A` | "Conversion layer" statement bands |
| Paper | `#F7F5EF` | Default light section bg / body bg |
| White | `#FFFFFF` | Alternate light sections, cards |
| Gold (primary CTA) | `#F6D00A` | Primary buttons, accents on dark, active nav |
| Amber | `#E8B000` | Eyebrows, accents on light, button hover, "TEN" in wordmark |
| Orange (manifesto) | `#FF7300` | Reserved: home hero H1 + vision statement only |
| Slate | `#728D9B` | Sub-headlines, secondary display text |
| Slate body | `#34444C` | Body text on light |
| Slate muted | `#64747C` | Secondary body text, stat labels |
| Footer muted | `#998C80` | Footer small print |
| Card border | `#E8E2D4` | Path card borders |
| Input border | `#D9E0E3` | Form fields |
| Divider | `#E5E9EB` | Hairlines in stat card |
| Error | `#B3541E` | Form validation message |
| On-dark text | `rgba(255,255,255,0.72–0.92)` | Body copy on cocoa/navy |

### Typography
One family: **Jost** (Google Fonts), weights 400 / 500 / 600 / 700 (+ 400 italic).
All display sizes are fluid `clamp()` values:
- H1 display: `clamp(30–32px, 4.2–4.6vw, 46–54px)`, weight 700, line-height 1.1–1.16
- H2 section: `clamp(26–30px, 3.4–4.2vw, 38–48px)`, weight 600–700, line-height 1.15–1.3
- Sub-head (slate): `clamp(21–22px, 2.6–2.8vw, 29–31px)`, weight 600
- Body large: `clamp(17–19px, 2–2.3vw, 20–24px)`, line-height 1.45–1.6
- Eyebrow: 13px, weight 700, letter-spacing 2.5px, uppercase, amber (`#E8B000` on light, `#F6D00A` on dark)
- Wordmark: 15–16px, letter-spacing 2px — "TEN" 700 amber + "HABITAT" 400 white
- Stat number: `clamp(38px, 4.5vw, 54px)` 700 amber; Backers big number `clamp(56px, 7vw, 84px)` 700 slate
- Footer/small: 13–14px

### Spacing & geometry
- Section vertical padding: `clamp(64px, 9vw, 110px)`; statement bands `clamp(72px, 10vw, 120–130px)`
- Container: max-width **1200px** (nav 1240px, join 1160px), inline padding `clamp(20px, 4.5vw, 56px)`
- Nav height: **64px**, fixed
- Photo cards: border-radius **16–18px**; buttons **8px** (nav CTA 6px); pill links **999px**; info cards **14px**
- Card shadows: photos `0 18px 44px rgba(17,24,28,0.14–0.16)` (on dark: `0 24px 60px rgba(0,0,0,0.4–0.45)`); path cards `0 10px 28px rgba(17,24,28,0.08)`; form card `0 18px 44px rgba(17,24,28,0.1)`
- Grid gaps: two-col sections `clamp(32px, 5vw, 64–72px)`; card grids `clamp(16–20px, 2.4–3vw, 24–32px)`

### Buttons
- **Primary**: gold `#F6D00A` bg, `#191919` text, radius 8, padding 16px 28px, 17px/600, shadow `0 6px 18px rgba(246,208,10,0.22)`; hover → `#E8B000`
- **Ghost (on dark)**: transparent, 1.5px border `rgba(255,255,255,0.45)`, white text; hover → gold border + gold text
- **Pill link (path cards)**: 1.5px border `#191919`, radius 999, padding 10px 20px, 15px/600; hover → gold fill
- **Nav CTA**: gold, radius 6, padding 11px 18px, 13px/700, letter-spacing 0.5px

### Photo treatment (one recipe)
- Rounded 16–18px cards, `object-fit: cover`
- Text-over-photo: gradient scrim `linear-gradient(0deg, rgba(26,16,8,0.55), rgba(26,16,8,0.12))`
- Full-bleed background bands: cocoa overlay `rgba(26,16,8,0.72–0.92)` or navy `rgba(11,31,42,0.45–0.88)`; decorative textures at 0.14–0.55 opacity under overlays
- No cut-out floating people, no text baked into images

## Site Shell

### Navigation (all routes except Splash)
- Fixed top, 64px, `rgba(26,16,8,0.97)` + `backdrop-filter: blur(8px)`, hairline `0 1px 0 rgba(255,255,255,0.08)`; content below offset by a 64px spacer
- Left: **TEN HABITAT** wordmark → navigates to `#/home`
- Right (≥920px): links **Venture Habitat / Builders / Backers / Investors** (15px/500, `rgba(255,255,255,0.85)`; active = gold text + 3px gold bottom bar; hover gold) + gold **Join the Community** button → `#/join`
- <920px: ☰ button toggles a full-width cocoa dropdown (18px links + full-width Join button); ☰ becomes ✕ when open
- Every navigation scrolls to top

### Footer (all routes except Splash)
- Cocoa bg. Row 1: wordmark (→ home) + tagline "Built for builders. Backed for impact." | nav links + gold "Join the Community" link
- Row 2 (above hairline `rgba(255,255,255,0.12)`): "© 2026 TEN Habitat. All rights reserved." | "Venture Habitat — launching soon" (13px, `#998C80`)

### Routing
Hash-based in the prototype (`#/home` etc.) — use real routes in production (`/`, `/builders`, `/backers`, `/investors`, `/join`) with the splash as an entry experience (e.g. first-visit interstitial or `/welcome`). Wordmark always returns to the Venture Habitat homepage.

## Screens

### 00 · Splash
- Full viewport (`min-height: 100svh`), cocoa bg, full-bleed `hero-seedling-hd.jpg` (object-position ~center 62%), scrim `linear-gradient(92deg, rgba(26,16,8,0.9) 0%, rgba(26,16,8,0.66) 46%, rgba(26,16,8,0.1) 100%)`
- Top bar: wordmark (→ home) | "Skip intro →" link (14px/500, `rgba(255,255,255,0.7)`, hover gold) → home
- Center (wrapping row, gap `clamp(32px,5vw,72px)`): TEN Habitat tree logo PNG (height `clamp(140px, 24vh, 300px)`, drop-shadow) + text column (max 560px):
  - H1 white `clamp(29px,4.3vw,48px)/1.16` 700: "After nearly two decades of helping Caribbean businesses start and grow… " + gold span "we are nurturing something new."
  - Primary button **"Explore Venture Habitat →"** → home

### 01 · Venture Habitat (homepage)
1. **Hero** (cocoa, radial amber glow `radial-gradient(640px 420px at 88% 12%, rgba(232,176,0,0.13), transparent 70%)`; 2-col grid):
   - Eyebrow "Venture Habitat"; H1 orange uppercase "While everyone is hunting the next unicorn"; body white 19–24px with gold bold "the backbone of tomorrow's economy."; italic support line `rgba(255,255,255,0.72)`; buttons: primary "Join the Founding Community" (→ join) + ghost "Choose your path ↓" (smooth-scrolls to path cards)
   - Right: `vh-feature.png` photo card (max-height 540, object-position center 18%)
2. **Legacy** (paper, centered, max 1000px): H2 slate 600 with amber "TEN Habitat"; stats row (3 items, wrap): 500+ founders supported · US$6M+ raised for ventures · 1,000+ jobs created (hideable)
3. **Conversion-layer band** (full-bleed `vh-community-group.jpg` + cocoa overlay `linear-gradient(0deg, rgba(26,16,8,0.86), rgba(26,16,8,0.72))`, centered, max 900px): "Now comes the layer we were always missing." / H2 gold "Venture Habitat:" + white "the conversion layer" / "between entrepreneurial activity and investable businesses."
4. **Choose your path** (white; anchor target): eyebrow "Choose where you belong" + H2 "Build the future with us"; 3 cards (image 208px + body): **I'M BUILDING / I'M BACKING / I'M INVESTING** (H3 23px/700 uppercase), audience copy, pill links "Explore Builders/Backers/Investors →" → respective routes. Card images are the color-duotone photos (green/blue/red — baked into `path-*.jpg`)
5. **Vision** (paper + `vision-sky-bg.jpg` watercolor full-bleed, centered): slate H3 "The future won't be built by one extraordinary company." / orange H2 "It will be built by thousands of businesses given the opportunity to BECOME EXTRAORDINARY." / `hands-raised.png` (width min(620px, 92%)) bottom-center
6. **Launch CTA** (cocoa + `collage-warm-bg.png` at 0.14 opacity; 2-col): gold eyebrow "Launching soon"; H2 white "Venture Habitat launches soon."; body `rgba(255,255,255,0.78)`; primary "Join the Founding Community" → join | right: `vh-collage-launch.jpg` card

### 02 · Builders
1. **Hero** (white, centered): eyebrow "Are you a Builder?" + slate line "For founders, entrepreneurs and entrepreneur support organisations"; **triptych** — 3 photo cards (height `clamp(240px,30vw,340px)`, scrim + centered white phrase `clamp(26px,3.2vw,38px)/700` with text-shadow): `builder-3.jpg` "You didn't" / `builder-2.jpg` "start a business" / `builder-1.jpg` "to stay small"; below (centered, max 760px): "Neither did we build **Venture Habitat** to leave you where most systems do — full of potential, short on the structure, capital and momentum to scale."
2. **Navy band** (`network-navy-bg.jpg` at 0.55 + `linear-gradient(90deg, rgba(11,31,42,0.88), rgba(11,31,42,0.45))`): white 600 `clamp(24px,3vw,34px)` copy (max 22ch) with gold "Conversion Layer" span; gold uppercase 700 "That layer is what we're building."
3. **Value** (paper, 2-col): approved copy incl. bold "Not another workshop. Not another certificate." and "funded, growing and connected." | `builder-value-hd.jpg` card (object-position center 25%)
4. **Founding CTA** (cocoa + `builder-cta-bg.jpg` at 0.4 + `linear-gradient(90deg, rgba(26,16,8,0.92) 20%, rgba(26,16,8,0.55))`): H2 white "We're opening this to a founding community first — for the builders who want to shape it, not just use it." / "Be first in line when the doors open." / primary **"Join as a Founding Builder"** → join with role=Builder prefilled

### 03 · Backers
1. **Hero** (paper, 2-col): eyebrow "Are you a Backer?" + "For governments, development institutions, credit unions and corporates"; **stat card** (white, radius 16, padding `clamp(24px,4vw,36px)`): "Across the Caribbean, more than" / US$ **350** million (slate) / "was invested in entrepreneurship support between 2020 and 2025." / hairline / bold "Yet roughly 70% of MSMEs remain undercapitalised, and fewer than 3% export directly." / closer 700 "High activity, low conversion." (numeric part hideable) | right: `path-backing.jpg` card
2. **Navy band**: H2 white with gold "Venture Habitat" — "…missing conversion layer that turns entrepreneurial activity into decision-grade intelligence — so that capital can be deployed with confidence."; "It doesn't replace what has already been built. It makes it work harder:"; 3 numbered glass cards (`rgba(255,255,255,0.06)` bg, `rgba(255,255,255,0.16)` border, gold 01/02/03): lendable borrowers / underwriting signal / patient capital (exact copy in prototype)
3. **Partner CTA** (white, 2-col): H2 with amber "institutional partners"; "If you are an institutional partner interested in exploring early collaboration —"; primary **"Let's have a chat"** → join with role=Backer | right: `backer-collab.png` card

### 04 · Investors
1. **Hero** (paper, 2-col): eyebrow "Are you investing?" + "For the diaspora, investors and capital partners"; H1 "You've always sent something home."; slate H2 "What if it could become something you own a share of?"; diaspora body copy + bold closer "…and we're building the system to change it." | right: `investor-kitchen-couple.jpg` card
2. **Value** (white, 2-col, image left): `vh-community-group.jpg` card | copy with bold "Venture Habitat" and closer "Support today. Ownership tomorrow." + amber "Both, at once."
3. **Founding CTA** (cocoa, 2-col): H2 white with gold "diaspora partners"; "Be first to see how participation becomes ownership."; primary **"Join as an Investor"** → join with role=Investor | right: `investor-cta.png` card

### 05 · Join
2-col (form stacks below copy on small screens):
- Left: eyebrow "Founding community"; H1 "Join the Founding Community"; approved body copy; slate "Built for builders. Backed for impact."
- Right **form card** (white, radius 16): Full name (text) / Email (email) / "I'm joining as" segmented control Builder | Backer | Investor (selected = gold bg + gold border + 700; unselected = white + `#D9E0E3` border) / Country or territory (text) / full-width primary submit "Join the Founding Community"
- Role pre-fills from the CTA that led here (Founding Builder → Builder, etc.)
- Validation: name required, email must contain "@" → error line `#B3541E` "Please add your name and a valid email address."
- Success state replaces form: gold ✓ circle (64px), "You're on the list.", personalized line ("Thanks, {first name} — you've joined the founding community as a founding {role}. We'll be in touch as Venture Habitat takes shape.")
- Production: wire submit to the real endpoint/CRM; keep the inline success state

## Interactions & Behavior
- Navigation: client-side routes; scroll to top on route change; active nav state per route
- Wordmark (nav, footer, splash) → homepage
- "Choose your path ↓" smooth-scrolls to the path-cards section (offset for 64px fixed nav)
- Hovers: primary buttons darken to `#E8B000`; ghost buttons/nav links go gold; pill links fill gold; inputs focus-border `#E8B000`
- Mobile menu closes on any navigation
- No other animations required; keep transitions subtle if added (150–200ms ease)

## Responsive Behavior
Fluid, content-driven (no hard-coded page variants):
- **Laptop ≥ ~1024px**: two-column heroes/splits, full nav
- **Tablet ~768px**: heroes and 2-col sections stack (text first, image below — grid `repeat(auto-fit, minmax(min(420px,100%),1fr))`); Builders triptych stays 3-across (min 210px); path cards 2-up; hamburger below **920px**
- **Phone ~390px**: single column throughout; fluid type via clamp(); full-width buttons/cards; splash uses `100svh` and smaller logo (`clamp(140px,24vh,300px)`)
- All hit targets ≥ 44px

## State Management
- `route` (current page), `menuOpen` (mobile nav), `narrow` (viewport < 920px)
- Join form: `{ name, email, role, country }`, `submitted`, `error`; role settable from CTAs
- Optional flags: `startOnSplash` (skip splash), `showStats` (hide unverified figures)

## Assets (`assets/`)
All photography is from the client's Figma source file (page 06 — Source Photos). Filenames describe usage:
| File | Used in |
|---|---|
| `ten-habitat-logo.png` | Splash (white tree logo) |
| `hero-seedling-hd.jpg` | Splash background |
| `vh-feature.png` | Home hero photo card |
| `vh-community-group.jpg` | Home conversion band bg; Investors value card |
| `path-building.jpg` / `path-backing.jpg` / `path-investing.jpg` | Path cards (green/blue/red duotone); `path-backing` also Backers hero |
| `hands-raised.png` | Home vision |
| `vision-sky-bg.jpg` | Home vision background |
| `vh-collage-launch.jpg` | Home launch CTA card |
| `collage-warm-bg.png` | Home launch CTA texture (0.14 opacity) |
| `builder-1/2/3.jpg` | Builders triptych |
| `network-navy-bg.jpg` | Builders + Backers navy bands |
| `builder-value-hd.jpg` | Builders value card |
| `builder-cta-bg.jpg` | Builders CTA background |
| `backer-collab.png` | Backers partner CTA card |
| `investor-kitchen-couple.jpg` | Investors hero card |
| `investor-cta.png` | Investors CTA card |

Font: Jost via Google Fonts (`family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400`) — self-host for production.

## Files
- `TEN Habitat Website.dc.html` — the full prototype (markup + logic; open in a browser to interact)
- `assets/` — all images listed above
- `screenshots/` — desktop reference captures, one per section, named `<page>-<order>-<section>.png` (`splash.png`, `home-1-hero.png` … `home-6-launch-cta.png`, `builders-1…4`, `backers-1…3`, `investors-1…3`, `join-1…2`). Use them for quick visual reference; the prototype remains the precise source for values.
