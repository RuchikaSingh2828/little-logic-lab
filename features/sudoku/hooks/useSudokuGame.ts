"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { generateNextPuzzle } from "../generators/pictureSudokuGenerator";
import {
  getRandomCorrectFeedback,
  HINT_FEEDBACK,
  INVALID_PLACEMENT_FEEDBACK,
  type GameFeedback,
} from "../lib/feedbackMessages";
import { markPuzzleComplete } from "../lib/sessionStorage";
import type { PlacementResult } from "../types/placement.types";
import type { Puzzle, Symbol } from "../types/sudoku.types";
import { isSolved, isValidPlacement } from "../validators/sudokuValidator";

const CELEBRATION_DELAY_MS = 1500;

function buildBoardFromGivens(puzzle: Puzzle): (Symbol | null)[][] {
  return puzzle.givens.map((row) => [...row]);
}

function buildTray(puzzle: Puzzle, board: (Symbol | null)[][]): Symbol[] {
  const needed = new Map<Symbol, number>();

  for (const { row, col } of puzzle.emptyCells) {
    const symbol = puzzle.solution[row][col];
    needed.set(symbol, (needed.get(symbol) ?? 0) + 1);
  }

  for (const { row, col } of puzzle.emptyCells) {
    const placed = board[row][col];
    if (placed !== null) {
      needed.set(placed, (needed.get(placed) ?? 0) - 1);
    }
  }

  const tray: Symbol[] = [];
  for (const [symbol, count] of needed) {
    for (let i = 0; i < count; i++) {
      tray.push(symbol);
    }
  }

  return tray;
}

export function useSudokuGame(initialPuzzle: Puzzle) {
  const [puzzle, setPuzzle] = useState<Puzzle>(initialPuzzle);
  const [board, setBoard] = useState<(Symbol | null)[][]>(() =>
    buildBoardFromGivens(initialPuzzle)
  );
  const [feedback, setFeedback] = useState<GameFeedback | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Symbol | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const celebrationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tray = useMemo(() => buildTray(puzzle, board), [puzzle, board]);
  const isComplete = useMemo(
    () => isSolved(board, puzzle.solution),
    [board, puzzle.solution]
  );

  const clearCelebrationTimer = useCallback(() => {
    if (celebrationTimerRef.current) {
      clearTimeout(celebrationTimerRef.current);
      celebrationTimerRef.current = null;
    }
  }, []);

  const triggerCelebration = useCallback(() => {
    clearCelebrationTimer();
    setIsCelebrating(true);
    setShowCompletion(false);
    celebrationTimerRef.current = setTimeout(() => {
      setIsCelebrating(false);
      setShowCompletion(true);
      celebrationTimerRef.current = null;
    }, CELEBRATION_DELAY_MS);
  }, [clearCelebrationTimer]);

  const placeSymbol = useCallback(
    (row: number, col: number, symbol: Symbol): PlacementResult => {
      if (puzzle.givens[row][col] !== null) return { type: "noop" };

      const current = board[row][col];
      if (current === symbol) return { type: "noop" };

      const rowColValid = isValidPlacement(
        board,
        row,
        col,
        symbol,
        puzzle.size
      );
      const answerCorrect = puzzle.solution[row][col] === symbol;

      if (!rowColValid || !answerCorrect) {
        setFeedback(INVALID_PLACEMENT_FEEDBACK);
        return { type: "wrong", row, col };
      }

      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = symbol;
      setBoard(newBoard);
      setSelectedPiece(null);

      const solved = isSolved(newBoard, puzzle.solution);
      if (solved) {
        setFeedback(null);
        markPuzzleComplete();
        triggerCelebration();
      } else {
        setFeedback(getRandomCorrectFeedback());
      }

      return { type: "correct", row, col, solved };
    },
    [board, puzzle, triggerCelebration]
  );

  const removeSymbol = useCallback(
    (row: number, col: number) => {
      if (puzzle.givens[row][col] !== null) return;

      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = null;
      setBoard(newBoard);
      setSelectedPiece(null);
    },
    [board, puzzle.givens]
  );

  const canHint = useMemo(
    () =>
      puzzle.emptyCells.some(({ row, col }) => board[row][col] === null),
    [board, puzzle.emptyCells]
  );

  const hint = useCallback((): boolean => {
    const unfilled = puzzle.emptyCells.filter(
      ({ row, col }) => board[row][col] === null
    );
    if (unfilled.length === 0) return false;

    const { row, col } =
      unfilled[Math.floor(Math.random() * unfilled.length)];
    const symbol = puzzle.solution[row][col];

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = symbol;
    setBoard(newBoard);
    setFeedback(HINT_FEEDBACK);

    if (isSolved(newBoard, puzzle.solution)) {
      markPuzzleComplete();
      triggerCelebration();
    }

    return true;
  }, [board, puzzle, triggerCelebration]);

  const reset = useCallback(() => {
    clearCelebrationTimer();
    setBoard(buildBoardFromGivens(puzzle));
    setSelectedPiece(null);
    setFeedback(null);
    setShowCompletion(false);
    setIsCelebrating(false);
  }, [puzzle, clearCelebrationTimer]);

  const newPuzzle = useCallback(() => {
    clearCelebrationTimer();
    const next = generateNextPuzzle(puzzle);
    setPuzzle(next);
    setBoard(buildBoardFromGivens(next));
    setSelectedPiece(null);
    setFeedback(null);
    setShowCompletion(false);
    setIsCelebrating(false);
  }, [puzzle, clearCelebrationTimer]);

  const selectPiece = useCallback((symbol: Symbol | null) => {
    setSelectedPiece(symbol);
  }, []);

  const dismissCompletion = useCallback(() => {
    setShowCompletion(false);
  }, []);

  return {
    puzzle,
    board,
    tray,
    feedback,
    selectedPiece,
    isComplete,
    isCelebrating,
    showCompletion,
    placeSymbol,
    removeSymbol,
    canHint,
    hint,
    reset,
    newPuzzle,
    selectPiece,
    dismissCompletion,
    setFeedback,
  };
}
