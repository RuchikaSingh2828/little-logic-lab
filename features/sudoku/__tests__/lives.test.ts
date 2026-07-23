import { describe, expect, it } from "vitest";
import { afterWrongPlacement, maxLives } from "../lib/lives";
import type { GridSize } from "../types/sudoku.types";

describe("maxLives", () => {
  it.each([
    [3, 4],
    [4, 5],
    [5, 6],
    [9, 10],
  ] as [GridSize, number][])("size %i → %i lives", (size, expected) => {
    expect(maxLives(size)).toBe(expected);
  });
});

describe("afterWrongPlacement", () => {
  it("increments used lives", () => {
    expect(afterWrongPlacement(0, 4)).toEqual({
      livesUsed: 1,
      outOfLives: false,
    });
  });

  it("flags outOfLives on the last life", () => {
    expect(afterWrongPlacement(3, 4)).toEqual({
      livesUsed: 4,
      outOfLives: true,
    });
  });

  it("does not exceed max", () => {
    expect(afterWrongPlacement(4, 4)).toEqual({
      livesUsed: 4,
      outOfLives: true,
    });
  });
});
