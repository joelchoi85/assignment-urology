import { cn } from "@/utils/default";

interface SliderIndicatorProps {
  total: number;
  activeIndex: number;
  className?: string;
  onDotClick?: (index: number) => void;
  variant?: "dark" | "light"; // dark: 어두운 배경용 (흰색), light: 밝은 배경용 (회색)
}

export default function SliderIndicator({
  total,
  activeIndex,
  className,
  onDotClick,
  variant = "dark",
}: SliderIndicatorProps) {
  const activeColor = variant === "dark" ? "bg-white" : "bg-[#69696e]";
  const inactiveColor = variant === "dark" ? "bg-white/20" : "bg-[#b9b9bd]";

  return (
    <div className={cn("flex gap-2 items-center", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "h-1 rounded-full transition-all duration-300 ease-in-out",
            index === activeIndex ? `w-6 ${activeColor}` : `w-1 ${inactiveColor}`
          )}
          onClick={() => onDotClick?.(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
