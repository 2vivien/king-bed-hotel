import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  tone?: "dark" | "light";
  className?: string;
}

export function BrandMark({ tone = "dark", className }: BrandMarkProps) {
  const isLight = tone === "light";
  return (
    <Link
      href="/"
      aria-label="King's Bed Hotel — accueil"
      className={cn(
        "inline-flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-full",
        isLight ? "text-white" : "text-[#111111]",
        className
      )}
    >
      <Image
        src="/images/hero/logo_noir_kings_bed.png"
        alt="King's Bed Hotel"
        width={44}
        height={44}
        priority
        className="h-11 w-11 object-contain"
      />
      <span className="text-[19px] font-semibold tracking-[-0.02em]">
        King&apos;s Bed Hotel
      </span>
    </Link>
  );
}
