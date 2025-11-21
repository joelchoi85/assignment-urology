import { useEffect, useRef, useState } from "react";

export function useLazyBackground(imageUrl: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // 이미지 미리 로드
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              setIsLoaded(true);
            };
          }
        });
      },
      {
        rootMargin: "50px", // 뷰포트에 들어오기 50px 전에 로드 시작
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [imageUrl, isLoaded]);

  return { elementRef, isLoaded };
}
