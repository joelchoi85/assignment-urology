"use client";
import { useState } from "react";
import { useScrollAnimation } from "@/utils/useScrollAnimation";
import { cn } from "@/utils/default";
import OpacityImageCard from "../opacity-image-card";
import SectionLabel from "../section-label";

const subjects = [
  {
    subject: "요로결석",
    englishSubject: "Urinary stone",
    imgSrc: "/img/section/main-05-img-01.webp",
    link: "",
  },
  {
    subject: "정관수술",
    englishSubject: "Vasectomy",
    imgSrc: "/img/section/main-05-img-02.webp",
    link: "",
  },
  {
    subject: "남성수술",
    englishSubject: "Circumcision",
    imgSrc: "/img/section/main-05-img-03.webp",
    link: "",
  },
  {
    subject: "여성 요실금 수술",
    englishSubject: "Urinary incontinence",
    imgSrc: "/img/section/main-05-img-04.webp",
    link: "",
  },
  {
    subject: "남성비뇨기과",
    englishSubject: "Male urology",
    imgSrc: "/img/section/main-05-img-05.webp",
    link: "",
  },
  {
    subject: "여성비뇨기과",
    englishSubject: "Female urology",
    imgSrc: "/img/section/main-05-img-06.webp",
    link: "",
  },
];

export default function SubjectInformation() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-screen bg-[#16161a] flex justify-center">
      <div className="pt-[50px] lg:pt-[220px] space-y-10 lg:space-y-20">
        <div
          ref={elementRef}
          className={cn(
            "fade-in-up-on-scroll flex flex-col items-center",
            isVisible && "visible"
          )}
        >
          <SectionLabel />
          <div className="mt-4 text-[24px] lg:text-5xl font-light text-white">
            비뇨기과 의원 <span className="font-semibold">진료과목 안내</span>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 p-4 lg:p-0 gap-[18px] lg:gap-[35px]">
          {subjects.map((item, index) => (
            <div
              key={item.subject}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <OpacityImageCard
                {...item}
                isInactive={hoveredIndex !== null && hoveredIndex !== index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
