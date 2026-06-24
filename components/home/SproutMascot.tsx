import { cn } from "@/lib/utils";

interface SproutMascotProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-16 w-16", plant: "h-10 w-10", pot: "h-2.5 w-7" },
  md: { container: "h-20 w-20", plant: "h-12 w-12", pot: "h-3 w-8" },
  lg: { container: "h-44 w-44 sm:h-48 sm:w-48", plant: "h-24 w-24 sm:h-28 sm:w-28", pot: "h-3 w-10" },
};

export function SproutMascot({ size = "md", className }: SproutMascotProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("relative shrink-0", s.container, className)}>
      <div
        className="absolute inset-0 rounded-full opacity-90"
        aria-hidden
        style={{
          background:
            size === "lg"
              ? "radial-gradient(circle at 25% 35%, #fde68a 0%, transparent 28%), radial-gradient(circle at 75% 45%, #c4b5fd 0%, transparent 22%), radial-gradient(circle at 50% 70%, #86efac 0%, transparent 30%)"
              : "radial-gradient(circle at 35% 40%, #fde68a 0%, transparent 55%), radial-gradient(circle at 70% 55%, #bbf7d0 0%, transparent 50%), radial-gradient(circle at 50% 75%, #e9d5ff 0%, transparent 45%)",
        }}
      />

      {size === "lg" && (
        <>
          <span className="absolute left-[18%] top-[20%] text-sm opacity-70">✦</span>
          <span className="absolute right-[20%] top-[15%] text-xs text-violet-400">✦</span>
          <span className="absolute left-[30%] bottom-[25%] text-xs text-amber-400">✦</span>
          <span className="absolute right-[28%] bottom-[20%] text-sm text-emerald-400">✦</span>
          <span className="absolute left-[45%] top-[12%] text-[10px] text-sky-400">●</span>
          <span className="absolute right-[38%] top-[30%] text-[10px] text-rose-300">●</span>
        </>
      )}

      {size !== "lg" && (
        <>
          <span className="absolute right-[15%] top-[20%] text-[7px] text-violet-400">✦</span>
          <span className="absolute left-[10%] top-[35%] text-[6px] text-amber-500">●</span>
          <span className="absolute right-[22%] bottom-[30%] text-[7px] text-emerald-500">✦</span>
        </>
      )}

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full bg-gradient-to-b from-emerald-300 to-emerald-500 shadow-sm",
            s.plant
          )}
        >
          <div className="absolute top-[28%] flex w-6 justify-between px-0.5">
            <span className="h-1 w-1 rounded-full bg-emerald-900/70" />
            <span className="h-1 w-1 rounded-full bg-emerald-900/70" />
          </div>
          <span className="absolute bottom-[28%] h-0.5 w-2.5 rounded-full bg-emerald-900/50" />
          <span className="absolute -top-1.5 left-1.5 h-2.5 w-2.5 rotate-[-25deg] rounded-full bg-emerald-400" />
          <span className="absolute -top-2 right-1.5 h-3 w-3 rotate-[20deg] rounded-full bg-emerald-300" />
        </div>
        <div className={cn("rounded-b-md bg-amber-700/85", s.pot)} />
      </div>
    </div>
  );
}
