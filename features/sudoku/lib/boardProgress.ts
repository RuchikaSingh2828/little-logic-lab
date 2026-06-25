import type { Symbol } from "../types/sudoku.types";

export function countPlacedCells(
  givens: (Symbol | null)[][],
  board: (Symbol | null)[][],
  size: number
): { placed: number; total: number } {
  let total = 0;
  let placed = 0;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (givens[row][col] !== null) continue;
      total++;
      if (board[row][col] !== null) placed++;
    }
  }

  return { placed, total };
}
