"use client";
import { useState } from "react";
import { cn } from "@/utils/default";
import BuildingSlider from "../building-slider";
import SectionLabel from "../section-label";

// Image data by category
const imageData = {
  병원외부: [
    "/img/section/main-08-img-01.webp",
    "/img/section/main-08-img-02.webp",
    "/img/section/main-08-img-03.webp",
  ],
  로비: [
    "/img/section/main-08-img-04.webp",
    "/img/section/main-08-img-05.webp",
    "/img/section/main-08-img-06.webp",
  ],
  진료실: [
    "/img/section/main-08-img-07.webp",
    "/img/section/main-08-img-08.webp",
    "/img/section/main-08-img-09.webp",
    "/img/section/main-08-img-10.webp",
    "/img/section/main-08-img-11.webp",
    "/img/section/main-08-img-12.webp",
  ],
  검사실: [
    "/img/section/main-08-img-13.webp",
    "/img/section/main-08-img-14.webp",
    "/img/section/main-08-img-15.webp",
  ],
};

type Category = keyof typeof imageData;

const categories: Category[] = ["병원외부", "로비", "진료실", "검사실"];

export default function FacilityTour() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("병원외부");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCategoryChange = (category: Category) => {
    if (category === selectedCategory) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  return (
    <div className="relative w-full pb-16 lg:h-screen pt-[10vh] lg:pt-[20vh] bg-white flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:px-[280px]">
        <div className="">
          {/* Title */}
          <h2 className="relative text-[24px] lg:text-[42px] text-black">
            <SectionLabel
              variant="blue"
              className="w-full text-center lg:text-start absolute -top-6 lg:-top-12 "
            />
            <span className="font-light">비뇨기과 의원</span>
            <span className="pl-2 font-semibold">둘러보기</span>
          </h2>
        </div>

        {/* Category Buttons */}
        <div className=" mt-10 lg:mt-0 mb-4 lg:mb-0 flex items-center gap-4 lg:gap-2">
          {categories.map((category, index) => (
            <div key={category} className="flex items-center gap-4">
              <button
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "text-base lg:text-[18px] transition-color",
                  selectedCategory === category
                    ? "font-bold text-[#154c94]"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                {category}
              </button>
              {index < categories.length - 1 && (
                <div className="text-black/50">|</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slider Section */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className={cn(
            "transition-opacity duration-300",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
        >
          <BuildingSlider
            key={selectedCategory}
            images={imageData[selectedCategory]}
          />
        </div>
      </div>
    </div>
  );
}
