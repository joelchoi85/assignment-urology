"use client";
import { cn } from "@/utils/default";
import MenuButton from "../header-menu-anchor";
import Logo from "../logo";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Submenu {
  title: string;
  link: string;
}

interface MenuItem {
  title: string;
  link: string;
  submenu?: Submenu[];
}

const menu: MenuItem[] = [
  {
    title: "비뇨기과의원",
    link: "about",
    submenu: [
      {
        title: "인사말",
        link: "/about/greeting",
      },
      {
        title: "의료진소개",
        link: "/about/chief",
      },
      {
        title: "병원 둘러보기",
        link: "/about/building",
      },
      {
        title: "블로그",
        link: "/about/blog",
      },
    ],
  },
  { title: "요로결석", link: "/subjects/stone" },
  { title: "정관수술", link: "/subjects/vasectomy" },
  {
    title: "남성수술",
    link: "/subjects/circumcision",
    submenu: [
      {
        title: "포경수술",
        link: "",
      },
      {
        title: "링.필러 수술",
        link: "",
      },
      {
        title: "발기부전 수술",
        link: "",
      },
      {
        title: "남성 음경확대 수술",
        link: "",
      },
      {
        title: "남성 귀두확대 수술",
        link: "",
      },
    ],
  },
  {
    title: "여성 요실금 수술",
    link: "/subjects/incontinence",
  },
  {
    title: "남성비뇨기과",
    link: "/subjects/male",
    submenu: [
      {
        title: "전립선",
        link: "",
      },
      {
        title: "남성갱년기",
        link: "",
      },
      {
        title: "요도염(임질)",
        link: "",
      },
      {
        title: "산전검사",
        link: "",
      },
      {
        title: "남성불임",
        link: "",
      },
    ],
  },
  {
    title: "여성비뇨기과",
    link: "/subjects/female",
    submenu: [
      {
        title: "방광염",
        link: "",
      },
      {
        title: "과민성 방광",
        link: "",
      },
    ],
  },
  {
    title: "고객센터",
    link: "",
    submenu: [
      {
        title: "온라인 상담",
        link: "",
      },
      {
        title: "오시는 길",
        link: "",
      },
      {
        title: "공지사항",
        link: "",
      },
      {
        title: "비급여 안내",
        link: "",
      },
    ],
  },
];

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenuIndices, setOpenSubmenuIndices] = useState<Set<number>>(
    new Set()
  );
  const [enableBlur, setEnableBlur] = useState(false);
  const pathname = usePathname();

  // LCP 이후 blur 활성화 (모바일은 더 늦게)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const delay = isMobile ? 500 : 100;

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setTimeout(() => setEnableBlur(true), delay);
      });
    } else {
      setTimeout(() => setEnableBlur(true), delay);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at the top
      if (currentScrollY < prevScrollY || currentScrollY < 50) {
        setIsHeaderVisible(true);
      }
      // Hide header when scrolling down (only on mobile)
      else if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }

      setPrevScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    // Initial call
    handleScroll();

    // Listen to window scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
    setOpenSubmenuIndices(new Set());
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isScrolledPast768 = scrollY > 768;
  const shouldUseColorTheme =
    isHovered || isScrolledPast768 || pathname !== "/";

  const toggleSubmenu = (index: number) => {
    setOpenSubmenuIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <>
      <header
        className={cn(
          "fixed z-50 w-full",
          "h-12 md:h-25",
          "border-b",
          enableBlur && "backdrop-blur-md",
          "transition-all duration-300",
          isHovered && "drop-shadow-lg drop-shadow-black/10",
          shouldUseColorTheme || isMobileMenuOpen
            ? "bg-white border-black/5 text-black"
            : "border-white",
          // 모바일에서 아래로 스와이프시 메뉴바 숨김
          !isHeaderVisible &&
            !isMobileMenuOpen &&
            "md:translate-y-0 -translate-y-full"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            "mx-auto max-w-[1920px] h-full",
            "flex justify-between items-center",
            "px-6 md:px-[220px_196px]"
          )}
        >
          <Logo
            alt="비뇨기과"
            variant={
              shouldUseColorTheme || isMobileMenuOpen ? "color" : "white"
            }
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex group gap-[clamp(12px,2vw,36px)] justify-between items-center">
            {menu.map((menuItem, index) => (
              <MenuButton
                key={`menu${index}`}
                link={menuItem.link}
                title={menuItem.title}
                submenu={menuItem.submenu}
                className={cn(
                  "flex gap-1 items-center",
                  "transition-all duration-150 ease-in-out",
                  "text-[clamp(14px,1vw,18px)] text-left"
                )}
              />
            ))}
          </nav>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden p-3 pr-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-[#154c94]" />
            ) : (
              <Menu
                size={24}
                className={shouldUseColorTheme ? "text-black" : "text-white"}
              />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden px-7.5",
          "bg-white",
          "transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: "var(--header-height, 25px)" }}
      >
        <nav className="mt-10 h-full overflow-y-auto">
          <ul className="">
            {menu.map((menuItem, index) => {
              const hasSubmenu =
                menuItem.submenu && menuItem.submenu.length > 0;
              const isSubmenuOpen = openSubmenuIndices.has(index);

              return (
                <li key={index} className=" border-b border-black/10">
                  <div className="py-4 ">
                    {hasSubmenu ? (
                      <button
                        onClick={() => toggleSubmenu(index)}
                        className="w-full flex items-center justify-between text-left text-black"
                      >
                        <span className="text-xl font-medium ">
                          {menuItem.title}
                        </span>
                        <ChevronDown
                          size={28}
                          className={cn(
                            "transition-transform duration-300 text-black/70 stroke-1",
                            isSubmenuOpen && "rotate-180"
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={menuItem.link}
                        className="block text-black text-xl font-medium"
                      >
                        {menuItem.title}
                      </Link>
                    )}

                    {/* Submenu Dropdown */}
                    {hasSubmenu && (
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out font-light",
                          isSubmenuOpen ? "max-h-96" : "max-h-0"
                        )}
                      >
                        <ul className="py-3">
                          {menuItem.submenu?.map((subItem, subIndex) =>
                            subItem.title ? (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.link}
                                  className="block px-2 py-[5px] text-black/80 text-[16px] hover:bg-gray-100 transition-colors"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ) : null
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsMobileMenuOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="메뉴 닫기"
          style={{ top: "var(--header-height, 100px)" }}
        />
      )}
    </>
  );
}
