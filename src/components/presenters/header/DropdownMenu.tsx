import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideFolderArchive, LucideHouse, LucideRss } from "lucide-react"
import { useState } from "react"

export default function DropdownMenuHeader() {
    const [open, setOpen] = useState<boolean>(false)
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
                    <a href="/">
                        <DropdownMenuItem>
                            <LucideHouse />
                            Home
                        </DropdownMenuItem>
                    </a>
                    <a href="/blog">
                        <DropdownMenuItem>
                            <LucideRss />
                            Blog
                        </DropdownMenuItem>
                    </a>
                    <a href="/about">
                        <DropdownMenuItem>
                            <LucideFolderArchive />
                            Project
                        </DropdownMenuItem>
                    </a>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
