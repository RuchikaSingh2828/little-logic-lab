# Picture Sudoku Game Screen UI Refresh

Date: 2026-07-22  
Status: Approved for planning  
Reference: ChatGPT mockup (5×5 Picture Sudoku) attached in session

## Goal

Restyle the in-game Sudoku screen (`SudokuScreen` and related components) to match the provided mockup: compact chrome, single-line status, grouped piece tray with counts, and Hint / Reset / Next actions.

## Scope

In scope:

1. Compact header (back, title, sound)
2. Single-line status: grid size pill · difficulty + stars · progress `filled / total`
3. Soft green rounded grid frame; clearer dashed empty cells
4. Grouped piece tray: one card per remaining symbol + count badge; hide when count is 0
5. Bottom action row: Hint (with remaining-empty badge), Reset, Next
6. Next starts a **new puzzle** of the same size/difficulty (existing `newPuzzle`)

Out of scope:

- New puzzle engine / difficulty rules
- Replacing picture artwork themes
- Home page / branding changes
- Changing drag-and-drop / tap-to-place interaction model (keep both)

## Architecture

```
useSudokuGame
  buildTrayGrouped(puzzle, board) → { symbol, remaining }[]
SudokuScreen
  header (compact)
  GameStatusBar (single row; no Hint/Reset here)
  PuzzleGrid / GridCell (visual polish)
  PieceTray (grouped + badges)
  GameActions / footer actions (Hint, Reset, Next)
```

## Components

| File | Change |
|------|--------|
| `useSudokuGame.ts` | Expose grouped tray (`symbol` + `remaining`) instead of flat duplicate list; keep placement/drag IDs stable |
| `PieceTray.tsx` | Render unique symbols with green count badge; remove when remaining = 0; update copy to match mockup |
| `GameStatusBar.tsx` | Single horizontal status line only (size, difficulty+stars, score); move actions out |
| `GameActions.tsx` or inline in `SudokuScreen` | Compact Hint / Reset / Next row matching mockup |
| `SudokuScreen.tsx` | Wire layout: status → grid → tray → actions; wire Next → `newPuzzle` |
| `PuzzleGrid.tsx` / `GridCell.tsx` | Visual polish toward mockup (rounded frame, dashed empties) |
| Tests | Update/add coverage for grouped tray remaining counts |

## Tray behavior

- Count = how many times that symbol still needs to be placed in empty cells (same logic as today’s flat tray, but aggregated).
- Selecting / dragging uses the symbol type (not a specific duplicate instance).
- When remaining hits 0, that symbol disappears from the tray.
- Wrong placements still shake / feedback; do not decrement remaining until a valid place.

## Next button

- Always available (option A).
- Calls existing `newPuzzle()` → same mode/size/difficulty, fresh board.
- Optional confirm dialog: **not** required for v1 (match mockup’s immediate Next).

## Success criteria

- Status line is one row on mobile and desktop
- Hint / Reset / Next sit below the tray, smaller than today’s chrome
- Tray shows one of each remaining type with a numeric badge
- Placing the last instance of a type removes it from the tray
- Next loads a new puzzle without changing size/difficulty
- Existing unit tests pass; tray grouping covered

## Risks / notes

- DnD currently uses `tray-piece-${index}`; switch to symbol-based ids carefully so drag/drop still works.
- Shape and number modes share the same screen — apply the same chrome/tray pattern for consistency.
