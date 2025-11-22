import { cn } from "@/utils/default";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}
export default function Section({ id, className, children }: SectionProps) {
  // 첫 번째 섹션이 아니면 content-visibility 적용
  const isFirstSection = id === "section-1";

  return (
    <section
      id={id}
      className={cn("relative h-screen", className)}
      style={!isFirstSection ? { contentVisibility: "auto" as const } : undefined}
    >
      {children}
    </section>
  );
}
