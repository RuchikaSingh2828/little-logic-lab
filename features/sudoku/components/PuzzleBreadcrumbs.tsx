import Link from "next/link";
import { cn } from "@/lib/utils";
import { SUDOKU_MODE_CONFIG } from "../config/sudokuModes";
import { DIFFICULTIES, MODE_SIZES } from "../lib/routeParams";
import type { Difficulty, GridSize, SudokuMode } from "../types/sudoku.types";

interface PuzzleBreadcrumbsProps {
  mode: SudokuMode;
  size: GridSize;
  difficulty: Difficulty;
  className?: string;
}

export function PuzzleBreadcrumbs({
  mode,
  size,
  difficulty,
  className,
}: PuzzleBreadcrumbsProps) {
  const config = SUDOKU_MODE_CONFIG[mode];
  const sizes = MODE_SIZES[mode];
  const difficultyLabel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <nav
      aria-label="Puzzle navigation"
      className={cn("flex flex-col gap-1.5 text-center", className)}
    >
      <ol className="flex flex-wrap items-center justify-center gap-1 text-xs font-medium text-[#4B5563]">
        <li>
          <Link href="/" className="hover:text-[#2D3748] hover:underline">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-[#C4BEB6]">
          /
        </li>
        <li>
          <Link href="/sudoku" className="hover:text-[#2D3748] hover:underline">
            Sudoku
          </Link>
        </li>
        <li aria-hidden className="text-[#C4BEB6]">
          /
        </li>
        <li>
          <Link
            href={config.hrefPrefix}
            className="hover:text-[#2D3748] hover:underline"
          >
            {config.title}
          </Link>
        </li>
        <li aria-hidden className="text-[#C4BEB6]">
          /
        </li>
        <li className="font-semibold text-[#2D3748]" aria-current="page">
          {size}×{size} · {difficultyLabel}
        </li>
      </ol>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {sizes.map((s) => (
          <Link
            key={s}
            href={`${config.hrefPrefix}/${s}/${difficulty}`}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-xs font-bold",
              s === size
                ? "bg-[#D8F0CC] text-[#1F5C16]"
                : "bg-white/80 text-[#374151] hover:bg-[#FFF8EC]"
            )}
            aria-current={s === size ? "page" : undefined}
          >
            {s}×{s}
          </Link>
        ))}
        <span className="mx-0.5 text-[#9CA3AF]" aria-hidden>
          ·
        </span>
        {DIFFICULTIES.map((d) => {
          const label = d.charAt(0).toUpperCase() + d.slice(1);
          return (
            <Link
              key={d}
              href={`${config.hrefPrefix}/${size}/${d}`}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs font-bold",
                d === difficulty
                  ? "bg-[#D8F0CC] text-[#1F5C16]"
                  : "bg-white/80 text-[#374151] hover:bg-[#FFF8EC]"
              )}
              aria-current={d === difficulty ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
