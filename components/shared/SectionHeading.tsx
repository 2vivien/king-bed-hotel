interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;
  const sizeClass =
    as === "h1"
      ? "text-[clamp(2.35rem,4.8vw,3.5rem)] leading-[1.05] tracking-[-0.03em]"
      : "text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.1] tracking-[-0.025em]";

  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-[13px] font-normal text-[#5F5F5A] mb-3 tracking-[0.01em]">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag className={`font-light text-[#111111] text-balance ${sizeClass}`}>
        {title}
      </HeadingTag>
      {subtitle ? (
        <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.55] text-[#5F5F5A] max-w-xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
