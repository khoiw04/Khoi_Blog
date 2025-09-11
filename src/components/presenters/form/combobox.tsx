import { useState } from "react"
import {
  ChevronDownIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { checkBoxMissionContactVi } from "@/data/formSettings"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Component({ placeholder } : { placeholder: any }) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-transparent! rounded-none hover:bg-background border-t-0 border-input [direction:inherit] transition-[color,box-shadow] w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">
                  {checkBoxMissionContactVi.find((item) => item.name === value)?.name}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">
                {placeholder}
              </span>
            )}
            <input id="type" type="hidden" className='sr-only' name="type" value={value} />
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="center"
        >
          <DropdownMenuGroup>
            {checkBoxMissionContactVi.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onSelect={() => {
                  setValue(item.name === value ? "" : item.name)
                  setOpen(false)
                }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="text-muted-foreground size-4" />
                  {item.name}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
