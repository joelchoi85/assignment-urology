import { cn } from "@/utils/default";
import Logo from "../logo";

// Footer 데이터
const FOOTER_DATA = {
  privacyLinks: ["개인정보처리방침", "비급여 안내"],
  clinic: {
    name: "비뇨기과의원",
    ceo: "가원장",
    businessNumber: "000-00-00000",
    phone: "000-000-0000",
    address: "XX도 XX시 XX구 XX로 000 / XX 타워 X층",
  },
  copyright: "Copyright UROLOGY CLINIC All rights reserved.",
};

export default function Footer() {
  return (
    <footer className={cn("w-full bg-[#16161A]", "lg:h-[429px] lg:mt-310")}>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="w-full border-b border-[#414145] flex items-center gap-[60px] px-[220px]">
          <Logo alt="SS비뇨기과" variant="white" />
          <div className="bg-[#414145] w-px h-[147px]"></div>
          <div className="flex gap-16 text-[22px] font-bold text-white">
            {FOOTER_DATA.privacyLinks.map((link, index) => (
              <div key={index}>{link}</div>
            ))}
          </div>
        </div>
        <div className="py-[33px] px-[220px] flex justify-between items-center text-lg border-b border-[#414145] text-[#b9b9bd]">
          <div className="flex gap-6">
            <div className="font-bold">상호명</div>
            <div>{FOOTER_DATA.clinic.name}</div>
          </div>
          <div className="flex gap-6">
            <div className="font-bold">사업자번호</div>
            <div>{FOOTER_DATA.clinic.businessNumber}</div>
          </div>
          <div className="flex gap-6">
            <div className="font-bold">대표</div>
            <div>{FOOTER_DATA.clinic.ceo}</div>
          </div>
          <div className="flex gap-6">
            <div className="font-bold">전화번호</div>
            <div>{FOOTER_DATA.clinic.phone}</div>
          </div>
          <div className="flex gap-6">
            <div className="font-bold">주소</div>
            <div>{FOOTER_DATA.clinic.address}</div>
          </div>
        </div>
        <div className="pt-[33px] pr-[60px] px-[220px] text-right text-lg text-white/40">
          {FOOTER_DATA.copyright}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden py-10">
        {/* Logo */}
        <div className="flex justify-center pb-6 border-b border-[#414145]">
          <div className="w-[148px]">
            <Logo alt="SS비뇨기과" variant="white" />
          </div>
        </div>

        {/* Privacy Links */}
        <div className="px-[66px] py-6 border-b border-[#414145]">
          <div className="flex justify-around text-sm font-bold text-white/70">
            <div>{FOOTER_DATA.privacyLinks[0]}</div>
            <div>|</div>
            <div>{FOOTER_DATA.privacyLinks[1]}</div>
          </div>
        </div>

        {/* Clinic Info */}
        <div className="py-6 border-b border-[#414145] text-xs text-center text-white/30 space-y-2">
          <div>
            {FOOTER_DATA.clinic.name} ㅣ{" "}
            <span className="font-bold pr-2">대표</span>
            {FOOTER_DATA.clinic.ceo} ㅣ{" "}
            <span className="font-bold pr-2">사업자번호</span>
            {FOOTER_DATA.clinic.businessNumber}
          </div>
          <div>
            <span className="font-bold pr-2">전화번호</span>
            {FOOTER_DATA.clinic.phone}
          </div>
          <div>
            <span className="font-bold pr-2">주소</span>
            {FOOTER_DATA.clinic.address}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-2.5 text-[10px] text-center text-white/30">
          {FOOTER_DATA.copyright}
        </div>
      </div>
    </footer>
  );
}
