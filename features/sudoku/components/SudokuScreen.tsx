"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ArrowLeft, Leaf, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompletionDialog } from "./CompletionDialog";
import { FeedbackToast } from "./FeedbackToast";
import { GameStatusBar } from "./GameStatusBar";
import { HintDialog } from "./HintDialog";
import { PictureCard } from "./PictureCard";
import { PieceTray } from "./PieceTray";
import { PuzzleGrid } from "./PuzzleGrid";
import { ResetDialog } from "./ResetDialog";
import { SceneFooter } from "./SceneFooter";
import { useSudokuGame } from "../hooks/useSudokuGame";
import { fireCelebrationConfetti } from "../lib/confetti";
import { playCorrectSound, playWrongSound } from "../lib/sounds";
import { trackSessionMinute } from "../lib/sessionStorage";
import { isGridSizeUnlocked } from "../lib/progressStorage";
import type { PlacementResult } from "../types/placement.types";
import type { Difficulty, GridSize, Puzzle, Symbol } from "../types/sudoku.types";

interface SudokuScreenProps {
  size: GridSize;
  difficulty: Difficulty;
  initialPuzzle: Puzzle;
}

function parseCellId(id: string): { row: number; col: number } | null {
  const match = id.match(/^cell-(\d+)-(\d+)$/);
  if (!match) return null;
  return { row: parseInt(match[1], 10), col: parseInt(match[2], 10) };
}

function parseTrayIndex(id: string): number | null {
  const match = id.match(/^tray-piece-(\d+)$/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

export function SudokuScreen({
  size,
  difficulty,
  initialPuzzle,
}: SudokuScreenProps) {
  const router = useRouter();
  const {
    puzzle,
    board,
    tray,
    feedback,
    selectedPiece,
    isCelebrating,
    showCompletion,
    newlyUnlockedSize,
    canHint,
    placeSymbol,
    removeSymbol,
    hint,
    reset,
    newPuzzle,
    selectPiece,
    dismissCompletion,
    setFeedback,
  } = useSudokuGame(initialPuzzle);

  const [activeDragSymbol, setActiveDragSymbol] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [shakingCell, setShakingCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [showHintDialog, setShowHintDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filledCount = useMemo(
    () =>
      puzzle.emptyCells.filter(({ row, col }) => board[row][col] !== null)
        .length,
    [board, puzzle.emptyCells]
  );
  const totalEmpty = puzzle.emptyCells.length;
  const remainingEmpty = totalEmpty - filledCount;

  useEffect(() => {
    const stored = localStorage.getItem("lll_sound_enabled");
    if (stored === "true") setSoundEnabled(true);
  }, []);

  useEffect(() => {
    if (!isGridSizeUnlocked(size)) {
      router.replace("/");
    }
  }, [size, router]);

  useEffect(() => {
    const interval = setInterval(trackSessionMinute, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isCelebrating) {
      fireCelebrationConfetti();
    }
  }, [isCelebrating]);

  useEffect(() => {
    if (showCompletion) setFeedback(null);
  }, [showCompletion, setFeedback]);

  useEffect(() => {
    return () => {
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("lll_sound_enabled", String(next));
    if (next) playCorrectSound();
  };

  const triggerShake = useCallback((row: number, col: number) => {
    if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
    setShakingCell({ row, col });
    shakeTimerRef.current = setTimeout(() => {
      setShakingCell(null);
      shakeTimerRef.current = null;
    }, 450);
  }, []);

  const handlePlacementResult = useCallback(
    (result: PlacementResult) => {
      if (result.type === "wrong") {
        triggerShake(result.row, result.col);
        if (soundEnabled) playWrongSound();
      } else if (result.type === "correct" && soundEnabled) {
        playCorrectSound();
      }
    },
    [soundEnabled, triggerShake]
  );

  const tryPlaceSymbol = useCallback(
    (row: number, col: number, symbol: Symbol) => {
      const result = placeSymbol(row, col, symbol);
      handlePlacementResult(result);
    },
    [placeSymbol, handlePlacementResult]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragSymbol(null);
      const { active, over } = event;
      if (!over) return;

      const trayIndex = parseTrayIndex(String(active.id));
      if (trayIndex === null) return;

      const symbol = tray[trayIndex];
      if (!symbol) return;

      if (over.id === "tray") return;

      const cell = parseCellId(String(over.id));
      if (!cell) return;

      tryPlaceSymbol(cell.row, cell.col, symbol);
    },
    [tryPlaceSymbol, tray]
  );

  const handleCellTap = useCallback(
    (row: number, col: number) => {
      if (selectedPiece) {
        tryPlaceSymbol(row, col, selectedPiece);
      }
    },
    [selectedPiece, tryPlaceSymbol]
  );

  const handlePieceTap = useCallback(
    (symbol: string) => {
      selectPiece(selectedPiece === symbol ? null : symbol);
    },
    [selectedPiece, selectPiece]
  );

  const handleTryAnother = () => {
    dismissCompletion();
    newPuzzle();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        const trayIndex = parseTrayIndex(String(event.active.id));
        if (trayIndex !== null) {
          setActiveDragSymbol(tray[trayIndex] ?? null);
        }
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveDragSymbol(null)}
    >
      <div className="relative flex min-h-full flex-col overflow-x-hidden bg-gradient-to-b from-[#FFFBEB] via-[#FEF9EE] to-[#ECFDF5]">
        <div className="relative mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col overflow-x-hidden px-4 pb-0 pt-3 sm:px-5 sm:pt-4">
          <header className="mb-3">
            <div className="mb-3 flex items-start justify-between gap-2">
              <Link href="/" className="shrink-0">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-10 w-10 rounded-full border-0 bg-white text-emerald-600 shadow-md hover:bg-white/90"
                  aria-label="Back to home"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>

              <Button
                size="icon"
                onClick={toggleSound}
                className="h-10 w-10 shrink-0 rounded-full border-0 bg-violet-400 text-white shadow-md hover:bg-violet-500"
                aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="text-center">
              <h1 className="flex items-center justify-center gap-1.5 text-xl font-bold text-amber-950 sm:text-2xl">
                <Leaf className="h-4 w-4 text-emerald-500" aria-hidden />
                Picture Sudoku
                <Leaf className="h-4 w-4 text-emerald-500" aria-hidden />
              </h1>
              <p className="mt-1 px-2 text-sm leading-snug text-amber-900/65">
                Look carefully. Every row and column needs all the pictures!
              </p>
            </div>
          </header>

          <GameStatusBar
            filledCount={filledCount}
            totalEmpty={totalEmpty}
            gridSize={size}
            difficulty={difficulty}
            remainingEmpty={remainingEmpty}
            canHint={canHint}
            onHintClick={() => setShowHintDialog(true)}
            onResetClick={() => setShowResetDialog(true)}
          />

          <div className="flex flex-1 flex-col items-center justify-center gap-5 py-2">
            <PuzzleGrid
              board={board}
              givens={puzzle.givens}
              size={puzzle.size}
              selectedPiece={selectedPiece}
              shakingCell={shakingCell}
              onCellTap={handleCellTap}
              onCellRemove={removeSymbol}
            />

            <PieceTray
              pieces={tray}
              selectedPiece={selectedPiece}
              onPieceTap={handlePieceTap}
            />
          </div>

          <SceneFooter />
        </div>
      </div>

      <DragOverlay>
        {activeDragSymbol ? (
          <PictureCard symbol={activeDragSymbol} isDragging />
        ) : null}
      </DragOverlay>

      <FeedbackToast
        feedback={feedback}
        onDismiss={() => setFeedback(null)}
      />

      <HintDialog
        open={showHintDialog}
        onOpenChange={setShowHintDialog}
        canHint={canHint}
        onShowHint={hint}
      />

      <ResetDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onReset={handleReset}
      />

      <CompletionDialog
        open={showCompletion}
        newlyUnlockedSize={newlyUnlockedSize}
        onTryAnother={handleTryAnother}
        onFinish={dismissCompletion}
      />
    </DndContext>
  );
}
