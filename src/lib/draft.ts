import type { tagsEnum } from '@/data'
import { getCollection, type CollectionEntry } from 'astro:content'

export async function getFilteredBlog() {
  const blog = await getCollection('blog')
  return blog.filter((post: CollectionEntry<'blog'>) => !post.id.startsWith('_'))
}

export async function getSortedFilteredBlog() {
  const blog = await getFilteredBlog()
  return blog.sort(
    (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}

export async function getSortedVietnameBlog() {
  const blog = await getSortedFilteredBlog()
  return blog.filter(
    post => post.id.startsWith(`vi/`));
}

export async function getSortedEnglishBlog() {
  const blog = await getSortedFilteredBlog()
  return blog.filter(
    post => post.id.startsWith(`en/`));
}

export async function getSortedVietnameTag(capitalizedTag: typeof tagsEnum[number]) {
  const blog = await getSortedVietnameBlog()
  return blog.filter(post => post.data.tags?.includes(
    capitalizedTag)
  )
}

export async function getSortedEnglishTag(capitalizedTag: typeof tagsEnum[number]) {
  const blog = await getSortedEnglishBlog()
  return blog.filter(post => post.data.tags?.includes(
    capitalizedTag)
  )
}