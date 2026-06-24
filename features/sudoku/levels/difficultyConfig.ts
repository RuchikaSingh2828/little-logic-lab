import type { Difficulty, GridSize } from "../types/sudoku.types";

export const EMPTY_CELL_COUNTS: Record<
  GridSize,
  Record<Difficulty, number>
> = {
  2: { easy: 1, medium: 2, hard: 2 },
  3: { easy: 3, medium: 4, hard: 6 },
};

export function getEmptyCellCount(
  size: GridSize,
  difficulty: Difficulty
): number {
  return EMPTY_CELL_COUNTS[size][difficulty];
}
