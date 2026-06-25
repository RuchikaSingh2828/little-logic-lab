"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Symbol } from "../types/sudoku.types";
import { DraggablePictureCard } from "./PictureCard";

interface PieceTrayProps {
  pieces: Symbol[];
  selectedPiece: Symbol | null;
  onPieceTap: (symbol: Symbol) => void;
}

export function PieceTray({
  pieces,
  selectedPiece,
  onPieceTap,
}: PieceTrayProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "tray" });

  return (
    <div className="w-full">
      <p className="mb-1.5 text-center text-xs font-medium text-emerald-700 sm:text-sm">
        <span className="text-emerald-500">✨</span>
        {" "}👆 Drag a picture to the empty space 👆{" "}
        <span className="text-emerald-500">✨</span>
      </p>
      <div
        ref={setNodeRef}
        className={`flex min-h-[4.25rem] flex-wrap items-center justify-center gap-2.5 rounded-2xl bg-white px-3 py-3 shadow-md transition-colors sm:min-h-[4.75rem] sm:gap-3 ${
          isOver ? "ring-2 ring-emerald-300" : ""
        }`}
        role="list"
        aria-label="Picture pieces tray"
      >
        {pieces.length === 0 ? (
          <p className="text-sm text-muted-foreground">All pieces placed</p>
        ) : (
          pieces.map((symbol, index) => (
            <div key={`${symbol}-${index}`} role="listitem">
              <DraggablePictureCard
                id={`tray-piece-${index}`}
                symbol={symbol}
                size="sm"
                isSelected={selectedPiece === symbol}
                onTap={() => onPieceTap(symbol)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
