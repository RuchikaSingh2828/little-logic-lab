"use client";

import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePuzzleProgress } from "@/features/sudoku/hooks/usePuzzleProgress";
import {
  DIFFICULTY_STYLES,
  PICTURE_GRID_TIERS,
  type AgeGroup,
  type Difficulty,
  type PictureGridSize,
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
          "flex min-w-0 flex-1 cursor-not-allowed items-center justify-center rounded-full border-2 px-3 py-2 text-xs font-semibold capitalize opacity-40 sm:text-sm",
          style.className
        )}
      >
        {style.label}
      </span>
    );
  }

  return (
    <Link href={href} className="min-w-0 flex-1">
      <span
        className={cn(
          "flex w-full items-center justify-center rounded-full border-2 px-3 py-2 text-xs font-semibold capitalize transition-colors sm:text-sm",
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
  locked,
  large,
}: {
  icon: string;
  locked?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        large ? "h-20 w-20 text-5xl sm:h-24 sm:w-24" : "h-16 w-16 text-4xl",
        locked
          ? "bg-[#F5F3EF] grayscale opacity-70"
          : "bg-gradient-to-b from-amber-50 to-orange-50"
      )}
    >
      {icon}
    </div>
  );
}

function GridSizeRow({
  size,
  label,
  description,
  difficulties,
  unlocked,
  solvesNeeded,
  isNew,
}: {
  size: PictureGridSize;
  label: string;
  description: string;
  difficulties: Difficulty[];
  unlocked: boolean;
  solvesNeeded: number;
  isNew?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3.5 sm:p-4",
        unlocked
          ? "border-sage/30 bg-[#FAFCF8]"
          : "border-[#E8E4DD] bg-[#FAF8F5]/80"
      )}
    >
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4
              className={cn(
                "text-sm font-bold sm:text-base",
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
              "mt-0.5 text-xs",
              unlocked ? "text-[#5A7A4A]" : "text-[#B0AAA2]"
            )}
          >
            {unlocked
              ? description
              : `Solve ${solvesNeeded} more puzzle${solvesNeeded === 1 ? "" : "s"} to unlock`}
          </p>
        </div>
        {!unlocked && (
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#C4BEB6]" strokeWidth={2.5} />
        )}
      </div>

      <div className="flex gap-2">
        {difficulties.map((difficulty) => (
          <DifficultyPill
            key={difficulty}
            difficulty={difficulty}
            href={`/sudoku/picture/${size}/${difficulty}`}
            disabled={!unlocked}
          />
        ))}
      </div>
    </div>
  );
}

export function ActiveAgeCard({ group }: { group: AgeGroup }) {
  const { isUnlocked, solvesUntilUnlock, unlockedSizes } = usePuzzleProgress();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-sage/60 bg-white p-5 shadow-[0_4px_20px_rgba(45,42,38,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-sage hover:shadow-[0_8px_28px_rgba(45,42,38,0.1)] sm:rounded-3xl sm:p-6">
      {group.recommended && (
        <span className="absolute left-4 top-4 rounded-full bg-sage px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Recommended
        </span>
      )}

      <div className="flex flex-col items-center pt-6 text-center sm:pt-8">
        <AnimalIllustration icon={group.icon} large />
        <h3 className="mt-4 text-lg font-bold text-[#2D2A26] sm:text-xl">
          {group.label}
        </h3>
        <p className="mt-1 text-sm text-[#5A7A4A]">{group.description}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:mt-6">
        {PICTURE_GRID_TIERS.map((tier) => {
          const unlocked = isUnlocked(tier.size);
          const justUnlocked =
            unlocked &&
            tier.size > 3 &&
            unlockedSizes[unlockedSizes.length - 1] === tier.size;

          return (
            <GridSizeRow
              key={tier.size}
              size={tier.size}
              label={tier.label}
              description={tier.description}
              difficulties={group.difficulties ?? ["easy", "medium", "hard"]}
              unlocked={unlocked}
              solvesNeeded={solvesUntilUnlock(tier.size)}
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
    <Link href="/coming-soon" className="block">
      <article className="flex flex-col items-center rounded-2xl border border-[#E8E4DD] bg-white/60 p-4 opacity-80 transition-opacity hover:opacity-90 sm:rounded-3xl sm:p-5">
        <AnimalIllustration icon={group.icon} locked />
        <h3 className="mt-3 text-base font-semibold text-[#9A958D] sm:text-lg">
          {group.label}
        </h3>
        <p className="mt-1 text-center text-xs text-[#B0AAA2] sm:text-sm">
          {group.description}
        </p>

        <div className="mt-4 flex flex-col items-center gap-1.5 sm:mt-5">
          <Lock className="h-4 w-4 text-[#C4BEB6]" strokeWidth={2.5} />
          <span className="rounded-full border border-[#E8E4DD] bg-[#FAF8F5] px-3.5 py-1 text-[11px] font-medium text-[#9A958D]">
            Coming soon
          </span>
        </div>
      </article>
    </Link>
  );
}
