"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/utils/default";
import LeftArrowIcon from "./icons/left-arrow-icon";
import RightArrowIcon from "./icons/right-arrow-icon";

interface BuildingSliderProps {
  images: string[];
  autoPlayInterval?: number;
}

interface SlideState {
  index: number;
  position: "left" | "center" | "right" | "entering-right" | "exiting-left";
}

export default function BuildingSlider({
  images,
  autoPlayInterval = 2000,
}: BuildingSliderProps) {
  const totalImages = images.length;

  const getPrevIndexFunc = (index: number) =>
    (index - 1 + totalImages) % totalImages;
  const getNextIndexFunc = (index: number) => (index + 1) % totalImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<SlideState[]>(() => [
    { index: getPrevIndexFunc(0), position: "left" },
    { index: 0, position: "center" },
    { index: getNextIndexFunc(0), position: "right" },
  ]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const getPrevIndex = useCallback(
    (index: number) => (index - 1 + totalImages) % totalImages,
    [totalImages]
  );
  const getNextIndex = useCallback(
    (index: number) => (index + 1) % totalImages,
    [totalImages]
  );

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const nextIdx = getNextIndex(currentIndex);
    const newSlideIndex = getNextIndex(nextIdx);

    // Add new slide entering from right
    setSlides((prev) => [
      ...prev,
      { index: newSlideIndex, position: "entering-right" },
    ]);

    // Start transition
    setTimeout(() => {
      setSlides((prev) =>
        prev.map((slide) => {
          if (slide.position === "left")
            return { ...slide, position: "exiting-left" };
          if (slide.position === "center")
            return { ...slide, position: "left" };
          if (slide.position === "right")
            return { ...slide, position: "center" };
          if (slide.position === "entering-right")
            return { ...slide, position: "right" };
          return slide;
        })
      );

      setCurrentIndex(nextIdx);
    }, 50);

    // Remove exited slide
    setTimeout(() => {
      setSlides((prev) => prev.filter((s) => s.position !== "exiting-left"));
      setIsTransitioning(false);
    }, 650);
  }, [isTransitioning, currentIndex, getNextIndex]);

  const resetAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
  }, [autoPlayInterval, handleNext]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const prevIdx = getPrevIndex(currentIndex);
    const newSlideIndex = getPrevIndex(prevIdx);

    // For prev, we need to shift everything right
    setSlides((prev) => [
      { index: newSlideIndex, position: "exiting-left" },
      ...prev,
    ]);

    setTimeout(() => {
      setSlides((prev) =>
        prev.map((slide) => {
          if (slide.position === "exiting-left")
            return { ...slide, position: "left" };
          if (slide.position === "left")
            return { ...slide, position: "center" };
          if (slide.position === "center")
            return { ...slide, position: "right" };
          if (slide.position === "right")
            return { ...slide, position: "entering-right" };
          return slide;
        })
      );

      setCurrentIndex(prevIdx);
    }, 50);

    setTimeout(() => {
      setSlides((prev) => prev.filter((s) => s.position !== "entering-right"));
      setIsTransitioning(false);
    }, 650);

    resetAutoPlay();
  }, [isTransitioning, currentIndex, getPrevIndex, resetAutoPlay]);

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlayInterval, handleNext]);

  const handleNextClick = () => {
    handleNext();
    resetAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // 왼쪽으로 스와이프 = 다음
      handleNextClick();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // 오른쪽으로 스와이프 = 이전
      handlePrev();
    }
  };

  const getSlideStyle = (
    position: SlideState["position"],
    isMobile: boolean = false
  ) => {
    if (isMobile) {
      // Mobile: center 308x178, sides 240x139
      // Side images (240px) go BEHIND center image (308px)
      // Left image: hidden behind center's LEFT side, only LEFT 10px visible
      // Right image: hidden behind center's RIGHT side, only RIGHT 10px visible
      // Center image: left edge at (50% - 154px), right edge at (50% + 154px)
      // Left image (240px): LEFT edge should be at (50% - 154px - 10px)
      //   So center of left image: (50% - 154px - 10px + 120px) = 50% - 44px
      // Right image (240px): RIGHT edge should be at (50% + 154px + 10px)
      //   So center of right image: (50% + 154px + 10px - 120px) = 50% + 44px

      switch (position) {
        case "left":
          return {
            left: "calc(50% - 154px - 10px + 120px)", // 왼쪽 이미지 왼쪽 끝 10px만 보임
            top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.7,
            zIndex: 1,
            width: "240px",
            height: "139px",
          };
        case "center":
          return {
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 1,
            zIndex: 10,
            width: "308px",
            height: "178px",
          };
        case "right":
          return {
            left: "calc(50% + 154px + 10px - 120px)", // 오른쪽 이미지 오른쪽 끝 10px만 보임
            top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.7,
            zIndex: 1,
            width: "240px",
            height: "139px",
          };
        case "entering-right":
          return {
            left: "calc(50% + 800px)",
            top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            zIndex: 1,
            width: "240px",
            height: "139px",
          };
        case "exiting-left":
          return {
            left: "calc(50% - 800px)",
            top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            zIndex: 1,
            width: "240px",
            height: "139px",
          };
      }
    }

    // Desktop
    switch (position) {
      case "left":
        return {
          left: "50%",
          top: "50%",
          transform: "translate(calc(-50% - 300px), -50%)",
          opacity: 0.7,
          zIndex: 1,
          width: "718px",
          height: "416px",
        };
      case "center":
        return {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 1,
          zIndex: 10,
          width: "883px",
          height: "512px",
        };
      case "right":
        return {
          left: "50%",
          top: "50%",
          transform: "translate(calc(-50% + 300px), -50%)",
          opacity: 0.7,
          zIndex: 1,
          width: "718px",
          height: "416px",
        };
      case "entering-right":
        return {
          left: "50%",
          top: "50%",
          transform: "translate(calc(-50% + 1500px), -50%)",
          opacity: 0,
          zIndex: 1,
          width: "718px",
          height: "416px",
        };
      case "exiting-left":
        return {
          left: "50%",
          top: "50%",
          transform: "translate(calc(-50% - 1500px), -50%)",
          opacity: 0,
          zIndex: 1,
          width: "718px",
          height: "416px",
        };
    }
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:flex relative items-center justify-center gap-0 ">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-white hover:bg-gray-100 transition-colors z-20 mr-[95px]"
          aria-label="Previous slide"
        >
          <LeftArrowIcon
            size={36}
            color="#154c94"
            opacity={1}
            className="mb-1.5"
          />
        </button>

        {/* Slider Container */}
        <div className="relative w-[883px] h-[512px]">
          {slides.map((slide, idx) => {
            const style = getSlideStyle(slide.position, false);
            const isCenterSlide = slide.position === "center";
            const isBackSlide =
              slide.position === "left" || slide.position === "right";

            return (
              <div
                key={`${slide.index}-${idx}`}
                className={cn(
                  "absolute transition-all duration-600 ease-in-out rounded-lg overflow-hidden",
                  isCenterSlide && "shadow-2xl"
                )}
                style={style}
              >
                <Image
                  src={images[slide.index]}
                  alt={`Building image ${slide.index + 1}`}
                  fill
                  className={cn("object-cover", isBackSlide && "blur-[3px]")}
                />
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNextClick}
          className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-white hover:bg-gray-100 transition-colors z-20 ml-[95px]"
          aria-label="Next slide"
        >
          <RightArrowIcon
            size={36}
            color="#154c94"
            opacity={1}
            className="mb-1.5"
          />
        </button>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden relative flex items-center justify-center">
        {/* Slider Container */}
        <div
          className="relative w-[308px] h-[178px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, idx) => {
            const style = getSlideStyle(slide.position, true);
            const isCenterSlide = slide.position === "center";
            const isBackSlide =
              slide.position === "left" || slide.position === "right";

            return (
              <div
                key={`${slide.index}-${idx}`}
                className={cn(
                  "absolute transition-all duration-600 ease-in-out rounded-lg overflow-hidden",
                  isCenterSlide && "shadow-xl"
                )}
                style={style}
              >
                <Image
                  src={images[slide.index]}
                  alt={`Building image ${slide.index + 1}`}
                  fill
                  className={cn("object-cover", isBackSlide && "blur-[2px]")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
