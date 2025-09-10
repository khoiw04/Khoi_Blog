import { getCollection } from 'astro:content';

async function getBlogPosts() {
  return await getCollection('blog');
}

export type postBlogCollection = Awaited<ReturnType<typeof getBlogPosts>>