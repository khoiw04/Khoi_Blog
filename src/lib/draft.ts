import { themeConfig } from "@/config";
import type { alltagsEnum } from "@/data";
import type { TOCSection } from "@/types";
import { getCollection, render, type CollectionEntry } from "astro:content";

export function isSubpost(postId: string): boolean {
  return postId.includes("/");
}

export function getParentId(subpostId: string): string {
  return subpostId.split("/")[0];
}

export async function getFilteredBlog() {
  const blog = await getCollection("blog");
  return blog.filter(
    (post: CollectionEntry<"blog">) => !post.id.startsWith("_"),
  );
}

export async function getSortedFilteredBlog() {
  const blog = await getFilteredBlog();
  return blog.sort(
    (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getSortedVietnamBlog({
  pin = false,
}: { pin?: boolean } = {}) {
  const blog = await getSortedFilteredBlog();
  return blog
    .filter((post) => post.id.startsWith("vi/"))
    .filter((post) => !post.id.startsWith("vi/_"))
    .filter((post) =>
      themeConfig.post.filterDev && import.meta.env.PROD
        ? !post.data.dev
        : true,
    )
    .map((post) => {
      const [, ...slugParts] = post.id.split("/");
      const slug = slugParts.join("/");
      return {
        ...post,
        lang: "vi",
        slug,
      };
    });
}

export async function getSortedEnglishBlog() {
  const blog = await getSortedFilteredBlog();
  return blog
    .filter((post) => post.id.startsWith("en/"))
    .filter((post) => !post.id.startsWith("en/_"))
    .filter((post) => (themeConfig.post.filterDev ? !post.data.dev : true))
    .map((post) => {
      const [, ...slugParts] = post.id.split("/");
      const slug = slugParts.join("/");
      return {
        ...post,
        lang: "en",
        slug,
      };
    });
}

export async function getSortedVietnamTag(
  capitalizedTag: (typeof alltagsEnum)[number],
) {
  const blog = await getSortedVietnamBlog();
  return blog.filter((post) => post.data.tags?.includes(capitalizedTag));
}

export async function getSortedEnglishTag(
  capitalizedTag: (typeof alltagsEnum)[number],
) {
  const blog = await getSortedEnglishBlog();
  return blog.filter((post) => post.data.tags?.includes(capitalizedTag));
}

export async function getPostVietnamById(
  postId: string,
): Promise<CollectionEntry<"blog"> | null> {
  const allPosts = await getSortedVietnamBlog();
  return allPosts.find((post) => post.id === postId) || null;
}

export async function getPostEnglishById(
  postId: string,
): Promise<CollectionEntry<"blog"> | null> {
  const allPosts = await getSortedEnglishBlog();
  return allPosts.find((post) => post.id === postId) || null;
}

export async function getSubpostsVietnamForParent(
  parentId: string,
): Promise<CollectionEntry<"blog">[]> {
  const posts = await getSortedVietnamBlog();
  return posts.filter(
    (post) => isSubpost(post.id) && getParentId(post.id) === parentId,
  );
}

export async function getSubpostsEnglishForParent(
  parentId: string,
): Promise<CollectionEntry<"blog">[]> {
  const posts = await getSortedEnglishBlog();
  return posts.filter(
    (post) => isSubpost(post.id) && getParentId(post.id) === parentId,
  );
}

export async function getVietnamTOCSections(
  postId: string,
): Promise<TOCSection[]> {
  const post = await getPostVietnamById(postId);
  if (!post) return [];

  const sections: TOCSection[] = [];

  const { headings: parentHeadings } = await render(post);
  if (parentHeadings.length > 0) {
    sections.push({
      type: "parent",
      title: "Overview",
      headings: parentHeadings.map((heading) => ({
        slug: heading.slug,
        text: heading.text,
        depth: heading.depth,
      })),
    });
  }

  return sections;
}

export async function getEnglishTOCSections(
  postId: string,
): Promise<TOCSection[]> {
  const post = await getPostEnglishById(postId);
  if (!post) return [];

  const sections: TOCSection[] = [];

  const { headings: parentHeadings } = await render(post);
  if (parentHeadings.length > 0) {
    sections.push({
      type: "parent",
      title: "Overview",
      headings: parentHeadings.map((heading) => ({
        slug: heading.slug,
        text: heading.text,
        depth: heading.depth,
      })),
    });
  }

  return sections;
}
