import { getEmptyCellCount } from "../levels/difficultyConfig";
import {
  getNextTheme,
  getThemeById,
  PICTURE_THEMES,
} from "../levels/pictureThemes";
import type { Difficulty, GridSize, Puzzle } from "../types/sudoku.types";
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

export function generatePicturePuzzle(opts: {
  size: GridSize;
  difficulty: Difficulty;
  themeId?: string;
}): Puzzle {
  const theme = opts.themeId
    ? getThemeById(opts.themeId)
    : PICTURE_THEMES[Math.floor(Math.random() * PICTURE_THEMES.length)];

  const symbols = theme.symbols.slice(0, opts.size);
  const solution = generateLatinSquare(opts.size, symbols);

  const givens: (string | null)[][] = solution.map((row) => [...row]);
  const emptyCount = getEmptyCellCount(opts.size, opts.difficulty);
  const positions = shufflePositions(opts.size).slice(0, emptyCount);
  const emptyCells: { row: number; col: number }[] = [];

  for (const { row, col } of positions) {
    givens[row][col] = null;
    emptyCells.push({ row, col });
  }

  return {
    id: crypto.randomUUID(),
    size: opts.size,
    difficulty: opts.difficulty,
    themeId: theme.id,
    symbols,
    solution,
    givens,
    emptyCells,
  };
}

export function generateNextPuzzle(current: Puzzle): Puzzle {
  const nextTheme = getNextTheme(current.themeId);
  return generatePicturePuzzle({
    size: current.size,
    difficulty: current.difficulty,
    themeId: nextTheme.id,
  });
}
