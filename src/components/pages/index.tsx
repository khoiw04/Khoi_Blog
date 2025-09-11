import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { HeaderIndexType } from "@/types"
import { Separator } from "@/components/ui/separator"

export default function HeaderIndex({ configTranslations }: HeaderIndexType) {

	return (
		<section>
			<div className="text-sm flex flex-row items-center gap-4 mb-4">
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>K</AvatarFallback>
				</Avatar>
				<div className="space-y-1">
					<h4 className="leading-none font-medium">
						Khoi Nguyen
					</h4>
					{configTranslations &&
					<p className="text-muted-foreground mb-0!">
						{configTranslations.indexHeaderDescription}
					</p>
					}
				</div>
			</div>
			{configTranslations &&
			<>
				<Separator className="my-2" />
				<div className="flex h-6 items-center mt-4 space-x-4 *:cursor-pointer text-sm">
					<a href={`/${configTranslations.lang}/blog`}>Blog</a>
					<Separator orientation="vertical" />
					<a href={`/${configTranslations.lang}/about`}>About</a>
					<Separator orientation="vertical" />
					<a href={`/${configTranslations.lang}/form`}>Send</a>
				</div>
			</>
			}
		</section>
	)
}
