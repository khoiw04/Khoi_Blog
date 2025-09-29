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
import { devtagsObj, sciencetagsObj } from "@/data"
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
            {devtagsObj.map((tag, i) => {
              const name = configTranslations.lang === 'vi' ? tag.nameVi : tag.nameEn
              return (
              <a key={`tags_${i}`} href={`/${configTranslations.lang}/tag/${name.toLowerCase()}`}>
                <CommandItem
                  onSelect={() => {
                    window.location.href = `/${configTranslations.lang}/tag/${name.toLowerCase()}`;
                  }}                
                >
                    <tag.icon
                      size={16}
                      aria-hidden="true"
                      className="opacity-60"
                    />
                    <span>{name}</span>
                </CommandItem>
              </a>
            )})}
          </CommandGroup>
          <CommandGroup heading={configTranslations.searchCMDscience}>
            {sciencetagsObj.map((tag, i) => {
              const name = configTranslations.lang === 'vi' ? tag.nameVi : tag.nameEn
              return (
              <a key={`tags_${i}`} href={`/${configTranslations.lang}/tag/${name}`}>
                <CommandItem
                  onSelect={() => {
                    window.location.href = `/${configTranslations.lang}/tag/${name}`;
                  }}                
                >
                    <tag.icon
                      size={16}
                      aria-hidden="true"
                      className="opacity-60"
                    />
                    <span>{name}</span>
                </CommandItem>
              </a>
            )})}
          </CommandGroup>
          <CommandGroup heading={configTranslations.searchCMDpost}>
            {posts.map((post, i) => (
              <a href={`/${configTranslations.lang}/blog/${post.slug}`} key={`blog_${i}`}>
                <CommandItem
                  onSelect={() => {
                    window.location.href = `/${configTranslations.lang}/blog/${post.slug}`;
                  }}
                >
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
