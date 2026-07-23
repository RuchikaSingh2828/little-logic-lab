import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Sudokid",
  description:
    "Sudokid is a free kids Sudoku web app that grows from picture puzzles to classic number grids — calm logic practice for ages 3–7.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Sudokid",
    description:
      "Why we built a gentle Sudoku path for young children and their grown-ups.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm text-[#6B7280]">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / About
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#2D3748]">
        About Sudokid
      </h1>
      <p className="mt-3 text-base leading-relaxed text-[#6B7280]">
        Sudokid helps children build focus, pattern recognition, and confidence
        through playful Sudoku. Instead of dropping a 9×9 adult grid on a
        preschooler, we start with pictures, then shapes, then numbers — same
        logic, kinder steps.
      </p>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-bold text-[#2D3748]">
          What we believe
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#6B7280]">
          <li>Short, calm sessions beat noisy gamification.</li>
          <li>Parents deserve transparency without accounts or ads.</li>
          <li>Mistakes are part of learning — hints should feel supportive.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xl font-bold text-[#2D3748]">
          Explore
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link href="/how-to-play" className="font-semibold text-[#3F8A28] underline">
              How to play
            </Link>
          </li>
          <li>
            <Link href="/sudoku" className="font-semibold text-[#3F8A28] underline">
              All puzzle modes
            </Link>
          </li>
          <li>
            <Link href="/parents" className="font-semibold text-[#3F8A28] underline">
              For grown-ups
            </Link>
          </li>
          <li>
            <Link href="/faq" className="font-semibold text-[#3F8A28] underline">
              FAQ
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
