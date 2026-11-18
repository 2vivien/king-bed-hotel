"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { primaryNavItems } from "@/config/nav";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#FAF9F6] flex flex-col justify-between p-6 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div>
        <div className="flex items-center justify-between h-14">
          <BrandMark />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-11 h-11 rounded-full bg-white border border-[#111111]/10 flex items-center justify-center text-[#111111]"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-2" aria-label="Mobile primary">
          {primaryNavItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "px-5 py-3.5 rounded-full text-[20px] font-light tracking-[-0.02em] transition-colors",
                  active
                    ? "bg-[#EFE6D6] text-[#111111] font-normal"
                    : "text-[#111111] hover:bg-[#F4F1EA]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/rooms"
            onClick={onClose}
            className="px-5 py-3.5 rounded-full text-[20px] font-light tracking-[-0.02em] text-[#5F5F5A] hover:bg-[#F4F1EA]"
          >
            Rooms &amp; Suites
          </Link>
          <Link
            href="/my-booking"
            onClick={onClose}
            className="px-5 py-3.5 rounded-full text-[20px] font-light tracking-[-0.02em] text-[#5F5F5A] hover:bg-[#F4F1EA]"
          >
            My Booking
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="px-5 py-3.5 rounded-full text-[20px] font-light tracking-[-0.02em] text-[#5F5F5A] hover:bg-[#F4F1EA]"
          >
            Contact
          </Link>
        </nav>
      </div>

      <Link
        href="/reservation"
        onClick={onClose}
        className="w-full h-12 rounded-full bg-[#111111] text-white text-[15px] font-medium flex items-center justify-center"
      >
        Booking
      </Link>
    </div>
  );
}
