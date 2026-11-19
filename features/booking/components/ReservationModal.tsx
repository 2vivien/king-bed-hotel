"use client";

import { useRouter } from "next/navigation";
import { DialogModal } from "@/components/ui/DialogModal";
import { ReservationFlow } from "@/features/booking/components/ReservationFlow";
import { Suspense } from "react";

/** La réservation s'affiche en popup par-dessus le tableau de bord client. */
export function ReservationModal() {
  const router = useRouter();

  return (
    <DialogModal
      open
      onClose={() => router.push("/account")}
      title="Réserver votre séjour"
      maxWidthClass="max-w-6xl"
    >
      <div className="max-h-[78vh] overflow-y-auto pr-1">
        <Suspense
          fallback={
            <div className="h-[420px] rounded-3xl bg-[#f4f3f0] animate-pulse" />
          }
        >
          <ReservationFlow />
        </Suspense>
      </div>
    </DialogModal>
  );
}
