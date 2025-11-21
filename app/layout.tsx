import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import { cn } from "@/utils/default";
import dynamic from "next/dynamic";

// Footer는 아래에 있으므로 lazy load
const Footer = dynamic(() => import("@/components/layout/footer"), {
  ssr: true,
});

// const jsonLd = {
//   "@context": "https://schema.org",
//   "@type": "MedicalOrganization",
//   name: "비뇨기과",
//   description:
//     "비뇨기과 100년차 비뇨기과 전문의 | 24시간 요로결석, 정관수술, 전립선염, 전립선비대증, 방광염, 요실금, 포경수술, 남성수술, 정액검사",
//   image: "/og_img.png",
// };

export function generateMetadata(): Metadata {
  const title = "스타비뇨기과";
  const description =
    "비뇨기과 60년차 비뇨기과 전문의 | 24시간 요로결석, 정관수술, 전립선염, 전립선비대증, 방광염, 요실금, 포경수술, 남성수술, 정액검사 | 비뇨기과·서울비뇨기과·양재동";
  const ogImage = "/og_img.png";
  const keywords = [
    "비뇨기과",
    "서울비뇨기과",
    "금강산비뇨기과",
    "삼전비뇨기과",
    "조만간비뇨기과",
  ];

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: "https://goodoctor-.com/",
      siteName: "비뇨기과",
      images: [
        {
          url: ogImage,
          width: 1200, // 이미지 실제 너비
          height: 628, // 이미지 실제 높이
          alt: "비뇨기과 로고 및 대표 이미지",
        },
      ],
      locale: "ko_KR", // 언어 설정
      type: "website",
    },

    // favicon 설정
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 주요 이미지 preload */}
        <link
          rel="preload"
          as="image"
          href="/img/main-slide/main-01.webp"
          type="image/webp"
        />
      </head>
      <body
        className={cn(
          // geistSans.variable,
          // geistMono.variable,
          `relative mx-auto antialiased w-full`
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
