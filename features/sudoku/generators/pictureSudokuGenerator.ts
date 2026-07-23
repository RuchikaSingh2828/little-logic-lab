import {
  getNextTheme,
  getThemeById,
  PICTURE_THEMES,
} from "../levels/pictureThemes";
import type { Difficulty, GridSize, Puzzle } from "../types/sudoku.types";
import { createLatinPuzzle } from "./createLatinPuzzle";

export function generatePicturePuzzle(opts: {
  size: GridSize;
  difficulty: Difficulty;
  themeId?: string;
}): Puzzle {
  const theme = opts.themeId
    ? getThemeById(opts.themeId)
    : PICTURE_THEMES[Math.floor(Math.random() * PICTURE_THEMES.length)];

  return createLatinPuzzle({
    mode: "picture",
    size: opts.size,
    difficulty: opts.difficulty,
    themeId: theme.id,
    symbols: theme.symbols,
  });
}

export function generateNextPuzzle(
  current: Puzzle,
  overrides?: { size?: GridSize; difficulty?: Difficulty }
): Puzzle {
  const nextTheme = getNextTheme(current.themeId);
  return generatePicturePuzzle({
    size: overrides?.size ?? current.size,
    difficulty: overrides?.difficulty ?? current.difficulty,
    themeId: nextTheme.id,
  });
}
