"use client";

import { LogOut, ShieldCheck, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { primaryNavItems } from "@/config/nav";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const mounted = useIsMounted();
  const currentUser = useAuthStore((s) => s.currentUser);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const activeUser = mounted ? currentUser : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col justify-between p-6 md:hidden overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation mobile"
    >
      <div>
        <div className="flex items-center justify-between h-14">
          <BrandMark />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="w-11 h-11 rounded-full bg-white border border-[#EDEDEA] flex items-center justify-center text-[#111111]"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1.5" aria-label="Menu mobile principal">
          {primaryNavItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "px-5 py-3 rounded-full text-[19px] font-light tracking-[-0.02em] transition-colors",
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
            href="/account"
            onClick={onClose}
            className="px-5 py-3 rounded-full text-[19px] font-light tracking-[-0.02em] text-[#5F5F5A] hover:bg-[#F4F1EA]"
          >
            Mon espace
          </Link>
        </nav>
      </div>

      <div className="space-y-3 pt-6 border-t border-[#EDEDEA]">
        {activeUser ? (
          <div className="space-y-2">
            <Link
              href={activeUser.role === "admin" ? "/admin" : "/account"}
              onClick={onClose}
              className="w-full h-12 rounded-full border border-[#EDEDEA] bg-white text-[#111111] text-[14px] font-medium flex items-center justify-center gap-2"
            >
              {activeUser.role === "admin" ? (
                <ShieldCheck className="w-4 h-4 text-[#0d2b24]" />
              ) : (
                <User className="w-4 h-4" />
              )}
              {activeUser.role === "admin"
                ? "Bureau Conciergerie Admin"
                : `Mon Espace (${activeUser.name.split(" ")[0]})`}
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full h-11 rounded-full border border-[#ffdad6] text-[#ba1a1a] text-[14px] font-medium flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              onClose();
              openAuthModal();
            }}
            className="w-full h-12 rounded-full border border-[#EDEDEA] bg-white text-[#111111] text-[15px] font-medium flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            Connexion Client / Admin
          </button>
        )}

        <Link
          href="/reservation"
          onClick={onClose}
          className="w-full h-12 rounded-full bg-[#111111] text-white text-[15px] font-medium flex items-center justify-center"
        >
          Réserver
        </Link>
      </div>
    </div>
  );
}
