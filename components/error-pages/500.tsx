"use client";

import ErrorLayout from "./error-layout";

interface Error500Props {
  reset?: () => void;
}

export default function Error500({ reset }: Error500Props) {
  return (
    <ErrorLayout
      errorCode="500"
      title="서버 오류가 발생했습니다"
      description="일시적인 서버 문제로 요청을 처리할 수 없습니다. 잠시 후 다시 시도해주세요."
      actionButton={{
        text: reset ? "다시 시도하기" : "새로고침",
        onClick: reset || (() => window.location.reload()),
      }}
    >
      <div className="mt-12 max-w-md mx-auto text-left bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">
          💡 이런 경우 도움이 될 수 있습니다:
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• 페이지를 새로고침 해보세요</li>
          <li>• 잠시 후 다시 시도해보세요</li>
          <li>• 브라우저 캐시를 삭제해보세요</li>
          <li>• 문제가 지속되면 고객센터로 연락주세요</li>
        </ul>
      </div>
    </ErrorLayout>
  );
}
