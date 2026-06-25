import type { GridSize } from "../types/sudoku.types";

const PROGRESS_KEY = "lll_puzzle_progress";

export const UNLOCK_RULES: Record<
  4 | 5,
  { requiresSize: GridSize; solvesRequired: number }
> = {
  4: { requiresSize: 3, solvesRequired: 2 },
  5: { requiresSize: 4, solvesRequired: 2 },
};

interface PuzzleProgress {
  solvesBySize: Partial<Record<GridSize, number>>;
}

function readProgress(): PuzzleProgress {
  if (typeof window === "undefined") return { solvesBySize: {} };
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { solvesBySize: {} };
    return JSON.parse(raw) as PuzzleProgress;
  } catch {
    return { solvesBySize: {} };
  }
}

function writeProgress(progress: PuzzleProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("lll-progress-updated"));
}

export function getSolveCount(size: GridSize): number {
  return readProgress().solvesBySize[size] ?? 0;
}

export function isGridSizeUnlocked(size: GridSize): boolean {
  if (size <= 3) return true;

  const rule = UNLOCK_RULES[size as 4 | 5];
  return getSolveCount(rule.requiresSize) >= rule.solvesRequired;
}

export function solvesUntilUnlock(size: GridSize): number {
  if (size <= 3 || isGridSizeUnlocked(size)) return 0;

  const rule = UNLOCK_RULES[size as 4 | 5];
  return Math.max(0, rule.solvesRequired - getSolveCount(rule.requiresSize));
}

export function recordPuzzleSolve(size: GridSize): GridSize | null {
  if (typeof window === "undefined") return null;

  const progress = readProgress();
  const previousCount = progress.solvesBySize[size] ?? 0;
  progress.solvesBySize[size] = previousCount + 1;
  writeProgress(progress);

  const nextSize = (size + 1) as GridSize;
  if (nextSize !== 4 && nextSize !== 5) return null;

  const rule = UNLOCK_RULES[nextSize];
  const requiredSolves = progress.solvesBySize[rule.requiresSize] ?? 0;

  if (requiredSolves === rule.solvesRequired) {
    return nextSize;
  }

  return null;
}

export function getUnlockedGridSizes(): GridSize[] {
  const sizes: GridSize[] = [3];
  if (isGridSizeUnlocked(4)) sizes.push(4);
  if (isGridSizeUnlocked(5)) sizes.push(5);
  return sizes;
}
