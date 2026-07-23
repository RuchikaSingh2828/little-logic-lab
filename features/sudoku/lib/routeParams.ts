import type { Metadata } from "next";
import { SUDOKU_MODE_CONFIG } from "../config/sudokuModes";
import type { Difficulty, GridSize, SudokuMode } from "../types/sudoku.types";

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export const MODE_SIZES: Record<SudokuMode, GridSize[]> = {
  picture: [3, 4, 5],
  shape: [4, 5, 6],
  number: [7, 8, 9],
};

export interface ParsedSudokuRoute {
  size: GridSize;
  difficulty: Difficulty;
}

export function parseSudokuRouteParams(
  mode: SudokuMode,
  sizeStr: string,
  difficultyStr: string
): ParsedSudokuRoute | null {
  const size = Number.parseInt(sizeStr, 10) as GridSize;
  const difficulty = difficultyStr as Difficulty;

  if (!MODE_SIZES[mode].includes(size)) return null;
  if (!DIFFICULTIES.includes(difficulty)) return null;

  return { size, difficulty };
}

export function generateSudokuStaticParams(mode: SudokuMode) {
  return MODE_SIZES[mode].flatMap((size) =>
    DIFFICULTIES.map((difficulty) => ({
      size: String(size),
      difficulty,
    }))
  );
}

export function sudokuRouteMetadata(
  mode: SudokuMode,
  size: GridSize,
  difficulty: Difficulty
): Metadata {
  const config = SUDOKU_MODE_CONFIG[mode];
  const difficultyLabel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const title = `${config.title} ${size}×${size} · ${difficultyLabel}`;
  const description = `${config.title} for kids — ${size}×${size} grid, ${difficulty} difficulty. ${config.instructions}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${config.hrefPrefix}/${size}/${difficulty}`,
    },
    openGraph: {
      title: `${title} | Sudokid`,
      description,
      url: `${config.hrefPrefix}/${size}/${difficulty}`,
      type: "website",
    },
  };
}

export function allSudokuSitemapPaths(): string[] {
  const modes = Object.keys(MODE_SIZES) as SudokuMode[];
  return modes.flatMap((mode) => {
    const prefix = SUDOKU_MODE_CONFIG[mode].hrefPrefix;
    return MODE_SIZES[mode].flatMap((size) =>
      DIFFICULTIES.map((difficulty) => `${prefix}/${size}/${difficulty}`)
    );
  });
}
