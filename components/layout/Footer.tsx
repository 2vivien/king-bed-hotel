import { BadgeCheck, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { FooterGazetteForm } from "./FooterGazetteForm";

const portfolioLinks = [
  { label: "Chambres Deluxe & Confort", href: "/rooms?type=rooms" },
  { label: "Suites Exécutives", href: "/rooms?type=suites" },
  { label: "Suites Royales & Jardins", href: "/rooms?type=villas" },
  { label: "Salles de Réunion", href: "/services" },
  { label: "Espaces de Conférence", href: "/services" },
] as const;

const conciergeLinks = [
  { label: "Réception & Conciergerie 24h/24", href: "/services" },
  { label: "Petit-Déjeuner Gastronomique", href: "/services" },
  { label: "Séminaires & Événements Pro", href: "/contact" },
  { label: "Transferts & Voiturier", href: "/services" },
  { label: "Réservation en Ligne", href: "/reservation" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-[#EDEDEA] mt-14 pt-14 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {/* Column 1: Brand & Portfolio Trust */}
          <div className="space-y-5">
            <BrandMark />
            <p className="text-[15px] leading-[1.6] text-[#414846]">
              Hôtel d&apos;exception alliant chambres et suites élégantes,
              petit-déjeuner artisanal et salles de réunion et de conférence équipées.
            </p>
            <div className="flex items-center gap-2.5 pt-1 text-[#414846]">
              <BadgeCheck className="w-5 h-5 text-[#3d6659]" strokeWidth={1.5} />
              <span className="text-[12px] font-medium tracking-[0.02em]">
                Hôtel Certifié Séjour &amp; Conférences
              </span>
            </div>
          </div>

          {/* Column 2: Explore Portfolios */}
          <div className="space-y-4">
            <span className="block text-[20px] font-semibold text-[#001510]">
              Nos Espaces
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
              Hôtel &amp; Services
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
              Gazette Privée
            </span>
            <p className="text-[13px] leading-[1.55] text-[#414846]">
              Recevez nos offres séjours, formules petit-déjeuner et disponibilités de salles de conférence.
            </p>
            <FooterGazetteForm />
            <div className="pt-1 space-y-1.5 text-[13px] text-[#414846]">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                concierge@kingsbedhotel.com
              </p>
              <p className="flex items-center gap-2 tabular-nums">
                <Phone className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                +229 01 42 68 90 00
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#111111]/8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-medium tracking-[0.02em] text-[#414846]">
          <p>
            © {year} King&apos;s Bed Hotel. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/legal/privacy"
              className="hover:text-[#1a1c1a] transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-[#1a1c1a] transition-colors"
            >
              Conditions Générales
            </Link>
            <Link href="/my-booking" className="hover:text-[#1a1c1a] transition-colors">
              Gérer ma réservation
            </Link>
            <Link href="/faq" className="hover:text-[#1a1c1a] transition-colors">
              FAQ &amp; Protocole
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
