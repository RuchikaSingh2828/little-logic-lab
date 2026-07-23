"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-11 items-center gap-2 rounded-full bg-white py-1 pl-1 pr-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:pr-3"
        aria-label="Profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE08A] text-lg shadow-inner">
          😊
        </span>
        <span className="hidden text-sm font-semibold text-[#2D3748] sm:inline">
          Hi there!
        </span>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 text-[#6B7280] transition-transform sm:block",
            open && "rotate-180"
          )}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[12rem] overflow-hidden rounded-2xl border border-[#E8E4DC] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          {PROFILE_MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#2D3748] transition-colors hover:bg-[#FFF8EC]"
            >
              <item.icon className="h-4 w-4 text-[#6B7280]" strokeWidth={2.4} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
