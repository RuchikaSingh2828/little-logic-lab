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

interface CompletionDialogProps {
  open: boolean;
  /** e.g. "4×4 Medium" — shown when leveling up */
  nextLevelLabel: string | null;
  onTryAnother: () => void;
  onFinish: () => void;
}

export function CompletionDialog({
  open,
  nextLevelLabel,
  onTryAnother,
  onFinish,
}: CompletionDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/55 supports-backdrop-filter:backdrop-blur-md"
        className="max-w-sm rounded-3xl border border-white/20 bg-[#1a2332]/75 p-6 text-white shadow-[0_16px_48px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur-xl"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-white">
            🌱 Great work today.
          </DialogTitle>
          <DialogDescription className="sr-only">
            {nextLevelLabel
              ? `Advancing to ${nextLevelLabel}`
              : "Puzzle completed successfully"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-center text-base text-white">
          {nextLevelLabel ? (
            <p className="text-white/90">
              You’re ready for the next level:{" "}
              <span className="font-semibold text-white">{nextLevelLabel}</span>
            </p>
          ) : null}
          <p className="text-white/90">You practiced:</p>
          <ul className="space-y-2 text-left">
            <li className="flex items-center gap-2 text-white">
              <span className="text-[#65B741]">✓</span> Pattern Recognition
            </li>
            <li className="flex items-center gap-2 text-white">
              <span className="text-[#65B741]">✓</span> Logical Thinking
            </li>
            <li className="flex items-center gap-2 text-white">
              <span className="text-[#65B741]">✓</span> Focus
            </li>
          </ul>
          <p className="text-white/70">Would you like another puzzle?</p>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          <Button
            onClick={onTryAnother}
            className="min-h-12 rounded-xl bg-[#65B741] text-white hover:bg-[#57a338]"
          >
            Try Another Puzzle
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onFinish();
              router.push("/");
            }}
            className="min-h-12 rounded-xl border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            Finish For Today
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
