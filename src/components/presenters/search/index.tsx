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
import type { SearchTypeProps } from "@/types/ui/Search"
import { tagsObj } from "@/data/tags"
import { useTranslations } from "@/i18n/utils"
import useMenuOpen from "@/components/container/useMenuOpen"

export default function Component({ posts, lang }: SearchTypeProps) {
  const { open, setOpen } = useMenuOpen()
  const t = useTranslations(lang)
  const configCMD = {
    placeholder: t('searchCMD.placeholder'),
    code: t('searchCMD.heading.code'),
    post: t('searchCMD.heading.post'),
    empty: t('searchCMD.empty')
  }

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
        <CommandInput placeholder={configCMD.placeholder} />
        <CommandList>
          <CommandEmpty>{configCMD.empty}</CommandEmpty>
          <CommandGroup heading={configCMD.code}>
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
          <CommandGroup heading={configCMD.post}>
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
