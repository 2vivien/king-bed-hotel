"use client";

import {
  CheckCircle2,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DEMO_USERS, useAuthStore } from "@/features/auth/store/auth.store";
import type { UserRole } from "@/features/auth/types/auth.types";
import { cn } from "@/lib/utils";

function GoogleGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function AuthModalContent({
  preferredRole,
  onClose,
}: {
  preferredRole: UserRole | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const loginQuickRole = useAuthStore((s) => s.loginQuickRole);
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    preferredRole ?? "user"
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleGoogleContinue = (role: UserRole = selectedRole) => {
    const user = loginQuickRole(role);
    router.push(user.role === "admin" ? "/admin" : "/account");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-[#001510]/45 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[440px] rounded-3xl bg-white border border-[#EDEDEA] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-[#EDEDEA] bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="auth-modal-title"
                className="mt-3 text-[24px] font-semibold tracking-[-0.02em] text-[#111111]"
              >
                Connexion avec Google
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la fenêtre de connexion"
              className="w-9 h-9 rounded-full border border-[#EDEDEA] bg-white hover:bg-[#f4f3f0] text-[#111111] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Google Account Picker & Single-Button Sign-In */}
        <div className="p-6 space-y-5 bg-white">
          <div className="space-y-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5F5F5A]">
              Choisir un compte Google
            </p>

            {/* Google User Account Option */}
            <button
              type="button"
              onClick={() => setSelectedRole("user")}
              className={cn(
                "w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer",
                selectedRole === "user"
                  ? "border-[#111111] bg-[#faf9f6] ring-2 ring-[#111111]/10"
                  : "border-[#EDEDEA] bg-white hover:bg-[#faf9f6]"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 rounded-full bg-[#e9e8e5] text-[#111111] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-[#111111] truncate">
                      {DEMO_USERS.user.name}
                    </p>
                    <span className="px-2 py-0.5 rounded-full bg-[#e9e8e5] text-[#111111] text-[10px] font-semibold uppercase">
                      Client
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5F5F5A] truncate">
                    {DEMO_USERS.user.email}
                  </p>
                </div>
              </div>
              {selectedRole === "user" && (
                <CheckCircle2 className="w-5 h-5 text-[#0d2b24] shrink-0" />
              )}
            </button>

            {/* Google Admin Account Option */}
            <button
              type="button"
              onClick={() => setSelectedRole("admin")}
              className={cn(
                "w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer",
                selectedRole === "admin"
                  ? "border-[#0d2b24] bg-[#faf9f6] ring-2 ring-[#0d2b24]/15"
                  : "border-[#EDEDEA] bg-white hover:bg-[#faf9f6]"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 rounded-full bg-[#0d2b24] text-[#bfecdc] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-[#111111] truncate">
                      {DEMO_USERS.admin.name}
                    </p>
                    <span className="px-2 py-0.5 rounded-full bg-[#bce9d9] text-[#002018] text-[10px] font-semibold uppercase">
                      Admin
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5F5F5A] truncate">
                    {DEMO_USERS.admin.email}
                  </p>
                </div>
              </div>
              {selectedRole === "admin" && (
                <CheckCircle2 className="w-5 h-5 text-[#0d2b24] shrink-0" />
              )}
            </button>
          </div>

          {/* Official Google Sign-In Button */}
          <button
            type="button"
            onClick={() => handleGoogleContinue(selectedRole)}
            className="w-full h-12 px-5 rounded-full border border-[#dadce0] bg-white hover:bg-[#f8f9fa] text-[#1f1f1f] text-[14px] font-medium flex items-center justify-center gap-3 shadow-sm transition-colors cursor-pointer"
          >
            <GoogleGlyph />
            <span>
              Continuer avec Google (
              {selectedRole === "admin" ? "Dashboard Admin" : "Dashboard Client"}
              )
            </span>
          </button>

          <p className="text-center text-[11px] text-[#5F5F5A] leading-relaxed">
            En vous connectant, vous acceptez nos{" "}
            <Link href="/legal/terms" className="underline underline-offset-2 hover:text-[#111111]">
              Conditions Générales
            </Link>{" "}
            et notre{" "}
            <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[#111111]">
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AuthModal() {
  const authModalOpen = useAuthStore((s) => s.authModalOpen);
  const authModalPreferredRole = useAuthStore((s) => s.authModalPreferredRole);
  const closeAuthModal = useAuthStore((s) => s.closeAuthModal);

  return (
    <AnimatePresence>
      {authModalOpen && (
        <AuthModalContent
          key={authModalPreferredRole ?? "default"}
          preferredRole={authModalPreferredRole}
          onClose={closeAuthModal}
        />
      )}
    </AnimatePresence>
  );
}
