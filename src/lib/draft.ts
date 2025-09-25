import { themeConfig } from '@/config'
import type { alltagsEnum } from '@/data'
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
    .filter(post => themeConfig.post.filterDev ? !post.data.dev : true)
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
    .filter(post => themeConfig.post.filterDev ? !post.data.dev : true)
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

export async function getSortedVietnamTag(capitalizedTag: typeof alltagsEnum[number]) {
  const blog = await getSortedVietnamBlog()
  return blog.filter(post => post.data.tags?.includes(
    capitalizedTag)
  )
}

export async function getSortedEnglishTag(capitalizedTag: typeof alltagsEnum[number]) {
  const blog = await getSortedEnglishBlog()
  return blog.filter(post => post.data.tags?.includes(
    capitalizedTag)
  )
}