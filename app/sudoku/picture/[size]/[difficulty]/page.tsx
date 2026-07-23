import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SudokuScreen } from "@/features/sudoku/components/SudokuScreen";
import { PuzzleJsonLd } from "@/features/sudoku/components/PuzzleJsonLd";
import { generatePicturePuzzle } from "@/features/sudoku/generators/pictureSudokuGenerator";
import {
  generateSudokuStaticParams,
  parseSudokuRouteParams,
  sudokuRouteMetadata,
} from "@/features/sudoku/lib/routeParams";

interface PageProps {
  params: Promise<{ size: string; difficulty: string }>;
}

export function generateStaticParams() {
  return generateSudokuStaticParams("picture");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { size: sizeStr, difficulty } = await params;
  const parsed = parseSudokuRouteParams("picture", sizeStr, difficulty);
  if (!parsed) return { title: "Picture Sudoku" };
  return sudokuRouteMetadata("picture", parsed.size, parsed.difficulty);
}

export default async function PictureSudokuPage({ params }: PageProps) {
  const { size: sizeStr, difficulty } = await params;
  const parsed = parseSudokuRouteParams("picture", sizeStr, difficulty);
  if (!parsed) notFound();

  const initialPuzzle = generatePicturePuzzle({
    size: parsed.size,
    difficulty: parsed.difficulty,
  });

  return (
    <>
      <PuzzleJsonLd
        mode="picture"
        size={parsed.size}
        difficulty={parsed.difficulty}
      />
      <SudokuScreen
        key={`picture-${parsed.size}-${parsed.difficulty}-${initialPuzzle.id}`}
        mode="picture"
        size={parsed.size}
        difficulty={parsed.difficulty}
        initialPuzzle={initialPuzzle}
      />
    </>
  );
}
