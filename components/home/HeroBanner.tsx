import { SproutMascot } from "./SproutMascot";

export function HeroBanner() {
  return (
    <section className="w-full">
      <div className="flex max-h-[168px] items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F3EDE4] to-[#EDE8DF] px-4 py-3.5 shadow-[0_2px_16px_rgba(45,42,38,0.05)] sm:max-h-[188px] sm:gap-5 sm:rounded-[1.25rem] sm:px-6 sm:py-4 lg:max-h-[200px] lg:px-7">
        <div className="min-w-0 flex-1">
          <h1 className="text-[15px] font-bold leading-snug text-[#2D2A26] sm:text-xl lg:text-2xl">
            Learn through play and puzzles
          </h1>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-[#7A756D] sm:mt-2 sm:text-sm">
            Build focus, problem-solving skills, and confidence one puzzle at a
            time.
          </p>
        </div>

        <SproutMascot size="md" className="shrink-0" />
      </div>
    </section>
  );
}
