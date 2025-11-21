import Image from "next/image";

interface LogoProps {
  alt?: string;
  variant?: "white" | "color";
}

export default function Logo({
  alt = "메인 로고",
  variant = "white",
}: LogoProps) {
  const colorOpacity = variant === "color" ? 1 : 0;

  return (
    <a
      href="/"
      className="relative block min-w-[clamp(120px,10vw,202px)] h-[clamp(60px,5vw,100px)]"
    >
      <Image
        src="/logo-white.png"
        width={202}
        height={100}
        alt={alt}
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: 1 - colorOpacity }}
      />
      <Image
        src="/logo-color.png"
        width={202}
        height={100}
        alt={alt}
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: colorOpacity }}
      />
    </a>
  );
}
