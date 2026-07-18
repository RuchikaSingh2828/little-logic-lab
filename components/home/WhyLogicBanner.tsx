import { WHY_SUDOKU } from "./home-data";

export function WhyLogicBanner() {
  return (
    <section className="rounded-[1.25rem] border border-[#E8E4DC] bg-white px-4 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:px-5 sm:py-5">
      <h2 className="text-center font-heading text-lg font-extrabold text-[#2D3748] sm:text-xl">
        Why Sudokid?
      </h2>
      <div className="mt-4 flex flex-col divide-y divide-[#EBE7E0] lg:flex-row lg:divide-x lg:divide-y-0">
        {WHY_SUDOKU.map((item) => (
          <div
            key={item.title}
            className="flex flex-1 items-center gap-3 px-2 py-3 first:pt-0 last:pb-0 lg:px-4 lg:py-1 lg:first:pt-1 lg:last:pb-1"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.color}`}
            >
              <item.icon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 text-left">
              <p className="font-heading text-sm font-bold leading-snug text-[#2D3748]">
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#6B7280] sm:text-xs">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
