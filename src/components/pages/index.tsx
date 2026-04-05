import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { themeConfig } from "@/config";
import type { HeaderIndexType } from "@/types";
// import { Separator } from "@/components/ui/separator";

export default function HeaderIndex({ configTranslations }: HeaderIndexType) {
  return (
    <section>
      <div className="w-full flex justify-between items-center">
        <div className="text-sm flex flex-row items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="leading-none font-medium">Khoi Nguyen</h4>
            {configTranslations && (
              <p className="text-muted-foreground mb-0!">
                {configTranslations.indexHeaderDescription}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            title="Found inner peace"
            type="button"
            className="bg-accent text-sm h-full px-4 py-1 mb-4 cursor-pointer rounded-full"
          >
            {themeConfig.site.emoji}
          </button>
        </div>
      </div>
      {/*{configTranslations &&
			<>
				<Separator className="my-2" />
				<div className="flex h-6 items-center mt-4 space-x-4 *:cursor-pointer text-sm">
					<a href={`/${configTranslations.lang}/blog`}>
						{configTranslations.navblog}
					</a>
					<Separator orientation="vertical" />
					<a href={`/${configTranslations.lang}/about`}>
						{configTranslations.navabout}
					</a>
					<Separator orientation="vertical" />
					<a href={`/${configTranslations.lang}/form`}>
						{configTranslations.navform}
					</a>
				</div>
			</>
			}*/}
    </section>
  );
}
