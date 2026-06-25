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
  isSelected,
  isShaking,
  onTap,
  onRemove,
}: GridCellProps) {
  const id = `cell-${row}-${col}`;
  const { isOver, setNodeRef } = useDroppable({ id, disabled: isGiven });
  const isEmpty = !symbol;

  const cellSizeClass =
    gridSize >= 5
      ? "h-12 w-12 sm:h-[3.25rem] sm:w-[3.25rem]"
      : gridSize >= 4
        ? "h-[4.25rem] w-[4.25rem] sm:h-[4.75rem] sm:w-[4.75rem]"
        : "h-[4.75rem] w-[4.75rem] sm:h-[5.25rem] sm:w-[5.25rem]";

  const cardSize = gridSize >= 5 ? "sm" : "md";

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
        "relative flex items-center justify-center border border-gray-200/80 bg-white transition-colors",
        cellSizeClass,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-inset",
        isGiven && "cursor-default bg-white",
        !isGiven && isEmpty && "cursor-pointer border-dashed border-emerald-300/80 bg-emerald-50/30",
        !isGiven && !isEmpty && "cursor-pointer hover:bg-emerald-50/40",
        isOver && !isGiven && "border-emerald-400 bg-emerald-100/50",
        isSelected && !isGiven && isEmpty && "border-emerald-500 bg-emerald-50/60",
        isShaking && "animate-cell-shake border-rose-300 bg-rose-50/50"
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
        <Flower2
          className="pointer-events-none absolute h-6 w-6 text-emerald-200/60"
          aria-hidden
        />
      )}
      {symbol && (
        <PictureCard
          symbol={symbol}
          size={cardSize}
          className={cn(
            "border-0 bg-transparent shadow-none",
            isGiven && "opacity-95"
          )}
        />
      )}
    </div>
  );
}
