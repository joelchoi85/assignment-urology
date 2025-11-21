"use client";
import { cn } from "@/utils/default";
import ImageCard, { ImageCardProps } from "../image-card";
import SectionLabel from "../section-label";
import { useState } from "react";

const visions: ImageCardProps[] = [
  {
    bgColor: "#98C5D6",
    title: "개인별 맞춤 진료",
    subtitle: "비뇨기과 전문의",
    englishTitle: "Three urologists",
    imgSrc: "/img/section/18834.webp",
    link: "",
    details: {
      slogans: [
        <div className="font-bold">서울병원 전문의 출신</div>,
        <div className="font-bold">성균관대학교 의과대학 외래부교수</div>,
      ],
      descriptions: [
        <div>
          <span className="font-bold">서울병원</span>과 상호 환자 의뢰를
        </div>,
        <div>
          통한 <span className="font-bold">협력체계</span>를 운영
        </div>,
      ],
    },
  },
  {
    bgColor: "#9CAA92",
    title: "1:1 전담 진료",
    subtitle: "프라이빗한",
    englishTitle: "Private 1:1 care",
    imgSrc: "/img/section/18835.webp",
    link: "",
    details: {
      slogans: [
        <div className="font-bold">담당 의료진이 상담부터 시술 및 수술</div>,
        <div className="font-bold">수술 후 관리까지 체계적 관리</div>,
      ],
      descriptions: [
        <div>환자 한 분 한 분 개인 상태에 따라</div>,
        <div>
          <span className="font-bold">프라이빗한 맞춤형 진료</span>보장
        </div>,
      ],
    },
  },
  {
    bgColor: "#BFA69A",
    title: "열려 있는 진료실",
    subtitle: "365일 24시간",
    englishTitle: "A clinic that is always open",
    imgSrc: "/img/section/18836.webp",
    link: "",
    details: {
      slogans: [
        <div className="font-bold">요로결석 응급센터 365일 24시간</div>,
        <div>시간 상관없이 요로결석 치료 가능</div>,
      ],
      descriptions: [
        <div>
          <span className="font-bold">당일검사와 당일치료,</span>
        </div>,
        <div>그리고 수술까지 한 번에 해결</div>,
      ],
    },
  },
  {
    bgColor: "#95897A",
    title: "발전하는 병원",
    subtitle: "쉬지 않고",
    englishTitle: "A developing hospital",
    imgSrc: "/img/section/18837.webp",
    link: "",
    details: {
      slogans: [
        <div className="font-bold">끊임없는 연구, 해외교류 학술활동</div>,
        <div>독보적인 치료 시스템 보유</div>,
      ],
      descriptions: [
        <div>비뇨기질환 정복을 위해</div>,
        <div>
          <span className="font-bold">지속적으로 연구</span>하는 병원
        </div>,
      ],
    },
  },
];

export default function Vision() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    // 모바일에서만 클릭 토글 동작
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    // 데스크탑에서 hover 시 모바일 선택 해제
    setActiveIndex(null);
  };

  return (
    <div className={cn("min-h-screen w-full relative", "bg-white")}>
      <div className="mx-auto px-4 pt-16 lg:pt-[220px] pb-10 flex flex-col items-center">
        <div className="w-full max-w-[1400px]">
          {/* 텍스트 섹션 - 모바일 가운데, 데스크탑 왼쪽 */}
          <div className="text-center lg:text-left">
            <SectionLabel variant="blue" size="sm" className="lg:text-[10px]" />
            <div className="mt-6 lg:mt-12 mb-[5px] text-[16px] lg:text-[28px] font-light leading-tight lg:leading-[1.29px] tracking-[-0.56] text-black">
              환자 한 분 한 분의 자신감과 자존감을 지키기 위해
            </div>
            <div className="mt-2 lg:mt-8 text-2xl lg:text-5xl text-black font-light lg:text-[50px]">
              비뇨기과는{" "}
              <span className="font-semibold">앞서 나가겠습니다.</span>
            </div>
          </div>

          {/* 카드 컨테이너 - 모바일 세로, 데스크탑 가로 */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3.5 mt-8 lg:mt-10">
            {visions.map((vision, index) => (
              <div
                key={`${index}_${vision.title}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ImageCard
                  {...vision}
                  isActive={index === (activeIndex ?? hoveredIndex)}
                  hasHovered={hoveredIndex !== null}
                  onClick={() => handleCardClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
