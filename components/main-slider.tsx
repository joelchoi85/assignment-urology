"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QuickConsultationForm from "./quick-consultation-form";
import SliderIndicator from "./slider-indicator";
import { cn } from "@/utils/default";

const slides = [
  {
    id: 1,
    image: "/img/main-01-01-bg.webp",
    title: "비뇨기과의원의 자신감",
    subtitle: (
      <>
        <span className="font-bold">
          18년 경력과 14만여 명의 풍부한 임상진료 경험
        </span>
        이 근거입니다.
      </>
    ),
    description:
      "14만 여 명의 환자들의 신뢰로 검증 된 삼성비뇨기과의원에서 자신감과 자존감을 찾아드립니다.",
  },
  {
    id: 2,
    image: "/img/main-01-02-bg.webp",
    title: "프라이빗한 1:1 개인별 맞춤진료",
    subtitle: (
      <>
        <span className="font-bold">환자 상태에 따른 최적의 치료방식</span>으로
        섬세하게 치료합니다.
      </>
    ),
    description:
      "XX지역 비뇨기과 권위자 전문의가 개인 맞춤 진료로 충분한 상담을 거쳐 확실하게 진료합니다.",
  },
  {
    id: 3,
    image: "/img/main-01-03-bg.webp",
    title: "요로결석 365일 24시간 응급센터",
    subtitle: (
      <>
        14만 건 이상의 치료 레퍼런스를 바탕으로{" "}
        <span className="font-bold">통증을 최소화하는 치료를 지향합니다.</span>
      </>
    ),
    description:
      "비뇨기과만의 독보적인 두 가지 쇄석 치료 방식으로 환자의 상태에 맞추어 정밀하게 치료합니다.",
  },
];

export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [resetTimer]);

  const handleSlideChange = (newSlide: number) => {
    setCurrentSlide(newSlide);
    setResetTimer((prev) => prev + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSlideChange((currentSlide + 1) % slides.length);
    }

    if (isRightSwipe) {
      handleSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="top-0 w-full h-screen overflow-hidden z-0">
      <div
        className="relative flex transition-transform duration-700 ease-in-out h-full select-none"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDragStart={(e) => e.preventDefault()}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full shrink-0 flex items-end justify-center relative"
          >
            <div className="w-full h-screen pb-[25px] absolute inset-0">
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                fill
                className="object-cover pointer-events-none"
                priority={slide.id === 1}
                draggable={false}
                sizes="100vw"
                fetchPriority={slide.id === 1 ? "high" : "auto"}
              />
            </div>

            {/* Text overlay */}
            <div className="relative z-10 pb-[98px] lg:pb-42 w-full flex flex-col">
              {slide.title && (
                <h2
                  className={cn(
                    "lg:mx-[165px] mb-[30px] lg:mb-[35px]",
                    " text-[25px] lg:text-[64px] font-bold lg:font-semibold",
                    "tracking-[-1.28px] text-center text-white"
                  )}
                >
                  {slide.title}
                </h2>
              )}
              {slide.subtitle && (
                <p
                  className={cn(
                    "lg:mt-[35px] mb-2.5 lg:mb-3 mx-auto w-75 lg:w-full",
                    "text-[20px] lg:text-[38px] font-normal lg:leading-[1.05] break-keep",
                    "tracking-[-0.76px] text-center text-white"
                  )}
                >
                  {slide.subtitle}
                </p>
              )}
              {slide.description && (
                <p
                  className={cn(
                    "mt-3 mx-auto lg:mx-[71px] w-96 lg:w-full",
                    "text-[16px] lg:text-[22px] font-light lg:leading-[1.18] break-keep",
                    "tracking-[-0.44px] text-center text-white [text-shadow:0_0_3px_rgba(0,0,0,0.15)]"
                  )}
                >
                  {slide.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Slide indicators */}
      <div className="hidden lg:flex absolute bottom-10 lg:bottom-24 left-1/2 -translate-x-1/2 gap-4 text-xl text-[#cbcbcb] items-center z-20">
        <button
          className="hover:text-white transition-colors p-2 -m-2"
          onClick={() => {
            handleSlideChange(
              currentSlide === 0 ? slides.length - 1 : currentSlide - 1
            );
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft strokeWidth={1.5} size={24} />
        </button>
        <div className="flex gap-1.5 font-bold tracking-[-0.4]">
          <span className="text-white">{currentSlide + 1}</span>
          <span>/</span>
          <span>{slides.length}</span>
        </div>
        <button
          className="hover:text-white transition-colors p-2 -m-2"
          onClick={() => {
            handleSlideChange((currentSlide + 1) % slides.length);
          }}
          aria-label="Next slide"
        >
          <ChevronRight strokeWidth={1.5} size={24} />
        </button>
      </div>

      {/* Mobile Slide indicators - Dots */}
      <div className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <SliderIndicator
          total={slides.length}
          activeIndex={currentSlide}
          onDotClick={handleSlideChange}
        />
      </div>
      {/* 빠른 상담 신청 overlay */}
      <QuickConsultationForm />
    </div>
  );
}
