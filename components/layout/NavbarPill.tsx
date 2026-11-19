"use client";

import {
  LogOut,
  Menu,
  RefreshCw,
  ShieldCheck,
  SquareUserRound,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavItems } from "@/config/nav";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";

export function NavbarPill() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const mounted = useIsMounted();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = useAuthStore((s) => s.currentUser);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!accountMenuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountMenuOpen(false);
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [accountMenuOpen]);

  const activeUser = mounted ? currentUser : null;

  return (
    <>
      <header className="site-navbar sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#EDEDEA]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between gap-4 lg:gap-8">
          <BrandMark />

          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Navigation principale"
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
                    "py-1 text-[14px] whitespace-nowrap shrink-0 transition-colors duration-200 border-b-[1.5px]",
                    active
                      ? "text-[#111111] font-medium border-[#111111]"
                      : "text-[#5F5F5A] hover:text-[#111111] border-transparent"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            {activeUser ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((o) => !o)}
                  aria-expanded={accountMenuOpen}
                  className="h-10 pl-1.5 pr-3.5 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[13px] font-medium whitespace-nowrap inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold",
                      activeUser.role === "admin"
                        ? "bg-[#0d2b24] text-[#bfecdc]"
                        : "bg-[#111111] text-white"
                    )}
                  >
                    {activeUser.initials}
                  </span>
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-[#EDEDEA] shadow-xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-[#EDEDEA]">
                      <p className="text-[13px] font-semibold text-[#111111] truncate">
                        {activeUser.name}
                      </p>
                      <p className="text-[11px] text-[#5F5F5A] truncate">
                        {activeUser.title}
                      </p>
                    </div>
                    <div className="py-1 space-y-0.5">
                      <Link
                        href={activeUser.role === "admin" ? "/admin" : "/account"}
                        onClick={() => setAccountMenuOpen(false)}
                        className="w-full px-3 py-2 rounded-xl text-[13px] font-medium text-[#111111] hover:bg-[#faf9f6] flex items-center gap-2 transition-colors"
                      >
                        {activeUser.role === "admin" ? (
                          <ShieldCheck className="w-4 h-4 text-[#0d2b24]" />
                        ) : (
                          <User className="w-4 h-4 text-[#111111]" />
                        )}
                        {activeUser.role === "admin"
                          ? "Bureau Conciergerie Admin"
                          : "Mon Espace Client"}
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          openAuthModal(activeUser.role === "admin" ? "user" : "admin");
                        }}
                        className="w-full px-3 py-2 rounded-xl text-[13px] text-[#5F5F5A] hover:text-[#111111] hover:bg-[#faf9f6] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Changer de compte
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          logout();
                          if (pathname === "/account" || pathname === "/admin") {
                            router.push("/");
                          }
                        }}
                        className="w-full px-3 py-2 rounded-xl text-[13px] text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal()}
                aria-label="Connexion"
                title="Connexion"
                className="hidden sm:inline-flex h-10 w-10 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] items-center justify-center transition-colors cursor-pointer"
              >
                <SquareUserRound className="w-5 h-5" strokeWidth={1.75} />
              </button>
            )}

            <Link
              href="/account/reservation"
              className="h-10 px-5 rounded-full bg-[#111111] text-white text-[14px] font-medium whitespace-nowrap shrink-0 inline-flex items-center justify-center hover:bg-[#2A2A28] transition-colors"
            >
              Réserver
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="md:hidden w-10 h-10 rounded-full bg-[#F4F1EA] text-[#111111] flex items-center justify-center cursor-pointer"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
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
