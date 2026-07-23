import { recordPuzzleSolve } from "./progressStorage";
import type { Difficulty, GridSize, SudokuMode } from "../types/sudoku.types";

const SESSION_KEY = "lll_session_minutes";
const SKILLS_KEY = "lll_skills_practiced";

export function trackSessionMinute(): void {
  if (typeof window === "undefined") return;
  const current = parseInt(sessionStorage.getItem(SESSION_KEY) ?? "0", 10);
  sessionStorage.setItem(SESSION_KEY, String(current + 1));
}

export function getSessionMinutes(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(sessionStorage.getItem(SESSION_KEY) ?? "0", 10);
}

export function markSkillPracticed(skill: string): void {
  if (typeof window === "undefined") return;
  const skills = getSkillsPracticed();
  if (!skills.includes(skill)) {
    skills.push(skill);
    sessionStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
  }
}

export function getSkillsPracticed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(SKILLS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function markPuzzleComplete(
  mode: SudokuMode,
  size: GridSize,
  puzzleId?: string,
  difficulty?: Difficulty
): GridSize | null {
  markSkillPracticed("Pattern Recognition");
  markSkillPracticed("Logic");
  markSkillPracticed("Concentration");
  return recordPuzzleSolve(mode, size, puzzleId, difficulty);
}
