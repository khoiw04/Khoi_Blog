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
import { Button } from "@/components/ui/button"
import type { SearchTypeProps } from "@/types"
import { tagsObj } from "@/data"
import useMenuOpen from "@/components/container/useMenuOpen"

export default function Component({ posts, configTranslations }: SearchTypeProps) {
  const { open, setOpen } = useMenuOpen()

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
        <CommandInput placeholder={configTranslations.searchCMDplaceholder} />
        <CommandList>
          <CommandEmpty>{configTranslations.searchCMDempty}</CommandEmpty>
          <CommandGroup heading={configTranslations.searchCMDcode}>
            {tagsObj.map((tag, i) => (
              <a key={`tags_${i}`} href={`/${configTranslations.lang}/tag/${tag.name.toLowerCase()}`}>
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
          <CommandGroup heading={configTranslations.searchCMDpost}>
            {posts.map((post, i) => (
              <a href={`/${configTranslations.lang}/blog/${post.slug}`} key={`blog_${i}`}>
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
