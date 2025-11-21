"use client";
import { cn } from "@/utils/default";
import { useState, useEffect } from "react";

const DotsCount = 12;

export default function NavigationDots() {
  const [position, setPosition] = useState(0);

  // 현재 보이는 섹션 감지 (Intersection Observer)
  useEffect(() => {
    const sections = Array.from({ length: DotsCount }, (_, i) =>
      document.getElementById(`section-${i}`)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const id = entry.target.id;
            const index = parseInt(id.split("-")[1]);
            setPosition(index);
          }
        });
      },
      { threshold: [0.5] }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // 도트 클릭 시 해당 섹션으로 스크롤
  const handleDotClick = (index: number) => {
    const section = document.getElementById(`section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setPosition(index);
  };

  return (
    <div
      className={cn(
        "invisible lg:visible fixed left-1/2 top-1/2 -translate-y-1/2",
        "flex flex-col h-75 justify-between",
        "-translate-x-[calc(100vw/2-60px)]",
        "z-30"
      )}
    >
      {Array.from({ length: DotsCount }).map((_, index) => (
        <button
          key={`dot_${index}`}
          className={cn(
            "rounded-full size-3 cursor-pointer hover:bg-[#285594]",
            position === index ? "bg-[#285594]" : "border-[#285594] border"
          )}
          onClick={() => handleDotClick(index)}
        ></button>
      ))}
    </div>
  );
}
