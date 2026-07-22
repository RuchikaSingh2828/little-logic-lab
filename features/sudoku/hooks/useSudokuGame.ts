"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getRandomCorrectFeedback,
  HINT_FEEDBACK,
  INVALID_PLACEMENT_FEEDBACK,
  type GameFeedback,
} from "../lib/feedbackMessages";
import { countPlacedCells } from "../lib/boardProgress";
import { markPuzzleComplete } from "../lib/sessionStorage";
import type { PlacementResult } from "../types/placement.types";
import { generateNextNumberPuzzle } from "../generators/numberSudokuGenerator";
import { generateNextPuzzle } from "../generators/pictureSudokuGenerator";
import { generateNextShapePuzzle } from "../generators/shapeSudokuGenerator";
import { buildTray, buildTrayGroups } from "../lib/trayGroups";
import type { Puzzle, Symbol } from "../types/sudoku.types";
import { isSolved, isValidPlacement } from "../validators/sudokuValidator";

const CELEBRATION_DELAY_MS = 1500;

function buildBoardFromGivens(puzzle: Puzzle): (Symbol | null)[][] {
  return puzzle.givens.map((row) => [...row]);
}

function generateNextByMode(current: Puzzle): Puzzle {
  switch (current.mode) {
    case "picture":
      return generateNextPuzzle(current);
    case "number":
      return generateNextNumberPuzzle(current);
    case "shape":
      return generateNextShapePuzzle(current);
  }
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

  const trayGroups = useMemo(
    () => buildTrayGroups(puzzle, board),
    [puzzle, board]
  );
  const tray = useMemo(() => buildTray(puzzle, board), [puzzle, board]);

  useEffect(() => {
    if (
      selectedPiece !== null &&
      !trayGroups.some((g) => g.symbol === selectedPiece)
    ) {
      setSelectedPiece(null);
    }
  }, [selectedPiece, trayGroups]);

  const { placed: placedCount, total: totalToPlace } = useMemo(
    () => countPlacedCells(puzzle.givens, board, puzzle.size),
    [board, puzzle.givens, puzzle.size]
  );
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
        markPuzzleComplete(puzzle.mode, puzzle.size, puzzle.id);
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
      markPuzzleComplete(puzzle.mode, puzzle.size, puzzle.id);
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
    const next = generateNextByMode(puzzle);
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
    trayGroups,
    placedCount,
    totalToPlace,
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
