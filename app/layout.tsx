import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
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
    default: "King's Bed Hotel – Chambres, Petit-Déjeuner & Salles de Conférence",
    template: "%s | King's Bed Hotel",
  },
  description:
    "Découvrez King's Bed Hotel : chambres et suites raffinées, petit-déjeuner gastronomique inclus et salles de réunion et conférence entièrement équipées.",
  openGraph: {
    title: "King's Bed Hotel – Chambres, Petit-Déjeuner & Salles de Conférence",
    description:
      "Chambres et suites d'exception, formule petit-déjeuner artisanal et espaces de réunion et conférence sur mesure au King's Bed Hotel.",
    type: "website",
    siteName: "King's Bed Hotel",
    images: [{ url: "/images/hero/hero-pool.jpg", width: 1440, height: 810 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "King's Bed Hotel – Chambres, Petit-Déjeuner & Conférences",
    description:
      "Chambres et suites d'exception, petit-déjeuner gastronomique et salles de réunion et de conférence au King's Bed Hotel.",
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
    addressLocality: siteConfig.city,
    addressRegion: "Collines",
    addressCountry: "BJ",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "100420",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
