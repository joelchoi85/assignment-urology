"use client";

import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { cn } from "@/utils/default";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-linear-to-b from-white to-gray-50">
        <div className="text-center px-4 py-20">
          <div className="mb-8">
            <div className="text-[#154c94] text-8xl font-light mb-4">!</div>
            <h1 className="text-4xl font-light text-gray-800 mb-2">
              일시적인 오류가 발생했습니다
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              죄송합니다. 예상치 못한 문제가 발생했습니다.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={reset}
              className={cn(
                "px-8 py-4 bg-[#154c94] text-white rounded-lg",
                "hover:bg-[#0d3a6f] transition-colors duration-300",
                "font-medium text-lg"
              )}
            >
              다시 시도하기
            </button>
            <div className="mt-4">
              <a href="/" className="text-[#154c94] hover:underline text-lg">
                메인 페이지로 돌아가기
              </a>
            </div>
          </div>

          <div className="mt-12 text-gray-500 text-sm">
            <p>문제가 지속될 경우 고객센터로 문의해 주세요.</p>
            <p className="mt-2">
              <a href="tel:+82415785875" className="hover:text-[#154c94]">
                📞 041-578-5875
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
