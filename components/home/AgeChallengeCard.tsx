"use client";

import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DIFFICULTY_STYLES,
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

export function ActiveAgeCard({ group }: { group: AgeGroup }) {
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

      <div className="mt-5 flex gap-2 sm:mt-6">
        {group.difficulties?.map((difficulty) => (
          <DifficultyPill
            key={difficulty}
            difficulty={difficulty}
            href={`/sudoku/picture/${group.defaultSize}/${difficulty}`}
          />
        ))}
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
