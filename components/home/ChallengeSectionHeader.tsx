import { Sprout } from "./home-data";

interface ChallengeSectionHeaderProps {
  className?: string;
}

export function ChallengeSectionHeader({ className }: ChallengeSectionHeaderProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-1.5">
        <Sprout className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
        <h2 className="text-[15px] font-bold text-[#2D2A26] lg:text-xl">
          Choose your challenge
        </h2>
      </div>
      <p className="mt-1 text-[11px] text-[#9A958D] lg:text-sm lg:text-[#8A857D]">
        Select an age group to begin your learning adventure.
      </p>
    </div>
  );
}
