# Sudokid Design System

> Living reference for brand identity, UI components, and developer tokens.
> Add ideas here immediately — never rely on memory or chat history.

**Brand reference sheet:** [`docs/design/brand-reference.png`](design/brand-reference.png)

Use this image as the source for logo, icon, favicon, color, and typography decisions.

---

## Approach

Rather than a one-off logo, Sudokid uses a **cohesive design system** so every new screen feels like part of the same product. The system is built to be easy to implement in React/Next.js.

---

## 1. Brand Identity

### Primary logo

- **Icon:** 3×3 Sudoku grid with rounded corners; center cell filled with Primary Green; numbers 1, 2, 3 in remaining cells
- **Wordmark:** `sudo` in Dark Text + `kid` in Primary Green (lowercase, rounded sans-serif)
- **Tagline:** *Every puzzle makes you think.*

### Logo lockups

| Variant | Use |
|---------|-----|
| Horizontal (primary) | Nav, marketing, default |
| Stacked | Square spaces, app splash |
| Icon + wordmark | Compact header |
| Icon only | Favicon, app icon, small UI |

### App icons

- **Light:** icon on Cream background
- **Dark:** icon on Dark Text background

### Color palette

| Token | Hex | Use |
|-------|-----|-----|
| Primary Green | `#65B741` | Brand accent, CTAs, `kid` in wordmark |
| Light Green | `#A8D48A` | Soft fills, success states |
| Accent Orange | `#FFB84D` | Highlights, badges, warmth |
| Soft Blue | `#4DA3FF` | Links, info, secondary accent |
| Cream | `#FFF8EC` | Page background |
| Dark Text | `#2D3748` | Headings, body, borders |
| Gray | `#6B7280` | Secondary text, captions |

### Typography

| Role | Font |
|------|------|
| Headings | **Plus Jakarta Sans** |
| Body | **Inter** |

### Design principles

- Rounded, friendly, minimal — no sharp or aggressive UI
- Calm learning over screen-time maximization
- Large touch targets for children; clear hierarchy for parents
- No gamification pressure (no streaks, coins, XP, leaderboards)
- Short meaningful sessions (5–10 minutes)
- Montessori-inspired: soft colors, gentle feedback, healthy stopping points

### Brand values (from reference sheet)

| Value | Icon style | Color |
|-------|------------|-------|
| Logical Thinking | Brain | Green |
| Focus & Patience | Target | Orange |
| Growth | Sprout | Blue |
| Safe & Trustworthy | Shield | Purple |

### Logo usage rules

**Do:** use approved lockups with clear space; keep icon and wordmark proportions

**Don't:** stretch, rotate, change wordmark colors, or remove the icon from primary lockups

### Asset sizes (when exporting from reference)

| Size | Format | Use |
|------|--------|-----|
| 512×512 | PNG / SVG | App icon, OG image |
| 192×192 | PNG | PWA / Android |
| 32×32 | PNG | Favicon |
| 16×16 | PNG | Browser tab |

---

## 2. Component Library

Reusable UI building blocks to design and implement consistently.

| Component | Notes |
|-----------|-------|
| **Navigation** | Top nav (desktop), bottom nav (mobile), profile menu |
| **Buttons** | Primary, secondary, ghost; rounded; calm hover states |
| **Cards** | Age-group cards, info cards, challenge cards |
| **Puzzle cards** | Grid cells, draggable pieces, picture/number tiles |
| **Parent dashboard** | Calm, readable; shield/trust cues |
| **Progress widgets** | Charts, streak-free completion indicators |
| **Empty states** | Friendly illustration + single CTA |
| **Dialogs** | Confirmations, hints, session complete |
| **Forms** | Parent settings, profile; large inputs |

**Icon style:** rounded, friendly, minimal line icons (see reference sheet for examples: lightbulb, book, trophy, chart, people, lock).

---

## 3. Landing Page

- Optimized for **1440px desktop**
- **First playable content visible immediately** — no long scroll before puzzles
- Hero + age-group challenge cards above the fold
- Clear path to start playing (Picture Sudoku for ages 3–4 live first)

---

## 4. In-App Pages

| Page | Status | Purpose |
|------|--------|---------|
| **Home** | 🟢 Live (prototype) | Hero, challenge picker, why-logic banner |
| **Learn** | ⚪ Planned | Guided learning / tutorials |
| **Puzzle screen** | 🟢 Live | Sudoku play (picture, shape, number modes) |
| **Hint system** | ⚪ Planned | Gentle nudges without giving away answers |
| **Progress** | 🟡 Stub (`/coming-soon`) | Session history, skills growth |
| **Parent Zone** | 🟢 Live (basic) | Parent info and controls |
| **Profile** | 🟡 Stub (`/coming-soon`) | Child profile, avatar |
| **Settings** | ⚪ Planned | App preferences, parent gate |

---

## 5. Developer Design System

Reusable tokens for React/Next.js + Tailwind implementation.

### Spacing (8px grid)

| Token | Value |
|-------|-------|
| `space-1` | 8px |
| `space-2` | 16px |
| `space-3` | 24px |
| `space-6` | 48px |

Use multiples of 8px for padding, margin, and gap.

### Border radius

| Token | Value |
|-------|-------|
| `radius-default` | 18px |

Apply to buttons, cards, inputs, and logo container.

### Shadow scale

| Token | Value |
|-------|-------|
| `shadow-sm` | `0px 2px 8px rgba(0, 0, 0, 0.06)` |
| `shadow-md` | `0px 8px 24px rgba(0, 0, 0, 0.08)` |

### Color variables

Map palette hex values to CSS custom properties / Tailwind theme extension (see §1 Color palette).

Suggested naming:

```css
--color-primary: #65B741;
--color-primary-light: #A8D48A;
--color-accent-orange: #FFB84D;
--color-accent-blue: #4DA3FF;
--color-cream: #FFF8EC;
--color-text: #2D3748;
--color-text-muted: #6B7280;
```

### Typography scale

| Role | Font | Suggested sizes |
|------|------|-----------------|
| Display | Plus Jakarta Sans | 32–48px |
| H1 | Plus Jakarta Sans | 24–32px |
| H2 | Plus Jakarta Sans | 20–24px |
| Body | Inter | 14–16px |
| Caption | Inter | 12–14px |

---

## Implementation checklist (future)

- [ ] Export logo/icon assets from brand reference (SVG + PNG sizes)
- [ ] Add favicon and app icons to `public/`
- [ ] Replace placeholder `SudokuLogo` with brand icon
- [ ] Add Plus Jakarta Sans + Inter to `app/layout.tsx`
- [ ] Define Tailwind/CSS tokens from palette above
- [ ] Rename remaining “Little Logic Lab” strings to Sudokid (if any)
- [ ] Build component library on tokens
- [ ] Refine landing page for 1440px above-the-fold play

---

## Related docs

- [Game Ideas Backlog](GameIdeas.md) — planned activities
- [Picture Sudoku Guide](picture-sudoku.md) — puzzle engine and themes
- [Deploy runbook](deploy-sudokid-in.md) — production hosting
