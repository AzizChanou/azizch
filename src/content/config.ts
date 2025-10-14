import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: "content",
  schema: z.object({
    id: z.number(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string(),
    draft: z.boolean().default(true),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string(),
    draft: z.boolean().default(true),
  }),
});

const we = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { blog, projects, we };
