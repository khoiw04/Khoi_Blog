import type { useGetTranslations } from '@/i18n';
import type { getFilteredBlog, getSortedVietnamBlog } from '@/lib';
import { getCollection } from 'astro:content';
import { ui } from "@/i18n"

// Hooks
async function getBlogPosts() {
  return await getCollection('blog');
}

export type postBlogCollection = Awaited<ReturnType<typeof getBlogPosts>>
export type useGetTranslationsType = ReturnType<typeof useGetTranslations>
export type getSortedBlogType = ReturnType<typeof getSortedVietnamBlog>
export type getFilteredBlogType = ReturnType<typeof getFilteredBlog>

export type langKeyType = keyof typeof ui