"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SudokidLogo } from "@/components/brand/SudokidLogo";
import { DESKTOP_NAV, MOBILE_MENU_NAV, isNavActive } from "./home-data";
import { ProfileMenu } from "./ProfileMenu";

export function HomeTopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E8E4DC]/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen((open) => !open)}
            className="h-10 w-10 shrink-0 rounded-xl text-[#2D3748] hover:bg-[#FFF8EC] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-5 w-5 stroke-[2.5px]" />
            ) : (
              <Menu className="h-5 w-5 stroke-[2.5px]" />
            )}
          </Button>

          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center justify-center lg:flex-none lg:justify-start"
            aria-label="Sudokid home"
          >
            <SudokidLogo variant="full" size="md" className="hidden sm:inline-flex" />
            <SudokidLogo variant="mark" size="md" className="sm:hidden" />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {DESKTOP_NAV.map((item) => {
              const isActive = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-[#EAF6E3] text-[#3F8A28]"
                      : "text-[#6B7280] hover:bg-[#FFF8EC] hover:text-[#2D3748]"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-[#65B741]" : "text-[#9CA3AF]"
                    )}
                    strokeWidth={2.4}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <ProfileMenu className="shrink-0" />
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/20"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <nav className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white px-5 py-6 shadow-xl">
            <div className="mb-8">
              <SudokidLogo variant="full" size="md" />
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
                        "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors",
                        isActive
                          ? "bg-[#EAF6E3] text-[#3F8A28]"
                          : "text-[#6B7280] hover:bg-[#FFF8EC]"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-[#65B741]" : "text-[#9CA3AF]"
                        )}
                        strokeWidth={2.4}
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
