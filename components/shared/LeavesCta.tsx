import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";
import { SuiteImage } from "@/components/shared/SuiteImage";

/**
 * Bandeau CTA feuillage partagé — placé juste avant le footer sur tout le site.
 */
export function LeavesCta() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
      <div className="relative rounded-3xl overflow-hidden text-center shadow-lg">
        <SuiteImage
          src="/images/Call-toaction/call-to-action.jpg"
          alt="Feuillage luxuriant du King's Bed Hotel"
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="absolute inset-0"
        />
        <div className="relative p-8 md:p-14 flex flex-col items-center justify-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-widest">
              Votre Prochain Séjour ou Événement
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-medium text-[#001510] tracking-[-0.02em]">
              Préparez Votre Venue au King&apos;s Bed Hotel
            </h2>
            <p className="text-[15px] text-[#414846] max-w-xl mx-auto">
              Réservez votre chambre avec petit-déjeuner ou contactez notre équipe pour
              organiser une réunion, un séminaire ou une conférence sur mesure.
            </p>
            <div className="pt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/rooms"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#001510] text-white text-[14px] font-semibold shadow-md hover:bg-[#0d2b24] transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Découvrir nos Chambres</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#001510]/10 text-[#001510] text-[14px] font-semibold shadow-sm hover:bg-white transition-all inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                <span>Devis Réunion &amp; Conférence</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
