"use client";

import type { Symbol } from "../types/sudoku.types";
import { GridCell } from "./GridCell";

interface PuzzleGridProps {
  board: (Symbol | null)[][];
  givens: (Symbol | null)[][];
  size: number;
  selectedPiece: Symbol | null;
  shakingCell: { row: number; col: number } | null;
  onCellTap: (row: number, col: number) => void;
  onCellRemove: (row: number, col: number) => void;
}

export function PuzzleGrid({
  board,
  givens,
  size,
  selectedPiece,
  shakingCell,
  onCellTap,
  onCellRemove,
}: PuzzleGridProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl border-[3px] border-emerald-300 bg-white p-0 shadow-md"
      role="grid"
      aria-label={`${size} by ${size} picture sudoku grid`}
    >
      <div
        className="inline-grid"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((symbol, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              symbol={symbol}
              isGiven={givens[rowIndex][colIndex] !== null}
              gridSize={size}
              isSelected={
                selectedPiece !== null &&
                givens[rowIndex][colIndex] === null &&
                symbol === null
              }
              isShaking={
                shakingCell?.row === rowIndex && shakingCell?.col === colIndex
              }
              onTap={() => onCellTap(rowIndex, colIndex)}
              onRemove={() => onCellRemove(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}
