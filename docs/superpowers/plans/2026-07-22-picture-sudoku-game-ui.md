# Picture Sudoku Game UI Refresh — Implementation Plan

> **For agentic workers:** Use executing-plans or implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Match the Picture Sudoku mockup — compact chrome, single-line status, grouped tray with counts, Hint/Reset/Next.

**Architecture:** Expose `trayGroups: { symbol, remaining }[]` from `useSudokuGame`; restyle status/actions/tray/grid; Next → `newPuzzle()`.

**Tech Stack:** Next.js, React, @dnd-kit, Lucide, Vitest

**Spec:** `docs/superpowers/specs/2026-07-22-picture-sudoku-game-ui-design.md`

## File map

| File | Responsibility |
|------|----------------|
| `hooks/useSudokuGame.ts` | `buildTrayGroups` + export `trayGroups` (keep `tray` flat for compat or derive) |
| `components/PieceTray.tsx` | Unique pieces + count badges |
| `components/GameStatusBar.tsx` | Single-line status only |
| `components/GameActions.tsx` | Hint / Reset / Next compact row |
| `components/SudokuScreen.tsx` | Compact header + wire layout |
| `components/PuzzleGrid.tsx` / `GridCell.tsx` | Visual polish |
| `__tests__/trayGroups.test.ts` | Grouped remaining counts |

---

### Task 1: Grouped tray logic + tests

- [ ] Add `buildTrayGroups` returning `{ symbol, remaining }[]` with remaining > 0 only
- [ ] Export `trayGroups` from hook; keep symbol-level drag ids `tray-piece-${symbol}`
- [ ] Unit tests for counts after place/remove

### Task 2: PieceTray UI

- [ ] Render one card per group + green count badge
- [ ] Selected state green border; update helper copy
- [ ] Hide groups with remaining 0

### Task 3: Status + actions layout

- [ ] GameStatusBar: one row (size pill, Medium★★☆, score)
- [ ] GameActions: Hint (badge), Reset, Next → newPuzzle
- [ ] SudokuScreen: compact header; status → grid → tray → actions

### Task 4: Grid polish + verify

- [ ] Soft green rounded grid; dashed empty cells
- [ ] `npm test` + `npm run build`
- [ ] Commit
