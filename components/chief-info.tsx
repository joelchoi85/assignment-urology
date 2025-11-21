"use client";
import { cn } from "@/utils/default";
import { useEffect, useState } from "react";

export interface ChiefInfoProps {
  title: string;
  name: string;
  position: string;
  careers: string[];
  isVisible: boolean;
}

export default function ChiefInfo({
  title,
  name,
  position,
  careers,
  isVisible,
}: ChiefInfoProps) {
  // Total items: title, name/position, "약력" label, careers
  const totalItems = 3 + careers.length;
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(totalItems).fill(false)
  );

  // Trigger staggered animation when isVisible becomes true
  useEffect(() => {
    if (isVisible) {
      // Reset all items first
      setVisibleItems(new Array(totalItems).fill(false));

      // Stagger the visibility
      for (let i = 0; i < totalItems; i++) {
        setTimeout(() => {
          setVisibleItems((prev) => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
          });
        }, i * 100); // 100ms delay between each item
      }
    } else {
      // Reset when not visible
      setVisibleItems(new Array(totalItems).fill(false));
    }
  }, [isVisible, totalItems]);

  return (
    <div
      className={cn(
        "text-nowrap text-black",
        !isVisible && "opacity-0"
      )}
    >
      {/* Title */}
      <div
        className={cn(
          "fade-in-up-on-scroll text-[20px] font-normal mb-6 leading-relaxed",
          visibleItems[0] && "visible"
        )}
      >
        {title}
      </div>

      {/* Name and Position */}
      <div
        className={cn(
          "fade-in-up-on-scroll flex items-baseline gap-4 mb-8",
          visibleItems[1] && "visible"
        )}
      >
        <span className="text-[50px] font-bold">{name}</span>
        <span className="text-[28px] font-light">{position}</span>
      </div>

      <div
        className={cn(
          "fade-in-up-on-scroll text-[18px] font-semibold mb-4",
          visibleItems[2] && "visible"
        )}
      >
        약력
      </div>

      {/* Career List */}
      <div className="space-y-2">
        {careers.map((career, index) => (
          <div
            key={index}
            className={cn(
              "fade-in-up-on-scroll text-[16px] font-light",
              visibleItems[3 + index] && "visible"
            )}
          >
            · {career}
          </div>
        ))}
      </div>
    </div>
  );
}
