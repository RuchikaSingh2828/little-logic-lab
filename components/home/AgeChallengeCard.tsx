"use client";

import Link from "next/link";
import { Flame, Lock, Play, Puzzle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SudokidLogo } from "@/components/brand/SudokidLogo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePuzzleProgress } from "@/features/sudoku/hooks/usePuzzleProgress";
import { AgeAvatarArt, type AvatarId } from "./AgeAvatars";
import {
  AGE_ACCENT,
  DIFFICULTY_STYLES,
  getDefaultGridSize,
  getGridTiersForMode,
  type AgeGroup,
  type Difficulty,
} from "./home-data";

function AgeAvatar({
  avatar,
  softClass,
}: {
  avatar: AvatarId;
  softClass: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-4 ring-white",
        softClass
      )}
    >
      <AgeAvatarArt id={avatar} className="h-full w-full" />
    </div>
  );
}

export function ActiveAgeCard({ group }: { group: AgeGroup }) {
  const difficulties = group.difficulties ?? ["easy", "medium", "hard"];
  const accent = AGE_ACCENT[group.accent];
  const { totalGamesPlayed } = usePuzzleProgress(group.mode);

  const startSize = getDefaultGridSize(group.mode);
  const startHref = `${group.hrefPrefix}/${startSize}/easy`;
  const gridTiers = getGridTiersForMode(group.mode);

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[1.25rem] border-2 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5 sm:p-6",
        accent.border
      )}
    >
      {group.recommended && (
        <span className="absolute left-4 top-4 rounded-md bg-[#2F6B1F] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
          Recommended
        </span>
      )}

      <div className="flex flex-col items-center pt-2 text-center">
        <AgeAvatar avatar={group.avatar} softClass={accent.soft} />
        <h3 className="mt-4 font-heading text-xl font-extrabold text-[#2D3748]">
          {group.label}
        </h3>
        <p className={cn("mt-1 text-sm font-semibold", accent.title)}>
          {group.title}
        </p>
      </div>

      <div className="mt-4 flex flex-nowrap items-center justify-center gap-x-2.5 overflow-x-auto text-xs font-medium text-[#4B5563] sm:gap-x-3">
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap">
          <Puzzle className="h-3.5 w-3.5 text-[#6B7280]" strokeWidth={2.4} />
          {group.puzzleCount} Puzzles
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap">
          <Flame className="h-3.5 w-3.5 text-[#C47A14]" strokeWidth={2.4} />
          Best Streak {Math.min(totalGamesPlayed, 7)}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap">
          <Star className="h-3.5 w-3.5 text-[#C47A14]" strokeWidth={2.4} />
          Skills {group.skillCount}
        </span>
      </div>

      <div
        className={cn(
          "mt-4 overflow-hidden rounded-lg border border-black/[0.04] p-3 text-left",
          accent.soft
        )}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold whitespace-nowrap text-[#2D3748]">
              {group.gridLabel}
            </p>
            <p className="mt-0.5 truncate text-xs font-medium whitespace-nowrap text-[#4B5563]">
              {group.gridBlurb}
            </p>
          </div>
          <SudokidLogo
            variant="icon"
            className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
          />
        </div>
        <div className="mt-3 grid w-full grid-cols-3 gap-1.5">
          {difficulties.map((difficulty) => {
            const style = DIFFICULTY_STYLES[difficulty];
            const size = getDefaultGridSize(group.mode);
            return (
              <Link
                key={difficulty}
                href={`${group.hrefPrefix}/${size}/${difficulty}`}
                className={cn(
                  "min-h-9 min-w-0 truncate rounded-full px-1.5 py-2 text-center text-[10px] font-bold transition-transform hover:scale-[1.03] sm:px-2 sm:text-[11px]",
                  style.className
                )}
              >
                {style.pillLabel}
              </Link>
            );
          })}
        </div>
        <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
          {gridTiers.map((tier) => (
            <li key={tier.size}>
              <Link
                href={`${group.hrefPrefix}/${tier.size}/easy`}
                className="inline-flex min-h-8 items-center rounded-md bg-[#FFF8EC] px-2 py-1 text-[10px] font-bold text-[#4B5563] hover:bg-[#EAF6E3]"
              >
                {tier.size}×{tier.size}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-5">
        <Link
          href={startHref}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-colors",
            accent.button,
            accent.buttonHover
          )}
        >
          <Play className="h-4 w-4 fill-current" />
          Start Playing
        </Link>

        <Popover>
          <PopoverTrigger className="mt-3 w-full cursor-pointer text-center text-xs font-semibold text-[#6B7280] underline-offset-2 hover:underline data-popup-open:text-[#2D3748]">
            More grid sizes
          </PopoverTrigger>
          <PopoverContent align="center" className="w-[min(100%,18rem)]">
            <div className="flex flex-col gap-1.5">
              {gridTiers.map((tier) => (
                <div
                  key={tier.size}
                  className="flex items-center justify-between gap-2 rounded-xl border border-[#E8E4DC] px-3 py-2"
                >
                  <span className="text-xs font-semibold text-[#2D3748]">
                    {tier.label}
                  </span>
                  <div className="flex gap-1">
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
      </div>
    </article>
  );
}

export function LockedAgeCard({ group }: { group: AgeGroup }) {
  const accent = AGE_ACCENT[group.accent];

  return (
    <Link href="/coming-soon" className="block h-full">
      <article
        className={cn(
          "flex h-full flex-col items-center rounded-[1.25rem] border border-[#E8E4DC] bg-white/80 p-5 text-center opacity-80 sm:p-6"
        )}
      >
        <AgeAvatar avatar={group.avatar} softClass={accent.soft} />
        <h3 className="mt-4 font-heading text-lg font-bold text-[#9CA3AF]">
          {group.label}
        </h3>
        <p className="mt-1 text-sm text-[#B0AAA2]">{group.title}</p>
        <div className="mt-5 flex flex-col items-center gap-2">
          <Lock className="h-4 w-4 text-[#C4BEB6]" strokeWidth={2.5} />
          <span className="rounded-full border border-[#E8E4DC] bg-white px-3.5 py-1 text-[11px] font-medium text-[#9CA3AF]">
            Coming Soon
          </span>
        </div>
      </article>
    </Link>
  );
}
