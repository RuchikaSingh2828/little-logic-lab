import { getEmptyCellCount } from "../levels/difficultyConfig";
import type { Difficulty, GridSize, Puzzle, SudokuMode, Symbol } from "../types/sudoku.types";
import { generateLatinSquare } from "./latinSquare";

function shufflePositions(size: number): { row: number; col: number }[] {
  const positions: { row: number; col: number }[] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      positions.push({ row, col });
    }
  }
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  return positions;
}

export function createLatinPuzzle(opts: {
  mode: SudokuMode;
  size: GridSize;
  difficulty: Difficulty;
  themeId: string;
  symbols: Symbol[];
}): Puzzle {
  const symbols = opts.symbols.slice(0, opts.size);
  const solution = generateLatinSquare(opts.size, symbols);

  const givens: (Symbol | null)[][] = solution.map((row) => [...row]);
  const emptyCount = getEmptyCellCount(opts.size, opts.difficulty);
  const positions = shufflePositions(opts.size).slice(0, emptyCount);
  const emptyCells: { row: number; col: number }[] = [];

  for (const { row, col } of positions) {
    givens[row][col] = null;
    emptyCells.push({ row, col });
  }

  return {
    id: crypto.randomUUID(),
    mode: opts.mode,
    size: opts.size,
    difficulty: opts.difficulty,
    themeId: opts.themeId,
    symbols,
    solution,
    givens,
    emptyCells,
  };
}
