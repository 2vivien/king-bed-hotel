import { AuthModal } from "@/features/auth/components/AuthModal";
import { Footer } from "./Footer";
import { NavbarPill } from "./NavbarPill";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-stretch bg-[#FFFFFF]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#111111] focus:text-white focus:text-sm"
      >
        Skip to main content
      </a>
      <div className="site-frame">
        <NavbarPill />
        <main id="main-content" className="flex-1 flex flex-col bg-[#FFFFFF]">
          {children}
        </main>
        <Footer />
      </div>
      <AuthModal />
    </div>
  );
}
