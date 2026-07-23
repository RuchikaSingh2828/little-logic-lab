import type { Metadata } from "next";
import Link from "next/link";
import { SUDOKU_MODE_CONFIG } from "@/features/sudoku/config/sudokuModes";
import { DIFFICULTIES, MODE_SIZES } from "@/features/sudoku/lib/routeParams";
import type { SudokuMode } from "@/features/sudoku/types/sudoku.types";
import { SITE_URL } from "@/lib/site";

interface ModeHubProps {
  mode: SudokuMode;
  ageLabel: string;
  blurb: string;
}

export function buildModeHubMetadata(mode: SudokuMode): Metadata {
  const config = SUDOKU_MODE_CONFIG[mode];
  const title = `${config.title} for Kids`;
  const description = `${config.title} online — free grids for children. ${config.instructions}`;
  return {
    title,
    description,
    alternates: { canonical: config.hrefPrefix },
    openGraph: {
      title: `${title} | Sudokid`,
      description,
      url: config.hrefPrefix,
    },
  };
}

export function ModeHubPage({ mode, ageLabel, blurb }: ModeHubProps) {
  const config = SUDOKU_MODE_CONFIG[mode];
  const sizes = MODE_SIZES[mode];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.title,
    url: `${SITE_URL}${config.hrefPrefix}`,
    description: blurb,
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
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
        /{" "}
        <Link href="/sudoku" className="hover:underline">
          Sudoku
        </Link>{" "}
        / {config.title}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#2D3748]">
        {config.title} for kids
      </h1>
      <p className="mt-2 text-sm font-semibold text-[#3F8A28]">{ageLabel}</p>
      <p className="mt-3 text-base text-[#6B7280]">{blurb}</p>
      <p className="mt-2 text-sm text-[#6B7280]">{config.instructions}</p>

      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold text-[#2D3748]">
          Choose a grid size
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {sizes.map((size) => (
            <div
              key={size}
              className="rounded-2xl border border-[#E8E4DC] bg-white p-4"
            >
              <h3 className="font-heading text-base font-bold text-[#2D3748]">
                {size}×{size} {config.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {DIFFICULTIES.map((difficulty) => (
                  <li key={difficulty}>
                    <Link
                      href={`${config.hrefPrefix}/${size}/${difficulty}`}
                      className="inline-flex rounded-lg bg-[#65B741] px-3 py-2 text-xs font-bold text-white hover:bg-[#57a338]"
                    >
                      Play {difficulty}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
