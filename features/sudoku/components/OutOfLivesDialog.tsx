"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AUTO_RETRY_MS = 1300;

interface OutOfLivesDialogProps {
  open: boolean;
  onTryAgain: () => void;
}

export function OutOfLivesDialog({ open, onTryAgain }: OutOfLivesDialogProps) {
  const onTryAgainRef = useRef(onTryAgain);

  useEffect(() => {
    onTryAgainRef.current = onTryAgain;
  }, [onTryAgain]);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      onTryAgainRef.current();
    }, AUTO_RETRY_MS);
    return () => clearTimeout(id);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/40 supports-backdrop-filter:backdrop-blur-md"
        className="max-w-sm rounded-3xl border border-white/25 bg-[#2a4a32]/55 p-6 text-white shadow-[0_16px_48px_rgba(0,0,0,0.3)] ring-1 ring-white/20 backdrop-blur-xl"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-white">
            Oops! You’re out of turns.
          </DialogTitle>
          <DialogDescription className="text-center text-base text-white/90">
            Let’s try again.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-3">
          <Button
            onClick={onTryAgain}
            className="min-h-12 rounded-xl bg-[#65B741] text-white hover:bg-[#57a338]"
          >
            Try again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
