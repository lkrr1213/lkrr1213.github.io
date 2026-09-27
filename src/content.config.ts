import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const common = {
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  lang: z.enum(['zh', 'en']),
  tags: z.array(z.string().trim().min(1)),
  draft: z.boolean(),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    ...common,
    period: z.string().trim().min(1),
    role: z.string().trim().min(1),
    order: z.number().int().positive(),
    featured: z.boolean(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    ...common,
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
});

export const collections = { projects, posts };
