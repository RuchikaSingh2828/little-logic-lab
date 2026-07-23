import type { Puzzle, Symbol } from "../types/sudoku.types";

export interface TrayGroup {
  symbol: Symbol;
  remaining: number;
}

/** Remaining placements needed per symbol (empty cells only). */
export function buildTrayGroups(
  puzzle: Puzzle,
  board: (Symbol | null)[][]
): TrayGroup[] {
  const needed = new Map<Symbol, number>();

  for (const { row, col } of puzzle.emptyCells) {
    const symbol = puzzle.solution[row][col];
    needed.set(symbol, (needed.get(symbol) ?? 0) + 1);
  }

  for (const { row, col } of puzzle.emptyCells) {
    const placed = board[row][col];
    if (placed !== null) {
      needed.set(placed, (needed.get(placed) ?? 0) - 1);
    }
  }

  const groups: TrayGroup[] = [];
  for (const [symbol, remaining] of needed) {
    if (remaining > 0) {
      groups.push({ symbol, remaining });
    }
  }
  return groups;
}

/** Flat tray (one entry per remaining placement) — for legacy callers. */
export function buildTray(
  puzzle: Puzzle,
  board: (Symbol | null)[][]
): Symbol[] {
  const tray: Symbol[] = [];
  for (const { symbol, remaining } of buildTrayGroups(puzzle, board)) {
    for (let i = 0; i < remaining; i++) {
      tray.push(symbol);
    }
  }
  return tray;
}
