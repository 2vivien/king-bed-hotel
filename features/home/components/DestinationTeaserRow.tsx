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
      className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: 3 Destination Teaser Tiles + Unlock the Art heading */}
        <div className="lg:col-span-7 space-y-10">
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featured.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/reservation?destination=${dest.slug}`}
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
                  <span className="absolute top-3 right-3 h-7 px-3 rounded-full glass-surface-subtle border border-white/30 text-white text-[11px] font-medium inline-flex items-center">
                    Search
                  </span>
                  <span className="absolute bottom-3 left-3.5 text-white text-[14px] font-normal">
                    {dest.regionLabel}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="text-[clamp(2rem,3.6vw,2.75rem)] font-light leading-[1.1] tracking-[-0.025em] text-[#111111] text-balance max-w-md">
                  Unlock the Art of Sophisticated Stays
                </h2>
                <p className="mt-3 text-[13px] text-[#5F5F5A]">
                  Since {siteConfig.foundedYear}
                </p>
              </div>

              <div className="flex items-center gap-4 text-[#111111]">
                <Link
                  href="/rooms"
                  aria-label="Explore rooms and suites"
                  className="w-9 h-9 rounded-full border border-[#111111]/12 flex items-center justify-center hover:bg-[#EFE6D6] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/rooms"
                  aria-label="Browse all sanctuaries"
                  className="w-9 h-9 rounded-full border border-[#111111]/12 flex items-center justify-center hover:bg-[#EFE6D6] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
                <Asterisk className="w-6 h-6 text-[#111111]" strokeWidth={1.5} aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Editorial blurb + StatsRow */}
        <Reveal delay={0.12} className="lg:col-span-5 lg:pt-8 space-y-8">
          <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#5F5F5A]">
            We understand that accommodations play a pivotal role in shaping travel
            experiences, and that&apos;s why we are dedicated to curating an exclusive
            collection of exquisite suites in the world&apos;s most desirable destinations.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <AvatarStack />
              <span className="text-[14px] font-medium text-[#111111]">
                {siteConfig.stats.happyGuests}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="h-10 px-4 rounded-full bg-white border border-[#111111]/10 inline-flex items-center gap-1.5 text-[14px] font-medium tabular-nums">
                <span>{siteConfig.stats.rating}</span>
                <Star className="w-3.5 h-3.5 fill-[#111111] text-[#111111]" strokeWidth={1.5} />
              </div>
              <a
                href="#testimonials"
                className="h-10 px-5 rounded-full bg-white border border-[#111111]/10 inline-flex items-center gap-1.5 text-[14px] text-[#111111] hover:bg-[#EFE6D6] transition-colors"
              >
                {siteConfig.stats.reviewLabel}
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
