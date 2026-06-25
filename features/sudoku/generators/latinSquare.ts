import type { Symbol } from "../types/sudoku.types";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isValidInColumn(grid: Symbol[][], col: number, symbol: Symbol): boolean {
  for (let row = 0; row < grid.length; row++) {
    if (grid[row][col] === symbol) return false;
  }
  return true;
}

function fillGrid(
  grid: Symbol[][],
  symbols: Symbol[],
  row: number,
  size: number
): boolean {
  if (row === size) return true;

  for (const perm of permutations(symbols)) {
    const valid = perm.every((symbol, col) =>
      isValidInColumn(grid, col, symbol)
    );
    if (!valid) continue;

    grid[row] = [...perm];
    if (fillGrid(grid, symbols, row + 1, size)) return true;
  }

  return false;
}

function permutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

function generateCyclicLatinSquare(size: number, symbols: Symbol[]): Symbol[][] {
  const syms = symbols.slice(0, size);
  const grid: Symbol[][] = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => syms[(row + col) % size])
  );

  const rowOrder = shuffle(Array.from({ length: size }, (_, i) => i));
  const shuffledRows = rowOrder.map((row) => grid[row]);

  const colOrder = shuffle(Array.from({ length: size }, (_, i) => i));
  return shuffledRows.map((row) => colOrder.map((col) => row[col]));
}

export function generateLatinSquare(
  size: number,
  symbols: Symbol[]
): Symbol[][] {
  if (size >= 4) {
    return generateCyclicLatinSquare(size, symbols);
  }

  const grid: Symbol[][] = Array.from({ length: size }, () =>
    Array<Symbol>(size).fill("")
  );
  const shuffled = shuffle(symbols.slice(0, size));

  if (!fillGrid(grid, shuffled, 0, size)) {
    throw new Error("Failed to generate latin square");
  }

  return grid;
}
