"use client";

import { Leaf, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Difficulty, GridSize } from "../types/sudoku.types";

interface GameStatusBarProps {
  filledCount: number;
  totalEmpty: number;
  gridSize: GridSize;
  difficulty: Difficulty;
  remainingEmpty: number;
  onHintClick: () => void;
  onResetClick: () => void;
  canHint: boolean;
}

function difficultyStars(difficulty: Difficulty): number {
  if (difficulty === "easy") return 1;
  if (difficulty === "medium") return 2;
  return 3;
}

export function GameStatusBar({
  filledCount,
  totalEmpty,
  gridSize,
  difficulty,
  remainingEmpty,
  onHintClick,
  onResetClick,
  canHint,
}: GameStatusBarProps) {
  const difficultyLabel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const stars = difficultyStars(difficulty);

  return (
    <div className="mb-3 flex w-full max-w-full flex-col gap-2.5 rounded-2xl bg-white px-3 py-2.5 shadow-md sm:flex-row sm:items-center sm:gap-3">
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {gridSize}×{gridSize}
          </span>
          <span>
            {filledCount} / {totalEmpty}
          </span>
          <Leaf className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground/80">{difficultyLabel}</span>
          <span className="text-amber-400">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i}>{i < stars ? "★" : "☆"}</span>
            ))}
          </span>
          <Leaf className="h-3 w-3 text-emerald-400" />
        </div>
      </div>

      <div className="flex w-full shrink-0 items-center justify-end gap-2 sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onHintClick}
          disabled={!canHint}
          className="relative h-9 rounded-xl border-amber-300 bg-white px-3 text-xs font-semibold text-amber-700 hover:bg-amber-50 disabled:opacity-50"
          aria-label="Get a hint"
        >
          <Lightbulb className="mr-1 h-3.5 w-3.5" />
          Hint
          {remainingEmpty > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-white">
              {remainingEmpty}
            </span>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetClick}
          className="h-9 rounded-xl border-sky-300 bg-white px-3 text-xs font-semibold text-sky-700 hover:bg-sky-50"
          aria-label="Reset puzzle"
        >
          <RotateCcw className="mr-1 h-3.5 w-3.5" />
          Reset
        </Button>
      </div>
    </div>
  );
}
