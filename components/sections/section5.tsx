"use client";
import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/utils/useScrollAnimation";
import { useLazyBackground } from "@/utils/useLazyBackground";
import { cn } from "@/utils/default";
import Image from "next/image";
import ChiefInfo, { ChiefInfoProps } from "../chief-info";
import SliderIndicator from "../slider-indicator";
import SectionLabel from "../section-label";

interface ChiefData extends Omit<ChiefInfoProps, "isVisible"> {
  imageSrc: string;
  imageAlt: string;
}

const chiefs: ChiefData[] = [
  {
    imageSrc: "/main-chief.webp",
    imageAlt: "대표원장",
    title: "서울병원 출신 · 비뇨기과 18년 경력 · 비뇨기과 전문의",
    name: "가 원 장",
    position: "대표원장",
    careers: [
      "서울병원 비뇨기과 레지던트",
      "서울아산병원 인턴",
      "성균관대학교 의과대학 외래부교수",
      "UCLA의대 비뇨기과 골반재건수술센터 연수",
      "서울송도병원 골반저질환센터 비뇨기과 과장",
      "유어스비뇨기과의원 원장",
    ],
  },
  {
    imageSrc: "/sub-chief.webp",
    imageAlt: "부원장",
    title: "국립중앙의료원 비뇨기과 전문의",
    name: "나 원 장",
    position: "부원장",
    careers: [
      "전북대학교 의과대학 졸업",
      "국립중앙의료원 비뇨기과 전문의",
      "한림대학교 강동성심병원 전문의",
      "대학 비뇨의학회 정회원",
      "국립중앙의료원 진료 자문위원",
      "호성전주병원 진료과장",
      "닥터유비뇨기과 원장",
    ],
  },
];

interface ChiefSectionProps {
  chief: ChiefData;
  otherChief: ChiefData;
  index: number;
  hoveredIndex: number | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  reverse?: boolean;
}

function ChiefSection({
  chief,
  otherChief,
  index,
  hoveredIndex,
  onMouseEnter,
  onMouseLeave,
  reverse = false,
}: ChiefSectionProps) {
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
  const showInfo = isOtherHovered;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        reverse && "flex-row-reverse"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Info Layer */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
          showInfo ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="px-20 w-full">
          <ChiefInfo {...otherChief} isVisible={showInfo} />
        </div>
      </div>

      {/* Image Layer */}
      <div
        className={cn(
          "select-none transition-opacity duration-500",
          showInfo ? "opacity-0" : "opacity-100"
        )}
      >
        <Image
          src={chief.imageSrc}
          alt={chief.imageAlt}
          width={425}
          height={760}
          className="select-none object-cover"
        />
      </div>
    </div>
  );
}

export default function ChiefIntroduction() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: bgRef, isLoaded } = useLazyBackground(
    "/img/section/main-06-bg.webp"
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // 왼쪽으로 스와이프
      setActiveIndex((prev) => (prev + 1) % chiefs.length);
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // 오른쪽으로 스와이프
      setActiveIndex((prev) => (prev - 1 + chiefs.length) % chiefs.length);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % chiefs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={bgRef}
      className="relative w-full h-screen bg-cover bg-center flex justify-center overflow-hidden"
      style={{
        backgroundImage: isLoaded
          ? "url(/img/section/main-06-bg.webp)"
          : "none",
      }}
    >
      <div className="pt-[100px] lg:pt-[220px] w-full">
        <div
          ref={elementRef}
          className={cn(
            "fade-in-up-on-scroll flex flex-col items-center mb-4 lg:mb-20",
            isVisible && "visible"
          )}
        >
          <SectionLabel variant="blue" className="mb-[15px] lg:mb-6" />
          <div className="text-[24px] lg:text-5xl font-light text-black">
            비뇨기과 의원
            <span className="pl-2 font-semibold">
              의료진
              <span className="hidden lg:inline-block">을 소개합니다.</span>
              <span className="pl-1.5 lg:hidden inline-block">소개</span>
            </span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 justify-center">
          {chiefs.map((chief, index) => (
            <ChiefSection
              key={index}
              chief={chief}
              otherChief={chiefs[1 - index]}
              index={index}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              reverse={index === 1}
            />
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="select-none lg:hidden flex flex-col items-center ">
          <div
            className="relative w-full flex flex-col items-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full flex justify-center">
              {chiefs.map((chief, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute transition-opacity duration-500",
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  )}
                >
                  {/* Card */}
                  <div className="flex flex-col items-center">
                    {/* Image */}
                    <Image
                      src={chief.imageSrc}
                      alt={chief.imageAlt}
                      width={207}
                      height={281}
                      className="object-cover rounded-t-lg"
                    />
                    {/* Info */}
                    <div className="-mt-24 w-[87vw] py-6 bg-white rounded-xl *:px-[26px] text-black">
                      <div className="text-[12px] font-semibold  mb-2">
                        {chief.title}
                      </div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="font-semibold text-[24px]">
                          {chief.name}
                        </span>
                        <span className="font-light text-[16px] text-gray-600">
                          {chief.position}
                        </span>
                      </div>
                      <div className="mt-5 font-light text-[14px]">
                        {chief.careers.map((career, idx) => (
                          <div
                            key={idx}
                            className="tracking-[-0.28] text-gray-700"
                          >
                            • {career}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Indicator */}
          <div className="absolute bottom-8 mt-[350px]">
            <SliderIndicator
              total={chiefs.length}
              activeIndex={activeIndex}
              onDotClick={setActiveIndex}
              variant="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
