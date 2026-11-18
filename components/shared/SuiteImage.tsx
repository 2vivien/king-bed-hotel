"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SuiteImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export function SuiteImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  wrapperClassName,
}: SuiteImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center bg-[#EFE6D6]/70 text-[#5F5F5A] w-full h-full",
          wrapperClassName
        )}
      >
        <ImageIcon className="w-6 h-6 mb-1.5 opacity-60" strokeWidth={1.5} />
        <span className="text-[12px] px-4 text-center line-clamp-1">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
