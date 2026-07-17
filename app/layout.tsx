import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sudokid",
  description:
    "Learn through play and puzzles — calm educational activities for children aged 3–7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full overflow-x-hidden antialiased`}>
      <body className="flex min-h-full max-w-[100vw] flex-col overflow-x-hidden bg-cream font-sans text-foreground">
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
