import {
  Building2,
  Landmark,
  Mail,
  MessageCircle,
  Palmtree,
  Phone,
} from "lucide-react";

export function ContactSidebar() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Clone gauche — Ligne directe & messagerie */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EDEDEA] shadow-sm space-y-4">
        <h3 className="text-[20px] font-semibold text-[#001510]">
          Ligne Directe &amp; Messagerie
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#f4f3f0] hover:bg-[#efeeeb] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-[#727975] block">
                  Ligne Directe Hôtel
                </span>
                <span className="text-[16px] sm:text-[18px] font-semibold text-[#001510] tabular-nums">
                  +229 01 42 68 90 00
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#3d6659] bg-[#bfecdc]/50 px-2.5 py-1 rounded-full whitespace-nowrap">
              24h/24
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#f4f3f0] hover:bg-[#efeeeb] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-[#727975] block">
                  Réservations &amp; Devis
                </span>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[#001510] truncate block">
                  concierge@kingsbedhotel.com
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#f4f3f0] hover:bg-[#efeeeb] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#bce9d9] flex items-center justify-center text-[#416b5d] shrink-0">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-[#727975] block">
                  Messagerie Instantanée
                </span>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[#001510]">
                  WhatsApp King&apos;s Bed Hôtel
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#416b5d] bg-[#bce9d9] px-2.5 py-0.5 rounded-full whitespace-nowrap">
              Prioritaire
            </span>
          </div>
        </div>
      </div>

      {/* Clone droit — Nos services sur place */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EDEDEA] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-semibold text-[#001510]">
            Nos Services sur Place
          </h3>
          <span className="text-[11px] font-semibold text-[#414846]">
            3 Pôles Dédiés
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-[#f4f3f0] flex items-start gap-3.5">
            <Building2 className="w-5 h-5 text-[#001510] mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-semibold text-[#001510]">Accueil Principal</span>
                <span className="text-[11px] font-semibold text-[#727975]">
                  • Chambres &amp; Suites
                </span>
              </div>
              <p className="text-[13px] text-[#414846] mt-0.5">
                Savalou, Bénin
              </p>
              <span className="text-[11px] font-semibold text-[#3d6659]">
                Réception ouverte • 24h/24 &amp; 7j/7
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f4f3f0] flex items-start gap-3.5">
            <Palmtree className="w-5 h-5 text-[#001510] mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-semibold text-[#001510]">Salon Petit-Déjeuner</span>
                <span className="text-[11px] font-semibold text-[#727975]">
                  • Orangerie &amp; Terrasse
                </span>
              </div>
              <p className="text-[13px] text-[#414846] mt-0.5">
                Rez-de-jardin, King&apos;s Bed Hotel
              </p>
              <span className="text-[11px] font-semibold text-[#3d6659]">
                Servi tous les jours • 06h30 – 11h00
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f4f3f0] flex items-start gap-3.5">
            <Landmark className="w-5 h-5 text-[#001510] mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-semibold text-[#001510]">Centre de Conférences</span>
                <span className="text-[11px] font-semibold text-[#727975]">
                  • Réunions &amp; Séminaires
                </span>
              </div>
              <p className="text-[13px] text-[#414846] mt-0.5">
                Aile Exécutive, 1er Étage — 6 Salons Modulables
              </p>
              <span className="text-[11px] font-semibold text-[#3d6659]">
                Sur réservation • 07h30 – 22h00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
