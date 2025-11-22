import { cn } from "@/utils/default";
import Image from "next/image";

interface OpacityImageCardProps {
  isInactive?: boolean;
  subject: string;
  englishSubject: string;
  imgSrc: string;
  link?: string;
}
export default function OpacityImageCard({
  isInactive = false,
  subject,
  englishSubject,
  imgSrc,
}: OpacityImageCardProps) {
  return (
    <div className="flex flex-col lg:w-[430px] gap-2.5 lg:gap-5">
      <Image
        src={imgSrc}
        width={430}
        height={180}
        className={cn(
          "rounded-lg transition-opacity duration-500",
          isInactive && "opacity-20"
        )}
        alt={subject + " 이미지"}
      />
      <div className="flex flex-col lg:flex-row lg:gap-5">
        <span className="font-bold text-[18px] lg:text-2xl text-white">
          {subject}
        </span>
        <span className="lg:font-bold text-xs lg:text-xl text-white/30">
          {englishSubject}
        </span>
      </div>
    </div>
  );
}
