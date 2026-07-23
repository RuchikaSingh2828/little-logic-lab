"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface PictureCardProps {
  symbol: string;
  size?: "xs" | "sm" | "md" | "lg";
  isDragging?: boolean;
  className?: string;
}

function parseShapeSymbol(symbol: string): { type: string; color: string } | null {
  if (!symbol.startsWith("shape:")) return null;
  const [, type, color] = symbol.split(":");
  if (!type || !color) return null;
  return { type, color };
}

function ShapeGlyph({ type, color }: { type: string; color: string }) {
  const shared = { fill: color };

  switch (type) {
    case "circle":
      return <circle cx="24" cy="24" r="16" {...shared} />;
    case "square":
      return <rect x="10" y="10" width="28" height="28" rx="3" {...shared} />;
    case "triangle":
      return <polygon points="24,8 40,40 8,40" {...shared} />;
    case "diamond":
      return <polygon points="24,8 40,24 24,40 8,24" {...shared} />;
    case "star":
      return (
        <polygon
          points="24,6 29,20 44,20 32,29 37,43 24,34 11,43 16,29 4,20 19,20"
          {...shared}
        />
      );
    case "hexagon":
      return (
        <polygon
          points="24,7 38,15 38,33 24,41 10,33 10,15"
          {...shared}
        />
      );
    default:
      return <circle cx="24" cy="24" r="16" {...shared} />;
  }
}

export function PictureCard({
  symbol,
  size = "md",
  isDragging = false,
  className,
}: PictureCardProps) {
  const isImage = symbol.startsWith("/");
  const shape = parseShapeSymbol(symbol);
  const isNumber = /^\d+$/.test(symbol);

  const sizeClasses = {
    xs: "h-8 w-8 text-lg sm:h-9 sm:w-9 sm:text-xl",
    sm: "h-10 w-10 text-xl sm:h-12 sm:w-12 sm:text-2xl",
    md: "h-16 w-16 text-4xl sm:h-20 sm:w-20 sm:text-5xl",
    lg: "h-20 w-20 text-5xl sm:h-24 sm:w-24 sm:text-6xl",
  };

  const numberSizeClasses = {
    xs: "text-xl sm:text-2xl",
    sm: "text-2xl sm:text-3xl",
    md: "text-4xl sm:text-5xl",
    lg: "text-5xl sm:text-6xl",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-gray-100 bg-white shadow-md select-none",
        sizeClasses[size],
        isDragging && "opacity-50",
        className
      )}
      aria-hidden={isDragging}
    >
      {shape ? (
        <svg viewBox="0 0 48 48" className="h-3/4 w-3/4" aria-hidden>
          <ShapeGlyph type={shape.type} color={shape.color} />
        </svg>
      ) : isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={symbol} alt="" className="h-3/4 w-3/4 object-contain" />
      ) : isNumber ? (
        <span
          className={cn("font-bold text-slate-700", numberSizeClasses[size])}
          aria-label={`number ${symbol}`}
        >
          {symbol}
        </span>
      ) : (
        <span role="img" aria-label="picture card">
          {symbol}
        </span>
      )}
    </div>
  );
}

interface DraggablePictureCardProps {
  symbol: string;
  id: string;
  size?: "xs" | "sm" | "md" | "lg";
  onTap?: () => void;
  isSelected?: boolean;
}

export function DraggablePictureCard({
  symbol,
  id,
  size = "sm",
  onTap,
  isSelected,
}: DraggablePictureCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id, data: { symbol } });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onTap}
      className={cn(
        "touch-none cursor-grab active:cursor-grabbing rounded-2xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky",
        isSelected && "ring-2 ring-[#65B741] ring-offset-2"
      )}
      aria-label={`Puzzle piece ${symbol}`}
      aria-pressed={isSelected}
    >
      <PictureCard symbol={symbol} size={size} isDragging={isDragging} />
    </button>
  );
}
