import { cn } from "@/lib/utils";

interface SudokidLogoProps {
  className?: string;
  /** icon | mark (icon+wordmark) | full (icon+wordmark+tagline) */
  variant?: "icon" | "mark" | "full";
  /** Wordmark size relative to icon */
  size?: "sm" | "md" | "lg";
}

function BrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="12"
        fill="#FFF8EC"
        stroke="#2D3748"
        strokeWidth="2.75"
      />
      <path
        d="M22.67 4.5v55M41.33 4.5v55M4.5 22.67h55M4.5 41.33h55"
        stroke="#2D3748"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* top: · 1 3 */}
      <text
        x="32"
        y="19.2"
        textAnchor="middle"
        fill="#2D3748"
        fontSize="12"
        fontWeight="700"
        fontFamily="var(--font-heading), system-ui, sans-serif"
      >
        1
      </text>
      <text
        x="50.5"
        y="19.2"
        textAnchor="middle"
        fill="#2D3748"
        fontSize="12"
        fontWeight="700"
        fontFamily="var(--font-heading), system-ui, sans-serif"
      >
        3
      </text>
      {/* middle: · [2] · */}
      <rect x="23.5" y="23.5" width="17" height="17" rx="4" fill="#65B741" />
      <text
        x="32"
        y="35.8"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="12"
        fontWeight="700"
        fontFamily="var(--font-heading), system-ui, sans-serif"
      >
        2
      </text>
      {/* bottom: 2 · 1 */}
      <text
        x="13.5"
        y="52.5"
        textAnchor="middle"
        fill="#2D3748"
        fontSize="12"
        fontWeight="700"
        fontFamily="var(--font-heading), system-ui, sans-serif"
      >
        2
      </text>
      <text
        x="50.5"
        y="52.5"
        textAnchor="middle"
        fill="#2D3748"
        fontSize="12"
        fontWeight="700"
        fontFamily="var(--font-heading), system-ui, sans-serif"
      >
        1
      </text>
    </svg>
  );
}

function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-heading font-extrabold tracking-tight lowercase leading-none",
        className
      )}
    >
      <span style={{ color: "#2D3748" }}>sudo</span>
      <span style={{ color: "#65B741" }}>kid</span>
    </span>
  );
}

const SIZE = {
  sm: { icon: "h-8 w-8", mark: "text-xl", tag: "text-[10px]" },
  md: { icon: "h-10 w-10", mark: "text-2xl", tag: "text-[11px]" },
  lg: { icon: "h-12 w-12", mark: "text-3xl", tag: "text-xs" },
} as const;

export function SudokidLogo({
  className,
  variant = "mark",
  size = "md",
}: SudokidLogoProps) {
  const s = SIZE[size];

  if (variant === "icon") {
    return <BrandIcon className={cn(s.icon, className)} />;
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandIcon className={s.icon} />
      <span className="flex min-w-0 flex-col gap-0 leading-none">
        <Wordmark className={s.mark} />
        {variant === "full" && (
          <span
            className={cn(
              "mt-px font-medium leading-none text-[#6B7280]",
              s.tag
            )}
          >
            Every puzzle makes you think.
          </span>
        )}
      </span>
    </span>
  );
}

/** @deprecated Use SudokidLogo — kept for existing imports */
export function SudokuLogo({ className }: { className?: string }) {
  return <BrandIcon className={className} />;
}
