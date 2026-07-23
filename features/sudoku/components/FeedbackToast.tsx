"use client";

import { useEffect, useRef } from "react";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GameFeedback } from "../lib/feedbackMessages";

const DISMISS_MS = 1800;
const SUCCESS_DISMISS_MS = 1200;

interface FeedbackToastProps {
  feedback: GameFeedback | null;
  onDismiss: () => void;
}

export function FeedbackToast({ feedback, onDismiss }: FeedbackToastProps) {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!feedback) return;
    const ms =
      feedback.variant === "success" ? SUCCESS_DISMISS_MS : DISMISS_MS;
    const timer = setTimeout(() => onDismissRef.current(), ms);
    return () => clearTimeout(timer);
  }, [feedback]);

  if (!feedback) return null;

  if (feedback.variant === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Correct"
        className="pointer-events-none fixed inset-x-0 bottom-28 z-50 flex justify-center"
      >
        <span
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
            "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-75 motion-safe:duration-200"
          )}
        >
          👍
        </span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-[5.5rem] left-3 right-3 z-50 mx-auto max-w-lg",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-300"
      )}
    >
      <div
        className={cn(
          "relative flex items-center gap-3 overflow-hidden rounded-2xl border border-amber-200/60 px-3 py-3 shadow-lg",
          "bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50"
        )}
      >
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-200/80 shadow-sm">
          <Sparkles className="h-5 w-5 text-amber-600" />
        </div>

        <div className="relative min-w-0 flex-1">
          <p
            className={cn(
              "text-base font-bold leading-tight",
              feedback.variant === "error" ? "text-rose-600" : "text-amber-800"
            )}
          >
            {feedback.title}
          </p>
          {feedback.subtitle && (
            <p className="text-sm text-amber-900/70">{feedback.subtitle}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="relative shrink-0 rounded-lg p-1.5 text-amber-900/40 hover:bg-amber-100/80 hover:text-amber-900/70"
          aria-label="Dismiss message"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
