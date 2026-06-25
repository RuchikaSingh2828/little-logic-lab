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
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(45,42,38,0.08)] transition-shadow hover:shadow-[0_4px_12px_rgba(45,42,38,0.12)] sm:h-11 sm:w-11"
        aria-label="Profile menu"
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky/40 text-base sm:h-9 sm:w-9">
          👦
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-2xl border border-[#EBE7E0] bg-white py-1 shadow-[0_8px_24px_rgba(45,42,38,0.12)]">
          {PROFILE_MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#2D2A26] transition-colors hover:bg-cream"
            >
              <item.icon className="h-4 w-4 text-[#8A857D]" strokeWidth={2.5} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
