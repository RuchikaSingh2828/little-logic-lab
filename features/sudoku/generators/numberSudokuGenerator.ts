// TODO: Number Sudoku generator for ages 6–7 (6×6 and 9×9 grids)

export interface NumberSudokuGeneratorOptions {
  size: 6 | 9;
  difficulty: "easy" | "medium" | "hard";
}

export function generateNumberPuzzle(
  _opts: NumberSudokuGeneratorOptions
): never {
  throw new Error("Number Sudoku generator not yet implemented");
}
