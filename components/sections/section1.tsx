"use client";
import { cn } from "@/utils/default";
import CheckIcon from "../icons/check-icon";
import { useStaggeredAnimation } from "@/utils/useScrollAnimation";
import { useLazyBackground } from "@/utils/useLazyBackground";

export default function Introduction() {
  const merits = [
    "서울병원 출신 대표원장",
    "비뇨기과 18년 경력",
    "14만건 임상경험",
  ];
  const benefits = [
    "당일 검사, 당일 치료 및 수술",
    "충분한 상담, 꼭 필요한 치료만 진행",
    "환자분들의 편안한 진료만을 생각한 동선 설계 인테리어",
    "대학병원과 동일한 수준의 검사 시스템",
    "1:1 개인상태별 관리 시스템",
  ];

  const { containerRef, visibleItems } = useStaggeredAnimation(6, {
    threshold: 0.2,
    staggerDelay: 150,
    triggerOnce: false,
  });

  const { elementRef: bgRef, isLoaded } = useLazyBackground(
    "/img/section/main-2-bg.avif"
  );

  return (
    <div
      ref={bgRef}
      className={cn(
        "min-h-full w-full flex items-center relative",
        "bg-center bg-no-repeat",
        "bg-size-[auto_75%] bg-position-[75%_100%] lg:bg-cover",
        "text-white"
      )}
      style={{
        backgroundImage: isLoaded
          ? "url(/img/section/main-2-bg.avif)"
          : "none",
      }}
    >
      {/* 텍스트 가시성 확보를 위한 오버레이 */}
      <div className="lg:invisible absolute inset-0 bg-linear-to-b from-black from-15% to-transparent pointer-events-none" />

      <div
        ref={containerRef}
        className="w-full px-4 lg:pl-[280px] relative z-10"
      >
        <div
          className={cn(
            "fade-in-up-on-scroll text-[14px] lg:text-2xl font-light leading-5 lg:leading-8",
            visibleItems[0] && "visible"
          )}
        >
          <span className="lg:block">
            {merits[0]}
            <span className="lg:hidden">, </span>
          </span>
          <span>
            {merits[1]}
            <span>, </span>
          </span>
          <br className="lg:hidden" />
          <span>{merits[2]} 임상경험을 보유한 비뇨기과의원</span>
        </div>
        <div
          className={cn(
            "fade-in-up-on-scroll mt-5 lg:mt-2.5 text-[20px] lg:text-[50px] leading-tight",
            visibleItems[1] && "visible"
          )}
        >
          14년동안 유지중인{" "}
          <span className="font-semibold">서울지역 환자사랑, 愛</span>
        </div>

        {/* Desktop version with manual breaks */}
        <div
          className={cn(
            "hidden lg:block fade-in-up-on-scroll mt-7 lg:text-xl break-keep leading-8",
            visibleItems[2] && "visible"
          )}
        >
          "국내 최고의 병원에서 비뇨기과를 전공한 후, 연고도 없는 서울로 내려와
          <br />
          지역민들과 함께 울고 웃으며 진료한 지 어느덧 14년이 되었습니다.
          <br />
          비뇨기과의원은 그동안 환자분들께 불편한 몸의 회복뿐만 아니라,
          <br />
          이곳에 오길 잘했다는 흐뭇한 마음과 좋은 경험을 드리고자 항상 최선을
          다해왔습니다."
        </div>

        {/* Mobile version with single break */}
        <div
          className={cn(
            "lg:hidden fade-in-up-on-scroll mt-8 text-[14px] break-keep leading-6",
            visibleItems[2] && "visible"
          )}
        >
          "국내 최고의 병원에서 비뇨기과를 전공한 후, 연고도 없는 서울로 내려와
          지역민들과 함께 울고 웃으며 진료한 지 어느덧 14년이 되었습니다.
          <br />
          비뇨기과의원은 그동안 환자분들께 불편한 몸의 회복뿐만 아니라, 이곳에
          오길 잘했다는 흐뭇한 마음과 좋은 경험을 드리고자 항상 최선을
          다해왔습니다."
        </div>

        <div
          className={cn(
            "hidden lg:block fade-in-up-on-scroll mt-12 lg:mt-20 font-bold text-2xl lg:text-[32px]",
            visibleItems[3] && "visible"
          )}
        >
          비뇨기과의원은 믿음을 드리기 위해 노력하겠습니다.
        </div>
        <hr
          className={cn(
            "hidden lg:block fade-in-up-on-scroll mt-4 w-3/4 lg:w-1/2 border-white/20",
            visibleItems[4] && "visible"
          )}
        />
        <ul
          className={cn(
            "fade-in-up-on-scroll mt-30 lg:mt-14 space-y-3 lg:space-y-4 text-[14px] lg:text-[22px]",
            visibleItems[5] && "visible"
          )}
        >
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-1.5 lg:gap-3">
              <CheckIcon className="shrink-0 text-white mr-2 lg:mr-3 mt-0.5 size-3 lg:size-4" />
              <span className="break-keep">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
