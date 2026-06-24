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
      <p className="mb-2.5 text-center text-sm font-medium text-emerald-700">
        <span className="text-emerald-500">✨</span>
        {" "}👆 Drag a picture to the empty space 👆{" "}
        <span className="text-emerald-500">✨</span>
      </p>
      <div
        ref={setNodeRef}
        className={`flex min-h-[5.5rem] flex-wrap items-center justify-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-md transition-colors sm:min-h-[6rem] ${
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
