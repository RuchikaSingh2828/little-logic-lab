import type { SudokuMode } from "../types/sudoku.types";

const PROGRESS_KEY_PREFIX = "lll_puzzle_progress";

export function getProgressKey(mode: SudokuMode): string {
  return `${PROGRESS_KEY_PREFIX}_${mode}`;
}
