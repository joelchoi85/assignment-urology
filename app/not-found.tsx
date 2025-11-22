import { cn } from "@/utils/default";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center bg-linear-to-b from-white to-gray-50">
        <div className="text-center px-4 py-40">
          <div className="mb-8">
            <div className="text-[#154c94] text-9xl font-light mb-4">404</div>
            <h1 className="text-4xl font-light text-gray-800 mb-2">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className={cn(
                "inline-block px-8 py-4 bg-[#154c94] text-white rounded-lg",
                "hover:bg-[#0d3a6f] transition-colors duration-300",
                "font-medium text-lg"
              )}
            >
              메인 페이지로 이동
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a
              href="/about"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-[#154c94] mb-2">
                병원 소개
              </h3>
              <p className="text-gray-600 text-sm">
                비뇨기과의원에 대해 알아보세요
              </p>
            </a>
            <a
              href="/treatment"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-[#154c94] mb-2">
                진료 안내
              </h3>
              <p className="text-gray-600 text-sm">
                진료 과목 및 시간을 확인하세요
              </p>
            </a>
            <a
              href="/consultation"
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-[#154c94] mb-2">
                온라인 상담
              </h3>
              <p className="text-gray-600 text-sm">편리하게 상담 받으세요</p>
            </a>
          </div>

          <div className="mt-12 text-gray-500 text-sm">
            <p>도움이 필요하시면 언제든 연락주세요.</p>
            <p className="mt-2">
              <a href="tel:041-578-5875" className="hover:text-[#154c94]">
                📞 041-578-5875
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
