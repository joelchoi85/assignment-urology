"use client";
import { cn } from "@/utils/default";
import { useState, useEffect } from "react";

export default function NavigationDots() {
  const [position, setPosition] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);

  // 현재 보이는 섹션 감지 (Intersection Observer)
  useEffect(() => {
    // DOM에서 실제 섹션 개수를 동적으로 감지 (section-1부터 시작)
    const allSections = document.querySelectorAll('[id^="section-"]');
    const sections = Array.from(allSections).filter((section) => {
      const id = section.getAttribute("id");
      return id && /^section-\d+$/.test(id);
    });

    // 섹션 개수 설정
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSectionCount(sections.length);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const id = entry.target.id;
            const sectionNum = parseInt(id.split("-")[1]);
            // section-1부터 시작하므로 position은 0부터
            setPosition(sectionNum - 1);
          }
        });
      },
      { threshold: [0.5] }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // 도트 클릭 시 해당 섹션으로 스크롤
  const handleDotClick = (index: number) => {
    // index는 0부터 시작하지만 section ID는 1부터 시작
    const sectionNum = index + 1;
    const section = document.getElementById(`section-${sectionNum}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setPosition(index);
  };

  // 키보드 방향키로 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = Math.max(0, index - 1);
      handleDotClick(prevIndex);
      // 이전 버튼으로 포커스 이동
      const prevButton = document.querySelector(
        `button[data-dot-index="${prevIndex}"]`
      ) as HTMLButtonElement;
      prevButton?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = Math.min(sectionCount - 1, index + 1);
      handleDotClick(nextIndex);
      // 다음 버튼으로 포커스 이동
      const nextButton = document.querySelector(
        `button[data-dot-index="${nextIndex}"]`
      ) as HTMLButtonElement;
      nextButton?.focus();
    }
  };

  // 섹션이 아직 로드되지 않았으면 아무것도 렌더링하지 않음
  if (sectionCount === 0) return null;

  return (
    <div
      className={cn(
        "invisible lg:visible fixed left-1/2 top-1/2 -translate-y-1/2",
        "flex flex-col h-75 justify-between",
        "-translate-x-[calc(100vw/2-60px)]",
        "z-30"
      )}
    >
      {Array.from({ length: sectionCount }).map((_, index) => (
        <button
          key={`dot_${index}`}
          data-dot-index={index}
          className={cn(
            "rounded-full size-3 cursor-pointer hover:bg-[#285594]",
            position === index ? "bg-[#285594]" : "border-[#285594] border"
          )}
          onClick={() => handleDotClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          aria-label={`섹션 ${index + 1}로 이동`}
          aria-current={position === index ? "true" : undefined}
        ></button>
      ))}
    </div>
  );
}
