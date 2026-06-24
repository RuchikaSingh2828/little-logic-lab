import { describe, it, expect } from "vitest";
import { generateLatinSquare } from "../generators/latinSquare";
import { generatePicturePuzzle } from "../generators/pictureSudokuGenerator";
import { getEmptyCellCount } from "../levels/difficultyConfig";
import {
  isValidPlacement,
  isSolved,
  isBoardComplete,
} from "../validators/sudokuValidator";

function isValidLatinSquare(grid: string[][]): boolean {
  const size = grid.length;
  const symbols = grid[0];

  for (let row = 0; row < size; row++) {
    const rowSet = new Set(grid[row]);
    if (rowSet.size !== size) return false;
    for (const s of symbols) {
      if (!rowSet.has(s)) return false;
    }
  }

  for (let col = 0; col < size; col++) {
    const colSet = new Set<string>();
    for (let row = 0; row < size; row++) {
      colSet.add(grid[row][col]);
    }
    if (colSet.size !== size) return false;
  }

  return true;
}

describe("latinSquare", () => {
  it("generates valid 2x2 latin square", () => {
    const grid = generateLatinSquare(2, ["🐶", "🐱"]);
    expect(grid).toHaveLength(2);
    expect(isValidLatinSquare(grid)).toBe(true);
  });

  it("generates valid 3x3 latin square", () => {
    const grid = generateLatinSquare(3, ["🐶", "🐱", "🐰"]);
    expect(grid).toHaveLength(3);
    expect(isValidLatinSquare(grid)).toBe(true);
  });
});

describe("pictureSudokuGenerator", () => {
  it("generates puzzle with valid solution", () => {
    const puzzle = generatePicturePuzzle({ size: 3, difficulty: "easy" });
    expect(isValidLatinSquare(puzzle.solution)).toBe(true);
    expect(puzzle.symbols).toHaveLength(3);
  });

  it("produces expected empty cell counts", () => {
    const sizes = [2, 3] as const;
    const difficulties = ["easy", "medium", "hard"] as const;

    for (const size of sizes) {
      for (const difficulty of difficulties) {
        const puzzle = generatePicturePuzzle({ size, difficulty });
        expect(puzzle.emptyCells).toHaveLength(
          getEmptyCellCount(size, difficulty)
        );
      }
    }
  });
});

describe("sudokuValidator", () => {
  const solution = [
    ["🐶", "🐱", "🐰"],
    ["🐱", "🐰", "🐶"],
    ["🐰", "🐶", "🐱"],
  ];

  it("isSolved returns true only for correct board", () => {
    expect(isSolved(solution, solution)).toBe(true);
    const wrong = [
      ["🐶", "🐱", "🐰"],
      ["🐱", "🐰", "🐶"],
      ["🐰", "🐶", "🐱"],
    ];
    wrong[0][0] = "🐱";
    expect(isSolved(wrong, solution)).toBe(false);
  });

  it("isValidPlacement rejects row duplicates", () => {
    const board: (string | null)[][] = [
      ["🐶", "🐱", null],
      [null, null, null],
      [null, null, null],
    ];
    expect(isValidPlacement(board, 0, 2, "🐶", 3)).toBe(false);
    expect(isValidPlacement(board, 0, 2, "🐰", 3)).toBe(true);
  });

  it("isBoardComplete detects filled boards", () => {
    const partial: (string | null)[][] = [
      ["🐶", "🐱", null],
      [null, null, null],
      [null, null, null],
    ];
    expect(isBoardComplete(partial)).toBe(false);
    expect(isBoardComplete(solution)).toBe(true);
  });
});
