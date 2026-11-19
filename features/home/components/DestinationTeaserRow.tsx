import { ArrowUpRight, Asterisk, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { AvatarStack } from "@/components/shared/AvatarStack";
import { Reveal } from "@/components/shared/Reveal";
import { SuiteImage } from "@/components/shared/SuiteImage";
import { siteConfig } from "@/config/site";
import { destinationsMock } from "@/mocks/destinations";

export function DestinationTeaserRow() {
  const featured = destinationsMock.filter((d) => d.featuredHome).slice(0, 3);

  return (
    <section
      id="destinations-teaser"
      className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-10 lg:pt-12 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: 3 Teaser Tiles + Title & Arrows/Asterisk disposition */}
        <div className="lg:col-span-7 space-y-10">
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featured.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/account/reservation?destination=${dest.slug}`}
                  className="group relative aspect-[3/2] rounded-[20px] overflow-hidden bg-[#EFE6D6] block"
                >
                  <SuiteImage
                    src={dest.image}
                    alt={dest.regionLabel}
                    sizes="(max-width: 640px) 100vw, 240px"
                    className="group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute top-3 right-3 h-7 px-3 rounded-full bg-white/90 text-[#111111] text-[11px] font-medium inline-flex items-center">
                    Explorer
                  </span>
                  <span className="absolute bottom-3 left-3.5 text-white text-[14px] font-normal">
                    {dest.regionLabel}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <h2 className="text-[clamp(2rem,3.6vw,2.75rem)] font-light leading-[1.1] tracking-[-0.025em] text-[#111111] text-balance max-w-md">
                  L&apos;Art du Séjour, du Petit-Déjeuner &amp; des Conférences
                </h2>
                <p className="mt-3 text-[13px] text-[#5F5F5A]">
                  Depuis {siteConfig.foundedYear}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-5 text-[#111111] shrink-0 pt-1">
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/rooms"
                    aria-label="Découvrir les chambres et suites"
                    className="w-10 h-10 rounded-full border border-[#111111]/12 flex items-center justify-center hover:bg-[#EFE6D6] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                  <Link
                    href="/services"
                    aria-label="Découvrir nos salles de conférence et services"
                    className="w-10 h-10 rounded-full border border-[#111111]/12 flex items-center justify-center hover:bg-[#EFE6D6] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </div>
                <Asterisk className="w-6 h-6 text-[#111111]" strokeWidth={1.5} aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Editorial blurb + Horizontal StatsRow */}
        <Reveal delay={0.12} className="lg:col-span-5 lg:pt-1 space-y-6">
          <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#5F5F5A]">
            Au King&apos;s Bed Hotel, chaque séjour réunit le confort de nos chambres et
            suites, la fraîcheur d&apos;un petit-déjeuner artisanal et la performance de
            nos salles de réunion et conférences.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <AvatarStack />
              <span className="text-[13px] font-medium text-[#111111] leading-snug max-w-[130px]">
                {siteConfig.stats.happyGuests}
              </span>
            </div>

            <a
              href="#testimonials"
              className="h-10 px-4 rounded-full bg-white border border-[#111111]/12 inline-flex items-center gap-2 text-[13px] text-[#111111] hover:bg-[#EFE6D6] transition-colors whitespace-nowrap shrink-0 tabular-nums"
            >
              <span className="font-semibold inline-flex items-center gap-1">
                {siteConfig.stats.rating}
                <Star className="w-3.5 h-3.5 fill-[#111111] text-[#111111]" strokeWidth={1.5} />
              </span>
              <span>{siteConfig.stats.reviewLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5F5F5A]" strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
