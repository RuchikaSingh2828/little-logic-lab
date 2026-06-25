"use client";

import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePuzzleProgress } from "@/features/sudoku/hooks/usePuzzleProgress";
import type { GridSize } from "@/features/sudoku/types/sudoku.types";
import {
  DIFFICULTY_STYLES,
  GRID_TIERS,
  type AgeGroup,
  type Difficulty,
} from "./home-data";

function DifficultyPill({
  difficulty,
  href,
  disabled,
}: {
  difficulty: Difficulty;
  href: string;
  disabled?: boolean;
}) {
  const style = DIFFICULTY_STYLES[difficulty];

  if (disabled) {
    return (
      <span
        className={cn(
          "flex cursor-not-allowed items-center justify-center rounded-full border-2 px-2 py-1.5 text-[11px] font-semibold capitalize opacity-40 sm:px-3 sm:py-2 sm:text-xs",
          style.className
        )}
      >
        {style.label}
      </span>
    );
  }

  return (
    <Link href={href} className="block min-w-0">
      <span
        className={cn(
          "flex w-full items-center justify-center rounded-full border-2 px-2 py-1.5 text-[11px] font-semibold capitalize transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] sm:px-3 sm:py-2 sm:text-xs",
          style.className
        )}
      >
        {style.label}
      </span>
    </Link>
  );
}

function AnimalIllustration({
  icon,
  variant,
}: {
  icon: string;
  variant: "active" | "locked";
}) {
  const isActive = variant === "active";

  return (
    <div
      className={cn(
        "flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-5xl sm:h-24 sm:w-24",
        isActive
          ? "bg-gradient-to-b from-amber-50 to-orange-50 shadow-[inset_0_2px_8px_rgba(255,200,100,0.2)]"
          : "bg-[#F5F3EF] grayscale opacity-60"
      )}
    >
      {icon}
    </div>
  );
}

function GridSizeRow({
  hrefPrefix,
  size,
  label,
  description,
  difficulties,
  unlocked,
  solvesNeeded,
  gamesPlayed,
  isNew,
}: {
  hrefPrefix: string;
  size: GridSize;
  label: string;
  description: string;
  difficulties: Difficulty[];
  unlocked: boolean;
  solvesNeeded: number;
  gamesPlayed?: number;
  isNew?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3 sm:p-3.5",
        unlocked
          ? "border-sage/30 bg-[#FAFCF8]"
          : "border-[#E8E4DD] bg-[#FAF8F5]/80"
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0 text-left">
          <div className="flex flex-wrap items-center gap-1.5">
            <h4
              className={cn(
                "text-sm font-bold",
                unlocked ? "text-[#2D2A26]" : "text-[#9A958D]"
              )}
            >
              {label}
            </h4>
            {isNew && unlocked && (
              <span className="rounded-full bg-sage px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                New
              </span>
            )}
          </div>
          <p
            className={cn(
              "mt-0.5 text-[11px] leading-snug sm:text-xs",
              unlocked ? "text-[#5A7A4A]" : "text-[#B0AAA2]"
            )}
          >
            {unlocked
              ? description
              : gamesPlayed !== undefined
                ? `${gamesPlayed} of ${gamesPlayed + solvesNeeded} games played — ${solvesNeeded} more to unlock`
                : `Solve ${solvesNeeded} more puzzle${solvesNeeded === 1 ? "" : "s"} to unlock`}
          </p>
        </div>
        {!unlocked && (
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C4BEB6]" strokeWidth={2.5} />
        )}
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {difficulties.map((difficulty) => (
          <DifficultyPill
            key={difficulty}
            difficulty={difficulty}
            href={`${hrefPrefix}/${size}/${difficulty}`}
            disabled={!unlocked}
          />
        ))}
      </div>
    </div>
  );
}

export function ActiveAgeCard({ group }: { group: AgeGroup }) {
  const difficulties = group.difficulties ?? ["easy", "medium", "hard"];
  const {
    isUnlocked,
    solvesUntilUnlock,
    unlockedSizes,
    solveCount,
    totalGamesPlayed,
  } = usePuzzleProgress(group.mode);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-3xl border-2 border-sage/50 bg-white p-5 text-center shadow-[0_4px_24px_rgba(45,42,38,0.07)] transition-all duration-200",
        "hover:-translate-y-1 hover:border-sage hover:shadow-[0_12px_32px_rgba(45,42,38,0.1)]",
        "sm:p-6"
      )}
    >
      {group.recommended && (
        <span className="absolute left-4 top-4 rounded-full bg-sage px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Recommended
        </span>
      )}

      <div className="flex flex-col items-center pt-4 sm:pt-5">
        <AnimalIllustration icon={group.icon} variant="active" />
        <h3 className="mt-4 text-lg font-bold text-[#2D2A26] sm:text-xl">
          {group.label}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#5A7A4A]">
          {group.description}
        </p>
        <p className="mt-2 text-xs font-medium text-[#7A756D]">
          Games played: {totalGamesPlayed}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2.5 text-left sm:mt-5">
        {GRID_TIERS.map((tier) => {
          const unlocked = isUnlocked(tier.size);
          const justUnlocked =
            unlocked &&
            tier.size > 3 &&
            unlockedSizes[unlockedSizes.length - 1] === tier.size;
          const prerequisiteSize =
            tier.size === 4 ? 3 : tier.size === 5 ? 4 : undefined;

          return (
            <GridSizeRow
              key={tier.size}
              hrefPrefix={group.hrefPrefix}
              size={tier.size}
              label={tier.label}
              description={tier.description}
              difficulties={difficulties}
              unlocked={unlocked}
              solvesNeeded={solvesUntilUnlock(tier.size)}
              gamesPlayed={
                prerequisiteSize !== undefined
                  ? solveCount[prerequisiteSize]
                  : undefined
              }
              isNew={justUnlocked}
            />
          );
        })}
      </div>

      {group.timeEstimate && (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#8A857D]">
          <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
          {group.timeEstimate}
        </p>
      )}
    </article>
  );
}

export function LockedAgeCard({ group }: { group: AgeGroup }) {
  return (
    <Link href="/coming-soon" className="block h-full">
      <article
        className={cn(
          "flex h-full flex-col items-center rounded-3xl border border-[#E8E4DD] bg-[#FAF8F5]/80 p-5 text-center",
          "transition-opacity duration-200 hover:opacity-90 sm:p-6"
        )}
      >
        <AnimalIllustration icon={group.icon} variant="locked" />

        <h3 className="mt-4 text-base font-semibold text-[#9A958D] sm:text-lg">
          {group.label}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-[#B0AAA2]">
          {group.description}
        </p>

        <div className="mt-5 flex flex-col items-center gap-2">
          <Lock className="h-4 w-4 text-[#C4BEB6]" strokeWidth={2.5} />
          <span className="rounded-full border border-[#E8E4DD] bg-white/80 px-3.5 py-1 text-[11px] font-medium text-[#9A958D]">
            Coming Soon
          </span>
        </div>
      </article>
    </Link>
  );
}
