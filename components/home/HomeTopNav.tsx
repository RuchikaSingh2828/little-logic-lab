"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DESKTOP_NAV, MOBILE_MENU_NAV, isNavActive } from "./home-data";
import { ProfileMenu } from "./ProfileMenu";
import { SudokuLogo } from "@/features/sudoku/components/SudokuLogo";

export function HomeTopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#EBE7E0]/60 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Mobile: hamburger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen((open) => !open)}
            className="h-10 w-10 shrink-0 rounded-xl bg-white text-[#3D3A36] shadow-sm hover:bg-white/90 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-5 w-5 stroke-[2.5px]" />
            ) : (
              <Menu className="h-5 w-5 stroke-[2.5px]" />
            )}
          </Button>

          {/* Logo — centered on mobile, left on desktop */}
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center justify-center gap-2 lg:flex-none lg:justify-start"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage/30">
              <SudokuLogo className="h-6 w-6" />
            </span>
            <span className="truncate text-sm font-bold text-[#2D2A26] sm:text-base">
              Sudokid
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {DESKTOP_NAV.map((item) => {
              const isActive = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sage/30 text-[#3D5A32]"
                      : "text-[#7A756D] hover:bg-sage/15 hover:text-[#2D2A26]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Profile avatar */}
          <ProfileMenu className="shrink-0" />
        </div>
      </header>

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/20"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <nav className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-cream px-5 py-6 shadow-xl">
            <div className="mb-8 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/30">
                <SudokuLogo className="h-7 w-7" />
              </span>
              <p className="text-base font-bold text-[#2D2A26]">
                Sudokid
              </p>
            </div>

            <ul className="flex flex-col gap-1">
              {MOBILE_MENU_NAV.map((item) => {
                const isActive = isNavActive(pathname, item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-medium transition-colors",
                        isActive
                          ? "bg-sage/30 text-[#3D5A32]"
                          : "text-[#7A756D] hover:bg-sage/15"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-[#5A7A4A]" : "text-[#A8A29E]"
                        )}
                        strokeWidth={2.5}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
