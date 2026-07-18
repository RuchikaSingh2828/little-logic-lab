"use client";

import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePuzzleProgress } from "@/features/sudoku/hooks/usePuzzleProgress";
import {
  DIFFICULTY_STYLES,
  GRID_TIERS,
  type AgeGroup,
  type Difficulty,
} from "./home-data";

function DifficultyPill({
  difficulty,
  href,
}: {
  difficulty: Difficulty;
  href: string;
}) {
  const style = DIFFICULTY_STYLES[difficulty];

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

export function ActiveAgeCard({ group }: { group: AgeGroup }) {
  const difficulties = group.difficulties ?? ["easy", "medium", "hard"];
  const { totalGamesPlayed } = usePuzzleProgress(group.mode);
  const startSize = group.mode === "number" ? 4 : 3;

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

      <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-5 sm:gap-2">
        {difficulties.map((difficulty) => (
          <DifficultyPill
            key={difficulty}
            difficulty={difficulty}
            href={`${group.hrefPrefix}/${startSize}/${difficulty}`}
          />
        ))}
      </div>

      <div className="mt-auto pt-4">
        <Popover>
          <PopoverTrigger className="w-full cursor-pointer text-center text-xs font-semibold text-[#5A7A4A] underline-offset-2 hover:underline data-popup-open:text-[#2D2A26]">
            More grid sizes
          </PopoverTrigger>
          <PopoverContent align="center" className="w-[min(100%,18rem)]">
            <div className="flex flex-col gap-1.5">
              {GRID_TIERS.map((tier) => (
                <div
                  key={tier.size}
                  className="flex items-center justify-between gap-2 rounded-xl border border-[#E8E4DC] px-3 py-2"
                >
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-semibold text-[#2D3748]">
                      {tier.label}
                    </p>
                    <p className="text-[10px] text-[#6B7280]">
                      {tier.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {difficulties.map((d: Difficulty) => (
                      <Link
                        key={d}
                        href={`${group.hrefPrefix}/${tier.size}/${d}`}
                        className="rounded-md bg-[#FFF8EC] px-2 py-0.5 text-[10px] font-bold capitalize text-[#4B5563] hover:bg-[#EAF6E3]"
                      >
                        {DIFFICULTY_STYLES[d].label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {group.timeEstimate && (
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#8A857D]">
            <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
            {group.timeEstimate}
          </p>
        )}
      </div>
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
          <span className="rounded-full border border-[#E8E4DD] bg-white px-3.5 py-1 text-[11px] font-medium text-[#9CA3AF]">
            Coming Soon
          </span>
        </div>
      </article>
    </Link>
  );
}
