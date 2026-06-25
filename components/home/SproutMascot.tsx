import { cn } from "@/lib/utils";

interface SproutMascotProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

const sizeMap = {
  sm: { container: "h-14 w-14", plant: "h-9 w-9", pot: "h-2 w-6", leaf: "h-2 w-2" },
  md: { container: "h-[5.5rem] w-[5.5rem]", plant: "h-14 w-14", pot: "h-2.5 w-8", leaf: "h-2.5 w-2.5" },
  lg: { container: "h-36 w-36 sm:h-40 sm:w-40", plant: "h-20 w-20 sm:h-24 sm:w-24", pot: "h-3 w-10", leaf: "h-3 w-3" },
};

export function SproutMascot({
  size = "md",
  className,
  animated = true,
}: SproutMascotProps) {
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        "relative shrink-0",
        s.container,
        animated && "animate-mascot-float",
        className
      )}
    >
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

      <span className="absolute left-[12%] top-[18%] text-[8px] text-amber-400 opacity-80 sm:text-[10px]">
        ✦
      </span>
      <span className="absolute right-[14%] top-[22%] text-[7px] text-violet-400 sm:text-[9px]">
        ✦
      </span>
      <span className="absolute bottom-[28%] left-[8%] text-[7px] text-emerald-400 sm:text-[8px]">
        ●
      </span>
      <span className="absolute bottom-[32%] right-[10%] text-[8px] text-rose-300 sm:text-[9px]">
        ✦
      </span>

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full bg-gradient-to-b from-emerald-300 to-emerald-500 shadow-[0_4px_12px_rgba(34,120,80,0.2)]",
            s.plant
          )}
        >
          {/* Eyes */}
          <div className="absolute top-[30%] flex w-[42%] justify-between">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-900/75 sm:h-2 sm:w-2" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-900/75 sm:h-2 sm:w-2" />
          </div>
          {/* Rosy cheeks */}
          <span className="absolute left-[18%] top-[48%] h-1.5 w-2 rounded-full bg-rose-300/50 sm:h-2 sm:w-2.5" />
          <span className="absolute right-[18%] top-[48%] h-1.5 w-2 rounded-full bg-rose-300/50 sm:h-2 sm:w-2.5" />
          {/* Happy smile */}
          <span className="absolute bottom-[24%] block h-1 w-3.5 rounded-b-full border-b-2 border-emerald-900/55 sm:h-1.5 sm:w-4" />
          {/* Leaves */}
          <span
            className={cn(
              "absolute -top-1 left-1.5 rotate-[-28deg] rounded-full bg-emerald-400",
              s.leaf
            )}
          />
          <span
            className={cn(
              "absolute -top-1.5 right-1 rotate-[22deg] rounded-full bg-emerald-300",
              s.leaf
            )}
          />
        </div>
        <div className={cn("rounded-b-md bg-amber-700/85", s.pot)} />
      </div>
    </div>
  );
}
