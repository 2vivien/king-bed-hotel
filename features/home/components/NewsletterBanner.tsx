import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { siteConfig } from "@/config/site";

export function NewsletterBanner() {
  return (
    <section className="px-2 sm:px-2.5 lg:px-3 pb-8 pt-2">
      <Reveal>
        <div className="relative rounded-[20px] overflow-hidden shadow-sm">
          <div className="absolute inset-0">
            <SuiteImage
              src="/images/Call-toaction/call-to-action.jpg"
              alt="Feuillage luxuriant du King's Bed Hotel"
              sizes="100vw"
              priority={false}
            />
          </div>
          <div
            className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 sm:px-14 lg:px-20 py-10 sm:py-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#3d6659] font-semibold">
                Restez Inspiré
              </span>
              <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#001510]">
                Votre prochain séjour commence ici.
              </h2>
              <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#414846] max-w-sm">
                Notre conciergerie organise tout — petit-déjeuner, transferts,
                conférence — en un coup de fil.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/account/reservation"
                className="h-12 px-7 rounded-full bg-[#001510] text-white text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-[#0d2b24] transition-colors whitespace-nowrap"
              >
                Réserver maintenant
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="h-12 px-6 rounded-full bg-white/80 backdrop-blur-sm border border-[#001510]/10 text-[#001510] text-[14px] font-semibold inline-flex items-center gap-2 hover:bg-white transition-colors whitespace-nowrap tabular-nums"
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
