"use client";

import { ChevronsRight, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameActionsProps {
  remainingEmpty: number;
  canHint: boolean;
  onHint: () => void;
  onReset: () => void;
  onNext: () => void;
}

export function GameActions({
  remainingEmpty,
  canHint,
  onHint,
  onReset,
  onNext,
}: GameActionsProps) {
  return (
    <div className="flex w-full items-center justify-center gap-2.5 sm:gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onHint}
        disabled={!canHint}
        className="relative h-10 min-w-[5.5rem] flex-1 rounded-2xl border-2 border-amber-300 bg-white px-3 text-xs font-bold text-amber-700 hover:bg-amber-50 disabled:opacity-50 sm:flex-none sm:min-w-[6.5rem]"
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
        onClick={onReset}
        className="h-10 min-w-[5.5rem] flex-1 rounded-2xl border-2 border-sky-300 bg-white px-3 text-xs font-bold text-sky-700 hover:bg-sky-50 sm:flex-none sm:min-w-[6.5rem]"
        aria-label="Reset puzzle"
      >
        <RotateCcw className="mr-1 h-3.5 w-3.5" />
        Reset
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        className="h-10 min-w-[5.5rem] flex-1 rounded-2xl border-2 border-emerald-400 bg-white px-3 text-xs font-bold text-emerald-700 hover:bg-emerald-50 sm:flex-none sm:min-w-[6.5rem]"
        aria-label="Next puzzle"
      >
        Next
        <ChevronsRight className="ml-0.5 h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
