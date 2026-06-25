import type { Difficulty, GridSize, Puzzle } from "../types/sudoku.types";
import { createLatinPuzzle } from "./createLatinPuzzle";

function numberSymbols(size: GridSize): string[] {
  return Array.from({ length: size }, (_, index) => String(index + 1));
}

export function generateNumberPuzzle(opts: {
  size: GridSize;
  difficulty: Difficulty;
}): Puzzle {
  return createLatinPuzzle({
    mode: "number",
    size: opts.size,
    difficulty: opts.difficulty,
    themeId: "numbers",
    symbols: numberSymbols(opts.size),
  });
}

export function generateNextNumberPuzzle(current: Puzzle): Puzzle {
  return generateNumberPuzzle({
    size: current.size,
    difficulty: current.difficulty,
  });
}
