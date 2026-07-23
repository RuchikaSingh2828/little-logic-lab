# Limited Lives by Grid Size — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each puzzle a finite lives budget (`size + 1`), show used/total in the status bar, and soft-retry the same puzzle via a glass out-of-lives popup (Try again or auto after 1.3s).

**Architecture:** Pure `maxLives` / wrong-placement helper in `lives.ts`; `useSudokuGame` owns `livesUsed` + `showOutOfLives` and retry; `GameStatusBar` shows life icon + colored counter; `OutOfLivesDialog` reuses the existing glass Dialog pattern from `CompletionDialog`.

**Tech Stack:** Next.js (App Router), React client components, Lucide icons, shadcn Dialog, Vitest

**Spec:** `docs/superpowers/specs/2026-07-23-limited-lives-by-grid-design.md`

## Global Constraints

- `maxLives(size) = size + 1` only (no per-size table)
- Spend a life only on wrong placement; hints / remove piece do not spend
- Status shows `livesUsed / maxLives` (used red, slash current brown, total green) with life icon left
- Out-of-lives: glass/translucent + white text, on-theme; copy *“Oops! You’re out of turns. Let’s try again.”*; Try again + 1.3s auto-reset; block placements while open
- Retry = same puzzle givens, `livesUsed → 0`; manual Reset also clears lives
- Do not change level-up / solve progression

## File map

| File | Responsibility |
|------|----------------|
| `features/sudoku/lib/lives.ts` (new) | `maxLives`, `afterWrongPlacement` |
| `features/sudoku/__tests__/lives.test.ts` (new) | Formula + spend/out-of-lives helpers |
| `features/sudoku/hooks/useSudokuGame.ts` | Lives state, spend on wrong, retry, reset lives |
| `features/sudoku/lib/feedbackMessages.ts` | Optional out-of-lives copy constant |
| `features/sudoku/components/GameStatusBar.tsx` | Lives readout instead of filled/total |
| `features/sudoku/components/OutOfLivesDialog.tsx` (new) | Glass popup + 1.3s auto + Try again |
| `features/sudoku/components/SudokuScreen.tsx` | Wire lives props + dialog; block place while open |

---

### Task 1: Lives helpers + unit tests

**Files:**
- Create: `features/sudoku/lib/lives.ts`
- Create: `features/sudoku/__tests__/lives.test.ts`

**Interfaces:**
- Produces:
  - `maxLives(size: GridSize): number`
  - `afterWrongPlacement(livesUsed: number, max: number): { livesUsed: number; outOfLives: boolean }`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { afterWrongPlacement, maxLives } from "../lib/lives";
import type { GridSize } from "../types/sudoku.types";

describe("maxLives", () => {
  it.each([
    [3, 4],
    [4, 5],
    [5, 6],
    [9, 10],
  ] as [GridSize, number][])("size %i → %i lives", (size, expected) => {
    expect(maxLives(size)).toBe(expected);
  });
});

describe("afterWrongPlacement", () => {
  it("increments used lives", () => {
    expect(afterWrongPlacement(0, 4)).toEqual({
      livesUsed: 1,
      outOfLives: false,
    });
  });

  it("flags outOfLives on the last life", () => {
    expect(afterWrongPlacement(3, 4)).toEqual({
      livesUsed: 4,
      outOfLives: true,
    });
  });

  it("does not exceed max", () => {
    expect(afterWrongPlacement(4, 4)).toEqual({
      livesUsed: 4,
      outOfLives: true,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- features/sudoku/__tests__/lives.test.ts`
Expected: FAIL (module not found / export missing)

- [ ] **Step 3: Write minimal implementation**

Create `features/sudoku/lib/lives.ts`:

```ts
import type { GridSize } from "../types/sudoku.types";

export function maxLives(size: GridSize): number {
  return size + 1;
}

export function afterWrongPlacement(
  livesUsed: number,
  max: number
): { livesUsed: number; outOfLives: boolean } {
  const next = Math.min(livesUsed + 1, max);
  return { livesUsed: next, outOfLives: next >= max };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- features/sudoku/__tests__/lives.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add features/sudoku/lib/lives.ts features/sudoku/__tests__/lives.test.ts
git commit -m "Add maxLives helper and wrong-placement lives logic."
```

---

### Task 2: Wire lives into `useSudokuGame`

**Files:**
- Modify: `features/sudoku/hooks/useSudokuGame.ts`
- Modify: `features/sudoku/lib/feedbackMessages.ts` (add `OUT_OF_LIVES_FEEDBACK` only if useful; dialog owns primary copy — optional skip)

**Interfaces:**
- Consumes: `maxLives`, `afterWrongPlacement` from `../lib/lives`
- Produces (hook return additions):
  - `livesUsed: number`
  - `maxLivesCount: number` (or compute via `maxLives(puzzle.size)` in screen — prefer expose `livesUsed` + `maxLives: number` named carefully to avoid clashing with imported fn; export as `livesMax`)
  - `showOutOfLives: boolean`
  - `retryAfterOutOfLives: () => void`

- [ ] **Step 1: Add state and helpers in the hook**

Near other `useState` calls:

```ts
import { afterWrongPlacement, maxLives } from "../lib/lives";

const [livesUsed, setLivesUsed] = useState(0);
const [showOutOfLives, setShowOutOfLives] = useState(false);

const livesMax = maxLives(puzzle.size);
```

In `applyPuzzle`, also:

```ts
setLivesUsed(0);
setShowOutOfLives(false);
```

In `reset`:

```ts
setLivesUsed(0);
setShowOutOfLives(false);
```

- [ ] **Step 2: Spend life on wrong placement**

In `placeSymbol`, when placement is wrong:

```ts
if (!rowColValid || !answerCorrect) {
  if (showOutOfLives) {
    return { type: "noop" };
  }
  const result = afterWrongPlacement(livesUsed, maxLives(puzzle.size));
  setLivesUsed(result.livesUsed);
  setFeedback(INVALID_PLACEMENT_FEEDBACK);
  if (result.outOfLives) {
    setShowOutOfLives(true);
  }
  return { type: "wrong", row, col };
}
```

Add `livesUsed` and `showOutOfLives` to the `placeSymbol` dependency array.

- [ ] **Step 3: Add `retryAfterOutOfLives`**

```ts
const retryAfterOutOfLives = useCallback(() => {
  setBoard(buildBoardFromGivens(puzzle));
  setSelectedPiece(null);
  setFeedback(null);
  setLivesUsed(0);
  setShowOutOfLives(false);
}, [puzzle]);
```

Export from the hook return object:

```ts
livesUsed,
livesMax,
showOutOfLives,
retryAfterOutOfLives,
```

- [ ] **Step 4: Smoke-check types**

Run: `npx tsc --noEmit` (or project’s usual typecheck if configured)
Expected: no errors from hook exports

- [ ] **Step 5: Commit**

```bash
git add features/sudoku/hooks/useSudokuGame.ts
git commit -m "Track lives in useSudokuGame and soft-retry after out of lives."
```

---

### Task 3: Status bar lives display

**Files:**
- Modify: `features/sudoku/components/GameStatusBar.tsx`

**Interfaces:**
- Consumes: `livesUsed: number`, `livesMax: number` (replace `filledCount` / `totalEmpty`)

- [ ] **Step 1: Update props and markup**

Replace filled/total props with lives props. Keep size pill + difficulty stars.

```tsx
"use client";

import { Heart } from "lucide-react";
import type { Difficulty, GridSize } from "../types/sudoku.types";

interface GameStatusBarProps {
  livesUsed: number;
  livesMax: number;
  gridSize: GridSize;
  difficulty: Difficulty;
}

function difficultyStars(difficulty: Difficulty): number {
  if (difficulty === "easy") return 1;
  if (difficulty === "medium") return 2;
  return 3;
}

export function GameStatusBar({
  livesUsed,
  livesMax,
  gridSize,
  difficulty,
}: GameStatusBarProps) {
  const difficultyLabel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const stars = difficultyStars(difficulty);

  return (
    <div className="mb-2 flex w-full items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <span className="shrink-0 rounded-full bg-[#65B741] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
        {gridSize}×{gridSize}
      </span>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 text-sm">
        <span className="font-semibold text-[#5C4033]">{difficultyLabel}</span>
        <span className="tracking-tight text-amber-400" aria-hidden>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>{i < stars ? "★" : "☆"}</span>
          ))}
        </span>
      </div>

      <span
        className="flex shrink-0 items-center gap-1 text-sm font-bold tabular-nums"
        aria-label={`${livesUsed} of ${livesMax} lives used`}
      >
        <Heart
          className="h-4 w-4 fill-[#E85D5D] text-[#E85D5D]"
          aria-hidden
        />
        <span className="text-[#E85D5D]">{livesUsed}</span>
        <span className="text-[#5C4033]">/</span>
        <span className="text-[#65B741]">{livesMax}</span>
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/sudoku/components/GameStatusBar.tsx
git commit -m "Show lives used/total in the game status bar."
```

---

### Task 4: Glass out-of-lives dialog

**Files:**
- Create: `features/sudoku/components/OutOfLivesDialog.tsx`

**Interfaces:**
- Consumes: `open: boolean`, `onTryAgain: () => void`
- Produces: dialog that calls `onTryAgain` on button click or after 1300ms while `open`

- [ ] **Step 1: Implement dialog (match CompletionDialog glass)**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AUTO_RETRY_MS = 1300;

interface OutOfLivesDialogProps {
  open: boolean;
  onTryAgain: () => void;
}

export function OutOfLivesDialog({ open, onTryAgain }: OutOfLivesDialogProps) {
  const onTryAgainRef = useRef(onTryAgain);
  onTryAgainRef.current = onTryAgain;

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      onTryAgainRef.current();
    }, AUTO_RETRY_MS);
    return () => clearTimeout(id);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/40 supports-backdrop-filter:backdrop-blur-md"
        className="max-w-sm rounded-3xl border border-white/25 bg-[#2a4a32]/55 p-6 text-white shadow-[0_16px_48px_rgba(0,0,0,0.3)] ring-1 ring-white/20 backdrop-blur-xl"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-white">
            Oops! You’re out of turns.
          </DialogTitle>
          <DialogDescription className="text-center text-base text-white/90">
            Let’s try again.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-3">
          <Button
            onClick={onTryAgain}
            className="min-h-12 rounded-xl bg-[#65B741] text-white hover:bg-[#57a338]"
          >
            Try again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

Notes:
- Clearing the effect on unmount / `open→false` prevents double-reset when the button fires first.
- Green tinted glass (`#2a4a32` at ~55% opacity) keeps Sudokid theme with white text.

- [ ] **Step 2: Commit**

```bash
git add features/sudoku/components/OutOfLivesDialog.tsx
git commit -m "Add glass out-of-lives dialog with auto retry."
```

---

### Task 5: Wire `SudokuScreen` + verify

**Files:**
- Modify: `features/sudoku/components/SudokuScreen.tsx`

**Interfaces:**
- Consumes: hook `livesUsed`, `livesMax`, `showOutOfLives`, `retryAfterOutOfLives`
- Consumes: `GameStatusBar` lives props; `OutOfLivesDialog`

- [ ] **Step 1: Destructure new hook fields and update status bar**

```tsx
import { OutOfLivesDialog } from "./OutOfLivesDialog";

// in useSudokuGame destructure:
livesUsed,
livesMax,
showOutOfLives,
retryAfterOutOfLives,

// replace GameStatusBar props:
<GameStatusBar
  livesUsed={livesUsed}
  livesMax={livesMax}
  gridSize={puzzle.size}
  difficulty={puzzle.difficulty}
/>
```

- [ ] **Step 2: Block placements while out-of-lives is showing**

At the start of placement handlers (`handleCellTap` / drag end path that calls `placeSymbol`), if `showOutOfLives` return early. (Hook also noops wrong path; still guard UI.)

- [ ] **Step 3: Mount dialog**

Next to other dialogs:

```tsx
<OutOfLivesDialog
  open={showOutOfLives}
  onTryAgain={retryAfterOutOfLives}
/>
```

- [ ] **Step 4: Run full test suite**

Run: `npm test`
Expected: PASS (including `lives.test.ts`)

- [ ] **Step 5: Manual check list**

- Open a 3×3: status shows `♥ 0 / 4`
- Wrong place 4 times: counter reaches `4 / 4`, glass popup appears
- Tap Try again or wait ~1.3s: board resets, counter `0 / 4`
- Hint does not change lives
- Reset clears lives to `0 / 4`

- [ ] **Step 6: Commit**

```bash
git add features/sudoku/components/SudokuScreen.tsx features/sudoku/components/GameStatusBar.tsx features/sudoku/components/OutOfLivesDialog.tsx features/sudoku/hooks/useSudokuGame.ts features/sudoku/lib/lives.ts features/sudoku/__tests__/lives.test.ts
git commit -m "Wire limited lives into the Sudoku game screen."
```

---

## Spec coverage check

| Spec requirement | Task |
|------------------|------|
| `maxLives = size + 1` | Task 1 |
| Spend only on wrong placement | Task 2 |
| Status bar icon + red/green used/total | Task 3 |
| Glass popup, white text, Try again, 1.3s auto | Task 4 |
| Soft retry same puzzle, lives → 0 | Task 2 + 5 |
| Block placements while popup open | Task 2 + 5 |
| Hints don’t spend; Reset clears lives | Task 2 |
| Tests for formula / spend | Task 1 |
