"use client";

import { getBoxDimensions } from "../lib/boxConfig";
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
  const box = getBoxDimensions(size);

  return (
    <div
      className="rounded-[1.35rem] border-[3px] border-[#65B741]/75 bg-white p-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      role="grid"
      aria-label={`${size} by ${size} sudoku grid`}
      aria-rowcount={size}
      aria-colcount={size}
    >
      <div className="overflow-hidden rounded-[0.95rem] bg-white">
        <div
          className={box ? "grid gap-0" : "grid gap-px bg-[#E5E7EB]/90"}
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          }}
        >
          {board.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              role="row"
              aria-rowindex={rowIndex + 1}
              className="contents"
            >
              {row.map((symbol, colIndex) => {
                const boxEdgeRight =
                  box !== null &&
                  (colIndex + 1) % box.cols === 0 &&
                  colIndex < size - 1;
                const boxEdgeBottom =
                  box !== null &&
                  (rowIndex + 1) % box.rows === 0 &&
                  rowIndex < size - 1;

                return (
                  <GridCell
                    key={`${rowIndex}-${colIndex}`}
                    row={rowIndex}
                    col={colIndex}
                    symbol={symbol}
                    isGiven={givens[rowIndex][colIndex] !== null}
                    gridSize={size}
                    boxEdgeRight={boxEdgeRight}
                    boxEdgeBottom={boxEdgeBottom}
                    showCellHairlines={box !== null}
                    isSelected={
                      selectedPiece !== null &&
                      givens[rowIndex][colIndex] === null &&
                      symbol === null
                    }
                    isShaking={
                      shakingCell?.row === rowIndex &&
                      shakingCell?.col === colIndex
                    }
                    onTap={() => onCellTap(rowIndex, colIndex)}
                    onRemove={() => onCellRemove(rowIndex, colIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
