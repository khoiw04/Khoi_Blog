import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { alltagsEnum } from "../data/tagsPosts";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.enum(alltagsEnum)).optional(),
      collection: z.enum(["vi", "en"]),
      dev: z.boolean().optional(),
    }),
});

const changelog = defineCollection({
  loader: glob({ base: "./src/content/changelog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      heroImage: image(),
      dev: z.boolean().optional(),
      version: z.string(),
    }),
});

export const collections = { blog, changelog };
