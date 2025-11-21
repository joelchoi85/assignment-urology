import ErrorLayout from "./error-layout";

export default function Error403() {
  return (
    <ErrorLayout
      errorCode="403"
      title="접근 권한이 없습니다"
      description="요청하신 페이지에 접근할 수 있는 권한이 없습니다."
      actionButton={{
        text: "메인으로 이동",
        href: "/",
      }}
    >
      <div className="mt-12 max-w-md mx-auto text-left bg-amber-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">
          🔒 접근이 제한된 페이지입니다
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• 로그인이 필요한 페이지일 수 있습니다</li>
          <li>• 관리자 전용 페이지일 수 있습니다</li>
          <li>• 잘못된 경로로 접근하셨을 수 있습니다</li>
          <li>• 도움이 필요하시면 고객센터로 문의해주세요</li>
        </ul>
      </div>
    </ErrorLayout>
  );
}
