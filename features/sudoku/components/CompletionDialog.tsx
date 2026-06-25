"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GridSize } from "../types/sudoku.types";

interface CompletionDialogProps {
  open: boolean;
  newlyUnlockedSize: GridSize | null;
  onTryAnother: () => void;
  onFinish: () => void;
}

function unlockMessage(size: GridSize): string {
  if (size === 4) {
    return "You unlocked 4×4 puzzles! A few more pictures to place — still just rows and columns.";
  }
  return "You unlocked 5×5 puzzles! Bigger grid, about 10 spaces to fill — you're getting really good!";
}

export function CompletionDialog({
  open,
  newlyUnlockedSize,
  onTryAnother,
  onFinish,
}: CompletionDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-sm rounded-3xl border-sage/30 bg-cream"
        showCloseButton={false}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            🌱 Great work today.
          </DialogTitle>
          <DialogDescription className="sr-only">
            Puzzle completed successfully
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-center text-base text-foreground">
          {newlyUnlockedSize && (
            <p className="rounded-2xl bg-sage/20 px-4 py-3 text-sm font-medium leading-relaxed text-[#3D5A32]">
              🎉 {unlockMessage(newlyUnlockedSize)}
            </p>
          )}

          <p>You practiced:</p>
          <ul className="space-y-2 text-left">
            <li className="flex items-center gap-2">
              <span className="text-sage">✓</span> Pattern Recognition
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sage">✓</span> Logical Thinking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sage">✓</span> Focus
            </li>
          </ul>
          <p className="text-muted-foreground">
            Would you like another puzzle?
          </p>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          <Button
            onClick={onTryAnother}
            className="min-h-12 rounded-xl bg-sky text-foreground hover:bg-sky/80"
          >
            Try Another Puzzle
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onFinish();
              router.push("/");
            }}
            className="min-h-12 rounded-xl border-sage/50 bg-white hover:bg-sage/20"
          >
            Finish For Today
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
