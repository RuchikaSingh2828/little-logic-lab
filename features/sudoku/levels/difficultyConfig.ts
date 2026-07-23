import type { Difficulty, GridSize } from "../types/sudoku.types";

export const EMPTY_CELL_COUNTS: Record<
  GridSize,
  Record<Difficulty, number>
> = {
  2: { easy: 1, medium: 2, hard: 2 },
  3: { easy: 3, medium: 4, hard: 6 },
  4: { easy: 5, medium: 7, hard: 9 },
  5: { easy: 7, medium: 10, hard: 12 },
  6: { easy: 10, medium: 14, hard: 18 },
  7: { easy: 14, medium: 21, hard: 28 },
  8: { easy: 18, medium: 28, hard: 36 },
  9: { easy: 24, medium: 36, hard: 45 },
};

export function getEmptyCellCount(
  size: GridSize,
  difficulty: Difficulty
): number {
  return EMPTY_CELL_COUNTS[size][difficulty];
}
