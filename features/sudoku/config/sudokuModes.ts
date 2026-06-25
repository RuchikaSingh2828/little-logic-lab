import type { SudokuMode } from "../types/sudoku.types";

export interface SudokuModeConfig {
  title: string;
  instructions: string;
  hrefPrefix: string;
}

export const SUDOKU_MODE_CONFIG: Record<SudokuMode, SudokuModeConfig> = {
  picture: {
    title: "Picture Sudoku",
    instructions: "Look carefully. Every row and column needs all the pictures!",
    hrefPrefix: "/sudoku/picture",
  },
  shape: {
    title: "Shape Sudoku",
    instructions: "Each row and column needs one of every shape and color!",
    hrefPrefix: "/sudoku/shape",
  },
  number: {
    title: "Number Sudoku",
    instructions: "Each row and column needs every number — exactly once!",
    hrefPrefix: "/sudoku/number",
  },
};
