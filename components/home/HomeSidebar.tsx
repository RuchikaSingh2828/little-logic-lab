import Link from "next/link";
import { ChevronRight, Puzzle, Users } from "lucide-react";
import { QUICK_STATS } from "./home-data";

export function HomeSidebar() {
  return (
    <aside className="flex w-full flex-col gap-4 lg:max-w-[280px] lg:shrink-0">
      <section className="rounded-[1.25rem] border border-[#E8E4DC] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <h2 className="font-heading text-sm font-bold text-[#2D3748]">
          Continue Learning
        </h2>
        <div className="mt-3 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF6E3] text-[#65B741]">
            <Puzzle className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold whitespace-nowrap text-[#2D3748]">
              3×3 Grid — Explorer
            </p>
            <p className="text-xs text-[#6B7280]">Puzzle 5</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EEF2E8]">
              <div
                className="h-full rounded-full bg-[#65B741]"
                style={{ width: "40%" }}
              />
            </div>
            <p className="mt-1 text-[11px] font-medium text-[#6B7280]">
              40% Complete
            </p>
          </div>
        </div>
        <Link
          href="/sudoku/picture/3/medium"
          className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border-2 border-[#65B741] px-3 py-2 text-sm font-bold text-[#65B741] transition-colors hover:bg-[#EAF6E3]"
        >
          Continue
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </section>

      <section className="rounded-[1.25rem] border border-[#E8E4DC] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <h2 className="font-heading text-sm font-bold text-[#2D3748]">
          Your Quick Stats
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {QUICK_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#F0EBE3] bg-[#FFFCFA] p-2.5"
            >
              <span
                className={`mb-1.5 inline-flex h-7 w-7 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="h-3.5 w-3.5" strokeWidth={2.4} />
              </span>
              <p className="font-heading text-sm font-extrabold text-[#2D3748]">
                {stat.value}
              </p>
              <p className="text-[10px] font-medium whitespace-nowrap text-[#6B7280]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[1.25rem] bg-[#EAF6E3] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <p className="text-sm font-semibold leading-snug text-[#2D3748]">
          Parents, track detailed progress in the Parent Zone.
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <Link
            href="/parents"
            className="inline-flex rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#3F8A28] shadow-sm transition-colors hover:bg-[#F7FBF4]"
          >
            Go to Parent Zone
          </Link>
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-[#65B741]"
            aria-hidden
          >
            <Users className="h-6 w-6" strokeWidth={2.2} />
          </span>
        </div>
      </section>
    </aside>
  );
}
