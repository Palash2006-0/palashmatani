import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    category: z.string(),
    status: z.enum(['in-progress', 'completed', 'archived']),
    order: z.number(),
    published: z.boolean().default(false),
    currentFocus: z.string().optional(),
    updatedAt: z.string(),
    tags: z.array(z.string()),
    stack: z.array(z.string()),
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    reportUrl: z.url().optional(),
    role: z.string().optional(),
    collaborators: z.string().optional(),
    note: z.string().optional(),
    architecture: z.array(z.string()).default([]),
    architectureNote: z.string().optional(),
    metrics: z.array(z.object({ label: z.string(), value: z.string(), context: z.string(), evidenceUrl: z.url() })).default([]),
  }),
});
export const collections = { projects };
