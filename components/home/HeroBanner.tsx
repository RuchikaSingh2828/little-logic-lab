import { SproutMascot } from "./SproutMascot";

export function HeroBanner() {
  return (
    <section className="w-full">
      <div className="flex max-h-[220px] items-center gap-4 overflow-hidden rounded-[1.35rem] bg-[#F3EDE4] px-4 py-4 shadow-[0_2px_16px_rgba(45,42,38,0.06)] sm:max-h-none sm:gap-8 sm:rounded-3xl sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="min-w-0 flex-1">
          <h1 className="text-[15px] font-bold leading-snug text-[#2D2A26] sm:text-2xl lg:text-[2rem] lg:leading-tight">
            Learn through play and puzzles
          </h1>
          <p className="mt-2 text-[11px] leading-relaxed text-[#7A756D] sm:mt-3 sm:text-sm lg:text-base lg:leading-relaxed">
            Build focus, problem-solving skills, and confidence one puzzle at a
            time.
          </p>
        </div>
        <SproutMascot size="sm" className="sm:hidden" />
        <SproutMascot size="lg" className="hidden sm:block" />
      </div>
    </section>
  );
}
