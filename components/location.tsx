import Image from "next/image";
import SectionLabel from "./section-label";

export default function Location() {
  return (
    <div className="h-full lg:px-[280px] py-[50px] lg:py-[220px] bg-linear-to-r from-[#0F110F] to-[#252523] lg:bg-transparent">
      <SectionLabel className="text-center" />
      <div className="mt-2 lg:mt-4 mb-16 text-[24px] lg:text-[56px] font-light tracking-[-1.12] text-center">
        비뇨기과의원 <span className="font-semibold">오시는 길</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-[200px]">
        <div>
          {/* 지도 */}
          <div className="w-full aspect-360/228 lg:w-[737px] lg:h-[337px] bg-gray-200 lg:rounded-lg ">
            <Image
              src="/img/map.avif"
              width={737}
              height={337}
              alt="찾아오시는 길"
              className="w-full aspect-360/228 lg:w-[737px] lg:h-[337px]"
            />
          </div>
          <div className="mt-16 space-y-6 lg:space-y-12">
            <div className="flex items-start gap-4">
              <img
                src="/img/map-icon.svg"
                width="37"
                height="37"
                className="hidden lg:block"
              />
              <div className="flex flex-col w-full gap-1 lg:gap-3">
                <div className="text-center lg:text-start text-base lg:text-[24px] font-bold">
                  XX도 XX시 XX구 XX로 000 / XX 타워 X층
                </div>
                <div className="hidden lg:block font-light text-xs lg:text-base">
                  1호선 XX역 1번 출구로 나오신 후, 591m 이동하시면 이마트 대각선
                  건너편 던킨도너츠 건물 2층에 위치
                </div>
                <div className="lg:hidden text-center font-light text-xs lg:text-base">
                  1호선 XX역 1번 출구, 이마트 대각선 건너편 던킨도너츠 건물 2층
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img
                src="/img/parking-icon.svg"
                width="37"
                height="37"
                className="hidden lg:block"
              />
              <div className="flex flex-col w-full gap-3">
                <div className="text-base lg:text-[24px] font-bold text-center lg:text-start">
                  지하주차장 이용 가능
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="lg:hidden w-[90vw] mx-auto border-white/30 my-8" />
        <div className="flex flex-col items-center lg:items-start gap-5 text-base lg:text-[28px] font-bold">
          <div className="w-[75vw] lg:w-[425px] lg:rounded-lg bg-white tracking-[-0.56] text-[18px] lg:text-[28px] text-[#154c94] flex justify-center">
            요로결석 24시간 치료
          </div>
          <div className="flex flex-row items-center">
            <div className="w-16 lg:w-[113px] flex justify-between">
              <span>평</span>
              <span>일</span>
            </div>
            <div className="mx-[65px] bg-[#a0c1ed] w-0.5 h-[22px] "></div>
            <div className="whitespace-nowrap font-light">09:00 ~ 18:30</div>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-16 lg:w-[113px] flex justify-between">
              <span>토</span>
              <span>요</span>
              <span>일</span>
            </div>
            <div className="mx-[65px] bg-[#a0c1ed] w-0.5 h-[22px] "></div>
            <div className="whitespace-nowrap font-light">09:00 ~ 18:30</div>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-16 lg:w-[113px] flex justify-between">
              <span>점</span>
              <span>심</span>
              <span>시</span>
              <span>간</span>
            </div>
            <div className="mx-[65px] bg-[#a0c1ed] w-0.5 h-[22px] "></div>
            <div className="whitespace-nowrap font-light">09:00 ~ 18:30</div>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-16 lg:w-[113px] flex justify-between">
              <span>휴</span>
              <span>무</span>
            </div>
            <div className="mx-[65px] bg-[#a0c1ed] w-0.5 h-[22px] "></div>
            <div className="whitespace-nowrap font-light">일요일 · 공휴일</div>
          </div>
          <hr className="lg:hidden w-[90vw] mx-auto border-white/30 my-8" />

          <div className="mx-auto lg:mx-0 flex flex-col gap-3 lg:gap-6 lg:mt-32 font-normal text-[25px]">
            <div className="flex items-center w-[280px] lg:w-[440px]">
              <div className="hidden lg:block">전화상담</div>
              <div className="hidden lg:block mx-[25px] bg-[#a0c1ed] w-0.5 h-[22px]"></div>
              <img
                src="/img/phone-white.svg"
                width="37"
                height="37"
                className="mr-6 size-[29px] lg:size-[37px]"
              />
              <div className="text-[24px] lg:text-[34px] font-bold flex items-center">
                000.000.0000
              </div>
            </div>
            <div className="flex items-center w-[280px] lg:w-[440px]">
              <div className="hidden lg:block">카톡상담</div>
              <div className="hidden lg:block mx-[25px] bg-[#a0c1ed] w-0.5 h-[22px] "></div>
              <img
                src="/img/kakao-chanel.svg"
                width="37"
                height="37"
                className="mr-6 size-[29px] lg:size-[37px]"
              />
              <div className="text-[24px] lg:text-[34px] font-bold flex items-center">
                비뇨기과의원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
