import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { languages } from "@/i18n/ui"
import { useTranslations } from "@/i18n/utils"
import { getLocaleUrl } from "@/lib/utils"
import type { DropdownHeaderType } from "@/types/ui/Dropdown"
import { LucideFolderArchive, LucideHouse, LucideRss } from "lucide-react"
import { useState } from "react"

export default function DropdownMenuHeader({lang, currentPath}: DropdownHeaderType) {
    const [open, setOpen] = useState<boolean>(false)
    const t = useTranslations(lang)
    const configNav = {
        about: t('nav.about'),
        blog: t('nav.blog'),
        home: t('nav.home'),
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="group  **:transition-none **:group-hover:transition-all"
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
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <a href={`/${lang}`}>
                        <DropdownMenuItem>
                            <LucideHouse />
                            {configNav.home}
                        </DropdownMenuItem>
                    </a>
                    <a href={`/${lang}/blog`}>
                        <DropdownMenuItem>
                            <LucideRss />
                            {configNav.blog}
                        </DropdownMenuItem>
                    </a>
                    <a href={`/${lang}/about`}>
                        <DropdownMenuItem>
                            <LucideFolderArchive />
                            {configNav.about}
                        </DropdownMenuItem>
                    </a>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {Object.entries(languages).map(([lang, label]) => (
                        <a href={`${getLocaleUrl(lang, currentPath)}`}>
                            <DropdownMenuItem>
                                {label}
                            </DropdownMenuItem>
                        </a>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
