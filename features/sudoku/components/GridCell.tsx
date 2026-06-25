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
      ? "h-11 w-11 sm:h-12 sm:w-12"
      : gridSize >= 4
        ? "h-14 w-14 sm:h-16 sm:w-16"
        : "h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20";

  const cardSize = gridSize >= 5 ? "sm" : gridSize >= 4 ? "sm" : "md";

  return (
    <button
      ref={setNodeRef}
      onClick={() => {
        if (isGiven) return;
        if (symbol && onRemove) {
          onRemove();
        } else if (onTap) {
          onTap();
        }
      }}
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
      disabled={isGiven}
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
    </button>
  );
}
