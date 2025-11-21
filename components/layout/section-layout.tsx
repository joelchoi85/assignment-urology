import { cn } from "@/utils/default";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}
export default function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative h-screen", className)}
    >
      {children}
    </section>
  );
}
