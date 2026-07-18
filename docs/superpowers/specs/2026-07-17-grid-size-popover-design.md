# Grid size popover & open navigation — Design Spec

**Date:** 2026-07-17  
**Status:** Approved for planning  
**App:** Sudokid (`sudokid/`)

## Problem

1. Expanding **More grid sizes** on an age challenge card uses an in-flow `<details>` element. Cards share a CSS grid row with `h-full`, so one open panel stretches sibling cards.
2. Larger grids (4×4, 5×5) are gated by progressive unlock. Users should be able to open any size and difficulty freely.

## Goals

- Keep challenge card heights stable when browsing alternate grid sizes.
- Let users navigate to any `{mode}/{size}/{difficulty}` game from the home cards.
- Remove grid-size unlock as a product constraint.

## Non-goals

- Changing puzzle generation, validators, or route URL shape.
- Redesigning primary difficulty pills or “Start Playing.”
- Adding a separate size-picker page or wizard.
- Reintroducing 2×2 playable routes.

## Design

### Behavior

- **More grid sizes** remains a text control under **Start Playing** on each active age card.
- Click/tap opens a **floating popover** anchored to that control (not in-flow expand).
- Panel lists **3×3, 4×4, 5×5**, each with **Easy / Medium / Hard** links.
- Links go to `/sudoku/{mode}/{size}/{difficulty}` (`mode` from the age card: picture, shape, or number).
- Closing: outside click, Escape, or choosing a link.
- Only one popover open at a time across cards.
- Card height does not change when the popover opens; sibling cards stay the same size.

### Layout & look

- Popover: white surface, rounded (~12–16px), light border, soft shadow — consistent with existing home cards.
- Each row: grid label on the left (`3×3 Grid`, etc.); three compact difficulty chips on the right.
- Trigger keeps the current underline-style link treatment; optional open-state color.
- On narrow screens: popover anchors to the trigger and spans the card width (no separate bottom sheet for v1).

### Unlock & navigation

- **No grid locks.** All sizes 3, 4, and 5 are available immediately for every mode.
- Every difficulty chip in the popover is clickable.
- Remove runtime gates that redirect away from “locked” sizes.
- Remove unlock celebration copy that implies a newly unlocked grid tier.
- Primary difficulty pills and **Start Playing** stay on the card’s default grid only:
  - Picture / shape → default **3×3**
  - Number → default **4×4**

### Implementation scope

| Area | Change |
|------|--------|
| `AgeChallengeCard.tsx` | Replace `<details>` with popover; wire size × difficulty links |
| Popover UI | Use Base UI popover (or equivalent local wrapper) so content is portaled/overlaid |
| `SudokuScreen.tsx` | Remove `isGridSizeUnlocked` redirect to `/` |
| Completion / progress | Stop treating 4×4/5×5 as unlock rewards in UI (no lock messaging) |
| Tests | Update/remove unlock-progression assertions that contradict open access |

Leave unchanged: generators, `difficultyConfig`, App Router pages under `/sudoku/{mode}/[size]/[difficulty]`, primary pills, Start Playing defaults.

### Error / edge cases

- Invalid URL params continue to be handled by existing route validation.
- If progress storage still records solves per size, that is fine for stats; it must not gate navigation.

## Success criteria

- Opening **More grid sizes** on one card does not change the height of other cards.
- From any age card, user can reach 3×3, 4×4, and 5×5 at Easy, Medium, and Hard.
- Visiting `/sudoku/picture/5/hard` (and equivalents) loads the game with no home redirect for unlock.
- Primary card actions still start the default grid as today.
