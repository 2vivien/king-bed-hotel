import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactFaqSection } from "@/features/contact/components/ContactFaqSection";
import { ContactHero } from "@/features/contact/components/ContactHero";
import { ContactSidebar } from "@/features/contact/components/ContactSidebar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez la conciergerie du King's Bed Hotel à Savalou, Bénin : réception 24h/24, devis événements et séminaires.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <ContactHero />

      <section className="w-full max-w-[720px] mx-auto px-6 lg:px-10 py-14">
        <ContactSidebar />
      </section>

      <ContactFaqSection />

      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
        <div className="relative rounded-3xl bg-[#0d2b24] p-8 sm:p-14 overflow-hidden shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="text-[11px] font-semibold text-[#bfecdc] uppercase tracking-wider block">
              Hospitalité d&apos;Excellence
            </span>
            <h3 className="text-[32px] sm:text-[40px] font-medium leading-[1.2] text-white">
              Vivez l&apos;Expérience King&apos;s Bed Hotel à Chaque Instant
            </h3>
            <p className="text-[15px] text-[#c9eade]">
              Découvrez nos chambres et suites avec petit-déjeuner artisanal ainsi que nos
              salons dédiés aux réunions et conférences.
            </p>
          </div>
          <div className="relative z-10 w-full sm:w-auto">
            <Link
              href="/rooms"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#faf9f6] text-[#001510] text-[14px] font-semibold shadow hover:bg-white transition-colors whitespace-nowrap"
            >
              <span>Voir nos Chambres &amp; Suites</span>
              <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#3d6659]/20 blur-2xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
