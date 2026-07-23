"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Symbol } from "../types/sudoku.types";
import type { TrayGroup } from "../lib/trayGroups";
import { DraggablePictureCard } from "./PictureCard";

interface PieceTrayProps {
  groups: TrayGroup[];
  selectedPiece: Symbol | null;
  onPieceTap: (symbol: Symbol) => void;
}

export function PieceTray({
  groups,
  selectedPiece,
  onPieceTap,
}: PieceTrayProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "tray" });

  return (
    <div className="w-full">
      <p className="mb-2 text-center text-xs font-medium text-emerald-900 sm:text-sm">
        👆 Tap a picture below, then tap any empty cell to place it.
      </p>
      <div
        ref={setNodeRef}
        className={`flex min-h-[4.5rem] flex-wrap items-end justify-center gap-3 rounded-[1.25rem] bg-white px-3 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-colors sm:min-h-[5rem] sm:gap-4 ${
          isOver ? "ring-2 ring-emerald-300" : ""
        }`}
        role="list"
        aria-label="Picture pieces tray"
      >
        {groups.length === 0 ? (
          <p className="py-2 text-sm text-muted-foreground">All pieces placed</p>
        ) : (
          groups.map((group, index) => (
            <div
              key={group.symbol}
              role="listitem"
              className="flex flex-col items-center gap-1"
            >
              <DraggablePictureCard
                id={`tray-group-${index}`}
                symbol={group.symbol}
                size="sm"
                isSelected={selectedPiece === group.symbol}
                onTap={() => onPieceTap(group.symbol)}
              />
              <span
                className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2F6B1F] px-1.5 text-[11px] font-bold text-white"
                aria-label={`${group.remaining} remaining`}
              >
                {group.remaining}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
