export type GridSize = 2 | 3 | 4 | 5;
export type Difficulty = "easy" | "medium" | "hard";
export type Symbol = string;

export interface Puzzle {
  id: string;
  size: GridSize;
  difficulty: Difficulty;
  themeId: string;
  symbols: Symbol[];
  solution: Symbol[][];
  givens: (Symbol | null)[][];
  emptyCells: { row: number; col: number }[];
}
