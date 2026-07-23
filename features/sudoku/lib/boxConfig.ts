import type { GridSize } from "../types/sudoku.types";

export interface BoxDimensions {
  /** Number of rows in each box */
  rows: number;
  /** Number of columns in each box */
  cols: number;
}

/**
 * Banded Sudoku box sizes. Other grid sizes stay Latin-square (no boxes).
 * 4 → 2×2, 6 → 2×3, 9 → 3×3
 */
export function getBoxDimensions(size: number): BoxDimensions | null {
  switch (size as GridSize) {
    case 4:
      return { rows: 2, cols: 2 };
    case 6:
      return { rows: 2, cols: 3 };
    case 9:
      return { rows: 3, cols: 3 };
    default:
      return null;
  }
}

export function hasSudokuBoxes(size: number): boolean {
  return getBoxDimensions(size) !== null;
}
