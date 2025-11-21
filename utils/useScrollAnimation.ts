import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = false } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        // If triggerOnce is true, unobserve after first appearance
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
}

// Hook for staggered animations with individual element tracking
interface UseStaggeredAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number; // delay in ms between each element
  triggerOnce?: boolean;
}

export function useStaggeredAnimation(
  itemCount: number,
  options: UseStaggeredAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    staggerDelay = 100,
    triggerOnce = false,
  } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );
  const hasTriggered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If triggerOnce and already triggered, do nothing
          if (triggerOnce && hasTriggered.current) return;

          hasTriggered.current = true;

          // Stagger the visibility of items
          const newVisibleItems = new Array(itemCount).fill(false);
          setVisibleItems(newVisibleItems);

          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const updated = [...prev];
                updated[i] = true;
                return updated;
              });
            }, i * staggerDelay);
          }
        } else if (!triggerOnce) {
          // Reset if not triggerOnce
          hasTriggered.current = false;
          setVisibleItems(new Array(itemCount).fill(false));
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [itemCount, threshold, rootMargin, staggerDelay, triggerOnce]);

  return { containerRef, visibleItems };
}
