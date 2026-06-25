import { describe, it, expect, beforeEach, vi } from "vitest";
import { generateLatinSquare } from "../generators/latinSquare";
import { generatePicturePuzzle } from "../generators/pictureSudokuGenerator";
import { getEmptyCellCount } from "../levels/difficultyConfig";
import {
  getSolveCount,
  isGridSizeUnlocked,
  recordPuzzleSolve,
  solvesUntilUnlock,
} from "../lib/progressStorage";
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

  it("generates valid 4x4 and 5x5 latin squares", () => {
    const symbols4 = ["🐶", "🐱", "🐰", "🐻"];
    const symbols5 = ["🐶", "🐱", "🐰", "🐻", "🦊"];

    expect(isValidLatinSquare(generateLatinSquare(4, symbols4))).toBe(true);
    expect(isValidLatinSquare(generateLatinSquare(5, symbols5))).toBe(true);
  });
});

describe("pictureSudokuGenerator", () => {
  it("generates puzzle with valid solution", () => {
    const puzzle = generatePicturePuzzle({ size: 3, difficulty: "easy" });
    expect(isValidLatinSquare(puzzle.solution)).toBe(true);
    expect(puzzle.symbols).toHaveLength(3);
  });

  it("produces expected empty cell counts", () => {
    const sizes = [2, 3, 4, 5] as const;
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

  it("uses 10 empty cells for 5x5 medium (kid-friendly step up)", () => {
    const puzzle = generatePicturePuzzle({ size: 5, difficulty: "medium" });
    expect(puzzle.emptyCells).toHaveLength(10);
  });
});

describe("progressStorage", () => {
  beforeEach(() => {
    vi.stubGlobal("window", { dispatchEvent: vi.fn() });
    vi.stubGlobal("localStorage", {
      store: {} as Record<string, string>,
      getItem(key: string) {
        return this.store[key] ?? null;
      },
      setItem(key: string, value: string) {
        this.store[key] = value;
      },
    });
  });

  it("unlocks 4x4 after 2 solves on 3x3", () => {
    expect(isGridSizeUnlocked(4)).toBe(false);
    expect(solvesUntilUnlock(4)).toBe(2);

    recordPuzzleSolve(3);
    expect(isGridSizeUnlocked(4)).toBe(false);
    expect(solvesUntilUnlock(4)).toBe(1);

    const unlocked = recordPuzzleSolve(3);
    expect(unlocked).toBe(4);
    expect(isGridSizeUnlocked(4)).toBe(true);
    expect(getSolveCount(3)).toBe(2);
  });

  it("unlocks 5x5 after 2 solves on 4x4", () => {
    recordPuzzleSolve(3);
    recordPuzzleSolve(3);

    recordPuzzleSolve(4);
    expect(isGridSizeUnlocked(5)).toBe(false);

    const unlocked = recordPuzzleSolve(4);
    expect(unlocked).toBe(5);
    expect(isGridSizeUnlocked(5)).toBe(true);
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
