"use client";

import { useSyncExternalStore } from "react";
import {
  getSolveCount,
  getUnlockedGridSizes,
  isGridSizeUnlocked,
  solvesUntilUnlock,
} from "@/features/sudoku/lib/progressStorage";
import type { GridSize } from "@/features/sudoku/types/sudoku.types";

const PROGRESS_EVENT = "lll-progress-updated";

function subscribe(callback: () => void) {
  window.addEventListener(PROGRESS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(PROGRESS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return JSON.stringify({
    unlocked: getUnlockedGridSizes(),
    solves3: getSolveCount(3),
    solves4: getSolveCount(4),
  });
}

function getServerSnapshot() {
  return JSON.stringify({ unlocked: [3], solves3: 0, solves4: 0 });
}

export function notifyProgressUpdated(): void {
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function usePuzzleProgress() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const { unlocked, solves3, solves4 } = JSON.parse(snapshot) as {
    unlocked: GridSize[];
    solves3: number;
    solves4: number;
  };

  return {
    unlockedSizes: unlocked,
    isUnlocked: isGridSizeUnlocked,
    solvesUntilUnlock,
    solveCount: {
      3: solves3,
      4: solves4,
      5: getSolveCount(5),
    } as Partial<Record<GridSize, number>>,
  };
}
