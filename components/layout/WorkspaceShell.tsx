"use client";

import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { BrandMark } from "./BrandMark";

interface WorkspaceShellProps {
  children: React.ReactNode;
  /** Libellé de la zone affichée à côté du logo (ex. « Bureau Conciergerie »). */
  sectionLabel: string;
}

/**
 * Cadre minimal pour les interfaces métier (/account et /admin) :
 * pas de navbar marketing ni de footer — juste le logo, un retour au site
 * et la déconnexion. Présenté dans le même cadre blanc que le reste du site.
 */
export function WorkspaceShell({ children, sectionLabel }: WorkspaceShellProps) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="min-h-screen flex flex-col items-stretch bg-[#EFEAE1]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#111111] focus:text-white focus:text-sm"
      >
        Skip to main content
      </a>
      <div className="site-frame">
        <header className="site-navbar sticky top-0 z-40 h-16 bg-white border-b border-[#EDEDEA]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <BrandMark />
              <span className="hidden xs:inline-flex text-[12px] font-medium px-3 py-1 rounded-full bg-[#F4F1EA] text-[#414846] whitespace-nowrap">
                {sectionLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/"
                className="h-9 px-4 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#faf9f6] text-[#111111] text-[13px] font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                Retour au site
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="h-9 px-4 rounded-full text-[#ba1a1a] hover:bg-[#ffdad6]/40 text-[13px] font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
                Déconnexion
              </button>
            </div>
          </div>
        </header>
        <main id="main-content" className="flex-1 flex flex-col bg-[#FFFFFF]">
          {children}
        </main>
      </div>
      <AuthModal />
    </div>
  );
}
