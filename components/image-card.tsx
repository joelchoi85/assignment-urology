import { cn } from "@/utils/default";
import Image from "next/image";
import RightArrowIcon from "./icons/right-arrow-icon";
import { ChevronDown } from "lucide-react";

export interface ImageCardProps {
  bgColor?: string;
  imgSrc?: string;
  link?: string;
  title: string;
  subtitle: string;
  englishTitle: string;
  isActive?: boolean;
  hasHovered?: boolean;
  onClick?: () => void;
  details?: {
    slogans?: React.ReactNode[];
    descriptions?: React.ReactNode[];
  };
}

export default function ImageCard({
  bgColor = "transparent",
  title,
  subtitle,
  englishTitle,
  imgSrc,
  isActive = false,
  hasHovered = false,
  onClick,
  details,
}: ImageCardProps) {
  // 크기 계산:
  // 모바일: width는 항상 full, height는 active 여부에 따라 변경
  // 데스크탑: height 고정, width는 hover 상태에 따라 변경
  const desktopWidth = hasHovered
    ? isActive
      ? "lg:w-[517px]"
      : "lg:w-[267px]"
    : "lg:w-[329.5px]";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg cursor-pointer lg:cursor-default",
        "transition-all duration-1000 ease-in-out",
        // 모바일: 클릭 시 높이 확장
        "w-full",
        isActive ? "h-60" : "h-[106px]",
        // 데스크탑: 호버에 따른 너비 변화, 고정 높이
        desktopWidth,
        "lg:h-[476px]"
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
    >
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={title}
          fill
          className={cn(
            "object-cover absolute inset-0",
            "transition-transform duration-3000 ease-in-out",
            isActive ? "lg:scale-110" : "lg:scale-100"
          )}
        />
      )}
      {/* 그라디언트 오버레이 - 모바일: 왼쪽→오른쪽, 데스크탑: 아래→위 */}
      <div
        className="lg:hidden absolute inset-0 z-10"
        style={{
          backgroundImage: `linear-gradient(to right, ${bgColor} 30%, transparent 55%)`,
        }}
      />
      <div
        className="hidden lg:block absolute inset-0 z-10"
        style={{
          backgroundImage: `linear-gradient(to top, ${bgColor} 0%, transparent 55%)`,
        }}
      />

      {/* 제목 컨텐츠 - 모바일: 왼쪽, 데스크탑: 왼쪽 하단 */}
      <div className="absolute left-4 top-4 lg:left-[30px] lg:top-auto lg:bottom-[104px] text-white z-20">
        <div className="flex flex-col lg:flex-row items-center lg:gap-0.5 lg:block">
          <div className="font-normal text-[18px] lg:text-[28px]">
            {subtitle}
          </div>
          <div className="font-bold text-[18px] lg:text-[28px]">{title}</div>
        </div>
        <div className="block text-xs lg:text-base opacity-70 mt-2">
          {englishTitle}
        </div>
      </div>

      {/* Details 컨텐츠 - 활성화 시에만 표시 */}
      {/* 모바일: 하단, 데스크탑: 오른쪽 하단 */}
      <div
        className={cn(
          "absolute text-white z-20",
          "transition-opacity duration-1000 ease-in-out",
          // 모바일: 하단 전체 너비, 작은 텍스트
          "left-4 right-4 bottom-4 text-[16px]",
          // 데스크탑: 오른쪽 하단
          "lg:left-auto lg:right-[30px] lg:bottom-[30px] lg:text-[18px]",
          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {details?.slogans && (
          <div className="space-y-0">
            {details.slogans.map((slogan, index) => (
              <div key={`slogan-${index}`}>{slogan}</div>
            ))}
          </div>
        )}
        {details?.descriptions && (
          <div className="mt-2 lg:mt-5 lg:space-y-1">
            {details.descriptions.map((description, index) => (
              <div key={`description-${index}`}>{description}</div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:top-auto lg:bottom-[30px] lg:right-[30px] z-20">
        <div className="w-6 h-6 lg:w-[30px] lg:h-[30px] rounded-full bg-white flex items-center justify-center">
          {/* Mobile: ChevronDown */}
          <ChevronDown
            size={20}
            className={cn(
              "lg:hidden text-[#154c94] transition-all duration-300",
              isActive ? "rotate-180" : "rotate-0"
            )}
            strokeWidth={1}
          />
          {/* Desktop: RightArrow */}
          <RightArrowIcon
            size={16}
            color="#154c94"
            opacity={1}
            className="hidden lg:block lg:size-5 mb-0.5 lg:mb-1"
          />
        </div>
      </div>
    </div>
  );
}
