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
