import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { siteConfig } from "@/config/site";

export function NewsletterBanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-16 lg:pb-24">
      <Reveal>
        <div className="relative rounded-[36px] overflow-hidden bg-[#1F3A2C] px-6 sm:px-12 lg:px-16 py-14 sm:py-20 text-white">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <SuiteImage
              src="/images/hero/hero-pool.jpg"
              alt="Piscine et terrasses du King's Bed Hotel"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1F3A2C]/92 via-[#1F3A2C]/80 to-[#1F3A2C]/60"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl space-y-7">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#bfecdc] font-semibold">
                Restez Inspiré
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,2.75rem)] font-light leading-[1.12] tracking-[-0.025em] text-balance">
                Votre prochain séjour
                <br />
                commence ici.
              </h2>
              <p className="text-[16px] sm:text-[17px] text-white/85 leading-[1.55] max-w-md">
                Un coup de fil suffit : notre conciergerie organise tout, du
                petit-déjeuner jusqu&apos;à la salle de conférence.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/account/reservation"
                className="h-12 px-7 rounded-full bg-white text-[#001510] text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-[#EEE8DD] transition-colors"
              >
                Réserver maintenant
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="h-12 px-7 rounded-full border border-white/30 text-white text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-white/10 transition-colors tabular-nums"
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
