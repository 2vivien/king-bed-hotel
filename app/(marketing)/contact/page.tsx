import type { Metadata } from "next";
import { LeavesCta } from "@/components/shared/LeavesCta";
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

      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
        <ContactSidebar />
      </section>

      <ContactFaqSection />

      <LeavesCta />
    </div>
  );
}
