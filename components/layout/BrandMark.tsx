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
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-full",
        isLight ? "text-white" : "text-[#111111]",
        className
      )}
    >
      <span className="relative flex items-center" aria-hidden="true">
        <span
          className={cn(
            "w-4 h-4 rounded-full",
            isLight ? "bg-white" : "bg-[#111111]"
          )}
        />
        <span
          className={cn(
            "w-4 h-4 rounded-full -ml-2 border-[1.5px]",
            isLight
              ? "border-white bg-white/25"
              : "border-[#111111] bg-[#FAF9F6]/80"
          )}
        />
      </span>
      <span className="text-[16px] font-semibold tracking-[-0.02em]">
        SuiteSavvy
      </span>
    </Link>
  );
}
