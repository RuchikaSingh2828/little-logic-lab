import { notFound } from "next/navigation";
import { SudokuScreen } from "@/features/sudoku/components/SudokuScreen";
import { generateShapePuzzle } from "@/features/sudoku/generators/shapeSudokuGenerator";
import type { Difficulty, GridSize } from "@/features/sudoku/types/sudoku.types";

interface PageProps {
  params: Promise<{ size: string; difficulty: string }>;
}

const VALID_SIZES: GridSize[] = [3, 4, 5];
const VALID_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export default async function ShapeSudokuPage({ params }: PageProps) {
  const { size: sizeStr, difficulty } = await params;
  const size = parseInt(sizeStr, 10) as GridSize;

  if (
    !VALID_SIZES.includes(size) ||
    !VALID_DIFFICULTIES.includes(difficulty as Difficulty)
  ) {
    notFound();
  }

  const initialPuzzle = generateShapePuzzle({
    size,
    difficulty: difficulty as Difficulty,
  });

  return (
    <SudokuScreen
      key={`shape-${size}-${difficulty}-${initialPuzzle.id}`}
      mode="shape"
      size={size}
      difficulty={difficulty as Difficulty}
      initialPuzzle={initialPuzzle}
    />
  );
}
