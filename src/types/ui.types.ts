import type { CollectionEntry } from "astro:content";
import type { postBlogCollection, useGetTranslationsType } from ".";

export type DropdownHeaderType = { 
    configTranslations: useGetTranslationsType, 
    currentPath: string 
}

export type SearchTypeProps = {
    posts: postBlogCollection; 
    configTranslations: useGetTranslationsType
}

export type ContactPropsFormType = {
    configTranslations: useGetTranslationsType
}

export type HeaderIndexType = {
    configTranslations: useGetTranslationsType
}

export type postsArrayType = { 
    posts: Array<CollectionEntry<'blog'>> 
}