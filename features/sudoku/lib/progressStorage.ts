import type { GridSize, SudokuMode } from "../types/sudoku.types";
import { getProgressKey } from "./progressKeys";

export const UNLOCK_RULES: Record<
  4 | 5,
  { requiresSize: GridSize; solvesRequired: number }
> = {
  4: { requiresSize: 3, solvesRequired: 2 },
  5: { requiresSize: 4, solvesRequired: 2 },
};

interface PuzzleProgress {
  solvesBySize: Partial<Record<GridSize, number>>;
  totalGamesPlayed: number;
  lastRecordedPuzzleId: string | null;
}

function normalizeSolvesBySize(
  raw: Partial<Record<string | number, number>> | undefined
): Partial<Record<GridSize, number>> {
  if (!raw) return {};

  const result: Partial<Record<GridSize, number>> = {};
  for (const [key, value] of Object.entries(raw)) {
    const size = Number(key) as GridSize;
    if (!Number.isNaN(size) && typeof value === "number") {
      result[size] = value;
    }
  }
  return result;
}

function migrateLegacyProgress(mode: SudokuMode): void {
  if (typeof window === "undefined" || mode !== "picture") return;

  const legacyKey = "lll_puzzle_progress";
  const legacy = localStorage.getItem(legacyKey);
  if (!legacy) return;

  const modeKey = getProgressKey(mode);
  if (!localStorage.getItem(modeKey)) {
    localStorage.setItem(modeKey, legacy);
  }
  localStorage.removeItem(legacyKey);
}

function readProgress(mode: SudokuMode): PuzzleProgress {
  if (typeof window === "undefined") {
    return { solvesBySize: {}, totalGamesPlayed: 0, lastRecordedPuzzleId: null };
  }

  migrateLegacyProgress(mode);

  try {
    const raw = localStorage.getItem(getProgressKey(mode));
    if (!raw) {
      return { solvesBySize: {}, totalGamesPlayed: 0, lastRecordedPuzzleId: null };
    }

    const parsed = JSON.parse(raw) as Partial<PuzzleProgress>;
    const solvesBySize = normalizeSolvesBySize(parsed.solvesBySize);
    const totalGamesPlayed =
      typeof parsed.totalGamesPlayed === "number"
        ? parsed.totalGamesPlayed
        : Object.values(solvesBySize).reduce((sum, count) => sum + count, 0);

    return {
      solvesBySize,
      totalGamesPlayed,
      lastRecordedPuzzleId: parsed.lastRecordedPuzzleId ?? null,
    };
  } catch {
    return { solvesBySize: {}, totalGamesPlayed: 0, lastRecordedPuzzleId: null };
  }
}

function writeProgress(mode: SudokuMode, progress: PuzzleProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getProgressKey(mode), JSON.stringify(progress));
  window.dispatchEvent(new Event("lll-progress-updated"));
}

export function getSolveCount(mode: SudokuMode, size: GridSize): number {
  return readProgress(mode).solvesBySize[size] ?? 0;
}

export function getTotalGamesPlayed(mode: SudokuMode): number {
  return readProgress(mode).totalGamesPlayed;
}

export function isGridSizeUnlocked(mode: SudokuMode, size: GridSize): boolean {
  if (size <= 3) return true;

  const rule = UNLOCK_RULES[size as 4 | 5];
  return getSolveCount(mode, rule.requiresSize) >= rule.solvesRequired;
}

export function solvesUntilUnlock(mode: SudokuMode, size: GridSize): number {
  if (size <= 3 || isGridSizeUnlocked(mode, size)) return 0;

  const rule = UNLOCK_RULES[size as 4 | 5];
  return Math.max(0, rule.solvesRequired - getSolveCount(mode, rule.requiresSize));
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

  const nextSize = (gridSize + 1) as GridSize;
  if (nextSize !== 4 && nextSize !== 5) return null;

  const rule = UNLOCK_RULES[nextSize];
  const requiredSolves = progress.solvesBySize[rule.requiresSize] ?? 0;

  if (requiredSolves === rule.solvesRequired) {
    return nextSize;
  }

  return null;
}

export function getUnlockedGridSizes(mode: SudokuMode): GridSize[] {
  const sizes: GridSize[] = [3];
  if (isGridSizeUnlocked(mode, 4)) sizes.push(4);
  if (isGridSizeUnlocked(mode, 5)) sizes.push(5);
  return sizes;
}

export function getTotalGamesPlayedAllModes(): number {
  const modes: SudokuMode[] = ["picture", "shape", "number"];
  return modes.reduce((sum, mode) => sum + getTotalGamesPlayed(mode), 0);
}

export function getProgressSnapshot(mode: SudokuMode) {
  return {
    unlocked: getUnlockedGridSizes(mode),
    solves3: getSolveCount(mode, 3),
    solves4: getSolveCount(mode, 4),
    solves5: getSolveCount(mode, 5),
    totalGamesPlayed: getTotalGamesPlayed(mode),
  };
}
