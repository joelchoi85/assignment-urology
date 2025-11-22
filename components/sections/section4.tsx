"use client";
import { useState, useEffect } from "react";
import { cn } from "@/utils/default";
import LeftArrowIcon from "../icons/left-arrow-icon";
import RightArrowIcon from "../icons/right-arrow-icon";
import Image from "next/image";
import SliderIndicator from "../slider-indicator";
import SectionLabel from "../section-label";

interface SlideData {
  bgSrc: string;
  title: React.ReactNode;
  subject: string;
  description: string[];
  slogan: string;
  tags: string[];
}

const slides: SlideData[] = [
  {
    bgSrc: "/img/section/main-04-01-bg.webp",
    title: (
      <div>
        <span className="font-bold">365일 24시간</span>
        응급센터
      </div>
    ),
    subject: "요로결석",
    description: [
      "24시간 요로결석 치료 시스템으로 시간 관계 없이 언제든",
      " 방문 당일 진단 및 치료가 가능합니다.",
    ],
    slogan: "요로결석 더 이상 참지 마시고, 통증을 느낀 즉시 연락주세요.",
    tags: [
      "매년 300건 이상의 요로결석 치료 진행",
      "방문당일 진단, 치료",
      "대학병원과 동일한 수준의 검사",
      "체외충격파쇄석기 2대 보유",
    ],
  },
  {
    bgSrc: "/img/section/main-04-02-bg.webp",
    title: "프라이빗한",
    subject: "1:1 전담 진료",
    description: [
      "담당 의료진이 상담부터 시술 및 수술",
      "수술 후 관리까지 체계적 관리",
    ],
    slogan: "프라이빗한 맞춤형 진료",
    tags: ["1:1 진료", "전담 의료진", "맞춤형 관리"],
  },
  {
    bgSrc: "/img/section/main-04-03-bg.webp",
    title: "365일 24시간",
    subject: "열려 있는 진료실",
    description: [
      "요로결석 응급센터 365일 24시간",
      "시간 상관없이 요로결석 치료 가능",
    ],
    slogan: "언제나 열려있는 병원",
    tags: ["24시간", "응급센터", "즉시 치료"],
  },
];

export default function AdSliderSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[activeIndex];

  return (
    <div className="w-full h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Images with overlap fade effect */}
      {slides.map((slide, index) => (
        <div
          key={`bg-${index}`}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === activeIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.bgSrc}
            alt={slide.subject}
            fill
            className={cn(
              // 모바일과 데스크탑 모두 화면 채우기
              "object-cover",
              // 모바일: 세로는 채우고 가로 중앙 크롭, 데스크탑: 정중앙
              "object-[50%_50%]"
            )}
            priority={index === 0}
          />
        </div>
      ))}

      <button
        onClick={handlePrev}
        className="hidden lg:block absolute left-[150px] cursor-pointer hover:opacity-80 transition-opacity z-30"
        aria-label="Previous slide"
      >
        <LeftArrowIcon size={57} color="#fff" opacity={0.4} />
      </button>

      <div className="flex flex-col items-center justify-center relative z-20">
        <div
          key={`content-${activeIndex}`}
          className={cn(
            "flex flex-col items-center",
            "text-center text-white mb-8 fade-in-up"
          )}
        >
          <SectionLabel variant="white" className="lg:mb-12" />

          <Image
            src="/line-01-gr.webp"
            width={623}
            height={1}
            alt="구분선"
            className="mt-5 lg:mt-6 w-[228px]! lg:w-[623px]"
          />

          <div className="mt-5 lg:mt-8 text-[18px] lg:text-[32px] font-normal">
            {currentSlide.title}
          </div>

          <div className="mt-2 text-[26px] lg:text-[64px] font-semibold">
            {currentSlide.subject}
          </div>

          <Image
            src="/line-01-gr.webp"
            width={623}
            height={1}
            alt="구분선"
            className="mt-5 lg:mt-6 w-[228px]! lg:w-[623px]"
          />

          {/* Description (2 lines) */}
          <div className="mt-5 lg:mt-8 text-[14px] lg:text-[20px] font-light lg:font-normal leading-6">
            {currentSlide.description.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>

          {/* Slogan */}
          <div className="mt-[58px] lg:mt-20 text-[16px] lg:text-[28px] tracking-tight font-bold w-[180px] lg:w-full">
            {currentSlide.slogan}
          </div>

          {/* Tags */}
          <div className="mt-[25px] lg:mt-12 flex flex-col lg:flex-row gap-3.5 lg:gap-[25px] justify-center">
            {currentSlide.tags.map((tag, index) => (
              <div
                key={index}
                className="w-[90vw] lg:w-full px-5 py-0.5 rounded-full border border-white/40 text-[14px] lg:text-[16px] font-normal whitespace-nowrap"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <button
          className={cn(
            "mt-24 w-[260px] lg:w-[478px] h-[38px]",
            "bg-white/30 backdrop-blur-xs",
            "text-white/70 text-[14px] lg:text-[20px] font-normal",

            "hover:bg-white/60 transition-colors"
          )}
        >
          {currentSlide.subject} 더 보러가기 +
        </button>
      </div>

      <button
        onClick={handleNext}
        className="hidden lg:block absolute right-[150px] cursor-pointer hover:opacity-80 transition-opacity z-30"
        aria-label="Next slide"
      >
        <RightArrowIcon size={57} color="#fff" opacity={0.4} />
      </button>

      {/* Mobile Indicator */}
      <div className="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <SliderIndicator total={slides.length} activeIndex={activeIndex} />
      </div>
    </div>
  );
}
