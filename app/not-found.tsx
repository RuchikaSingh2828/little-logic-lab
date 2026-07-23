import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
      <p className="font-heading text-sm font-bold uppercase tracking-wide text-[#65B741]">
        404
      </p>
      <h1 className="mt-2 font-heading text-2xl font-extrabold text-[#2D3748]">
        This page wandered off the grid
      </h1>
      <p className="mt-3 max-w-sm text-sm text-[#6B7280]">
        The puzzle path you opened doesn&apos;t exist. Head home and pick an
        age group to play.
      </p>
      <Link href="/" className="mt-8">
        <Button className="rounded-xl bg-[#65B741] text-white hover:bg-[#57a338]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sudokid
        </Button>
      </Link>
    </main>
  );
}
