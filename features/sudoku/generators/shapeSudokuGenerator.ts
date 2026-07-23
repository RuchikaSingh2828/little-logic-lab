import {
  getNextShapeTheme,
  getShapeThemeById,
  SHAPE_THEMES,
} from "../levels/shapeThemes";
import type { Difficulty, GridSize, Puzzle } from "../types/sudoku.types";
import { createLatinPuzzle } from "./createLatinPuzzle";

export function generateShapePuzzle(opts: {
  size: GridSize;
  difficulty: Difficulty;
  themeId?: string;
}): Puzzle {
  const theme = opts.themeId
    ? getShapeThemeById(opts.themeId)
    : SHAPE_THEMES[Math.floor(Math.random() * SHAPE_THEMES.length)];

  return createLatinPuzzle({
    mode: "shape",
    size: opts.size,
    difficulty: opts.difficulty,
    themeId: theme.id,
    symbols: theme.symbols,
  });
}

export function generateNextShapePuzzle(
  current: Puzzle,
  overrides?: { size?: GridSize; difficulty?: Difficulty }
): Puzzle {
  const nextTheme = getNextShapeTheme(current.themeId);
  return generateShapePuzzle({
    size: overrides?.size ?? current.size,
    difficulty: overrides?.difficulty ?? current.difficulty,
    themeId: nextTheme.id,
  });
}
