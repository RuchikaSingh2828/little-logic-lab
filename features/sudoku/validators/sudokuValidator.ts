import { getBoxDimensions } from "../lib/boxConfig";
import type { Symbol } from "../types/sudoku.types";

export function isValidPlacement(
  board: (Symbol | null)[][],
  row: number,
  col: number,
  symbol: Symbol,
  size: number
): boolean {
  for (let c = 0; c < size; c++) {
    if (c !== col && board[row][c] === symbol) return false;
  }
  for (let r = 0; r < size; r++) {
    if (r !== row && board[r][col] === symbol) return false;
  }

  const box = getBoxDimensions(size);
  if (box) {
    const startRow = Math.floor(row / box.rows) * box.rows;
    const startCol = Math.floor(col / box.cols) * box.cols;
    for (let r = startRow; r < startRow + box.rows; r++) {
      for (let c = startCol; c < startCol + box.cols; c++) {
        if ((r !== row || c !== col) && board[r][c] === symbol) return false;
      }
    }
  }

  return true;
}

export function isBoardComplete(board: (Symbol | null)[][]): boolean {
  return board.every((row) => row.every((cell) => cell !== null));
}

export function isSolved(
  board: (Symbol | null)[][],
  solution: Symbol[][]
): boolean {
  if (!isBoardComplete(board)) return false;
  return board.every((row, r) =>
    row.every((cell, c) => cell === solution[r][c])
  );
}

export function getInvalidCells(
  board: (Symbol | null)[][],
  size: number
): { row: number; col: number }[] {
  const invalid: { row: number; col: number }[] = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const symbol = board[row][col];
      if (symbol === null) continue;
      if (!isValidPlacement(board, row, col, symbol, size)) {
        invalid.push({ row, col });
      }
    }
  }

  return invalid;
}
