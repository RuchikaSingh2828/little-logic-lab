import type { Difficulty, GridSize, SudokuMode } from "../types/sudoku.types";
import { getUnlockedGridSizes } from "./progressStorage";

export const SOLVES_BEFORE_LEVEL_UP = 5;

export interface LevelTarget {
  size: GridSize;
  difficulty: Difficulty;
  /** True when size or difficulty increases vs the current level. */
  advanced: boolean;
}

const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard"];

export function formatLevelLabel(size: GridSize, difficulty: Difficulty): string {
  const diff = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  return `${size}×${size} ${diff}`;
}

function maxSizeForMode(mode: SudokuMode): GridSize {
  const sizes = getUnlockedGridSizes(mode);
  return sizes[sizes.length - 1] ?? 5;
}

/** Next puzzle level after enough solves at the current one. */
export function getNextLevel(
  mode: SudokuMode,
  size: GridSize,
  difficulty: Difficulty
): LevelTarget {
  const diffIndex = DIFFICULTY_ORDER.indexOf(difficulty);

  if (diffIndex >= 0 && diffIndex < DIFFICULTY_ORDER.length - 1) {
    return {
      size,
      difficulty: DIFFICULTY_ORDER[diffIndex + 1],
      advanced: true,
    };
  }

  // Already hard — bump grid size and reset to easy when possible
  const maxSize = maxSizeForMode(mode);
  if (size < maxSize) {
    return {
      size: (size + 1) as GridSize,
      difficulty: "easy",
      advanced: true,
    };
  }

  return { size, difficulty, advanced: false };
}
