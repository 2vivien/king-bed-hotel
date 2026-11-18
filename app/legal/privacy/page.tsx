import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SuiteSavvy protects guest privacy and reservation data.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 pt-14 pb-24 space-y-8">
      <div className="space-y-3">
        <p className="text-[13px] text-[#5F5F5A]">Legal</p>
        <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-[#111111]">
          Privacy Policy
        </h1>
      </div>

      <div className="space-y-6 text-[16px] leading-[1.7] text-[#5F5F5A]">
        <p>
          At {siteConfig.name}, guest privacy is treated with the same quiet discretion as
          your physical stay. We collect only the reservation details required to prepare
          your suite, coordinate private transfers, and send booking confirmations.
        </p>
        <h2 className="text-[22px] font-normal text-[#111111] pt-2">
          1. Information We Collect
        </h2>
        <p>
          When you reserve a suite or submit a concierge inquiry, we process your name,
          email address, telephone number, stay dates, and optional arrival notes.
        </p>
        <h2 className="text-[22px] font-normal text-[#111111] pt-2">
          2. Data Retention &amp; Deletion
        </h2>
        <p>
          You may request access to, correction of, or deletion of your personal records at
          any time by writing to {siteConfig.email}.
        </p>
      </div>
    </article>
  );
}
