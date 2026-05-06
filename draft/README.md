# Handoff: Backroom Archive — Web

## Overview
A two-stage password-gated landing experience for "Backroom Archive": a brand presenting itself as a curated, members-only catalogue of rare/forgotten items. Stage 1 is a cinematic landing page with a CTA. Stage 2 is the archive grid (currently placeholder cards). Entering the correct password fades the landing out and fades the archive grid in for a "luxurious" reveal.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look, motion and behaviour. They are **not production code to copy directly**. The task is to **recreate this design in the target codebase's existing environment** (React, Next.js, Vue, SvelteKit, etc.) using its established patterns, component primitives, routing, and form/auth conventions. If no environment exists yet, choose the most appropriate framework for the project (Next.js is a sensible default for this kind of marketing/gated site) and implement the design there.

The password gate in the prototype is **client-side only and not secure** — replace with a proper server-side check (route handler / API endpoint comparing against an env-var secret, signed cookie or short-lived JWT for session, etc.) before shipping.

## Fidelity
**High-fidelity (hifi).** The HTML is a pixel-level reference for colour, type, spacing, motion timing and component anatomy. Recreate it pixel-perfectly using the codebase's existing libraries and patterns.

## Screens / Views

### 1. Landing (`#landing`)
**Purpose:** Greet the visitor and offer the single CTA that opens the password gate.

**Layout:**
- Full-viewport (`100vh`) section, content centred via CSS grid `place-items: center`.
- Inner container max-width `680px` (≈92vw on small screens) shifted left by `translateX(-8%)` on viewports ≥ 820px so it sits clear of the door visual on the right of the background image. The shift is removed below 820px.
- Background is the door photograph (`assets/backroom-archive-web-bg.png`), pinned full-viewport behind everything (see "Background" below).

**Components:**
- **Logo** (`assets/backroom-archive-logo.png`) — rendered as `<img>`, width `clamp(280px, 38vw, 480px)`, drop-shadow `drop-shadow(0 2px 18px rgba(0,0,0,0.5))`. Centred above tagline.
- **Tagline** — uppercase mono, two-tone:
  - Text: `Rare finds. Forgotten icons. KEPT OFF THE MAP.`
  - First two phrases use `--cream-dim` (`#b8ad8e`); "KEPT OFF THE MAP." uses `--gold` (`#d6a435`).
  - Font: JetBrains Mono, size `clamp(13px, 1.25vw, 15px)`, letter-spacing `0.32em`, `text-transform: uppercase`.
  - Margin-top `38px` from logo.
- **CTA Button** (`#open-pw`):
  - Label: `Access the Archive  ›` (the `›` chevron is gold).
  - Transparent background, 1px border `rgba(233,220,184,0.22)`, padding `18px 34px`, border-radius `2px`.
  - Font: JetBrains Mono, `clamp(13px, 1.15vw, 15px)`, letter-spacing `0.34em`, uppercase.
  - Hover: border + text shift to gold `#d6a435`, background `rgba(214,164,53,0.04)`. 220ms ease.
  - Active: `transform: translateY(1px)`.

### 2. Password Modal (`#scrim`)
**Purpose:** Validate the access key.

**Layout:**
- Full-viewport scrim, `rgba(0,0,0,0.55)` + `backdrop-filter: blur(6px)`.
- Centred modal panel, `min(440px, 92vw)` wide, padding `36px 32px 30px`, dark gradient `linear-gradient(180deg, rgba(14,12,10,0.96), rgba(8,7,6,0.96))`, 1px cream border at 22% opacity, border-radius `3px`, shadow `0 30px 80px rgba(0,0,0,0.6)`.
- Entry: scrim fades in 320ms; modal scales from `translateY(8px) scale(0.985)` to identity over 360ms `cubic-bezier(.2,.7,.2,1)`.

**Components:**
- **Title:** `RESTRICTED ACCESS` — Oswald 600, 22px, letter-spacing `0.18em`, uppercase, cream.
- **Hint:** `ENTER THE EIGHT-DIGIT KEY` — JetBrains Mono, 11px, letter-spacing `0.28em`, dim cream.
- **Input** (`#pw`): type `password`, `inputmode="numeric"`, `maxlength="8"`, placeholder `• • • • • • • •`. Centred, 18px, letter-spacing `0.5em`. Field has 1px border that turns gold on focus, red `#c14a3a` on error.
- **Error message:** `KEY NOT RECOGNISED` — 10.5px, color `#d36b59`, fades in.
- **Buttons:** `Cancel` (ghost, dim cream → cream on hover) and `Enter ›` (primary, gold border + gold text).
- **Shake animation on error:** 380ms keyframe shake (`-6px → +6px → -3px → +3px → 0`).

### 3. Unlock Transition
**Sequence on correct password (`22446688`):**
1. **Warm flash overlay** (`#flash`): radial gradient `rgba(214,164,53,0.18)` at centre, fades on for 700ms then off.
2. **Close password modal** immediately.
3. **Fade landing out** at +120ms — opacity `1 → 0`, filter `blur(0) → blur(4px)`, 1100ms ease, pointer-events disabled.
4. **Fade archive in** at +700ms — opacity `0 → 1`, 1200ms ease (with 200ms internal delay), `aria-hidden="false"`.
5. Cards stagger in via `cardIn` keyframe (translateY 14→0 + opacity 0→1, 900ms `cubic-bezier(.2,.7,.2,1)`), delays 700ms / 800ms / 900ms / 1000ms / 1100ms / 1200ms / 1300ms / 1400ms for entries 1–8.
6. Landing element gets `display: none` after 1200ms to remove from a11y tree.

### 4. Archive (`#archive`)
**Purpose:** Browse archived projects. Currently all entries are placeholder "coming soon".

**Layout:**
- Padding `64px 8vw 120px`. Same fixed background as landing.
- **Header**: flex row, `justify-content: space-between`, `align-items: flex-end`, `border-bottom: 1px solid rgba(233,220,184,0.10)`, `padding-bottom: 22px`, `margin-bottom: 56px`.
  - Left: Logo image (height 44px).
  - Right: Two stacked meta lines, 10.5px mono, letter-spacing `0.32em`, uppercase, dim cream:
    - `Vault // Authenticated` (the word "Authenticated" is gold).
    - `Index 00 // Drawer A`.
- **Title block** (margin below header):
  - `<h1>` "The Index" — Oswald 500, `clamp(28px, 3.4vw, 44px)`, letter-spacing `0.06em`.
  - Sub: `A curated catalogue of EIGHT reserved entries · Updated quarterly` — 12px mono, uppercase, dim cream; "EIGHT" is gold.
- **Grid** (`#grid`): CSS grid, `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`, `gap: 22px`.
- **Footer**: top-border `1px solid rgba(233,220,184,0.10)`, `margin-top: 80px`, `padding-top: 22px`, flex space-between, 10.5px uppercase. Left: `© Backroom Archive — Off the map`. Right: `Lock the vault ✕` link (returns to landing).

**Card Component (placeholder "coming soon" variant):**
- Square (`aspect-ratio: 1 / 1`), 1px cream-22% border, dark vertical gradient background with a 135° diagonal stripe pattern on top (`repeating-linear-gradient(135deg, rgba(233,220,184,0.025) 0 8px, transparent 8px 16px)`).
- Padding `22px`, flex column, `justify-content: space-between`.
- **Corner crosshairs**: four 14×14px SVG `┐` strokes in each corner, 8px from edges, cream at 35% opacity. Turn gold + 90% opacity on card hover.
- **Top-left:**
  - `№ 001` index — 10px, letter-spacing `0.34em`, dim cream.
  - `COMING SOON` badge — 9.5px uppercase, 1px cream border, padding `4px 8px`, dim cream.
- **Bottom:**
  - Title (Oswald 600, 22px, letter-spacing `0.04em`, uppercase) e.g. `CATALOGUE I`. Dim cream in coming-soon variant.
  - Description line — 11px uppercase mono, dim cream, e.g. `IMPRINT STUDY · 1972`.
  - Footer row: `LOCKED ENTRY` left, `—` right, 10.5px uppercase dim cream.
- Hover: border to gold-55%, background slightly lighter; CTA text turns gold.
- Click opens **Project Modal** (placeholder).

**Active card variant (when real projects added):** drop the `.coming` class and the diagonal stripes / "Locked entry" text. Make the title cream, replace the badge with whatever metadata is appropriate, and link to the project route.

### 5. Project Modal (`#proj-scrim`)
Placeholder shown when any card is clicked while in "coming soon" state.
- Same scrim style as password modal.
- Panel `min(520px, 92vw)`, padding `40px 36px 32px`, centred.
- `COMING SOON` badge (gold border, gold text).
- Title (Oswald 600, 26px, uppercase) — set to clicked card's title.
- Body copy: `This entry is still being catalogued. Check back soon — the vault is updated quarterly.`
- `Close` button.

## Background
The door photograph must always show the door on the right edge of the viewport.

- Element: a fixed full-viewport `<div class="bg">` with `background-image`, `background-position: right center`, `background-size: cover`, `background-color: #000`.
- **Wide viewports (aspect-ratio > 3/2):** `background-size: cover` with right-centre anchor.
- **Portrait/narrow (max-aspect-ratio: 3/2):** switch to `background-size: auto 100%` so the image scales by height — keeps the entire door in view, lets black fill the left side rather than cropping the door off the right.
- **Phones (max-width: 640px):** `background-size: auto 100vh; background-position: right center;`.

A subtle radial-grain overlay sits above the background at 1.8% white opacity, `mix-blend-mode: overlay`, 3px tile, to keep the image filmic.

## Interactions & Behavior

- **Open password modal:** click `#open-pw` → `.scrim` gets `.show` class, input auto-focused after 60ms.
- **Close modal:** Cancel button, click on backdrop, or `Esc` key.
- **Submit:** Enter key or `Enter ›` button. Compares against constant `PASSWORD = "22446688"`.
  - **Wrong:** add `.error` class to input field (border red + shake animation), show `.err` message, `pw.select()` to highlight existing value.
  - **Correct:** call `unlock()` (warm flash → close modal → fade landing → reveal archive → stagger cards in).
- **Lock the vault** (footer link): reverses the transition — removes `.show` from archive, restores `landing.style.display`, removes `.fade-out` on the next frame.
- **Card click:** opens project modal with that card's title.
- **Project modal close:** Close button or click on backdrop.

## State Management
Minimal local state — fits naturally into a few React `useState`s or a tiny store:

- `passwordModalOpen: boolean`
- `passwordValue: string`
- `passwordError: boolean`
- `unlocked: boolean` (drives landing fade-out + archive fade-in)
- `selectedProject: { title: string } | null` (drives project modal)

For server-validated auth: replace the constant compare with a POST to a route handler. On success the server sets a session cookie and the client sets `unlocked = true` to play the transition; subsequent visits with a valid cookie should land directly on the archive (skip the transition or play a shortened version).

## Design Tokens

### Colors
| Token | Hex / value | Use |
|---|---|---|
| `--cream` | `#e9dcb8` | primary text, logo, borders (full opacity) |
| `--cream-dim` | `#b8ad8e` | secondary text, meta, dim labels |
| `--gold` | `#d6a435` | accent ("KEPT OFF THE MAP."), focus borders, hover, active states |
| `--gold-soft` | `#c39424` | reserved for darker gold accents |
| `--ink` | `#060606` | dark fills |
| `--line` | `rgba(233,220,184,0.22)` | default borders |
| `--line-soft` | `rgba(233,220,184,0.10)` | hairline dividers |
| Error red (border) | `#c14a3a` | password field error border |
| Error red (text) | `#d36b59` | error message text |
| Background fill | `#000000` | letterboxing around bg image |

### Typography
- **Display / titles:** Oswald — weights 500, 600, 700.
- **Body / mono:** JetBrains Mono — weights 400, 500, 600.
- Both loaded from Google Fonts.
- Standard letter-spacings used: `0.04em` (large titles), `0.06em` (display), `0.18em–0.34em` (uppercase labels), `0.5em` (password input).

### Spacing
- Section padding (archive): `64px 8vw 120px`.
- Landing padding: `6vh 6vw`.
- Grid gap: `22px`.
- Card padding: `22px`.
- Modal padding: `36px 32px 30px` (password) / `40px 36px 32px` (project).

### Border radius
- CTA button: `2px`. Modal: `3px`. Cards: `0` (sharp corners by intent).

### Shadows
- Logo: `drop-shadow(0 2px 18px rgba(0,0,0,0.5))`.
- Modal: `0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(0,0,0,0.4)`.

### Motion
- CTA hover: 220ms ease.
- Modal scrim: 320ms ease (opacity); panel: 360ms `cubic-bezier(.2,.7,.2,1)` (transform).
- Error shake: 380ms ease, 5 keyframes.
- Landing fade-out: 1100ms ease (opacity + blur).
- Archive fade-in: 1200ms ease, 200ms delay.
- Card stagger: `cardIn` 900ms `cubic-bezier(.2,.7,.2,1)`, 100ms increments starting at 700ms.
- Warm flash: 700ms ease.

## Entry Pages

Cards on the archive grid that have `live: true` in the `ENTRIES` array link to a dedicated entry page rather than opening the placeholder modal. The card renders as an anchor with an "Open entry" gold badge and "View dossier ›" CTA. All other cards remain in their `coming` state.

### № 001 — Tape//Lock (`Tape Lock.html`)
A reference implementation of an entry page. Use the same shell for future entries — only swap the content.

**Page shell:**
- Same fixed background as landing, but at `opacity: 0.45` with a top-to-bottom black veil (`linear-gradient(180deg, rgba(0,0,0,0.55) → rgba(0,0,0,0.92))`) over it so type stays legible.
- Sections separated by `1px` cream-10% top borders, `padding: 96px 6vw`.
- Each top-level section animates in with a staggered `rise` keyframe (translateY 8→0, opacity 0→1, 800ms `cubic-bezier(.2,.7,.2,1)`, 100ms increments).

**Sections, in order:**
1. **Topbar** — breadcrumbs (`Backroom Archive / The Index / № 001`) and meta (`Vault // Authenticated`).
2. **Hero** — two-column grid (1.2fr / 1fr; collapses below 1000px). Left: framed product image (`tape-lock-hero.png`) with corner crosshairs. Right: index line (gold), Oswald 600 title `TAPE//LOCK` (`clamp(48px, 7vw, 96px)`, the `//` is gold), tagline `SECURE BY RITUAL`, lead paragraph, pill row (one gold-bordered, three default).
3. **Dossier** — section label (gold rule + uppercase) + h2 + two-column key/value table. Each row is `220px / 1fr` with `1px line-soft` dividers. Includes Category, Status, Form factor, Materials, Mechanism, Connectivity, Encryption, Expandability, Price band, Nostalgia anchor.
4. **The Ritual** — three-step grid (`Insert · Rotate · Access`). Each step: Oswald 700 56px gold numeral, uppercase title, body copy.
5. **Why it matters** — 6 feature tiles in `auto-fit minmax(240px, 1fr)` grid with 1px gap between cells (achieved by `gap: 1px; background: var(--line-soft)`). Each tile has a 28px gold inline-SVG icon, Oswald 600 14px title, dim-cream body.
6. **Brand sheet** — full-bleed `tape-lock-master.png` framed in a 1px cream-22% border, `background: #050505`.
7. **Pricing & release** — two-column (1.2fr / 1fr). Left: copy. Right: framed price box with Oswald 700 64px price (`€150 – €220`, the dash is gold) + uppercase note.
8. **Footer** — copyright + outlined "‹ Return to the index" link to `Backroom Archive.html`.

**Tokens reused:** identical to landing/archive — same `--cream`, `--cream-dim`, `--gold`, `--line`, `--line-soft`, same Oswald + JetBrains Mono pairing.

**To add another live entry:**
1. Duplicate `Tape Lock.html` and rewrite content (hero image, title, dossier rows, ritual, features, master sheet, pricing).
2. In `Backroom Archive.html`'s `ENTRIES` array, set `live: true` and `href: "<new file>.html"` on the corresponding card.
3. The grid renderer will switch that card from `<button class="card coming">` (opens modal) to `<a class="card">` with the gold "Open entry" badge.

## Assets
All in `assets/`:
- `backroom-archive-web-bg.png` — the door photograph background. User-supplied.
- `backroom-archive-logo.png` — wordmark + glyph logo. User-supplied.
- `tape-lock-hero.png` — Tape//Lock product hero photograph (cassette in dock). User-supplied.
- `tape-lock-master.png` — Tape//Lock master brand sheet (logo / icon system / product / apparel / urban campaign / app / social). User-supplied.

## Files
- `Backroom Archive.html` — landing + password gate + archive grid. Single self-contained HTML.
  - `:root` — design tokens.
  - `.bg` — responsive background rules.
  - `.landing` / `.archive` sections — the two scenes.
  - `<script>` — modal open/close, submit, `unlock()`, lock, `ENTRIES` array (each card's `live` flag controls whether it links out or opens the placeholder modal), card construction, project modal.
- `Tape Lock.html` — reference entry page (№ 001). Single self-contained HTML; same token vocabulary.
