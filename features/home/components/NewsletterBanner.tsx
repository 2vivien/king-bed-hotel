import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { siteConfig } from "@/config/site";

export function NewsletterBanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-16 lg:pb-24">
      <Reveal>
        <div className="relative rounded-[36px] overflow-hidden shadow-sm">
          <div className="absolute inset-0">
            <SuiteImage
              src="/images/Call-toaction/call-to-action.jpg"
              alt="Feuillage luxuriant du King's Bed Hotel"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>
          <div
            className="relative flex flex-col items-center text-center px-6 sm:px-12 py-16 sm:py-20 lg:py-24 gap-7"
          >
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#3d6659] font-semibold">
                Restez Inspiré
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#001510]">
                Votre prochain séjour
                <br />
                commence ici.
              </h2>
            </div>
            <p className="text-[17px] leading-[1.55] text-[#414846] max-w-md">
              Un coup de fil suffit : notre conciergerie organise tout, du
              petit-déjeuner jusqu&apos;à la salle de conférence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/account/reservation"
                className="h-12 px-7 rounded-full bg-[#001510] text-white text-[15px] font-semibold inline-flex items-center gap-2 hover:bg-[#0d2b24] transition-colors"
              >
                Réserver maintenant
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="h-12 px-7 rounded-full bg-white/85 backdrop-blur-sm border border-[#001510]/10 text-[#001510] text-[15px] font-semibold inline-flex items-center gap-2 hover:bg-white transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4" strokeWidth={1.75} />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
