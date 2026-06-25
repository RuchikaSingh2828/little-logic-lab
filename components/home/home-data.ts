import type { LucideIcon } from "lucide-react";
import {
  Home,
  Lightbulb,
  Lock,
  Puzzle,
  Shield,
  Sprout,
  TrendingUp,
  User,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const DESKTOP_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Puzzles", href: "/#challenges", icon: Puzzle },
  { label: "Progress", href: "/coming-soon", icon: TrendingUp },
  { label: "Parent Zone", href: "/parents", icon: Shield },
];

export const MOBILE_MENU_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Puzzles", href: "/#challenges", icon: Puzzle },
  { label: "Progress", href: "/coming-soon", icon: TrendingUp },
];

export const MOBILE_BOTTOM_NAV: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Puzzles", href: "/#challenges", icon: Puzzle },
  { label: "Progress", href: "/coming-soon", icon: TrendingUp },
  { label: "Profile", href: "/coming-soon", icon: User },
];

export const PROFILE_MENU_ITEMS: NavItem[] = [
  { label: "My Profile", href: "/coming-soon", icon: User },
  { label: "Parent Zone", href: "/parents", icon: Shield },
];

export type Difficulty = "easy" | "medium" | "hard";

export type PictureGridSize = 3 | 4 | 5;

export interface GridSizeTier {
  size: PictureGridSize;
  label: string;
  description: string;
}

export const PICTURE_GRID_TIERS: GridSizeTier[] = [
  { size: 3, label: "3×3 Grid", description: "Great for beginners" },
  { size: 4, label: "4×4 Grid", description: "A little bigger — more pictures!" },
  { size: 5, label: "5×5 Grid", description: "Big grid — about 10 spaces to fill" },
];

export interface AgeGroup {
  id: string;
  label: string;
  description: string;
  icon: string;
  active: boolean;
  recommended?: boolean;
  difficulties?: Difficulty[];
  timeEstimate?: string;
}

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: "3-4",
    label: "Ages 3–4",
    description: "Picture Sudoku with friendly images",
    icon: "🦁",
    active: true,
    recommended: true,
    difficulties: ["easy", "medium", "hard"],
    timeEstimate: "5–15 minutes",
  },
  {
    id: "5-6",
    label: "Ages 5–6",
    description: "Shapes, colors, and simple symbols",
    icon: "🐘",
    active: false,
  },
  {
    id: "6-7",
    label: "Ages 6–7",
    description: "Classic beginner number sudoku",
    icon: "🦛",
    active: false,
  },
];

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { label: string; className: string }
> = {
  easy: {
    label: "Easy",
    className:
      "border-[#88B04B]/40 bg-[#E8F5E0] text-[#4A7A32] hover:bg-[#DCEED4]",
  },
  medium: {
    label: "Medium",
    className:
      "border-[#F4A261]/40 bg-[#FFF0E5] text-[#C46A2E] hover:bg-[#FFE5D4]",
  },
  hard: {
    label: "Hard",
    className:
      "border-[#B8B5FF]/50 bg-[#EEEDFF] text-[#6B67C7] hover:bg-[#E0DFFF]",
  },
};

export { Lightbulb, Lock, Shield, Sprout };

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/#challenges") return pathname.startsWith("/sudoku");
  return pathname.startsWith(href);
}
