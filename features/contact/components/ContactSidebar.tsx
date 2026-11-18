import {
  Building2,
  Landmark,
  Lock,
  Mail,
  MessageCircle,
  Palmtree,
  Phone,
} from "lucide-react";
import { SuiteImage } from "@/components/shared/SuiteImage";

export function ContactSidebar() {
  return (
    <div className="space-y-5">
      {/* Master Concierge Desk Card */}
      <div className="group relative rounded-2xl overflow-hidden shadow-[0_20px_48px_-8px_rgba(13,43,36,0.12)] bg-white">
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0d2b24]">
          <SuiteImage
            src="/images/contact/concierge-desk.jpg"
            alt="SuiteSavvy Master Concierge Desk"
            sizes="(max-width: 1024px) 100vw, 520px"
            className="group-hover:scale-105 transition-transform duration-700"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#001510]/85 via-[#001510]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#faf9f6]/92 backdrop-blur-md text-[11px] font-semibold text-[#001510] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3d6659]" />
            On Duty
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#bfecdc]">
              Master Concierge Desk
            </span>
            <h3 className="text-[24px] font-semibold leading-tight">
              Personalized Hospitality Advisory
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f3f0] hover:bg-[#efeeeb] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510]">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#727975] block">
                  VIP Direct Line
                </span>
                <span className="text-[18px] font-semibold text-[#001510] tabular-nums">
                  +41 22 819 9000
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#3d6659] bg-[#bfecdc]/50 px-2.5 py-1 rounded-full">
              Toll Free
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f3f0] hover:bg-[#efeeeb] transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#e3e2e0] flex items-center justify-center text-[#001510] shrink-0">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-[#727975] block">
                  Confidential Inquiries
                </span>
                <span className="text-[14px] font-semibold text-[#001510] truncate block">
                  inquiries@suitesavvy.luxury
                </span>
              </div>
            </div>
            <Lock className="w-[18px] h-[18px] text-[#727975] shrink-0" strokeWidth={1.5} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f3f0] hover:bg-[#efeeeb] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#bce9d9] flex items-center justify-center text-[#416b5d]">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#727975] block">
                  Private Messaging Liaison
                </span>
                <span className="text-[14px] font-semibold text-[#001510]">
                  WhatsApp VIP Concierge
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#416b5d] bg-[#bce9d9] px-2.5 py-0.5 rounded-full">
              Priority
            </span>
          </div>
        </div>
      </div>

      {/* Worldwide Offices */}
      <div className="p-5 rounded-2xl bg-white shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-semibold text-[#001510]">
            Worldwide Offices
          </h3>
          <span className="text-[11px] font-semibold text-[#414846]">
            3 Global Nodes
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-[#f4f3f0] flex items-start gap-3.5">
            <Building2 className="w-5 h-5 text-[#001510] mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-semibold text-[#001510]">Zurich</span>
                <span className="text-[11px] font-semibold text-[#727975]">
                  • Headquarters &amp; European Liaison
                </span>
              </div>
              <p className="text-[13px] text-[#414846] mt-0.5">
                Bahnhofstrasse 45, 8001 Zürich, Switzerland
              </p>
              <span className="text-[11px] font-semibold text-[#3d6659]">
                CET (GMT+1) • Active Now
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f4f3f0] flex items-start gap-3.5">
            <Palmtree className="w-5 h-5 text-[#001510] mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-semibold text-[#001510]">Bali</span>
                <span className="text-[11px] font-semibold text-[#727975]">
                  • Southeast Asia Liaison
                </span>
              </div>
              <p className="text-[13px] text-[#414846] mt-0.5">
                Jalan Raya Ubud No. 25, Gianyar, Bali 80571
              </p>
              <span className="text-[11px] font-semibold text-[#3d6659]">
                WITA (GMT+8) • Active Now
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f4f3f0] flex items-start gap-3.5">
            <Landmark className="w-5 h-5 text-[#001510] mt-0.5 shrink-0" strokeWidth={1.5} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-semibold text-[#001510]">New York</span>
                <span className="text-[11px] font-semibold text-[#727975]">
                  • Americas Advisory
                </span>
              </div>
              <p className="text-[13px] text-[#414846] mt-0.5">
                740 Park Avenue, Suite 12B, New York, NY 10021
              </p>
              <span className="text-[11px] font-semibold text-[#3d6659]">
                EST (GMT-5) • Active Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
