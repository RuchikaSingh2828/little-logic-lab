import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SudokuScreen } from "@/features/sudoku/components/SudokuScreen";
import { PuzzleJsonLd } from "@/features/sudoku/components/PuzzleJsonLd";
import { generateNumberPuzzle } from "@/features/sudoku/generators/numberSudokuGenerator";
import {
  generateSudokuStaticParams,
  parseSudokuRouteParams,
  sudokuRouteMetadata,
} from "@/features/sudoku/lib/routeParams";

interface PageProps {
  params: Promise<{ size: string; difficulty: string }>;
}

export function generateStaticParams() {
  return generateSudokuStaticParams("number");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { size: sizeStr, difficulty } = await params;
  const parsed = parseSudokuRouteParams("number", sizeStr, difficulty);
  if (!parsed) return { title: "Number Sudoku" };
  return sudokuRouteMetadata("number", parsed.size, parsed.difficulty);
}

export default async function NumberSudokuPage({ params }: PageProps) {
  const { size: sizeStr, difficulty } = await params;
  const parsed = parseSudokuRouteParams("number", sizeStr, difficulty);
  if (!parsed) notFound();

  const initialPuzzle = generateNumberPuzzle({
    size: parsed.size,
    difficulty: parsed.difficulty,
  });

  return (
    <>
      <PuzzleJsonLd
        mode="number"
        size={parsed.size}
        difficulty={parsed.difficulty}
      />
      <SudokuScreen
        key={`number-${parsed.size}-${parsed.difficulty}-${initialPuzzle.id}`}
        mode="number"
        size={parsed.size}
        difficulty={parsed.difficulty}
        initialPuzzle={initialPuzzle}
      />
    </>
  );
}
