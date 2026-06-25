import { cn } from "@/lib/utils";

interface SudokuLogoProps {
  className?: string;
}

export function SudokuLogo({ className }: SudokuLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0 text-emerald-600", className)}
      aria-hidden
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="3"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 2v20M16 2v20M2 8h20M2 16h20"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.55"
      />
      <rect x="3.5" y="3.5" width="3.5" height="3.5" rx="0.75" fill="#3B82F6" />
      <rect x="11.25" y="3.5" width="3.5" height="3.5" rx="0.75" fill="#F59E0B" />
      <rect x="3.5" y="11.25" width="3.5" height="3.5" rx="0.75" fill="#A855F7" />
      <rect x="19" y="11.25" width="3.5" height="3.5" rx="0.75" fill="#EF4444" />
      <rect x="11.25" y="19" width="3.5" height="3.5" rx="0.75" fill="#22C55E" />
      <rect x="19" y="19" width="3.5" height="3.5" rx="0.75" fill="#EC4899" />
    </svg>
  );
}
