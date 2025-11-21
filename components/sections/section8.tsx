"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/default";
import SectionLabel from "../section-label";

interface ContentItem {
  imgSrc: string;
  title: string;

  date?: string;
  description: string;
  link?: string;
}

const contentData: ContentItem[] = [
  {
    imgSrc: "/img/section/blog-img-01.webp",
    date: "2024-08-05",
    title: "<조루 치료운동 반복하면 약 먹은 효과!>",
    description:
      "조루 현상은 여러 원인으로 인해 사정을 지연시키지 못하고 의지와 상관없이 사정하게 되는 질환으로, 최근 젊은 층 사이에서도 심각한 질환으로",
    link: "#",
  },
  {
    imgSrc: "/img/section/blog-img-02.webp",
    date: "2024-08-05",
    title: "<요로결석 수술비용 싼 곳만 찾다간… >",
    description:
      "본격적인 무더위가 시작되면서 높은 기온과 관련된 여러 질환의 발병률이 현저하게 높아지고 있습니다. 온열 질환과 함께 온도가 높은",
    link: "#",
  },
  {
    imgSrc: "/img/section/blog-img-03.webp",
    date: "2024-08-02",
    title: "<비뇨기과, 피임확률 99.85% 정관수술에 대하여>",
    description:
      "우리는 인생을 살면서 다양한 계획을 세웁니다. 예를 들면, 여행, 진로, 학업, 자녀 계획이 있습니다. 하지만 항상 우리의 계획대로 되지 않을 수도",
    link: "#",
  },
];

const blogButtonData = {
  imgSrc: "/img/section/main-09-img-btn.webp",
  title: "콘텐츠 제목 4",
  description: (
    <div>
      <div>13만 여 명 이상의 환자들의</div>
      <div className="font-bold">신뢰와 믿음으로 검증된 병원,</div>
      <div>비뇨기과에서</div>
      <div className="font-bold">자신감과 자존감을 되찾으세요.</div>
    </div>
  ),
  link: "https://blog.naver.com/wjdwhddms39707",
};

interface ContentCardProps {
  item: ContentItem;
}

function ContentCard({ item }: ContentCardProps) {
  const cardContent = (
    <button
      onClick={() => window.open(item.link, "blog")}
      className={cn(
        "text-start! relative overflow-hidden cursor-pointer group",
        "w-[91vw] lg:w-[325px] h-auto lg:h-[528px]",
        "transition-all duration-300"
      )}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col h-full">
        <div className="relative w-full h-[241px] overflow-hidden">
          <Image
            src={item.imgSrc}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="mt-[45px] text-lg text-black/40">{item.date}</div>
          <div className="text-black text-[22px] font-bold tracking-[-0.44]">
            {item.title}
          </div>
          <p className="text-black text-xl tracking-[-0.4] line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden gap-4 bg-white">
        <div className="relative w-[120px] h-[120px] shrink-0 overflow-hidden">
          <Image
            src={item.imgSrc}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="text-sm text-black/40">{item.date}</div>
          <div className="text-black text-base font-bold tracking-[-0.32] line-clamp-2">
            {item.title}
          </div>
        </div>
      </div>
    </button>
  );

  if (item.link) {
    return (
      <Link href={item.link} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default function BlogSection() {
  return (
    <div className="relative w-full min-h-screen bg-[#f5f5f5] lg:bg-white flex items-center justify-center py-16 lg:py-0">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <SectionLabel variant="blue" />
        <div className="mt-8 text-[24px] lg:text-5xl font-light text-black">
          비뇨기과 의원 <span className="font-semibold">블로그</span>
        </div>
        <div className="mt-20 hidden lg:flex items-center gap-5">
          {contentData.map((item, index) => (
            <ContentCard key={index} item={item} />
          ))}
          <a
            href={blogButtonData.link}
            target="blog"
            className={cn(
              "relative overflow-hidden cursor-pointer group",
              "w-[325px] h-[528px]",
              "transition-all duration-300"
            )}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={blogButtonData.imgSrc}
                alt={blogButtonData.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-8 pt-11 text-[20px]">
                <div className="text-white/90 leading-8">
                  {blogButtonData.description}
                </div>
                <button className="bg-white/30 backdrop-blur-md py-1">
                  블로그 더 보러가기 +
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="lg:hidden w-[90vw]">
        <SectionLabel variant="blue" size="sm" />
        <div className="mt-4 text-[24px] lg:text-5xl font-light text-black">
          비뇨기과 의원 <span className="font-semibold">블로그</span>
        </div>
        <div className="mt-8 flex lg:hidden flex-col gap-[25px]">
          {contentData.map((item, index) => (
            <ContentCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
