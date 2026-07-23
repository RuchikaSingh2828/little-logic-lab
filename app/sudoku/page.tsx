import type { Metadata } from "next";
import Link from "next/link";
import { AGE_GROUPS } from "@/components/home/home-data";
import { SUDOKU_MODE_CONFIG } from "@/features/sudoku/config/sudokuModes";
import { MODE_SIZES, DIFFICULTIES } from "@/features/sudoku/lib/routeParams";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kids Sudoku Puzzles",
  description:
    "Browse Sudokid puzzle modes — picture Sudoku for ages 3–4, shape Sudoku for ages 5–6, and number Sudoku for ages 7+. Free online logic puzzles for kids.",
  alternates: { canonical: "/sudoku" },
  openGraph: {
    title: "Kids Sudoku Puzzles | Sudokid",
    description:
      "Choose picture, shape, or number Sudoku and pick a grid size that fits your child.",
    url: "/sudoku",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Kids Sudoku Puzzles",
  url: `${SITE_URL}/sudoku`,
  description:
    "Picture, shape, and number Sudoku puzzles for children ages 3–7.",
};

export default function SudokuHubPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <p className="text-sm font-medium text-[#6B7280]">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / Sudoku
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#2D3748]">
        Kids Sudoku puzzles
      </h1>
      <p className="mt-3 max-w-2xl text-base text-[#6B7280]">
        Sudokid grows with your child: start with pictures, move to shapes and
        colors, then classic numbers. Every mode teaches the same rule — each
        row and column needs every symbol once.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {AGE_GROUPS.filter((g) => g.active).map((group) => {
          const config = SUDOKU_MODE_CONFIG[group.mode];
          const sizes = MODE_SIZES[group.mode];
          return (
            <section
              key={group.id}
              className="rounded-2xl border border-[#E8E4DC] bg-white p-5 shadow-sm"
            >
              <h2 className="font-heading text-xl font-extrabold text-[#2D3748]">
                <Link
                  href={config.hrefPrefix}
                  className="hover:text-[#3F8A28] hover:underline"
                >
                  {group.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-[#6B7280]">
                {group.label} · {group.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sizes.flatMap((size) =>
                  DIFFICULTIES.map((difficulty) => (
                    <li key={`${size}-${difficulty}`}>
                      <Link
                        href={`${config.hrefPrefix}/${size}/${difficulty}`}
                        className="inline-flex rounded-lg bg-[#FFF8EC] px-3 py-1.5 text-xs font-bold text-[#2D3748] hover:bg-[#EAF6E3]"
                      >
                        {size}×{size} {difficulty}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-[#6B7280]">
        New here? Read{" "}
        <Link href="/how-to-play" className="font-semibold text-[#3F8A28] underline">
          how to play Sudoku for kids
        </Link>
        .
      </p>
    </main>
  );
}
