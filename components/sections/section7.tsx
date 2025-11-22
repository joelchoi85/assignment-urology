"use client";
import { useStaggeredAnimation } from "@/utils/useScrollAnimation";
import { cn } from "@/utils/default";
import SectionLabel from "../section-label";

const greeting = `우리나라 최고의 병원에서 비뇨기과라는 생소한 학문을 전공하고 연고도 없고 태어나 한 번도 방문한 적이 없었던 서울로 내려와 지역민들과 함께 울고 함께 웃으며 진료한 지 어느덧 14년째를 보내고 있습니다.

저를 비롯하여 삼성비뇨기과 직원 모두가 환자분들께 불편한 몸의 회복뿐만 아니라 이곳에 오길 잘했다는 흐뭇한 마음과 좋은 경험을 드리고자 노력해 온 짧지 않은 시간이었습니다.

그동안 감사하게도 14만 여명 이상의 많은 환자분들이 우리 병원을 찾아주셔서 협소한 공간 문제를 해결하기 위해 2년 전 현 위치로 병원을 확장, 이전하여 진료 중이고 양질의 서비스를 제공하고자 각고의 노력을 기울이고 있습니다.

앞으로도 환자 한 분 한 분께 최선의 진료로 임할 것을 약속드리며,
환절기 건강 유의하시고 행복한 하루 되시기를 바랍니다. 감사합니다.`;
export default function MainChiefIntroduction() {
  const { containerRef, visibleItems } = useStaggeredAnimation(6, {
    threshold: 0.2,
    staggerDelay: 150,
    triggerOnce: false,
  });

  return (
    <div className="relative w-full h-screen bg-[url(/img/section/main-07-bg.webp)] bg-contain bg-no-repeat bg-top lg:bg-cover lg:bg-center scale-x-[-1] lg:scale-x-100">
      <div className="visible lg:invisible absolute top-0 left-0 w-screen h-screen bg-linear-to-b from-transparent from-20% to-25% to-black"></div>
      <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-5/9 pt-[70px] lg:pt-[220px] w-[90vw] lg:w-1/2 scale-x-[-1] lg:scale-x-100">
        <div ref={containerRef} className="flex flex-col mb-20">
          <SectionLabel
            className={cn(
              "fade-in-up-on-scroll mb-4 lg:mb-6",
              visibleItems[0] && "visible"
            )}
            variant="white"
          />
          <div
            className={cn(
              "fade-in-up-on-scroll font-light text-base lg:text-[28px]",
              visibleItems[1] && "visible"
            )}
          >
            서울병원 전문의 출신
          </div>
          <div
            className={cn(
              "fade-in-up-on-scroll lg:mt-3 text-5xl font-light text-[24px] lg:text-[56px]",
              visibleItems[2] && "visible"
            )}
          >
            <span className="font-semibold">가원장</span>
            <span className="pl-2">대표 원장</span>
            <span className="font-semibold pl-2">인사말</span>
          </div>
          <div
            className={cn(
              "hidden lg:block fade-in-up-on-scroll mt-30 font-bold text-[22px]",
              visibleItems[3] && "visible"
            )}
          >
            비뇨기과의원 병원장 인사말
          </div>
          <hr
            className={cn(
              "hidden lg:block fade-in-up-on-scroll mt-6 border-white/20",
              visibleItems[4] && "visible"
            )}
          />
          {/* prettier-ignore */}
          <div className={cn("fade-in-up-on-scroll mt-30 lg:mt-6 lg:w-[600px] whitespace-pre-line break-keep text-[14px] lg:text-[18px] leading-6 lg:leading-8", visibleItems[5] && "visible")}>{greeting}</div>
        </div>
      </div>
    </div>
  );
}
