import { describe, it, expect, beforeEach, vi } from "vitest";
import { generateLatinSquare } from "../generators/latinSquare";
import { generatePicturePuzzle } from "../generators/pictureSudokuGenerator";
import { generateShapePuzzle } from "../generators/shapeSudokuGenerator";
import { generateNumberPuzzle } from "../generators/numberSudokuGenerator";
import { getEmptyCellCount } from "../levels/difficultyConfig";
import { countPlacedCells } from "../lib/boardProgress";
import {
  getLevelSolveCount,
  getSolveCount,
  getTotalGamesPlayed,
  getUnlockedGridSizes,
  isGridSizeUnlocked,
  recordPuzzleSolve,
  solvesUntilUnlock,
} from "../lib/progressStorage";
import { getNextLevel } from "../lib/levelProgression";
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

function isValidSudoku(grid: string[][]): boolean {
  const size = grid.length;
  if (!isValidLatinSquare(grid)) return false;

  const box =
    size === 4
      ? { rows: 2, cols: 2 }
      : size === 6
        ? { rows: 2, cols: 3 }
        : size === 9
          ? { rows: 3, cols: 3 }
          : null;
  if (!box) return true;

  for (let br = 0; br < size; br += box.rows) {
    for (let bc = 0; bc < size; bc += box.cols) {
      const seen = new Set<string>();
      for (let r = br; r < br + box.rows; r++) {
        for (let c = bc; c < bc + box.cols; c++) {
          seen.add(grid[r][c]);
        }
      }
      if (seen.size !== size) return false;
    }
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

describe("sudokuGrid", () => {
  it("generates valid boxed sudoku for 4, 6, and 9", async () => {
    const { generateSudokuGrid } = await import("../generators/sudokuGrid");
    const symbols4 = ["1", "2", "3", "4"];
    const symbols6 = ["1", "2", "3", "4", "5", "6"];
    const symbols9 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    expect(isValidSudoku(generateSudokuGrid(4, symbols4))).toBe(true);
    expect(isValidSudoku(generateSudokuGrid(6, symbols6))).toBe(true);
    expect(isValidSudoku(generateSudokuGrid(9, symbols9))).toBe(true);
  });
});

describe("pictureSudokuGenerator", () => {
  it("generates puzzle with valid solution", () => {
    const puzzle = generatePicturePuzzle({ size: 3, difficulty: "easy" });
    expect(isValidLatinSquare(puzzle.solution)).toBe(true);
    expect(puzzle.symbols).toHaveLength(3);
    expect(puzzle.mode).toBe("picture");
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

describe("shapeSudokuGenerator", () => {
  it("generates puzzle with valid solution", () => {
    const puzzle = generateShapePuzzle({ size: 4, difficulty: "easy" });
    expect(isValidSudoku(puzzle.solution)).toBe(true);
    expect(puzzle.symbols).toHaveLength(4);
    expect(puzzle.mode).toBe("shape");
  });

  it.each([4, 5, 6] as const)("supports %sx%s shape grids", (size) => {
    const puzzle = generateShapePuzzle({ size, difficulty: "medium" });
    expect(
      size === 5 ? isValidLatinSquare(puzzle.solution) : isValidSudoku(puzzle.solution)
    ).toBe(true);
    expect(puzzle.symbols).toHaveLength(size);
    expect(puzzle.size).toBe(size);
  });
});

describe("numberSudokuGenerator", () => {
  it("generates puzzle with numeric symbols", () => {
    const puzzle = generateNumberPuzzle({ size: 7, difficulty: "medium" });
    expect(isValidLatinSquare(puzzle.solution)).toBe(true);
    expect(puzzle.symbols).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
    expect(puzzle.mode).toBe("number");
  });

  it("supports adult-style 7x7, 8x8, and 9x9 grids", () => {
    for (const size of [7, 8, 9] as const) {
      const puzzle = generateNumberPuzzle({ size, difficulty: "easy" });
      expect(puzzle.size).toBe(size);
      expect(puzzle.symbols).toHaveLength(size);
      expect(
        size === 9
          ? isValidSudoku(puzzle.solution)
          : isValidLatinSquare(puzzle.solution)
      ).toBe(true);
      expect(puzzle.emptyCells).toHaveLength(getEmptyCellCount(size, "easy"));
    }
  });
});

describe("boardProgress", () => {
  it("counts placed cells from givens and board", () => {
    const puzzle = generatePicturePuzzle({ size: 3, difficulty: "hard" });
    const board = puzzle.givens.map((row) => [...row]);

    expect(countPlacedCells(puzzle.givens, board, puzzle.size)).toEqual({
      placed: 0,
      total: 6,
    });

    const { row, col } = puzzle.emptyCells[0];
    board[row][col] = puzzle.solution[row][col];

    expect(countPlacedCells(puzzle.givens, board, puzzle.size)).toEqual({
      placed: 1,
      total: 6,
    });
  });
});

describe("progressStorage", () => {
  const mode = "picture" as const;

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

  it("treats 3x3, 4x4, and 5x5 as unlocked immediately for picture mode", () => {
    expect(isGridSizeUnlocked(mode, 3)).toBe(true);
    expect(isGridSizeUnlocked(mode, 4)).toBe(true);
    expect(isGridSizeUnlocked(mode, 5)).toBe(true);
    expect(solvesUntilUnlock(mode, 4)).toBe(0);
    expect(getUnlockedGridSizes(mode)).toEqual([3, 4, 5]);
  });

  it("unlocks 4x4, 5x5, and 6x6 for shape mode (no 3x3)", () => {
    expect(isGridSizeUnlocked("shape", 3)).toBe(false);
    expect(isGridSizeUnlocked("shape", 4)).toBe(true);
    expect(isGridSizeUnlocked("shape", 5)).toBe(true);
    expect(isGridSizeUnlocked("shape", 6)).toBe(true);
    expect(getUnlockedGridSizes("shape")).toEqual([4, 5, 6]);
  });

  it("unlocks adult-style 7x7, 8x8, and 9x9 for number mode", () => {
    expect(isGridSizeUnlocked("number", 5)).toBe(false);
    expect(isGridSizeUnlocked("number", 7)).toBe(true);
    expect(isGridSizeUnlocked("number", 8)).toBe(true);
    expect(isGridSizeUnlocked("number", 9)).toBe(true);
    expect(getUnlockedGridSizes("number")).toEqual([7, 8, 9]);
  });

  it("records solves without emitting unlock events", () => {
    expect(recordPuzzleSolve(mode, 3)).toBe(null);
    expect(recordPuzzleSolve(mode, 3)).toBe(null);
    expect(getSolveCount(mode, 3)).toBe(2);
    expect(recordPuzzleSolve(mode, 4)).toBe(null);
    expect(getSolveCount(mode, 4)).toBe(1);
  });

  it("tracks total games played and ignores duplicate puzzle ids", () => {
    recordPuzzleSolve(mode, 3, "puzzle-a");
    recordPuzzleSolve(mode, 3, "puzzle-a");
    recordPuzzleSolve(mode, 3, "puzzle-b");

    expect(getTotalGamesPlayed(mode)).toBe(2);
    expect(getSolveCount(mode, 3)).toBe(2);
  });

  it("keeps progress separate per mode", () => {
    recordPuzzleSolve("picture", 3);
    recordPuzzleSolve("shape", 4);
    recordPuzzleSolve("shape", 4);

    expect(getSolveCount("picture", 3)).toBe(1);
    expect(getSolveCount("shape", 4)).toBe(2);
    expect(isGridSizeUnlocked("shape", 4)).toBe(true);
    expect(isGridSizeUnlocked("picture", 4)).toBe(true);
  });

  it("recovers from malformed progress data in localStorage", () => {
    localStorage.setItem("lll_puzzle_progress_picture", "{}");

    recordPuzzleSolve(mode, 3, "puzzle-c");

    expect(getSolveCount(mode, 3)).toBe(1);
    expect(getTotalGamesPlayed(mode)).toBe(1);
  });

  it("tracks solves per size and difficulty level", () => {
    recordPuzzleSolve(mode, 3, "a", "easy");
    recordPuzzleSolve(mode, 3, "b", "easy");
    recordPuzzleSolve(mode, 3, "c", "medium");

    expect(getLevelSolveCount(mode, 3, "easy")).toBe(2);
    expect(getLevelSolveCount(mode, 3, "medium")).toBe(1);
    expect(getSolveCount(mode, 3)).toBe(3);
  });
});

describe("levelProgression", () => {
  it("steps difficulty then grid size", () => {
    expect(getNextLevel("picture", 3, "easy")).toEqual({
      size: 3,
      difficulty: "medium",
      advanced: true,
    });
    expect(getNextLevel("picture", 3, "hard")).toEqual({
      size: 4,
      difficulty: "easy",
      advanced: true,
    });
    expect(getNextLevel("picture", 5, "hard")).toEqual({
      size: 5,
      difficulty: "hard",
      advanced: false,
    });
    expect(getNextLevel("shape", 6, "hard")).toEqual({
      size: 6,
      difficulty: "hard",
      advanced: false,
    });
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

  it("isValidPlacement rejects box duplicates on 4x4", () => {
    const board: (string | null)[][] = [
      ["1", "2", null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(isValidPlacement(board, 1, 0, "1", 4)).toBe(false);
    expect(isValidPlacement(board, 1, 0, "3", 4)).toBe(true);
    expect(isValidPlacement(board, 2, 2, "1", 4)).toBe(true);
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
