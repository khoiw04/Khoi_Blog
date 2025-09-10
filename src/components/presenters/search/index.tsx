import {
  ArrowUpRightIcon,
  SearchIcon,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import type { SearchTypeProps } from "@/types/ui/Search"
import { tagsObj } from "@/data/tags"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Component({ posts }: SearchTypeProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant='ghost'
        className="translate-x-1/8"
        onClick={() => setOpen(true)}
      >
        <SearchIcon
          size={16}
          aria-hidden="true"
        />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Tìm thông tin..." />
        <CommandList>
          <CommandEmpty>Không thấy thông tin.</CommandEmpty>
          <CommandGroup heading="Lập Trình">
            {tagsObj.map((tag, i) => (
              <a key={`tags_${i}`} href={`/tag/${tag.name.toLowerCase()}`}>
                <CommandItem>
                    <tag.icon
                      size={16}
                      aria-hidden="true"
                      className="opacity-60"
                    />
                    <span>{tag.name}</span>
                </CommandItem>
              </a>
            ))}
          </CommandGroup>
          <CommandGroup heading="Bài Viết">
            {posts.map((post, i) => (
              <a href={`/blog/${post.id}/`} key={`blog_${i}`}>
                <CommandItem>
                    <ArrowUpRightIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                    <span>{post.data.title}</span>
                </CommandItem>
              </a>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
