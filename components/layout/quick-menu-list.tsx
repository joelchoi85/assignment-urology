"use client";
import { cn } from "@/utils/default";
import Image from "next/image";

const menuList = [
  {
    title: "phone",
    icon: "/img/phone-icon.svg",
    description: "041.578.5875",
    link: "tel:+82415785875",
  },
  {
    title: "online",
    icon: "/img/online-icon.svg",
    description: "온라인 상담",
    link: "https://pf.kakao.com/_UyxjPs",
  },
  {
    title: "kakao",
    icon: "/img/kakaotalk-icon.svg",
    description: "카카오톡",
    link: "/consultation",
  },
  {
    title: "blog",
    icon: "/img/blog-icon.svg",
    description: "네이버 블로그",
    link: "https://blog.naver.com/wjdwhddms39707",
  },
];
export default function QuickMenuList() {
  return (
    <div
      className={cn(
        "fixed right-5 lg:right-1/2 bottom-5 lg:top-1/2",
        "lg:-translate-x-[calc(60px-100vw/2)] lg:-translate-y-1/2",
        "flex flex-col items-end gap-[7px] lg:gap-5",
        "z-30"
      )}
    >
      {menuList.map((menuItem, index) => (
        <a
          key={`dot_${index}`}
          href={menuItem.link}
          className={cn(
            "transition-all duration-300 ease-in-out",
            "flex justify-center items-center",
            "rounded-full h-[60px]",
            "bg-[#154c94]",
            "group overflow-hidden",
            "w-10 h-10 lg:h-[60px] lg:w-[60px] hover:w-auto hover:px-6 hover:gap-3"
          )}
        >
          <Image
            src={menuItem.icon}
            alt={menuItem.description}
            width={36}
            height={36}
            className={cn(
              "shrink-0 transition-all duration-300",
              index % 2 === 0 ? "size-6 lg:size-8" : "size-[22px] lg:size-9"
            )}
          />
          <div
            className={cn(
              "transition-all duration-300 ease-in-out",
              "text-2xl font-bold text-white whitespace-nowrap",
              "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
            )}
          >
            {menuItem.description}
          </div>
        </a>
      ))}
      <button
        className={cn(
          "relative",
          "flex justify-center items-center",
          "rounded-full w-10 h-10 lg:h-[60px] lg:w-[60px]",
          "bg-[#0b2a53]",
          "text-[11px] lg:text-sm font-bold"
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="mb-0.5 lg:mb-2">TOP</span>
        <Image
          src="/img/top-icon.svg"
          alt="맨 위로"
          width={14}
          height={14}
          className="absolute bottom-0 size-3.5"
        />
      </button>
    </div>
  );
}
