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
  TrendingUp,
  User,
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
  { label: "Progress", href: "/coming-soon", icon: TrendingUp },
  { label: "Parents", href: "/parents", icon: Users },
];

export const MOBILE_MENU_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Puzzles", href: "/#challenges", icon: Puzzle },
  { label: "Progress", href: "/coming-soon", icon: TrendingUp },
  { label: "Parents", href: "/parents", icon: Users },
];

export const MOBILE_BOTTOM_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Puzzles", href: "/#challenges", icon: Puzzle },
  { label: "Progress", href: "/coming-soon", icon: TrendingUp },
  { label: "Parents", href: "/parents", icon: Users },
];

export const PROFILE_MENU_ITEMS: NavItem[] = [
  { label: "My Profile", href: "/coming-soon", icon: User },
  { label: "Parent Zone", href: "/parents", icon: Shield },
];

export const FOOTER_LINKS = [
  { label: "About Us", href: "/coming-soon" },
  { label: "How It Works", href: "/coming-soon" },
  { label: "Privacy Policy", href: "/coming-soon" },
  { label: "Contact", href: "/coming-soon" },
] as const;

export type Difficulty = "easy" | "medium" | "hard";

export type PictureGridSize = 3 | 4 | 5;

export interface GridSizeTier {
  size: PictureGridSize;
  label: string;
  description: string;
}

export const GRID_TIERS: GridSizeTier[] = [
  { size: 3, label: "3×3 Grid", description: "Great for beginners" },
  { size: 4, label: "4×4 Grid", description: "A little bigger — more to place!" },
  { size: 5, label: "5×5 Grid", description: "Big grid — about 10 spaces to fill" },
];

/** @deprecated Use GRID_TIERS */
export const PICTURE_GRID_TIERS = GRID_TIERS;

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
    title: "text-[#65B741]",
    border: "border-[#65B741]/25",
    button: "bg-[#65B741] text-white",
    buttonHover: "hover:bg-[#57a338]",
    soft: "bg-[#EAF6E3]",
    ring: "ring-[#65B741]/20",
  },
  blue: {
    title: "text-[#4DA3FF]",
    border: "border-[#4DA3FF]/35",
    button: "bg-[#4DA3FF] text-white",
    buttonHover: "hover:bg-[#3b94f0]",
    soft: "bg-[#E8F3FF]",
    ring: "ring-[#4DA3FF]/20",
  },
  orange: {
    title: "text-[#E8912D]",
    border: "border-[#FFB84D]/45",
    button: "bg-[#FFB84D] text-[#2D3748]",
    buttonHover: "hover:bg-[#f0a93c]",
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
    gridLabel: "3×3 Grid",
    gridBlurb: "Growing thinkers",
    difficulties: ["easy", "medium", "hard"],
    timeEstimate: "5–15 minutes",
  },
  {
    id: "7+",
    label: "Ages 7+",
    title: "Sudoku Masters",
    description: "Classic beginner number sudoku",
    avatar: "owl",
    active: true,
    mode: "number",
    hrefPrefix: "/sudoku/number",
    accent: "orange",
    puzzleCount: 26,
    skillCount: 7,
    gridLabel: "4×4 Grid",
    gridBlurb: "Classic Sudoku",
    difficulties: ["easy", "medium", "hard"],
    timeEstimate: "5–15 minutes",
  },
];

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { label: string; pillLabel: string; className: string }
> = {
  easy: {
    label: "Easy",
    pillLabel: "Starter",
    className: "bg-[#EAF6E3] text-[#3F8A28]",
  },
  medium: {
    label: "Medium",
    pillLabel: "Explorer",
    className: "bg-[#FFF0E0] text-[#C46A2E]",
  },
  hard: {
    label: "Hard",
    pillLabel: "Master",
    className: "bg-[#EEE8FF] text-[#6B67C7]",
  },
};

export const WHY_SUDOKU = [
  {
    title: "Builds Focus",
    description: "Improves concentration and attention.",
    icon: Brain,
    color: "bg-[#EAF6E3] text-[#65B741]",
  },
  {
    title: "Develops Logic",
    description: "Strengthens logical reasoning skills.",
    icon: Puzzle,
    color: "bg-[#E8F3FF] text-[#4DA3FF]",
  },
  {
    title: "Enhances Problem Solving",
    description: "Encourages thinking and smart strategies.",
    icon: Lightbulb,
    color: "bg-[#FFF4E3] text-[#E8912D]",
  },
  {
    title: "Boosts Confidence",
    description: "Small wins lead to big self-belief.",
    icon: Trophy,
    color: "bg-[#F3E8FF] text-[#8B5CF6]",
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
  if (href === "/#challenges") return pathname.startsWith("/sudoku");
  return pathname.startsWith(href);
}
