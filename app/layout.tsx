import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { PageShell } from "@/components/layout/PageShell";
import { siteConfig } from "@/config/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SuiteSavvy – Luxury Boutique Suites & Private Villas",
    template: "%s | SuiteSavvy",
  },
  description:
    "Discover curated architectural suites and private villas across Bali, Maldives, Santorini, Positano, and Lisbon with instant booking.",
  openGraph: {
    title: "SuiteSavvy – Luxury Boutique Suites & Private Villas",
    description:
      "Discover curated architectural suites and private villas across Bali, Maldives, Santorini, Positano, and Lisbon with instant booking.",
    type: "website",
    siteName: "SuiteSavvy",
    images: [{ url: "/images/hero/hero-pool.jpg", width: 1440, height: 810 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuiteSavvy – Luxury Boutique Suites & Private Villas",
    description:
      "Discover curated architectural suites and private villas across Bali, Maldives, Santorini, Positano, and Lisbon.",
    images: ["/images/hero/hero-pool.jpg"],
  },
};

const hotelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: siteConfig.name,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.shortAddress,
    addressLocality: "Ubud",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "100420",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
