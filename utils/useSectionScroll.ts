"use client";
import { useEffect, useRef } from "react";

export function useSectionScroll() {
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 스크롤 중이면 무시
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      // 너무 빠른 연속 스크롤 방지 (300ms 쿨다운)
      const now = Date.now();
      if (now - lastScrollTime.current < 300) {
        e.preventDefault();
        return;
      }

      // 현재 스크롤 위치
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      // 현재 섹션 인덱스 계산
      const currentSection = Math.round(currentScroll / viewportHeight);

      // 스크롤 방향 감지
      const direction = e.deltaY > 0 ? 1 : -1;

      // 다음 섹션 계산
      const nextSection = currentSection + direction;
      const nextScrollPosition = nextSection * viewportHeight;

      // 범위 체크
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      if (nextScrollPosition < 0 || nextScrollPosition > maxScroll) {
        return;
      }

      // 기본 스크롤 동작 막기
      e.preventDefault();

      // 스크롤 실행
      isScrolling.current = true;
      lastScrollTime.current = now;

      window.scrollTo({
        top: nextScrollPosition,
        behavior: "smooth",
      });

      // 스크롤 완료 후 플래그 해제 (1초 후)
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    // passive: false로 설정해야 preventDefault가 작동
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
}
