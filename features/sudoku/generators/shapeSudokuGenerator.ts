// TODO: Shape Sudoku generator for ages 5–6 (4×4 grids with shapes/colors)

export interface ShapeSudokuGeneratorOptions {
  size: 4;
  difficulty: "easy" | "medium" | "hard";
}

export function generateShapePuzzle(
  _opts: ShapeSudokuGeneratorOptions
): never {
  throw new Error("Shape Sudoku generator not yet implemented");
}
