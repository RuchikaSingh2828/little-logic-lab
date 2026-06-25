export type GridSize = 2 | 3 | 4 | 5;
export type Difficulty = "easy" | "medium" | "hard";
export type SudokuMode = "picture" | "shape" | "number";
export type Symbol = string;

export interface Puzzle {
  id: string;
  mode: SudokuMode;
  size: GridSize;
  difficulty: Difficulty;
  themeId: string;
  symbols: Symbol[];
  solution: Symbol[][];
  givens: (Symbol | null)[][];
  emptyCells: { row: number; col: number }[];
}
