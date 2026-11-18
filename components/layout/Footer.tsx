import { BadgeCheck, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { FooterGazetteForm } from "./FooterGazetteForm";

const portfolioLinks = [
  { label: "Private Island Villas", href: "/rooms?type=villas" },
  { label: "Architectural Penthouses", href: "/rooms?type=penthouses" },
  { label: "Alpine Sky Chalets", href: "/rooms?type=suites" },
  { label: "Historic Country Manors", href: "/rooms?type=villas" },
  { label: "Secluded Desert Retreats", href: "/rooms?type=deluxe" },
] as const;

const conciergeLinks = [
  { label: "24/7 Bespoke Concierge", href: "/services" },
  { label: "Private Aviation Charter", href: "/contact" },
  { label: "In-Suite Michelin Dining", href: "/services" },
  { label: "Yacht & Tender Access", href: "/gallery" },
  { label: "Bespoke Itinerary Planning", href: "/reservation" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f4f3f0] mt-14 pt-14 pb-8 shadow-[0_-1px_12px_rgba(13,43,36,0.03)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {/* Column 1: Brand & Portfolio Trust */}
          <div className="space-y-5">
            <BrandMark />
            <p className="text-[15px] leading-[1.6] text-[#414846]">
              Curating unmatched private sanctuaries, premier penthouses, and bespoke
              coastal estates for the world&apos;s most discerning travelers.
            </p>
            <div className="flex items-center gap-2.5 pt-1 text-[#414846]">
              <BadgeCheck className="w-5 h-5 text-[#3d6659]" strokeWidth={1.5} />
              <span className="text-[12px] font-medium tracking-[0.02em]">
                Verified Global Luxury Portfolio
              </span>
            </div>
          </div>

          {/* Column 2: Explore Portfolios */}
          <div className="space-y-4">
            <span className="block text-[20px] font-semibold text-[#001510]">
              Explore Portfolios
            </span>
            <ul className="space-y-2.5">
              {portfolioLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-[#414846] hover:text-[#1a1c1a] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Concierge & Guest */}
          <div className="space-y-4">
            <span className="block text-[20px] font-semibold text-[#001510]">
              Concierge &amp; Guest
            </span>
            <ul className="space-y-2.5">
              {conciergeLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-[#414846] hover:text-[#1a1c1a] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Private Gazette */}
          <div className="space-y-4">
            <span className="block text-[20px] font-semibold text-[#001510]">
              Private Gazette
            </span>
            <p className="text-[13px] leading-[1.55] text-[#414846]">
              Receive confidential access to newly debuted suites and seasonal retreats.
            </p>
            <FooterGazetteForm />
            <div className="pt-1 space-y-1.5 text-[13px] text-[#414846]">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                inquiries@suitesavvy.luxury
              </p>
              <p className="flex items-center gap-2 tabular-nums">
                <Phone className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                +41 22 819 9000
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#111111]/8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-medium tracking-[0.02em] text-[#414846]">
          <p>
            © {year} SuiteSavvy International Hospitality Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/legal/privacy"
              className="hover:text-[#1a1c1a] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-[#1a1c1a] transition-colors"
            >
              Terms of Service
            </Link>
            <Link href="/my-booking" className="hover:text-[#1a1c1a] transition-colors">
              Manage Booking
            </Link>
            <Link href="/faq" className="hover:text-[#1a1c1a] transition-colors">
              Guest Protocol &amp; FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
