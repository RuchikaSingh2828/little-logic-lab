import type { LucideIcon } from "lucide-react";
import type { SudokuMode } from "@/features/sudoku/types/sudoku.types";
import {
  Brain,
  CheckCircle2,
  Clock,
  Flame,
  Home,
  Lightbulb,
  Puzzle,
  Shield,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import type { AvatarId } from "./AgeAvatars";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const DESKTOP_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Puzzles", href: "/#challenges", icon: Puzzle },
  { label: "How to Play", href: "/how-to-play", icon: Lightbulb },
  { label: "Parents", href: "/parents", icon: Users },
];

export const MOBILE_MENU_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Puzzles", href: "/#challenges", icon: Puzzle },
  { label: "How to Play", href: "/how-to-play", icon: Lightbulb },
  { label: "Parents", href: "/parents", icon: Users },
];

export const MOBILE_BOTTOM_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Puzzles", href: "/#challenges", icon: Puzzle },
  { label: "How to Play", href: "/how-to-play", icon: Lightbulb },
  { label: "Parents", href: "/parents", icon: Users },
];

export const PROFILE_MENU_ITEMS: NavItem[] = [
  { label: "How to Play", href: "/how-to-play", icon: Lightbulb },
  { label: "Parent Zone", href: "/parents", icon: Shield },
];

export const FOOTER_LINKS = [
  { label: "How to Play", href: "/how-to-play" },
  { label: "FAQ", href: "/faq" },
  { label: "For Parents", href: "/parents" },
  { label: "Privacy", href: "/privacy" },
  { label: "About", href: "/about" },
] as const;

export type Difficulty = "easy" | "medium" | "hard";

export type PictureGridSize = 3 | 4 | 5;
export type ShapeGridSize = 4 | 5 | 6;
export type NumberGridSize = 7 | 8 | 9;
export type ModeGridSize = PictureGridSize | ShapeGridSize | NumberGridSize;

export interface GridSizeTier {
  size: ModeGridSize;
  label: string;
  description: string;
}

export const PICTURE_GRID_TIERS: GridSizeTier[] = [
  { size: 3, label: "3×3 Grid", description: "Great for beginners" },
  { size: 4, label: "4×4 Grid", description: "A little bigger — more to place!" },
  { size: 5, label: "5×5 Grid", description: "Big grid — about 10 spaces to fill" },
];

export const SHAPE_GRID_TIERS: GridSizeTier[] = [
  { size: 4, label: "4×4 Grid", description: "Shapes and colors" },
  { size: 5, label: "5×5 Grid", description: "Growing thinkers" },
  { size: 6, label: "6×6 Grid", description: "Bigger shape challenge" },
];

export const NUMBER_GRID_TIERS: GridSizeTier[] = [
  { size: 7, label: "7×7 Grid", description: "Adult-style number Sudoku" },
  { size: 8, label: "8×8 Grid", description: "Bigger challenge" },
  { size: 9, label: "9×9 Grid", description: "Full classic Sudoku" },
];

/** @deprecated Use mode-specific tiers */
export const GRID_TIERS = PICTURE_GRID_TIERS;

export function getGridTiersForMode(mode: SudokuMode): GridSizeTier[] {
  switch (mode) {
    case "shape":
      return SHAPE_GRID_TIERS;
    case "number":
      return NUMBER_GRID_TIERS;
    case "picture":
    default:
      return PICTURE_GRID_TIERS;
  }
}

export function getDefaultGridSize(mode: SudokuMode): ModeGridSize {
  switch (mode) {
    case "shape":
      return 4;
    case "number":
      return 7;
    case "picture":
    default:
      return 3;
  }
}

export type AgeAccent = "green" | "blue" | "orange";

export interface AgeGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  avatar: AvatarId;
  active: boolean;
  mode: SudokuMode;
  hrefPrefix: string;
  accent: AgeAccent;
  recommended?: boolean;
  puzzleCount: number;
  skillCount: number;
  /** e.g. "3×3 Grid" */
  gridLabel: string;
  /** e.g. "Great for beginners" */
  gridBlurb: string;
  /** @deprecated Prefer gridLabel + gridBlurb */
  gridSummary?: string;
  difficulties?: Difficulty[];
  timeEstimate?: string;
}

export const AGE_ACCENT: Record<
  AgeAccent,
  {
    title: string;
    border: string;
    button: string;
    buttonHover: string;
    soft: string;
    ring: string;
  }
> = {
  green: {
    title: "text-[#2F6B1F]",
    border: "border-[#65B741]/25",
    button: "bg-[#2F6B1F] text-white",
    buttonHover: "hover:bg-[#265816]",
    soft: "bg-[#EAF6E3]",
    ring: "ring-[#65B741]/20",
  },
  blue: {
    title: "text-[#1D6FBF]",
    border: "border-[#4DA3FF]/35",
    button: "bg-[#1D6FBF] text-white",
    buttonHover: "hover:bg-[#185ea3]",
    soft: "bg-[#E8F3FF]",
    ring: "ring-[#4DA3FF]/20",
  },
  orange: {
    title: "text-[#8A4B0F]",
    border: "border-[#FFB84D]/45",
    button: "bg-[#8A4B0F] text-white",
    buttonHover: "hover:bg-[#733E0C]",
    soft: "bg-[#FFF4E3]",
    ring: "ring-[#FFB84D]/25",
  },
};

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: "3-4",
    label: "Ages 3–4",
    title: "Picture Sudoku",
    description: "Picture Sudoku with friendly images",
    avatar: "lion",
    active: true,
    mode: "picture",
    hrefPrefix: "/sudoku/picture",
    accent: "green",
    recommended: true,
    puzzleCount: 12,
    skillCount: 3,
    gridLabel: "3×3 Grid",
    gridBlurb: "Great for beginners",
    difficulties: ["easy", "medium", "hard"],
    timeEstimate: "5–15 minutes",
  },
  {
    id: "5-6",
    label: "Ages 5–6",
    title: "Logic Builders",
    description: "Shapes, colors, and simple symbols",
    avatar: "elephant",
    active: true,
    mode: "shape",
    hrefPrefix: "/sudoku/shape",
    accent: "blue",
    puzzleCount: 24,
    skillCount: 5,
    gridLabel: "4×4 Grid",
    gridBlurb: "Growing thinkers",
    difficulties: ["easy", "medium", "hard"],
    timeEstimate: "5–15 minutes",
  },
  {
    id: "7+",
    label: "Ages 7+",
    title: "Sudoku Masters",
    description: "Classic adult-style number sudoku",
    avatar: "owl",
    active: true,
    mode: "number",
    hrefPrefix: "/sudoku/number",
    accent: "orange",
    puzzleCount: 26,
    skillCount: 7,
    gridLabel: "7×7 Grid",
    gridBlurb: "Like adult Sudoku",
    difficulties: ["easy", "medium", "hard"],
    timeEstimate: "10–25 minutes",
  },
];

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { label: string; pillLabel: string; className: string }
> = {
  easy: {
    label: "Easy",
    pillLabel: "Starter",
    className: "bg-[#D8F0CC] text-[#1F5C16]",
  },
  medium: {
    label: "Medium",
    pillLabel: "Explorer",
    className: "bg-[#FFE4C4] text-[#8A4B0F]",
  },
  hard: {
    label: "Hard",
    pillLabel: "Master",
    className: "bg-[#E4DFF8] text-[#4B3F9A]",
  },
};

export const WHY_SUDOKU = [
  {
    title: "Builds Focus",
    description: "Improves concentration and attention.",
    icon: Brain,
    color: "bg-[#EAF6E3] text-[#2F6B1F]",
  },
  {
    title: "Develops Logic",
    description: "Strengthens logical reasoning skills.",
    icon: Puzzle,
    color: "bg-[#E8F3FF] text-[#1D6FBF]",
  },
  {
    title: "Enhances Problem Solving",
    description: "Encourages thinking and smart strategies.",
    icon: Lightbulb,
    color: "bg-[#FFF4E3] text-[#B86A12]",
  },
  {
    title: "Boosts Confidence",
    description: "Small wins lead to big self-belief.",
    icon: Trophy,
    color: "bg-[#F3E8FF] text-[#6D28D9]",
  },
] as const;

export const QUICK_STATS = [
  {
    label: "Accuracy",
    value: "85%",
    icon: CheckCircle2,
    color: "bg-[#E8F3FF] text-[#4DA3FF]",
  },
  {
    label: "Time Spent",
    value: "2h 15m",
    icon: Clock,
    color: "bg-[#E8F3FF] text-[#4DA3FF]",
  },
  {
    label: "Current Streak",
    value: "7",
    icon: Flame,
    color: "bg-[#FFF0E0] text-[#E8912D]",
  },
  {
    label: "Puzzles Solved",
    value: "18",
    icon: Puzzle,
    color: "bg-[#EAF6E3] text-[#65B741]",
  },
] as const;

export { Flame, Lightbulb, Shield, Star };

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/#challenges") {
    return pathname.startsWith("/sudoku");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
