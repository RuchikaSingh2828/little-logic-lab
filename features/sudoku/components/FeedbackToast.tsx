"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GameFeedback } from "../lib/feedbackMessages";

const DISMISS_MS = 3000;

interface FeedbackToastProps {
  feedback: GameFeedback | null;
  onDismiss: () => void;
}

export function FeedbackToast({ feedback, onDismiss }: FeedbackToastProps) {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => onDismissRef.current(), DISMISS_MS);
    return () => clearTimeout(timer);
  }, [feedback]);

  if (!feedback) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-[5.5rem] left-3 right-3 z-50 mx-auto max-w-lg",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-300",
        "motion-safe:data-[leaving]:animate-out motion-safe:data-[leaving]:fade-out motion-safe:data-[leaving]:slide-out-to-bottom-3"
      )}
    >
      <div
        className={cn(
          "relative flex items-center gap-3 overflow-hidden rounded-2xl border border-amber-200/60 px-3 py-3 shadow-lg",
          "bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 50%, #fde68a 0%, transparent 25%), radial-gradient(circle at 90% 30%, #86efac 0%, transparent 20%), radial-gradient(circle at 70% 80%, #c4b5fd 0%, transparent 18%)",
          }}
        />

        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-200/80 shadow-sm">
          {feedback.variant === "success" ? (
            <Star className="h-6 w-6 fill-amber-400 text-amber-500" />
          ) : (
            <Sparkles className="h-5 w-5 text-amber-600" />
          )}
        </div>

        <div className="relative min-w-0 flex-1">
          <p
            className={cn(
              "text-base font-bold leading-tight",
              feedback.variant === "success"
                ? "text-emerald-600"
                : feedback.variant === "error"
                  ? "text-rose-600"
                  : "text-amber-800"
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
