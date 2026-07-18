"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROFILE_MENU_ITEMS } from "./home-data";

interface ProfileMenuProps {
  className?: string;
}

export function ProfileMenu({ className }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:pr-3"
        aria-label="Profile menu"
        aria-expanded={open}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE08A] text-lg shadow-inner">
          😊
        </span>
        <span className="hidden text-sm font-semibold text-[#2D3748] sm:inline">
          Hi, Ruchika!
        </span>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 text-[#9CA3AF] transition-transform sm:block",
            open && "rotate-180"
          )}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[12rem] overflow-hidden rounded-2xl border border-[#E8E4DC] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          {PROFILE_MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#2D3748] transition-colors hover:bg-[#FFF8EC]"
            >
              <item.icon className="h-4 w-4 text-[#9CA3AF]" strokeWidth={2.4} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
