import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EncouragementFooter } from "@/components/EncouragementFooter";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "More Sudokid puzzles and features are on the way.",
  robots: { index: false, follow: true },
};

export default function ComingSoonPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col items-center justify-center px-4 py-12 pb-8 text-center">
      <p className="text-5xl" aria-hidden="true">
        🌱
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        Coming Soon
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        We&apos;re working on more puzzles for this age group. Picture Sudoku
        for ages 3–4 is ready to play now.
      </p>
      <Link href="/" className="mt-8">
        <Button className="rounded-xl bg-sky text-foreground hover:bg-sky/80">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <EncouragementFooter refreshKey="coming-soon" className="mt-auto w-full" />
    </main>
  );
}
