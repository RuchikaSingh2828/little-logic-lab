# Open 4×4 / 5×5 Grid Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let users navigate to and play every 3×3, 4×4, and 5×5 Sudoku (all modes × difficulties) the same way they already play 3×3 — via home card links — without unlock gates or sibling-card stretch when opening grid options.

**Architecture:** Puzzle engines and `/sudoku/{mode}/{size}/{difficulty}` routes already support sizes 3–5. This plan removes progressive unlock gating, replaces the in-flow “More grid sizes” `<details>` with a floating Base UI popover, and keeps primary pills / Start Playing on default grids.

**Tech Stack:** Next.js App Router, React 19, `@base-ui/react` Popover, Vitest, Tailwind CSS 4

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-17-grid-size-popover-design.md`
- Do not change generators, `difficultyConfig`, or route URL shape
- All sizes `3 | 4 | 5` available immediately for every mode
- Popover must not change card height (portal/overlay, not in-flow expand)
- Primary difficulty pills + Start Playing stay on default grid (picture/shape → 3, number → 4)
- Progress may still record solves for stats; it must not gate navigation

## File structure

| Path | Responsibility |
|------|----------------|
| `features/sudoku/lib/progressStorage.ts` | Always treat 3/4/5 as unlocked; stop returning unlock sizes from solves |
| `features/sudoku/hooks/usePuzzleProgress.ts` | Expose always-unlocked sizes; drop unlock helpers from public API if unused |
| `features/sudoku/hooks/useSudokuGame.ts` | Stop tracking `newlyUnlockedSize` |
| `features/sudoku/components/SudokuScreen.tsx` | Remove unlock redirect |
| `features/sudoku/components/CompletionDialog.tsx` | Remove unlock celebration copy/prop |
| `components/ui/popover.tsx` | Base UI popover wrapper (portal + popup) |
| `components/home/AgeChallengeCard.tsx` | Popover grid × difficulty navigation |
| `features/sudoku/__tests__/engine.test.ts` | Assert open access; keep solve counting tests |

---

### Task 1: Open all grid sizes in progress storage

**Files:**
- Modify: `features/sudoku/lib/progressStorage.ts`
- Modify: `features/sudoku/__tests__/engine.test.ts`
- Modify: `features/sudoku/hooks/usePuzzleProgress.ts` (only if API signatures change)

**Interfaces:**
- Consumes: existing `GridSize`, `SudokuMode`, localStorage progress shape
- Produces:
  - `isGridSizeUnlocked(mode, size): boolean` — always `true` for sizes ≤ 5 used by the app
  - `getUnlockedGridSizes(mode): GridSize[]` — always `[3, 4, 5]`
  - `recordPuzzleSolve(...): GridSize | null` — always returns `null` (no unlock event)
  - `solvesUntilUnlock(...): number` — always `0` (keep for compatibility or remove if unused)

- [ ] **Step 1: Update failing unlock tests to open-access expectations**

In `features/sudoku/__tests__/engine.test.ts`, replace the unlock progression tests with:

```typescript
it("treats 3x3, 4x4, and 5x5 as unlocked immediately", () => {
  expect(isGridSizeUnlocked(mode, 3)).toBe(true);
  expect(isGridSizeUnlocked(mode, 4)).toBe(true);
  expect(isGridSizeUnlocked(mode, 5)).toBe(true);
  expect(solvesUntilUnlock(mode, 4)).toBe(0);
  expect(getUnlockedGridSizes(mode)).toEqual([3, 4, 5]);
});

it("records solves without emitting unlock events", () => {
  expect(recordPuzzleSolve(mode, 3)).toBe(null);
  expect(recordPuzzleSolve(mode, 3)).toBe(null);
  expect(getSolveCount(mode, 3)).toBe(2);
  expect(recordPuzzleSolve(mode, 4)).toBe(null);
  expect(getSolveCount(mode, 4)).toBe(1);
});
```

Update the per-mode test so it no longer asserts unlock differences:

```typescript
it("keeps progress separate per mode", () => {
  recordPuzzleSolve("picture", 3);
  recordPuzzleSolve("shape", 3);
  recordPuzzleSolve("shape", 3);

  expect(getSolveCount("picture", 3)).toBe(1);
  expect(getSolveCount("shape", 3)).toBe(2);
  expect(isGridSizeUnlocked("shape", 4)).toBe(true);
  expect(isGridSizeUnlocked("picture", 4)).toBe(true);
});
```

Add import for `getUnlockedGridSizes` if not already imported.

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/sudokid" && npm test -- features/sudoku/__tests__/engine.test.ts
```

Expected: FAIL on open-access assertions (old unlock rules still gate 4/5).

- [ ] **Step 3: Implement open access in progressStorage**

Replace unlock helpers in `features/sudoku/lib/progressStorage.ts`:

```typescript
export function isGridSizeUnlocked(_mode: SudokuMode, size: GridSize): boolean {
  return size >= 2 && size <= 5;
}

export function solvesUntilUnlock(_mode: SudokuMode, _size: GridSize): number {
  return 0;
}

export function recordPuzzleSolve(
  mode: SudokuMode,
  size: GridSize,
  puzzleId?: string
): GridSize | null {
  if (typeof window === "undefined") return null;

  const progress = readProgress(mode);

  if (puzzleId && progress.lastRecordedPuzzleId === puzzleId) {
    return null;
  }

  const gridSize = Number(size) as GridSize;
  const previousCount = progress.solvesBySize[gridSize] ?? 0;
  progress.solvesBySize[gridSize] = previousCount + 1;
  progress.totalGamesPlayed = (progress.totalGamesPlayed ?? 0) + 1;
  progress.lastRecordedPuzzleId = puzzleId ?? null;
  writeProgress(mode, progress);

  return null;
}

export function getUnlockedGridSizes(_mode: SudokuMode): GridSize[] {
  return [3, 4, 5];
}
```

Remove `UNLOCK_RULES` if nothing else references it. Keep solve counting and `getProgressSnapshot` otherwise unchanged (`unlocked` will now always be `[3,4,5]`).

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/sudokid" && npm test -- features/sudoku/__tests__/engine.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add features/sudoku/lib/progressStorage.ts features/sudoku/__tests__/engine.test.ts
git commit -m "feat: open all grid sizes without unlock gates"
```

---

### Task 2: Remove unlock UI and game redirect

**Files:**
- Modify: `features/sudoku/components/SudokuScreen.tsx`
- Modify: `features/sudoku/components/CompletionDialog.tsx`
- Modify: `features/sudoku/hooks/useSudokuGame.ts`

**Interfaces:**
- Consumes: `markPuzzleComplete` still records solves; ignore unlock return value
- Produces: `CompletionDialog` props without `newlyUnlockedSize`; `useSudokuGame` no longer exports unlock size

- [ ] **Step 1: Simplify CompletionDialog**

Remove `newlyUnlockedSize`, `unlockMessage`, and the unlock banner block. Final props:

```typescript
interface CompletionDialogProps {
  open: boolean;
  onTryAnother: () => void;
  onFinish: () => void;
}
```

Keep the existing celebration title and Try Another / Finish buttons.

- [ ] **Step 2: Simplify useSudokuGame**

Remove `newlyUnlockedSize` state and `setNewlyUnlockedSize` calls. Still call `markPuzzleComplete(...)` on solve/hint-complete for stats. Stop returning `newlyUnlockedSize` from the hook.

- [ ] **Step 3: Simplify SudokuScreen**

1. Delete the `useEffect` that redirects when `!isGridSizeUnlocked(mode, size)`.
2. Remove `isGridSizeUnlocked` import.
3. Stop passing `newlyUnlockedSize` into `CompletionDialog`.

- [ ] **Step 4: Typecheck / tests**

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/sudokid" && npm test && npx tsc --noEmit
```

Expected: PASS / no type errors.

- [ ] **Step 5: Commit**

```bash
git add features/sudoku/components/SudokuScreen.tsx features/sudoku/components/CompletionDialog.tsx features/sudoku/hooks/useSudokuGame.ts
git commit -m "feat: remove grid unlock redirect and completion messaging"
```

---

### Task 3: Add popover UI and wire home grid navigation

**Files:**
- Create: `components/ui/popover.tsx`
- Modify: `components/home/AgeChallengeCard.tsx`

**Interfaces:**
- Consumes: `@base-ui/react/popover`, `GRID_TIERS`, `DIFFICULTY_STYLES`, `group.hrefPrefix`
- Produces: floating “More grid sizes” menu with links `/sudoku/{mode}/{size}/{difficulty}` for sizes 3,4,5 × easy/medium/hard

- [ ] **Step 1: Create popover wrapper**

Create `components/ui/popover.tsx` following the dialog wrapper pattern:

```tsx
"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  sideOffset = 8,
  align = "center",
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "sideOffset" | "align">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        className="z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "w-[min(100vw-2rem,18rem)] rounded-xl border border-[#E8E4DC] bg-white p-2 text-sm text-[#2D3748] shadow-[0_8px_24px_rgba(0,0,0,0.12)] outline-none",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverTrigger, PopoverContent }
```

Adjust Positioner/Popup prop types if TypeScript complains — match exported types from `@base-ui/react/popover` the same way `dialog.tsx` does for Dialog.

- [ ] **Step 2: Replace details with popover in AgeChallengeCard**

In `ActiveAgeCard`:

1. Remove the `<details>` / `<summary>` block.
2. Simplify `startHref` — no unlock check:

```typescript
const startSize = group.mode === "number" ? 4 : 3;
const startHref = `${group.hrefPrefix}/${startSize}/easy`;
```

3. Add popover under Start Playing:

```tsx
<Popover>
  <PopoverTrigger className="mt-3 w-full cursor-pointer text-center text-xs font-semibold text-[#6B7280] underline-offset-2 hover:underline data-popup-open:text-[#2D3748]">
    More grid sizes
  </PopoverTrigger>
  <PopoverContent align="center" className="w-[min(100%,18rem)]">
    <div className="flex flex-col gap-1.5">
      {GRID_TIERS.map((tier) => (
        <div
          key={tier.size}
          className="flex items-center justify-between gap-2 rounded-xl border border-[#E8E4DC] px-3 py-2"
        >
          <span className="text-xs font-semibold text-[#2D3748]">
            {tier.label}
          </span>
          <div className="flex gap-1">
            {difficulties.map((d: Difficulty) => (
              <Link
                key={d}
                href={`${group.hrefPrefix}/${tier.size}/${d}`}
                className="rounded-md bg-[#FFF8EC] px-2 py-0.5 text-[10px] font-bold capitalize text-[#4B5563] hover:bg-[#EAF6E3]"
              >
                {DIFFICULTY_STYLES[d].label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </PopoverContent>
</Popover>
```

4. Remove unused `Lock` import if it was only for locked cards still using it — keep `Lock` for `LockedAgeCard`.
5. If `isUnlocked` is unused after this change, stop destructuring it from `usePuzzleProgress` (keep `totalGamesPlayed`).

- [ ] **Step 3: Manual verification checklist**

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/sudokid" && npm run dev
```

Verify:

1. Home → open More grid sizes on one card → sibling cards do **not** grow.
2. From Picture card, open `/sudoku/picture/4/easy`, `/sudoku/picture/5/medium` via popover chips — games load.
3. Same for shape and number modes (including number 3×3 and 5×5).
4. Direct URL `/sudoku/picture/5/hard` loads (no redirect home).
5. Primary Starter/Explorer/Master pills still use default size only.

- [ ] **Step 4: Run full test + typecheck**

```bash
cd "/Users/ruchika/Desktop/Little Logic Lab/sudokid" && npm test && npx tsc --noEmit
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/popover.tsx components/home/AgeChallengeCard.tsx
git commit -m "feat: add grid size popover navigation for 3x3–5x5"
```

---

## Spec coverage

| Spec requirement | Task |
|------------------|------|
| Floating popover (no sibling stretch) | Task 3 |
| Links for 3/4/5 × easy/medium/hard | Task 3 |
| No grid locks / no unlock redirect | Tasks 1–2 |
| Remove unlock celebration copy | Task 2 |
| Primary pills / Start Playing defaults unchanged | Task 3 |
| Generators/routes unchanged | (no task — leave alone) |

## Self-review notes

- No placeholders.
- `recordPuzzleSolve` return type stays `GridSize | null` so callers compile; always `null`.
- Games for 4×4/5×5 already exist in routes/generators; this plan unlocks access and navigation.
