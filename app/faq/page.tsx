import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — Kids Sudoku Questions",
  description:
    "Answers about Sudokid: ages, screen time, picture vs number Sudoku, privacy, hints, and how progress is saved for parents.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Sudokid",
    description: "Common questions about kids Sudoku on Sudokid.",
    url: "/faq",
  },
};

const faqs = [
  {
    q: "What ages is Sudokid for?",
    a: "Sudokid is designed for children roughly ages 3–7. Picture Sudoku suits younger kids; shape and number modes grow with them.",
  },
  {
    q: "Is Sudokid free?",
    a: "Yes. Puzzles are free to play in the browser with no account required.",
  },
  {
    q: "Do you need an account?",
    a: "No. Progress is stored locally on the device your child uses.",
  },
  {
    q: "Is it safe for kids?",
    a: "There are no ads and no chat. We recommend an adult nearby for the youngest players, especially for reading instructions.",
  },
  {
    q: "How is this different from adult Sudoku?",
    a: "We start with pictures and smaller grids, then introduce shapes and numbers. The logic rule stays the same.",
  },
  {
    q: "Where can parents see progress?",
    a: "Open the Parents page to see games played, skills practiced, and time spent today on this device.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
  url: `${SITE_URL}/faq`,
};

export default function FaqPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
      <p className="text-sm text-[#6B7280]">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / FAQ
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#2D3748]">
        Frequently asked questions
      </h1>
      <p className="mt-3 text-base text-[#6B7280]">
        Quick answers for parents and caregivers about Sudokid.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {faqs.map((item) => (
          <section
            key={item.q}
            className="rounded-2xl border border-[#E8E4DC] bg-white p-5"
          >
            <h2 className="font-heading text-base font-bold text-[#2D3748]">
              {item.q}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              {item.a}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-8 text-sm text-[#6B7280]">
        Still curious? Read{" "}
        <Link href="/how-to-play" className="font-semibold text-[#3F8A28] underline">
          how to play
        </Link>{" "}
        or the{" "}
        <Link href="/privacy" className="font-semibold text-[#3F8A28] underline">
          privacy policy
        </Link>
        .
      </p>
    </main>
  );
}
