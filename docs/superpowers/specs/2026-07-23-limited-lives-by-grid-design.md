# Limited Lives by Grid Size

Date: 2026-07-23  
Status: Approved for planning

## Goal

Replace infinite wrong-placement retries with a finite lives budget that scales with grid size, and replace the status-bar placement counter with a clear lives readout. When lives run out, soft-retry the **same** puzzle.

## Scope

In scope:

1. Max lives formula: `maxLives = gridSize + 1` (3→4, 4→5, …, 9→10)
2. Spend a life only on wrong placement
3. Status bar: life icon + colored `livesUsed / maxLives` (replace `filled / total`)
4. Out-of-lives popup with kid-friendly copy, **Try again** button, and 1.3s auto-retry
5. Retry restores the same puzzle board to givens and resets `livesUsed` to 0

Out of scope:

- Changing win / level-up / solve-count progression
- Spending lives on hints, resets, or piece removal
- Hard fail that forces navigation home
- New scoring, streaks, or difficulty balancing beyond lives count

## Rules

| Rule | Detail |
|------|--------|
| Max lives | `maxLives(size) = size + 1` |
| Spend | Wrong placement only (`placeSymbol` → `wrong`) |
| Do not spend | Hints, manual reset, removing a placed piece, Next / new puzzle |
| Counter | Track `livesUsed` from 0; out of lives when `livesUsed === maxLives` |
| Display | `livesUsed / maxLives` (e.g. after 2 mistakes on 3×3: `2 / 4`) |
| Retry | Same puzzle id/board givens; `livesUsed → 0`; no solve credit |

## UI

### Status bar (`GameStatusBar`)

Keep size badge and difficulty + stars. Replace placement progress with:

- Life icon on the left (heart-style)
- `livesUsed` in **red**
- `/` in current status text color (`#5C4033`)
- `maxLives` in **green**

Example: `♥ 2 / 4`

### Out-of-lives popup

Triggered when a wrong placement causes `livesUsed` to reach `maxLives`.

- Copy (kid-friendly): *“Oops! You’re out of turns. Let’s try again.”*
- Primary action: **Try again**
- Duration: popup remains ~**1.3 seconds**
  - Child may tap **Try again** immediately → reset now
  - If no tap after 1.3s → auto-reset (same as Try again)
- While popup is visible: block further placements

On the last-life wrong placement: still play existing shake + wrong sound, update counter to e.g. `4/4`, then show the popup.

## Architecture

```
lives.ts (or equivalent tiny helper)
  maxLives(size) → size + 1

useSudokuGame
  livesUsed state
  on wrong placement → increment; if at max → showOutOfLives
  retryAfterOutOfLives → board = givens, livesUsed = 0, clear popup
  applyPuzzle / newPuzzle / reset → livesUsed = 0

SudokuScreen
  GameStatusBar(livesUsed, maxLives, …)
  OutOfLivesDialog (1.3s timer + Try again)

GameStatusBar
  life icon + red used / green total (no filled/total)
```

`placedCount` / `totalToPlace` may remain in the hook for Hint badge or other uses, but are **not** shown in the status bar.

## Components / files

| File | Change |
|------|--------|
| `features/sudoku/lib/lives.ts` (new) | `maxLives(size)` helper |
| `features/sudoku/hooks/useSudokuGame.ts` | Lives state, spend on wrong, out-of-lives + retry |
| `features/sudoku/components/GameStatusBar.tsx` | Lives display instead of filled/total |
| `features/sudoku/components/SudokuScreen.tsx` | Wire lives + out-of-lives dialog |
| `features/sudoku/lib/feedbackMessages.ts` (optional) | Out-of-lives copy constant |
| New small dialog component or inline | Out-of-lives UI |
| Tests | Formula + spend / out-of-lives / retry / hints don’t spend |

## Edge cases

- Wrong placement on last life: shake + sound → counter at max → popup
- Solved / celebrating board: out-of-lives cannot fire
- Level-up or Next / new puzzle: fresh `maxLives` for new size; `livesUsed = 0`
- Manual Reset: board to givens and `livesUsed = 0` (same as a fresh attempt on this puzzle)

## Success criteria

- 3×3 starts with `0 / 4`; 4×4 with `0 / 5`; pattern holds for all mode sizes
- Each wrong placement increments used lives exactly once
- Hints do not change lives
- At max lives, popup appears; Try again or 1.3s auto-reset restores same puzzle and `0 / max`
- Status bar shows life icon + red used / green total; placement `filled / total` is gone
- Existing tests still pass; new lives coverage added

## Risks / notes

- Approach: extend `useSudokuGame` + status bar (no separate lives subsystem for v1)
- Timer + button race: clear the 1.3s timer when Try again is pressed to avoid double-reset
- Accessibility: popup should be readable; auto-dismiss must not strand keyboard/screen-reader users (button remains available for the full 1.3s)
