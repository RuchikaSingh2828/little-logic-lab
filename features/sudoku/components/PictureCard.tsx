"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface PictureCardProps {
  symbol: string;
  size?: "sm" | "md" | "lg";
  isDragging?: boolean;
  className?: string;
}

export function PictureCard({
  symbol,
  size = "md",
  isDragging = false,
  className,
}: PictureCardProps) {
  const isImage = symbol.startsWith("/");

  const sizeClasses = {
    sm: "h-12 w-12 text-2xl",
    md: "h-16 w-16 text-4xl sm:h-20 sm:w-20 sm:text-5xl",
    lg: "h-20 w-20 text-5xl sm:h-24 sm:w-24 sm:text-6xl",
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
      {isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={symbol} alt="" className="h-3/4 w-3/4 object-contain" />
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
  onTap?: () => void;
  isSelected?: boolean;
}

export function DraggablePictureCard({
  symbol,
  id,
  onTap,
  isSelected,
}: DraggablePictureCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

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
        isSelected && "ring-2 ring-coral ring-offset-2"
      )}
      aria-label={`Picture piece ${symbol}`}
      aria-pressed={isSelected}
    >
      <PictureCard symbol={symbol} isDragging={isDragging} />
    </button>
  );
}
