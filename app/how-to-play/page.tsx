import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Play Sudoku for Kids",
  description:
    "Simple Sudoku rules for children ages 3–7. Learn how picture, shape, and number Sudoku work on Sudokid — no accounts, no ads, just calm logic practice.",
  alternates: { canonical: "/how-to-play" },
  openGraph: {
    title: "How to Play Sudoku for Kids | Sudokid",
    description:
      "Step-by-step guide: tap a piece, fill empty cells, keep every row and column unique.",
    url: "/how-to-play",
  },
};

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to play Sudoku for kids on Sudokid",
  description:
    "A parent-friendly guide to playing picture, shape, and number Sudoku with young children.",
  totalTime: "PT10M",
  step: [
    {
      "@type": "HowToStep",
      name: "Pick an age path",
      text: "Choose Picture Sudoku (ages 3–4), Shape Sudoku (ages 5–6), or Number Sudoku (ages 7+).",
    },
    {
      "@type": "HowToStep",
      name: "Select a piece",
      text: "Tap a picture, shape, or number in the tray below the grid.",
    },
    {
      "@type": "HowToStep",
      name: "Place it carefully",
      text: "Tap an empty cell. Each row and column needs every symbol exactly once.",
    },
    {
      "@type": "HowToStep",
      name: "Finish the grid",
      text: "Fill every empty cell. Celebrate, then try another puzzle or a bigger grid.",
    },
  ],
  url: `${SITE_URL}/how-to-play`,
};

export default function HowToPlayPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToLd).replace(/</g, "\\u003c"),
        }}
      />
      <p className="text-sm text-[#6B7280]">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / How to Play
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#2D3748]">
        How to play Sudoku for kids
      </h1>
      <p className="mt-3 text-base text-[#6B7280]">
        Sudoku is a logic puzzle: every row and every column must contain each
        symbol once. Sudokid teaches that idea gently — with pictures first,
        then shapes, then numbers.
      </p>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-bold text-[#2D3748]">
          The one rule
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
          No duplicates in a row. No duplicates in a column. That&apos;s it.
          Boxes appear on larger number grids when kids are ready.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-bold text-[#2D3748]">
          Steps for young players
        </h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#6B7280]">
          <li>
            <strong className="text-[#2D3748]">Pick a learning path</strong> on
            the home page that matches your child&apos;s age.
          </li>
          <li>
            <strong className="text-[#2D3748]">Tap a piece</strong> in the tray,
            then tap an empty square — or drag and drop on larger screens.
          </li>
          <li>
            <strong className="text-[#2D3748]">Watch for patterns</strong>. If a
            row already has a puppy, look for another row that still needs one.
          </li>
          <li>
            <strong className="text-[#2D3748]">Use a hint</strong> when stuck —
            calm coaching beats pressure.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-bold text-[#2D3748]">
          Tips for grown-ups
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#6B7280]">
          <li>Keep sessions short (5–15 minutes).</li>
          <li>Celebrate careful thinking, not speed.</li>
          <li>
            Progress is saved on this device — see the{" "}
            <Link href="/parents" className="font-semibold text-[#3F8A28] underline">
              parents page
            </Link>
            .
          </li>
        </ul>
      </section>

      <p className="mt-10">
        <Link
          href="/#challenges"
          className="inline-flex rounded-xl bg-[#65B741] px-4 py-3 text-sm font-bold text-white hover:bg-[#57a338]"
        >
          Start playing
        </Link>
      </p>
    </main>
  );
}
