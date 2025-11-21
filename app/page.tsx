"use client";
import dynamic from "next/dynamic";
import Section from "@/components/layout/section-layout";
import MainSlider from "@/components/main-slider";
import { useSectionScroll } from "@/utils/useSectionScroll";

// 초기 로드에 필요하지 않은 컴포넌트는 동적 import
const NavigationDots = dynamic(
  () => import("@/components/layout/navigation-dots"),
  { ssr: false }
);
const QuickMenuList = dynamic(
  () => import("@/components/layout/quick-menu-list"),
  { ssr: false }
);
const QuickConsultationForm = dynamic(
  () => import("@/components/quick-consultation-form"),
  { ssr: false }
);

// Below-the-fold 섹션들은 lazy load
const Introduction = dynamic(() => import("@/components/sections/section1"));
const Vision = dynamic(() => import("@/components/sections/section2"));
const AdSliderSection = dynamic(() => import("@/components/sections/section3"));
const SubjectInformation = dynamic(
  () => import("@/components/sections/section4")
);
const ChiefIntroduction = dynamic(
  () => import("@/components/sections/section5")
);
const MainChiefIntroduction = dynamic(
  () => import("@/components/sections/section6")
);
const FacilityTour = dynamic(() => import("@/components/sections/section7"));
const BlogSection = dynamic(() => import("@/components/sections/section8"));
const Location = dynamic(() => import("@/components/location"));

export default function Home() {
  useSectionScroll();

  return (
    <div className="relative mx-auto w-full">
      <div className="floating-region">
        <NavigationDots />
        <QuickMenuList />
      </div>
      <QuickConsultationForm />
      <Section id="section-0">
        <MainSlider />
      </Section>
      <Section id="section-1">
        <Introduction />
      </Section>
      <Section id="section-2">
        <Vision />
      </Section>
      <Section id="section-3">
        <AdSliderSection />
      </Section>
      <Section id="section-4">
        <SubjectInformation />
      </Section>
      <Section id="section-5">
        <ChiefIntroduction />
      </Section>
      <Section id="section-6" className="h-full pb-16">
        <MainChiefIntroduction />
      </Section>
      <Section id="section-7" className="h-full!">
        <FacilityTour />
      </Section>
      <Section id="section-8">
        <BlogSection />
      </Section>
      <Section id="section-10" className="h-full">
        <Location />
      </Section>
    </div>
  );
}
