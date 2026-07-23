import { getBoxDimensions } from "../lib/boxConfig";
import type { Symbol } from "../types/sudoku.types";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isSafe(
  grid: (Symbol | null)[][],
  row: number,
  col: number,
  symbol: Symbol,
  size: number
): boolean {
  for (let c = 0; c < size; c++) {
    if (grid[row][c] === symbol) return false;
  }
  for (let r = 0; r < size; r++) {
    if (grid[r][col] === symbol) return false;
  }

  const box = getBoxDimensions(size);
  if (box) {
    const startRow = Math.floor(row / box.rows) * box.rows;
    const startCol = Math.floor(col / box.cols) * box.cols;
    for (let r = startRow; r < startRow + box.rows; r++) {
      for (let c = startCol; c < startCol + box.cols; c++) {
        if (grid[r][c] === symbol) return false;
      }
    }
  }

  return true;
}

function findEmpty(
  grid: (Symbol | null)[][],
  size: number
): { row: number; col: number } | null {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === null) return { row, col };
    }
  }
  return null;
}

function fill(
  grid: (Symbol | null)[][],
  symbols: Symbol[],
  size: number
): boolean {
  const empty = findEmpty(grid, size);
  if (!empty) return true;

  const { row, col } = empty;
  for (const symbol of shuffle(symbols)) {
    if (!isSafe(grid, row, col, symbol, size)) continue;
    grid[row][col] = symbol;
    if (fill(grid, symbols, size)) return true;
    grid[row][col] = null;
  }
  return false;
}

/** Full grid obeying row, column, and (when configured) box uniqueness. */
export function generateSudokuGrid(
  size: number,
  symbols: Symbol[]
): Symbol[][] {
  const syms = symbols.slice(0, size);
  const grid: (Symbol | null)[][] = Array.from({ length: size }, () =>
    Array<Symbol | null>(size).fill(null)
  );

  if (!fill(grid, syms, size)) {
    throw new Error(`Failed to generate sudoku grid of size ${size}`);
  }

  return grid as Symbol[][];
}
