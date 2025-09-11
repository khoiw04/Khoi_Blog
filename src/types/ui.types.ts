import type { getSortedBlogType, useGetTranslationsType } from ".";

export type DropdownHeaderType = { 
    configTranslations: useGetTranslationsType, 
    currentPath: string 
}

export type SearchTypeProps = {
    posts: Awaited<getSortedBlogType>; 
    configTranslations: useGetTranslationsType
}

export type ContactPropsFormType = {
    configTranslations: useGetTranslationsType
}

export type HeaderIndexType = {
    configTranslations: useGetTranslationsType
}

export type postsArrayType = { 
    posts: Awaited<getSortedBlogType>
}