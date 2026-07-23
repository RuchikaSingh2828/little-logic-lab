export function HeroBanner() {
  return (
    <section className="w-full text-center" aria-labelledby="home-hero-heading">
      <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#2F6B1F] sm:text-sm">
        Sudokid
      </p>
      <h1
        id="home-hero-heading"
        className="mt-2 font-heading text-2xl font-extrabold leading-tight tracking-tight text-[#2D3748] sm:text-3xl lg:text-4xl"
      >
        Kids Sudoku that grows with them —{" "}
        <span className="relative inline-block text-[#2F6B1F]">
          start playing
          <svg
            className="absolute -bottom-1 left-0 w-full text-[#2F6B1F]/70"
            viewBox="0 0 120 8"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 5c20-4 40 2 58-1s38-2 58 1"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] sm:text-base">
        Free picture, shape, and number puzzles for ages 3–7. Pick an age group
        to begin.
      </p>
    </section>
  );
}
