import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Cancellation",
  description:
    "SuiteSavvy reservation terms, flexible cancellation windows, and check-in guidelines.",
};

export default function TermsPage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 pt-14 pb-24 space-y-8">
      <div className="space-y-3">
        <p className="text-[13px] text-[#5F5F5A]">Legal</p>
        <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[#111111]">
          Terms &amp; Cancellation
        </h1>
      </div>

      <div className="space-y-6 text-[16px] leading-[1.7] text-[#5F5F5A]">
        <p>
          All {siteConfig.name} reservations include transparent nightly rates and a 12%
          sanctuary tax calculated at checkout with zero surprise resort fees.
        </p>
        <h2 className="text-[22px] font-normal text-[#111111] pt-2">
          1. Flexible Cancellation Windows
        </h2>
        <p>
          Deluxe Rooms may be cancelled without penalty up to 48 hours before check-in.
          Suites offer free cancellation up to 72 hours prior, and Private Villas up to 7
          days prior to arrival.
        </p>
        <h2 className="text-[22px] font-normal text-[#111111] pt-2">
          2. Check-In &amp; Check-Out
        </h2>
        <p>
          {siteConfig.hours}. Early arrivals and late departures are accommodated whenever
          possible via our 24/7 concierge team.
        </p>
      </div>
    </article>
  );
}
