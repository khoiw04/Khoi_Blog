import { Button } from "@/components/ui/button";
import type { DropdownHeaderType } from "@/types";
import { LucideFolderArchive, LucideHouse, LucideRss } from "lucide-react";
import { languages } from "@/i18n";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { getLocaleUrl } from "@/lib/utils";
import tippy from "tippy.js";

export default function DropdownMenuHeader({
  configTranslations,
  currentPath,
}: DropdownHeaderType) {
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("isMenuOpen");
      if (savedState !== null) {
        return JSON.parse(savedState);
      }
    }
    return false;
  });

  const MENU_NAV = [
    {
      id: "home",
      path: `/${configTranslations.lang}`,
      label: configTranslations.navhome,
      description: configTranslations.tooltipNavbarHome,
      Icon: LucideHouse,
    },
    {
      id: "blog",
      path: `/${configTranslations.lang}/blog`,
      label: configTranslations.navblog,
      description: configTranslations.tooltipNavbarBlog,
      Icon: LucideRss,
    },
    {
      id: "about",
      path: `/${configTranslations.lang}/about`,
      label: configTranslations.navabout,
      description: configTranslations.tooltipNavbarAbout,
      Icon: LucideFolderArchive,
    },
  ];

  useEffect(() => {
    localStorage.setItem("isMenuOpen", JSON.stringify(open));
  }, [open]);

  useEffect(() => {
    tippy(".react-tooltip", {
      content: (reference: Element) => reference.getAttribute("title") || "",
    });
  }, [open]);

  return (
    <div className="hidden md:flex flex-row items-center">
      <Button
        className="group **:transition-none **:group-hover:transition-all"
        variant="ghost"
        size="icon"
        onClick={() => setOpen((prevState) => !prevState)}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg
          className="pointer-events-none text-accent-foreground"
          width={10}
          height={10}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
          />
          <path
            d="M4 12H20"
            className="origin-center duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
          />
          <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
          />
        </svg>
      </Button>
      {open && (
        <ul className="pl-[-1.6rem] relative flex flex-row gap-2 text-sm h-5 items-center translate-x-2">
          {MENU_NAV.map((item) => (
            <li key={item.id}>
              <a
                href={item.path}
                title={item.description}
                className="hover:underline react-tooltip px-4"
              >
                {item.label}
              </a>
            </li>
          ))}
          <Separator orientation="vertical" className="h-3/5" />
          {Object.entries(languages).map(([lang, label]) => {
            const translationKey = `tooltipNavbar${lang.toUpperCase()}`;
            const tooltipText = configTranslations[translationKey];

            return (
              <li key={lang}>
                <a
                  href={getLocaleUrl(lang)}
                  title={tooltipText}
                  className="hover:underline react-tooltip px-4"
                  data-lang={lang}
                >
                  {lang.toUpperCase()}
                </a>
              </li>
            );
          })}
          <Separator orientation="vertical" className="h-3/5" />
          <li>
            <a
              href={`/${configTranslations.lang}/form`}
              title={configTranslations.tooltipNavbarForm}
              className="hover:underline react-tooltip px-4"
            >
              Send
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
