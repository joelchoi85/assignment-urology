import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { cn } from "@/utils/default";

interface ErrorLayoutProps {
  errorCode: string;
  title: string;
  description: string;
  actionButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  children?: React.ReactNode;
}

export default function ErrorLayout({
  errorCode,
  title,
  description,
  actionButton,
  children,
}: ErrorLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center px-4 py-20">
          <div className="mb-8">
            <div className="text-[#154c94] text-9xl font-light mb-4">
              {errorCode}
            </div>
            <h1 className="text-4xl font-light text-gray-800 mb-2">{title}</h1>
            <p className="text-xl text-gray-600 mb-8">{description}</p>
          </div>

          <div className="space-y-4">
            {actionButton && (
              <>
                {actionButton.href ? (
                  <a
                    href={actionButton.href}
                    className={cn(
                      "inline-block px-8 py-4 bg-[#154c94] text-white rounded-lg",
                      "hover:bg-[#0d3a6f] transition-colors duration-300",
                      "font-medium text-lg"
                    )}
                  >
                    {actionButton.text}
                  </a>
                ) : (
                  <button
                    onClick={actionButton.onClick}
                    className={cn(
                      "px-8 py-4 bg-[#154c94] text-white rounded-lg",
                      "hover:bg-[#0d3a6f] transition-colors duration-300",
                      "font-medium text-lg"
                    )}
                  >
                    {actionButton.text}
                  </button>
                )}
              </>
            )}
            <div className="mt-4">
              <a href="/" className="text-[#154c94] hover:underline text-lg">
                메인 페이지로 돌아가기
              </a>
            </div>
          </div>

          {children}

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
      <Footer />
    </div>
  );
}
