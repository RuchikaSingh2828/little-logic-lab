"use client";

import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShowHint: () => void;
  canHint: boolean;
}

export function HintDialog({
  open,
  onOpenChange,
  onShowHint,
  canHint,
}: HintDialogProps) {
  const handleShowHint = () => {
    onShowHint();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl border-amber-200/60 bg-gradient-to-b from-amber-50 to-yellow-50">
        <DialogHeader className="items-center text-center">
          <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-amber-200/80">
            <Sparkles className="h-6 w-6 text-amber-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-amber-900">
            Hint
          </DialogTitle>
          <DialogDescription className="text-base text-amber-800/80">
            Look at the row and column. Which picture is missing?
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={handleShowHint}
          disabled={!canHint}
          className="min-h-12 w-full rounded-full bg-emerald-500 text-base font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
        >
          <Search className="mr-2 h-5 w-5" />
          Show Hint
        </Button>
      </DialogContent>
    </Dialog>
  );
}
