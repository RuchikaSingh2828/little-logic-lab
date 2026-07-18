export function HeroBanner() {
  return (
    <section className="w-full text-center">
      <h1 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-[#2D3748] sm:text-3xl lg:text-4xl">
        Choose your learning path and{" "}
        <span className="relative inline-block text-[#65B741]">
          start playing
          <svg
            className="absolute -bottom-1 left-0 w-full text-[#65B741]/70"
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
        Pick an age group to begin your Sudoku adventure.
      </p>
    </section>
  );
}
