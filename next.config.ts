import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1년 캐싱
    dangerouslyAllowSVG: false,
  },

  // 번들 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 실험적 기능 - 성능 향상
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // CSS 압축
  compress: true,

  // React Strict Mode
  reactStrictMode: true,

  // PoweredBy 헤더 제거 (보안)
  poweredByHeader: false,

  // Production 최적화
  productionBrowserSourceMaps: false,
};

export default nextConfig;
