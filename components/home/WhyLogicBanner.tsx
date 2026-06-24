import { Lightbulb } from "./home-data";

const WHY_LOGIC_COPY =
  "They help build focus, problem-solving skills, and confidence — one puzzle at a time.";

function PuzzlePiecesIllustration() {
  return (
    <div className="shrink-0" aria-hidden>
      <div className="relative h-12 w-16 sm:h-14 sm:w-20">
        <span className="absolute left-0 top-0 text-2xl text-[#9B8EC4]">🧩</span>
        <span className="absolute right-0 top-1 rotate-12 text-xl text-[#88B04B] opacity-90">
          🧩
        </span>
        <span className="absolute bottom-0 left-2 -rotate-6 text-lg text-[#F4A261] opacity-80">
          🧩
        </span>
        <span className="absolute bottom-1 right-1 rotate-45 text-base text-[#6BA3C7] opacity-70">
          🧩
        </span>
      </div>
    </div>
  );
}

export function WhyLogicBanner() {
  return (
    <section className="mt-6 overflow-hidden rounded-[1.25rem] border border-amber-200/40 bg-[#FFF8E8] px-4 py-4 shadow-[0_2px_12px_rgba(45,42,38,0.04)] sm:mt-10 sm:rounded-3xl sm:px-6 sm:py-5">
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-200/90 sm:h-11 sm:w-11">
          <Lightbulb className="h-5 w-5 text-amber-700" strokeWidth={2.5} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-[#3D3220] sm:text-base">
            Why logic puzzles?
          </h2>
          <p className="mt-0.5 text-xs leading-relaxed text-[#7A6B52] sm:text-sm">
            {WHY_LOGIC_COPY}
          </p>
        </div>

        <PuzzlePiecesIllustration />
      </div>
    </section>
  );
}
