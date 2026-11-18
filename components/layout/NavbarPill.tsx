"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavItems } from "@/config/nav";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";

export function NavbarPill() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-10 pointer-events-none">
        <div className="max-w-[1280px] mx-auto pointer-events-auto">
          <div className="h-14 sm:h-16 px-4 sm:px-6 rounded-full glass-surface border border-[#111111]/8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4 lg:gap-8">
            <BrandMark />

            <nav
              className="hidden md:flex items-center gap-0.5 lg:gap-1.5"
              aria-label="Primary navigation"
            >
              {primaryNavItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 lg:px-4 py-2 rounded-full text-[13px] lg:text-[14px] whitespace-nowrap shrink-0 transition-colors duration-200",
                      active
                        ? "bg-[#EFE6D6] text-[#111111] font-medium"
                        : "text-[#5F5F5A] hover:text-[#111111] hover:bg-[#F4F1EA]/70"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/reservation"
                className="h-10 px-5 rounded-full bg-[#111111] text-white text-[14px] font-medium whitespace-nowrap shrink-0 inline-flex items-center justify-center hover:bg-[#2A2A28] transition-colors"
              >
                Booking
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                className="md:hidden w-10 h-10 rounded-full bg-[#F4F1EA] text-[#111111] flex items-center justify-center cursor-pointer"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
