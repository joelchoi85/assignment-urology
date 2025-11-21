import { cn } from "@/utils/default";

interface SectionLabelProps {
  className?: string;
  variant?: "blue" | "white";
  size?: "sm" | "md";
}

export default function SectionLabel({
  className,
  variant = "white",
  size = "sm",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "tracking-[3.36px]",
        // Size variants
        size === "sm" && "text-[8px] lg:text-xs",
        size === "md" && "text-[10px] lg:text-sm",
        // Color variants
        variant === "blue" && "text-[#154c94]",
        variant === "white" && "text-white",
        className
      )}
    >
      UROLOGY CLINIC
    </div>
  );
}
