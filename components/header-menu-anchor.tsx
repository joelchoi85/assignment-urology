"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/default";
import Link from "next/link";

interface SubmenuProps {
  title: string;
  link: string;
}
interface MenuButtonProps {
  link: string;
  title: string;
  className?: string;
  submenu?: SubmenuProps[];
}
export default function MenuButton({
  link = "#",
  title = "MenuButton",
  className = "",
  submenu = [],
}: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = submenu.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasSubmenu && setIsOpen(true)}
      onMouseLeave={() => hasSubmenu && setIsOpen(false)}
    >
      <Link href={link} className={className}>
        {title}{" "}
        {hasSubmenu && (
          <span
            className={cn(
              "inline-block transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          >
            <ChevronDown size={20} strokeWidth={1.5} strokeOpacity={0.6} />
          </span>
        )}
      </Link>

      {/* Dropdown Menu */}
      {hasSubmenu && (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 top-full",
            "min-w-[200px] pt-12 pb-6",
            "bg-white",
            "transition-all duration-300 ease-in-out",
            "overflow-hidden",
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
          )}
        >
          <ul className="py-2">
            {submenu.map((item, index) =>
              item.title ? (
                <li key={index}>
                  <Link
                    href={item.link}
                    className={cn(
                      "block px-6 py-2",
                      "text-center text-[clamp(13px,0.9vw,15px)] text-black underline-[#154c94]",
                      "hover:text-[#154c94] hover:underline hover:bg-gray-50",
                      "transition-colors duration-150"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
