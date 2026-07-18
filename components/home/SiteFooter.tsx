import Link from "next/link";
import { SudokidLogo } from "@/components/brand/SudokidLogo";
import { FOOTER_LINKS } from "./home-data";

export function SiteFooter() {
  return (
    <footer className="mt-4 border-t border-[#E8E4DC] bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <SudokidLogo variant="full" size="sm" />

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-[#6B7280] transition-colors hover:text-[#2D3748]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs font-medium text-[#9CA3AF]">
          Made with ❤️ for curious minds
        </p>
      </div>
    </footer>
  );
}
