import { describe, expect, it } from "vitest";
import { buildTray, buildTrayGroups } from "../lib/trayGroups";
import type { Puzzle } from "../types/sudoku.types";

function makePuzzle(overrides: Partial<Puzzle> = {}): Puzzle {
  const solution = [
    ["🌲", "🌴", "🌳"],
    ["🌴", "🌳", "🌲"],
    ["🌳", "🌲", "🌴"],
  ];
  const givens = [
    ["🌲", null, "🌳"],
    [null, "🌳", null],
    ["🌳", null, "🌴"],
  ];
  return {
    id: "test-1",
    mode: "picture",
    size: 3,
    difficulty: "easy",
    solution,
    givens,
    emptyCells: [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 2, col: 1 },
    ],
    ...overrides,
  };
}

describe("buildTrayGroups", () => {
  it("groups remaining symbols with counts", () => {
    const puzzle = makePuzzle();
    const board = puzzle.givens.map((row) => [...row]);
    const groups = buildTrayGroups(puzzle, board);

    const bySymbol = Object.fromEntries(
      groups.map((g) => [g.symbol, g.remaining])
    );
    // empty solutions: (0,1)=🌴, (1,0)=🌴, (1,2)=🌲, (2,1)=🌲
    expect(bySymbol["🌴"]).toBe(2);
    expect(bySymbol["🌲"]).toBe(2);
    expect(bySymbol["🌳"]).toBeUndefined();
  });

  it("decrements remaining after a correct place", () => {
    const puzzle = makePuzzle();
    const board = puzzle.givens.map((row) => [...row]);
    board[0][1] = "🌴";

    const groups = buildTrayGroups(puzzle, board);
    const palm = groups.find((g) => g.symbol === "🌴");
    expect(palm?.remaining).toBe(1);
  });

  it("removes a symbol when remaining hits zero", () => {
    const puzzle = makePuzzle();
    const board = puzzle.givens.map((row) => [...row]);
    board[0][1] = "🌴";
    board[1][0] = "🌴";

    const groups = buildTrayGroups(puzzle, board);
    expect(groups.some((g) => g.symbol === "🌴")).toBe(false);
  });

  it("buildTray expands groups into a flat list", () => {
    const puzzle = makePuzzle();
    const board = puzzle.givens.map((row) => [...row]);
    const flat = buildTray(puzzle, board);
    expect(flat.filter((s) => s === "🌴")).toHaveLength(2);
    expect(flat.filter((s) => s === "🌲")).toHaveLength(2);
  });
});
