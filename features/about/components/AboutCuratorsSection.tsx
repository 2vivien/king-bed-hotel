import { Quote } from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";

const curators = [
  {
    name: "Camille Laurent",
    region: "Direction Hébergement & Chambres",
    bio: "Garante de la qualité de notre literie King Size, du linge de maison et de la sérénité des étages.",
    image: "/images/curators/camille.jpg",
  },
  {
    name: "Kenji Takahashi",
    region: "Architecture & Design Intérieur",
    bio: "Spécialiste de l'acoustique hôtelière, de la lumière naturelle et du mobilier sur mesure.",
    image: "/images/curators/kenji.jpg",
  },
  {
    name: "Elena Moretti",
    region: "Cheffe Pâtissière & Petit-Déjeuner",
    bio: "Orchestres des buffets matinaux, pains au levain maison et produits fermiers de saison.",
    image: "/images/curators/elena.jpg",
  },
  {
    name: "Julian Von Berg",
    region: "Directeur Conférences & Séminaires",
    bio: "Accompagne les entreprises pour des réunions, comités de direction et congrès clés en main.",
    image: "/images/curators/julian.jpg",
  },
] as const;

export function AboutCuratorsSection() {
  return (
    <section className="w-full bg-white border-t border-[#EDEDEA] py-14">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="rounded-3xl bg-white border border-[#EDEDEA] p-8 md:p-12 shadow-sm mb-14 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 shadow-md bg-[#e3e2e0]">
            <SuiteImage
              src="/images/curators/henrik.jpg"
              alt="Henrik Valdemar — Fondateur et Directeur Général du King's Bed Hotel"
              sizes="128px"
            />
          </div>
          <div className="space-y-3">
            <Quote className="w-9 h-9 text-[#3d6659]" strokeWidth={1.5} />
            <p className="text-[18px] leading-[1.55] text-[#001510] italic max-w-3xl">
              &laquo;&nbsp;Nous ne proposons pas de simples chambres&nbsp;: nous créons des
              espaces où l&apos;on dort profondément, où l&apos;on savoure chaque matin et
              où vos équipes se réunissent dans des conditions idéales.&nbsp;&raquo;
            </p>
            <div className="pt-2">
              <h3 className="text-[20px] font-semibold text-[#001510]">
                Henrik Valdemar
              </h3>
              <p className="text-[11px] font-semibold text-[#414846] uppercase tracking-wider">
                Fondateur &amp; Directeur Général — King&apos;s Bed Hotel
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[12px] font-medium text-[#3d6659] uppercase tracking-wider">
                L&apos;Équipe de Direction
              </span>
              <h2 className="text-[24px] font-semibold text-[#001510] mt-1">
                Nos Responsables de Maison
              </h2>
            </div>
            <span className="hidden sm:inline-block text-[13px] text-[#414846]">
              À votre service pour vos séjours et événements
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curators.map((curator) => (
              <div
                key={curator.name}
                className="rounded-2xl bg-white border border-[#EDEDEA] p-5 shadow-sm space-y-4"
              >
                <div className="relative h-64 rounded-xl overflow-hidden bg-[#e3e2e0]">
                  <SuiteImage
                    src={curator.image}
                    alt={`${curator.name} — ${curator.region}`}
                    sizes="(max-width: 640px) 100vw, 300px"
                  />
                </div>
                <div>
                  <p className="text-[20px] font-semibold text-[#001510]">
                    {curator.name}
                  </p>
                  <p className="text-[11px] font-semibold text-[#3d6659] mt-0.5">
                    {curator.region}
                  </p>
                  <p className="text-[13px] leading-[1.5] text-[#414846] mt-2">
                    {curator.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
