"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";

interface ReservationGateProps {
  children: React.ReactNode;
}

/**
 * La réservation n'est accessible qu'aux comptes connectés.
 * Les visiteurs non-connectés sont redirigés vers /account (mur de connexion).
 */
export function ReservationGate({ children }: ReservationGateProps) {
  const router = useRouter();
  const mounted = useIsMounted();
  const currentUser = useAuthStore((s) => s.currentUser);

  useEffect(() => {
    if (mounted && !currentUser) {
      router.replace("/account");
    }
  }, [mounted, currentUser, router]);

  if (!mounted || !currentUser) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14">
        <div className="h-[520px] rounded-3xl bg-[#f4f3f0] animate-pulse" />
      </div>
    );
  }

  return <>{children}</>;
}
