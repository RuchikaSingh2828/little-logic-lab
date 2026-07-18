"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOBILE_BOTTOM_NAV, isNavActive } from "./home-data";

export function HomeBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E4DC] bg-white/95 backdrop-blur-sm lg:hidden">
      <ul className="mx-auto flex max-w-lg items-center justify-around px-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5">
        {MOBILE_BOTTOM_NAV.map((item) => {
          const isActive = isNavActive(pathname, item.href);

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-w-[4.5rem] flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-colors",
                  isActive ? "text-[#3F8A28]" : "text-[#9CA3AF]"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    isActive && "bg-[#EAF6E3]"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-[#65B741]" : "text-[#C4BEB6]"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
