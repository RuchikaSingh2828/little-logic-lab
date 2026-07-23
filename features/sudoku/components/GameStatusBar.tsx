"use client";

import { Heart } from "lucide-react";
import type { Difficulty, GridSize } from "../types/sudoku.types";

interface GameStatusBarProps {
  livesUsed: number;
  livesMax: number;
  gridSize: GridSize;
  difficulty: Difficulty;
}

function difficultyStars(difficulty: Difficulty): number {
  if (difficulty === "easy") return 1;
  if (difficulty === "medium") return 2;
  return 3;
}

export function GameStatusBar({
  livesUsed,
  livesMax,
  gridSize,
  difficulty,
}: GameStatusBarProps) {
  const difficultyLabel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const stars = difficultyStars(difficulty);

  return (
    <div className="mb-2 flex w-full items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <span className="shrink-0 rounded-full bg-[#65B741] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
        {gridSize}×{gridSize}
      </span>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 text-sm">
        <span className="font-semibold text-[#5C4033]">{difficultyLabel}</span>
        <span className="tracking-tight text-amber-400" aria-hidden>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>{i < stars ? "★" : "☆"}</span>
          ))}
        </span>
      </div>

      <span
        className="flex shrink-0 items-center gap-1 text-sm font-bold tabular-nums"
        aria-label={`${livesUsed} of ${livesMax} lives used`}
      >
        <Heart
          className="h-4 w-4 fill-[#E85D5D] text-[#E85D5D]"
          aria-hidden
        />
        <span className="text-[#E85D5D]">{livesUsed}</span>
        <span className="text-[#5C4033]">/</span>
        <span className="text-[#65B741]">{livesMax}</span>
      </span>
    </div>
  );
}
