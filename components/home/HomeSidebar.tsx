"use client";

import Link from "next/link";
import { ChevronRight, Puzzle, Users } from "lucide-react";
import { usePuzzleProgress } from "@/features/sudoku/hooks/usePuzzleProgress";
import { getSessionMinutes } from "@/features/sudoku/lib/sessionStorage";
import { useEffect, useState } from "react";

export function HomeSidebar() {
  const picture = usePuzzleProgress("picture");
  const shape = usePuzzleProgress("shape");
  const number = usePuzzleProgress("number");
  const totalSolved =
    picture.totalGamesPlayed + shape.totalGamesPlayed + number.totalGamesPlayed;
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setMinutes(getSessionMinutes());
  }, []);

  const continueHref =
    totalSolved === 0
      ? "/sudoku/picture/3/easy"
      : number.totalGamesPlayed > 0
        ? "/sudoku/number/7/easy"
        : shape.totalGamesPlayed > 0
          ? "/sudoku/shape/4/easy"
          : "/sudoku/picture/3/easy";

  const continueLabel =
    totalSolved === 0 ? "3×3 Picture — Starter" : "Continue your path";

  return (
    <aside className="flex w-full flex-col gap-4 lg:max-w-[280px] lg:shrink-0">
      <section className="rounded-[1.25rem] border border-[#E8E4DC] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <h2 className="font-heading text-sm font-bold text-[#2D3748]">
          Continue Learning
        </h2>
        <div className="mt-3 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF6E3] text-[#65B741]">
            <Puzzle className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold whitespace-nowrap text-[#2D3748]">
              {continueLabel}
            </p>
            <p className="text-xs text-[#6B7280]">
              {totalSolved === 0
                ? "Start with Picture Sudoku"
                : `${totalSolved} puzzles solved on this device`}
            </p>
          </div>
        </div>
        <Link
          href={continueHref}
          className="mt-3 flex min-h-11 w-full items-center justify-center gap-1 rounded-xl border-2 border-[#2F6B1F] px-3 py-2 text-sm font-bold text-[#2F6B1F] transition-colors hover:bg-[#EAF6E3]"
        >
          {totalSolved === 0 ? "Start Picture Sudoku" : "Continue playing"}
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </section>

      <section className="rounded-[1.25rem] border border-[#E8E4DC] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <h2 className="font-heading text-sm font-bold text-[#2D3748]">
          Your Quick Stats
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-[#F0EBE3] bg-[#FFFCFA] p-2.5">
            <p className="font-heading text-sm font-extrabold tabular-nums text-[#2D3748]">
              {totalSolved}
            </p>
            <p className="text-[10px] font-medium text-[#6B7280]">
              Puzzles Solved
            </p>
          </div>
          <div className="rounded-xl border border-[#F0EBE3] bg-[#FFFCFA] p-2.5">
            <p className="font-heading text-sm font-extrabold tabular-nums text-[#2D3748]">
              {minutes}m
            </p>
            <p className="text-[10px] font-medium text-[#6B7280]">
              Today&apos;s Play
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[1.25rem] bg-[#EAF6E3] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <p className="text-sm font-semibold leading-snug text-[#2D3748]">
          Parents, track detailed progress in the Parent Zone.
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <Link
            href="/parents"
            className="inline-flex min-h-11 items-center rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#2F6B1F] shadow-sm transition-colors hover:bg-[#F7FBF4]"
          >
            Go to Parent Zone
          </Link>
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-[#65B741]"
            aria-hidden
          >
            <Users className="h-6 w-6" strokeWidth={2.2} />
          </span>
        </div>
      </section>
    </aside>
  );
}
