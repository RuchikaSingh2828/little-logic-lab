import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EncouragementFooter } from "@/components/EncouragementFooter";
import { ParentsStats } from "@/components/home/ParentsStats";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Parents’ Guide to Kids Sudoku (Ages 3–7)",
  description:
    "How Sudokid helps children ages 3–7 build focus, logic, and confidence with picture, shape, and number Sudoku — plus on-device progress for grown-ups.",
  alternates: { canonical: "/parents" },
  openGraph: {
    title: "Parents’ Guide to Kids Sudoku | Sudokid",
    description:
      "Screen-time friendly logic practice, age paths, and local progress tracking.",
    url: "/parents",
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much screen time is appropriate with Sudokid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most families do well with short sessions of 5–15 minutes. Follow your child’s energy and stop while it still feels fun.",
      },
    },
    {
      "@type": "Question",
      name: "Does Sudokid require an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Progress stays on this device in the browser. There is no child login.",
      },
    },
  ],
  url: `${SITE_URL}/parents`,
};

export default function ParentsPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="mb-8 flex items-center gap-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-xl hover:bg-sage/20"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">
          Parents’ guide to kids Sudoku
        </h1>
      </header>

      <section className="mb-8 rounded-2xl border border-sage/40 bg-white p-5">
        <h2 className="text-lg font-semibold text-foreground">Why Sudokid?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Sudokid is a free kids Sudoku app designed for ages 3–7. Younger
          children start with picture puzzles, then move to shapes and colors,
          and finally classic number grids. Short sessions build pattern
          recognition, concentration, and calm problem-solving — without ads or
          accounts.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Read{" "}
          <Link href="/how-to-play" className="font-semibold text-[#3F8A28] underline">
            how to play
          </Link>{" "}
          or browse the{" "}
          <Link href="/faq" className="font-semibold text-[#3F8A28] underline">
            FAQ
          </Link>
          .
        </p>
      </section>

      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Progress on this device
      </h2>
      <ParentsStats />

      <EncouragementFooter refreshKey="parents" className="mt-8" />
    </main>
  );
}
