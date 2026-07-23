import type { Difficulty, GridSize, SudokuMode } from "../types/sudoku.types";
import { getProgressKey } from "./progressKeys";

export type LevelKey = `${GridSize}-${Difficulty}`;

interface PuzzleProgress {
  solvesBySize: Partial<Record<GridSize, number>>;
  /** Solves keyed by `${size}-${difficulty}`, e.g. "3-easy". */
  solvesByLevel: Partial<Record<LevelKey, number>>;
  totalGamesPlayed: number;
  lastRecordedPuzzleId: string | null;
}

export function levelKey(size: GridSize, difficulty: Difficulty): LevelKey {
  return `${size}-${difficulty}`;
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

function normalizeSolvesByLevel(
  raw: Partial<Record<string, number>> | undefined
): Partial<Record<LevelKey, number>> {
  if (!raw) return {};

  const result: Partial<Record<LevelKey, number>> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "number" && /^\d+-(easy|medium|hard)$/.test(key)) {
      result[key as LevelKey] = value;
    }
  }
  return result;
}

function emptyProgress(): PuzzleProgress {
  return {
    solvesBySize: {},
    solvesByLevel: {},
    totalGamesPlayed: 0,
    lastRecordedPuzzleId: null,
  };
}

function readProgress(mode: SudokuMode): PuzzleProgress {
  if (typeof window === "undefined") {
    return emptyProgress();
  }

  migrateLegacyProgress(mode);

  try {
    const raw = localStorage.getItem(getProgressKey(mode));
    if (!raw) {
      return emptyProgress();
    }

    const parsed = JSON.parse(raw) as Partial<PuzzleProgress>;
    const solvesBySize = normalizeSolvesBySize(parsed.solvesBySize);
    const solvesByLevel = normalizeSolvesByLevel(parsed.solvesByLevel);
    const totalGamesPlayed =
      typeof parsed.totalGamesPlayed === "number"
        ? parsed.totalGamesPlayed
        : Object.values(solvesBySize).reduce((sum, count) => sum + count, 0);

    return {
      solvesBySize,
      solvesByLevel,
      totalGamesPlayed,
      lastRecordedPuzzleId: parsed.lastRecordedPuzzleId ?? null,
    };
  } catch {
    return emptyProgress();
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

export function getLevelSolveCount(
  mode: SudokuMode,
  size: GridSize,
  difficulty: Difficulty
): number {
  return readProgress(mode).solvesByLevel[levelKey(size, difficulty)] ?? 0;
}

export function getTotalGamesPlayed(mode: SudokuMode): number {
  return readProgress(mode).totalGamesPlayed;
}

export function isGridSizeUnlocked(mode: SudokuMode, size: GridSize): boolean {
  return getUnlockedGridSizes(mode).includes(size);
}

export function solvesUntilUnlock(_mode: SudokuMode, _size: GridSize): number {
  return 0;
}

export function recordPuzzleSolve(
  mode: SudokuMode,
  size: GridSize,
  puzzleId?: string,
  difficulty?: Difficulty
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

  if (difficulty) {
    const key = levelKey(gridSize, difficulty);
    progress.solvesByLevel[key] = (progress.solvesByLevel[key] ?? 0) + 1;
  }

  writeProgress(mode, progress);

  return null;
}

export function getUnlockedGridSizes(mode: SudokuMode): GridSize[] {
  switch (mode) {
    case "shape":
      return [4, 5, 6];
    case "number":
      return [7, 8, 9];
    case "picture":
    default:
      return [3, 4, 5];
  }
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
    solves6: getSolveCount(mode, 6),
    solves7: getSolveCount(mode, 7),
    solves8: getSolveCount(mode, 8),
    solves9: getSolveCount(mode, 9),
    totalGamesPlayed: getTotalGamesPlayed(mode),
  };
}
