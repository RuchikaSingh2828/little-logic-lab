"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import {
  getProgressSnapshot,
  isGridSizeUnlocked,
  solvesUntilUnlock,
} from "@/features/sudoku/lib/progressStorage";
import type { GridSize, SudokuMode } from "@/features/sudoku/types/sudoku.types";

const PROGRESS_EVENT = "lll-progress-updated";

function subscribe(callback: () => void) {
  const refresh = () => callback();

  window.addEventListener(PROGRESS_EVENT, refresh);
  window.addEventListener("storage", refresh);
  window.addEventListener("pageshow", refresh);
  window.addEventListener("focus", refresh);

  return () => {
    window.removeEventListener(PROGRESS_EVENT, refresh);
    window.removeEventListener("storage", refresh);
    window.removeEventListener("pageshow", refresh);
    window.removeEventListener("focus", refresh);
  };
}

function getServerSnapshot(mode: SudokuMode) {
  return JSON.stringify({
    mode,
    unlocked: [3],
    solves3: 0,
    solves4: 0,
    solves5: 0,
    totalGamesPlayed: 0,
  });
}

export function usePuzzleProgress(mode: SudokuMode) {
  const pathname = usePathname();
  const snapshot = useSyncExternalStore(
    subscribe,
    () => JSON.stringify({ pathname, mode, ...getProgressSnapshot(mode) }),
    () => getServerSnapshot(mode)
  );

  const { unlocked, solves3, solves4, solves5, totalGamesPlayed } = JSON.parse(
    snapshot
  ) as {
    pathname?: string;
    mode?: SudokuMode;
    unlocked: GridSize[];
    solves3: number;
    solves4: number;
    solves5: number;
    totalGamesPlayed: number;
  };

  void pathname;

  return {
    unlockedSizes: unlocked,
    totalGamesPlayed,
    isUnlocked: (size: GridSize) => isGridSizeUnlocked(mode, size),
    solvesUntilUnlock: (size: GridSize) => solvesUntilUnlock(mode, size),
    solveCount: {
      3: solves3,
      4: solves4,
      5: solves5,
    } as Partial<Record<GridSize, number>>,
  };
}
