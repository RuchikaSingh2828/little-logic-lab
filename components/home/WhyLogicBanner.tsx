import { Lightbulb } from "./home-data";

const WHY_LOGIC_COPY =
  "They help build focus, problem-solving skills, and confidence — one puzzle at a time.";

function PuzzlePiecesIllustration() {
  return (
    <div className="hidden shrink-0 sm:block" aria-hidden>
      <div className="relative h-14 w-20">
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
    <section className="overflow-hidden rounded-3xl border border-amber-200/40 bg-[#FFF8E8] px-5 py-5 shadow-[0_2px_16px_rgba(45,42,38,0.04)] sm:px-6 sm:py-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-200/90">
          <Lightbulb className="h-5 w-5 text-amber-700" strokeWidth={2.5} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-[#3D3220] sm:text-lg">
            Why logic puzzles?
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-[#7A6B52]">
            {WHY_LOGIC_COPY}
          </p>
        </div>

        <PuzzlePiecesIllustration />
      </div>
    </section>
  );
}
