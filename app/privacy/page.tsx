import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sudokid handles privacy: no accounts required, progress stored on-device, no ads, and what limited analytics may mean in the future.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Sudokid",
    description: "Privacy practices for the Sudokid kids Sudoku web app.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm text-[#6B7280]">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / Privacy
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#2D3748]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">Last updated: July 23, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#6B7280]">
        <section>
          <h2 className="font-heading text-lg font-bold text-[#2D3748]">
            Overview
          </h2>
          <p className="mt-2">
            Sudokid is a free educational Sudoku web app for children. We built
            it to be calm and privacy-conscious: you can play without creating an
            account.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-[#2D3748]">
            Information we store on your device
          </h2>
          <p className="mt-2">
            Puzzle progress, sound preference, and short session stats are saved
            in your browser&apos;s local storage on the device you use. This data
            stays on that device and is not sent to a Sudokid account system
            (there isn&apos;t one today).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-[#2D3748]">
            What we do not collect
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>No child profiles or passwords</li>
            <li>No advertising trackers in the current app</li>
            <li>No sale of personal information</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-[#2D3748]">
            Hosting &amp; logs
          </h2>
          <p className="mt-2">
            The site is hosted on infrastructure that may record standard web
            server logs (such as IP address, user agent, and requested URL) for
            security and reliability. Those logs are controlled by the hosting
            provider&apos;s policies.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-[#2D3748]">
            Contact
          </h2>
          <p className="mt-2">
            Questions about privacy? Reach out via the contact details on our{" "}
            <Link href="/about" className="font-semibold text-[#3F8A28] underline">
              About
            </Link>{" "}
            page when available, or through the site operator who published
            sudokid.in.
          </p>
        </section>
      </div>
    </main>
  );
}
