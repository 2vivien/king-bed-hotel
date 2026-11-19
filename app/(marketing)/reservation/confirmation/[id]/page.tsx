import type { Metadata } from "next";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { ConfirmationView } from "@/features/booking/components/ConfirmationView";

export const metadata: Metadata = {
  title: "Réservation Confirmée",
  description: "Votre réservation au King's Bed Hotel est confirmée.",
};

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 px-6">
      <div className="max-w-[1280px] mx-auto relative">
        <div className="relative rounded-[36px] overflow-hidden bg-[#1F3A2C]/8 p-6 sm:p-12">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <SuiteImage
              src="/images/textures/leaf-dark.jpg"
              alt="Motif végétal décoratif"
              sizes="1280px"
            />
          </div>
          <div className="relative z-10">
            <ConfirmationView bookingId={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
