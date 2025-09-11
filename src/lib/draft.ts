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

export async function getSortedVietnamBlog() {
  const blog = await getSortedFilteredBlog();
  return blog
    .filter(post => post.id.startsWith('vi/'))
    .map(post => {
      const [, ...slugParts] = post.id.split('/');
      const slug = slugParts.join('/');
      return {
        ...post,
        lang: 'vi',
        slug,
      };
    });
}

export async function getSortedEnglishBlog() {
  const blog = await getSortedFilteredBlog();
  return blog
    .filter(post => post.id.startsWith('en/'))
    .map(post => {
      const [, ...slugParts] = post.id.split('/');
      const slug = slugParts.join('/');
      return {
        ...post,
        lang: 'en',
        slug,
      };
    });
}

export async function getSortedVietnamTag(capitalizedTag: typeof tagsEnum[number]) {
  const blog = await getSortedVietnamBlog()
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