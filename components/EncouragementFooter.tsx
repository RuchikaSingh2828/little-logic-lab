"use client";

import { useMemo } from "react";
import { Sprout } from "lucide-react";
import { getRandomEncouragementQuote } from "@/lib/encouragementQuotes";

interface EncouragementFooterProps {
  /** Change this to pick a fresh quote (e.g. puzzle id, route, session). */
  refreshKey?: string | number;
  className?: string;
}

export function EncouragementFooter({
  refreshKey = "default",
  className,
}: EncouragementFooterProps) {
  const quote = useMemo(
    () => getRandomEncouragementQuote(),
    [refreshKey]
  );

  return (
    <footer
      className={
        className ??
        "mt-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-500/90 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm"
      }
    >
      <Sprout className="h-4 w-4 shrink-0" aria-hidden />
      <span>{quote}</span>
    </footer>
  );
}
