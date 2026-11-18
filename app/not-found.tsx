import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-28 text-center space-y-6">
      <p className="text-[13px] text-[#5F5F5A]">404 · Page Not Found</p>
      <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-[#111111]">
        This Sanctuary Could Not Be Found
      </h1>
      <p className="text-[16px] text-[#5F5F5A] max-w-md mx-auto">
        The page you are looking for may have moved, or the itinerary link has expired.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="h-11 px-7 rounded-full bg-[#111111] text-white text-[14px] font-medium inline-flex items-center justify-center hover:bg-[#2A2A28] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
