"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUDOKU_MODE_CONFIG } from "../config/sudokuModes";
import { CompletionDialog } from "./CompletionDialog";
import { FeedbackToast } from "./FeedbackToast";
import { GameActions } from "./GameActions";
import { GameStatusBar } from "./GameStatusBar";
import { HintDialog } from "./HintDialog";
import { PictureCard } from "./PictureCard";
import { PieceTray } from "./PieceTray";
import { PuzzleGrid } from "./PuzzleGrid";
import { ResetDialog } from "./ResetDialog";
import { SceneFooter } from "./SceneFooter";
import { SudokidLogo } from "@/components/brand/SudokidLogo";
import { useSudokuGame } from "../hooks/useSudokuGame";
import { fireCelebrationConfetti } from "../lib/confetti";
import { playCorrectSound, playWrongSound } from "../lib/sounds";
import { trackSessionMinute } from "../lib/sessionStorage";
import type { PlacementResult } from "../types/placement.types";
import type { Difficulty, GridSize, Puzzle, Symbol, SudokuMode } from "../types/sudoku.types";

interface SudokuScreenProps {
  mode: SudokuMode;
  size: GridSize;
  difficulty: Difficulty;
  initialPuzzle: Puzzle;
}

function parseCellId(id: string): { row: number; col: number } | null {
  const match = id.match(/^cell-(\d+)-(\d+)$/);
  if (!match) return null;
  return { row: parseInt(match[1], 10), col: parseInt(match[2], 10) };
}

function parseTrayGroupIndex(id: string): number | null {
  const match = id.match(/^tray-group-(\d+)$/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

export function SudokuScreen({
  mode,
  size,
  difficulty,
  initialPuzzle,
}: SudokuScreenProps) {
  const modeConfig = SUDOKU_MODE_CONFIG[mode];
  const {
    puzzle,
    board,
    trayGroups,
    placedCount,
    totalToPlace,
    feedback,
    selectedPiece,
    isCelebrating,
    showCompletion,
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const remainingEmpty = totalToPlace - placedCount;

  useEffect(() => {
    const stored = localStorage.getItem("lll_sound_enabled");
    if (stored === "true") setSoundEnabled(true);
  }, []);

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

      if (over.id === "tray") return;

      const cell = parseCellId(String(over.id));
      if (!cell) return;

      const draggedSymbol =
        (active.data.current?.symbol as Symbol | undefined) ??
        (() => {
          const groupIndex = parseTrayGroupIndex(String(active.id));
          return groupIndex !== null
            ? trayGroups[groupIndex]?.symbol
            : undefined;
        })();

      if (!draggedSymbol) return;

      tryPlaceSymbol(cell.row, cell.col, draggedSymbol);
    },
    [tryPlaceSymbol, trayGroups]
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

  if (!isMounted) {
    return (
      <div className="flex min-h-full flex-col overflow-x-hidden bg-gradient-to-b from-[#FFFBEB] via-[#FEF9EE] to-[#ECFDF5]">
        <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-12">
          <p className="text-sm font-medium text-emerald-700">Loading puzzle…</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        const symbolFromData = event.active.data.current?.symbol as
          | Symbol
          | undefined;
        if (symbolFromData) {
          setActiveDragSymbol(symbolFromData);
          return;
        }

        const groupIndex = parseTrayGroupIndex(String(event.active.id));
        if (groupIndex !== null) {
          setActiveDragSymbol(trayGroups[groupIndex]?.symbol ?? null);
        }
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveDragSymbol(null)}
    >
      <div className="relative flex min-h-full flex-col overflow-x-hidden bg-gradient-to-b from-[#FFFBEB] via-[#FEF9EE] to-[#ECFDF5]">
        <div className="relative mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col overflow-x-hidden px-4 pb-0 pt-2 sm:px-5 sm:pt-3">
          <header className="mb-1.5">
            <div className="flex items-center gap-2">
              <Link href="/" className="shrink-0">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 rounded-full border-0 bg-white text-emerald-600 shadow-sm hover:bg-white/90"
                  aria-label="Back to home"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <div className="min-w-0 flex-1 text-center">
                <h1 className="flex items-center justify-center gap-1.5 text-base font-bold leading-tight text-[#5C4033] sm:text-lg">
                  <SudokidLogo variant="icon" className="h-5 w-5" />
                  {modeConfig.title}
                </h1>
              </div>

              <Button
                size="icon"
                onClick={toggleSound}
                className="h-9 w-9 shrink-0 rounded-full border-0 bg-violet-400 text-white shadow-sm hover:bg-violet-500"
                aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
            </div>
          </header>

          <GameStatusBar
            filledCount={placedCount}
            totalEmpty={totalToPlace}
            gridSize={size}
            difficulty={difficulty}
          />

          <div className="flex flex-1 flex-col items-center justify-center gap-2.5 py-1">
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
              groups={trayGroups}
              selectedPiece={selectedPiece}
              onPieceTap={handlePieceTap}
            />

            <GameActions
              remainingEmpty={remainingEmpty}
              canHint={canHint}
              onHint={() => setShowHintDialog(true)}
              onReset={() => setShowResetDialog(true)}
              onNext={newPuzzle}
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
        onTryAnother={handleTryAnother}
        onFinish={dismissCompletion}
      />
    </DndContext>
  );
}
