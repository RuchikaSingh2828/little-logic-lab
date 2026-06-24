"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
}

export function ResetDialog({ open, onOpenChange, onReset }: ResetDialogProps) {
  const handleReset = () => {
    onReset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl border-sky/40 bg-gradient-to-b from-sky/20 to-white">
        <DialogHeader className="items-center text-center">
          <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-sky/40">
            <RotateCcw className="h-6 w-6 text-sky-700" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            Reset
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Start this puzzle again?
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={handleReset}
          className="min-h-12 w-full rounded-full bg-sky text-base font-semibold text-foreground hover:bg-sky/80"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset Puzzle
        </Button>
      </DialogContent>
    </Dialog>
  );
}
