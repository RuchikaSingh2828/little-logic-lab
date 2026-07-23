import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    description: SITE_DESCRIPTION,
  },
};

export default function Page() {
  return <HomePage />;
}
