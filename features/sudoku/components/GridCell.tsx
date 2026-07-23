"use client";

import { Flower2 } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { PictureCard } from "./PictureCard";

interface GridCellProps {
  row: number;
  col: number;
  symbol: string | null;
  isGiven: boolean;
  gridSize: number;
  /** Box divider on the right — max 2px so it stays thinner than the 3px outer border */
  boxEdgeRight?: boolean;
  boxEdgeBottom?: boolean;
  /** Thin 1px separators when using banded Sudoku layout */
  showCellHairlines?: boolean;
  isSelected?: boolean;
  isShaking?: boolean;
  onTap?: () => void;
  onRemove?: () => void;
}

export function GridCell({
  row,
  col,
  symbol,
  isGiven,
  gridSize,
  boxEdgeRight,
  boxEdgeBottom,
  showCellHairlines,
  isSelected,
  isShaking,
  onTap,
  onRemove,
}: GridCellProps) {
  const id = `cell-${row}-${col}`;
  const { isOver, setNodeRef } = useDroppable({ id, disabled: isGiven });
  const isEmpty = !symbol;

  const cellSizeClass =
    gridSize >= 8
      ? "h-8 w-8 sm:h-9 sm:w-9"
      : gridSize >= 7
        ? "h-9 w-9 sm:h-10 sm:w-10"
        : gridSize >= 6
          ? "h-10 w-10 sm:h-11 sm:w-11"
          : gridSize >= 5
            ? "h-12 w-12 sm:h-[3.25rem] sm:w-[3.25rem]"
            : gridSize >= 4
              ? "h-[4.25rem] w-[4.25rem] sm:h-[4.75rem] sm:w-[4.75rem]"
              : "h-[4.75rem] w-[4.75rem] sm:h-[5.25rem] sm:w-[5.25rem]";

  const cardSize =
    gridSize >= 8 ? "xs" : gridSize >= 6 ? "xs" : gridSize >= 5 ? "sm" : "md";

  return (
    <div
      ref={setNodeRef}
      role="gridcell"
      onClick={() => {
        if (isGiven) return;
        if (symbol && onRemove) {
          onRemove();
        } else if (onTap) {
          onTap();
        }
      }}
      onKeyDown={(event) => {
        if (isGiven) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (symbol && onRemove) {
            onRemove();
          } else if (onTap) {
            onTap();
          }
        }
      }}
      tabIndex={isGiven ? -1 : 0}
      className={cn(
        "relative flex items-center justify-center bg-white p-1 transition-colors",
        cellSizeClass,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-inset",
        isGiven && "cursor-default",
        !isGiven && isEmpty && "cursor-pointer",
        !isGiven && !isEmpty && "cursor-pointer hover:bg-emerald-50/50",
        isOver && !isGiven && "bg-emerald-100/60",
        isShaking && "animate-cell-shake bg-rose-50/60",
        showCellHairlines &&
          !boxEdgeRight &&
          col < gridSize - 1 &&
          "border-r border-r-[#E5E7EB]",
        showCellHairlines &&
          !boxEdgeBottom &&
          row < gridSize - 1 &&
          "border-b border-b-[#E5E7EB]",
        // 2px box lines — thinner than the grid's 3px outer border
        boxEdgeRight && "border-r-2 border-r-[#65B741]/75",
        boxEdgeBottom && "border-b-2 border-b-[#65B741]/75"
      )}
      aria-label={
        isGiven
          ? `Given cell row ${row + 1} column ${col + 1}`
          : symbol
            ? `Cell row ${row + 1} column ${col + 1}, tap to remove`
            : `Empty cell row ${row + 1} column ${col + 1}, drop piece here`
      }
    >
      {isEmpty && !isGiven && (
        <span
          className={cn(
            "absolute inset-1.5 flex items-center justify-center rounded-xl border-2 border-dashed border-[#C5D4C0] bg-[#F7FAF5]",
            isSelected && "border-[#65B741] bg-emerald-50",
            isOver && "border-emerald-400 bg-emerald-100/70"
          )}
          aria-hidden
        >
          <Flower2 className="h-4 w-4 text-[#D5E5D0] sm:h-5 sm:w-5" />
        </span>
      )}
      {symbol && (
        <PictureCard
          symbol={symbol}
          size={cardSize}
          className={cn(
            "relative z-[1] border-0 bg-transparent shadow-none",
            isGiven && "opacity-95"
          )}
        />
      )}
    </div>
  );
}
