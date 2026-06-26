import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()),
    role: z.string(),
    timeline: z.string(),
    team: z.string().optional(),
    toolsUsed: z.string(),
    cover: image().optional(),
    coverPlaceholder: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { projects };
