import { Button } from "@/components/ui/button";
import type { DropdownHeaderType } from "@/types";
import {
  LucideFolderArchive,
  LucideHouse,
  LucidePaperclip,
  LucideRss,
} from "lucide-react";
import { languages } from "@/i18n";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { getLocaleUrl } from "@/lib/utils";

export default function DropdownMenuHeader({
  configTranslations,
  currentPath,
}: DropdownHeaderType) {
  const [open, setOpen] = useState<boolean>(false);
  const MENU_NAV = [
    {
      id: "home",
      path: `/${configTranslations.lang}`,
      label: configTranslations.navhome,
      Icon: LucideHouse,
    },
    {
      id: "blog",
      path: `/${configTranslations.lang}/blog`,
      label: configTranslations.navblog,
      Icon: LucideRss,
    },
    {
      id: "about",
      path: `/${configTranslations.lang}/about`,
      label: configTranslations.navabout,
      Icon: LucideFolderArchive,
    },
  ];

  return (
    <div className="flex flex-row items-center">
      <Button
        className="group **:transition-none **:group-hover:transition-all"
        variant="ghost"
        size="icon"
        onMouseDown={() => setOpen((prevState) => !prevState)}
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
        <ul className="relative flex flex-row gap-2 text-sm h-5 translate-y-0.25 translate-x-2">
          {MENU_NAV.map((item) => (
            <li key={item.id}>
              <a href={item.path} className="hover:underline">
                {item.label}
              </a>
            </li>
          ))}
          <Separator orientation="vertical" className="h-3/5" />
          {Object.entries(languages).map(([lang, label]) => (
            <li key={label}>
              <a
                href={`${getLocaleUrl(lang, currentPath)}`}
                className="hover:underline"
              >
                {lang}
              </a>
            </li>
          ))}
          <Separator orientation="vertical" className="h-3/5" />
          <li>
            <a
              href={`/${configTranslations.lang}/form`}
              className="hover:underline"
            >
              Form
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
