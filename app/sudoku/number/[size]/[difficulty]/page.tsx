import { notFound } from "next/navigation";
import { SudokuScreen } from "@/features/sudoku/components/SudokuScreen";
import { generateNumberPuzzle } from "@/features/sudoku/generators/numberSudokuGenerator";
import type { Difficulty, GridSize } from "@/features/sudoku/types/sudoku.types";

interface PageProps {
  params: Promise<{ size: string; difficulty: string }>;
}

const VALID_SIZES: GridSize[] = [3, 4, 5];
const VALID_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export default async function NumberSudokuPage({ params }: PageProps) {
  const { size: sizeStr, difficulty } = await params;
  const size = parseInt(sizeStr, 10) as GridSize;

  if (
    !VALID_SIZES.includes(size) ||
    !VALID_DIFFICULTIES.includes(difficulty as Difficulty)
  ) {
    notFound();
  }

  const initialPuzzle = generateNumberPuzzle({
    size,
    difficulty: difficulty as Difficulty,
  });

  return (
    <SudokuScreen
      key={`number-${size}-${difficulty}-${initialPuzzle.id}`}
      mode="number"
      size={size}
      difficulty={difficulty as Difficulty}
      initialPuzzle={initialPuzzle}
    />
  );
}
