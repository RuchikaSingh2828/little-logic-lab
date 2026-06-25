import { notFound } from "next/navigation";
import { SudokuScreen } from "@/features/sudoku/components/SudokuScreen";
import { generatePicturePuzzle } from "@/features/sudoku/generators/pictureSudokuGenerator";
import type { Difficulty, GridSize } from "@/features/sudoku/types/sudoku.types";

interface PageProps {
  params: Promise<{ size: string; difficulty: string }>;
}

const VALID_SIZES: GridSize[] = [2, 3, 4, 5];
const VALID_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export default async function SudokuPage({ params }: PageProps) {
  const { size: sizeStr, difficulty } = await params;
  const size = parseInt(sizeStr, 10) as GridSize;

  if (
    !VALID_SIZES.includes(size) ||
    !VALID_DIFFICULTIES.includes(difficulty as Difficulty)
  ) {
    notFound();
  }

  const initialPuzzle = generatePicturePuzzle({
    size,
    difficulty: difficulty as Difficulty,
  });

  return (
    <SudokuScreen
      key={`${size}-${difficulty}-${initialPuzzle.id}`}
      size={size}
      difficulty={difficulty as Difficulty}
      initialPuzzle={initialPuzzle}
    />
  );
}
