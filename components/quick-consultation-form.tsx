"use client";

import { cn } from "@/utils/default";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const genderOptions = [
  { value: "", label: "성별구분" },
  { value: "male", label: "남성" },
  { value: "female", label: "여성" },
];

const consultationFields = [
  { value: "", label: "상담분야" },
  { value: "비뇨기과의원", label: "비뇨기과의원" },
  { value: "요로결석", label: "요로결석" },
  { value: "정관수술", label: "정관수술" },
  { value: "남성수술", label: "남성수술" },
  { value: "여성 요실금 수술", label: "여성 요실금 수술" },
  { value: "남성비뇨기과", label: "남성비뇨기과" },
  { value: "여성비뇨기과", label: "여성비뇨기과" },
];

export default function QuickConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    field: "",
    phone: "",
    privacyAgreed: false,
    termsAgreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAgreed || !formData.termsAgreed) {
      alert("개인정보 수집 및 이용약관에 동의해주세요.");
      return;
    }

    console.log("Form submitted:", formData);
    // TODO: 실제 제출 로직 구현
  };

  return (
    <div
      className={cn(
        "hidden lg:block fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-[70px]",
        "pt-[13px] px-70 pb-3",
        "border border-[#e1e1e3] border-solid bg-[#F4F6F6] z-50",
        "text-black text-base"
      )}
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-8 *:placeholder:text-black"
      >
        {/* 이름 */}
        <input
          type="text"
          placeholder="이름"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="md:min-w-40 h-8 px-2 text-sm border-b border-gray-300"
          required
        />

        {/* 성별 */}
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="md:min-w-40 h-8 px-2 text-sm border-b border-gray-300"
          required
        >
          {genderOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.value.length === 0}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* 상담분야 */}
        <select
          value={formData.field}
          onChange={(e) => setFormData({ ...formData, field: e.target.value })}
          className="md:min-w-40 h-8 px-2 text-sm border-b border-gray-300"
          required
        >
          {consultationFields.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.value.length === 0}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* 연락처 */}
        <input
          type="tel"
          placeholder="연락처 (숫자만 입력)"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
          className="md:min-w-40 h-8 px-2 text-sm border-b border-gray-300"
          required
        />

        {/* 동의 체크박스 */}
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex gap-2.5">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                className="size-[17px] accent-blue-900"
                checked={formData.privacyAgreed}
                onChange={(e) =>
                  setFormData({ ...formData, privacyAgreed: e.target.checked })
                }
                required
              />
              <span>
                개인정보 수집 및 이용동의{" "}
                <span className="text-[#154c94]">(필수)</span>
              </span>
            </label>
            <button
              className="flex flex-row text-[#999] text-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert("약관 페이지로");
              }}
            >
              약관보기 &gt;
            </button>
          </div>
          <div className="flex gap-2.5">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                className="size-[17px] accent-blue-900"
                checked={formData.termsAgreed}
                onChange={(e) =>
                  setFormData({ ...formData, termsAgreed: e.target.checked })
                }
                required
              />
              <span>
                이용약관 동의 <span className="text-[#154c94]">(필수)</span>
              </span>
            </label>
            <button
              className="flex flex-row text-[#999] text-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert("약관 페이지로");
              }}
            >
              약관보기 &gt;
            </button>
          </div>
        </div>

        {/* 신청 버튼 */}
        <button
          type="submit"
          className="w-[205px] h-[45px] px-4 text-lg font-semibold text-white bg-[#154c94] rounded hover:bg-[#1e4070] transition-colors"
        >
          빠른 상담 신청
        </button>
      </form>
    </div>
  );
}
