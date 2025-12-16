import { z } from 'zod';

const links = z
  .object({
    live: z.string().url().optional(),
    repo: z.string().url().optional(),
  })
  .optional();

export const upsertProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Project title is required'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    description: z.string().min(1, 'Short description is required'),
    fullDescription: z.string().min(1, 'Full description is required'),
    techStack: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    // Allow Tailwind gradient class names (e.g., "from-blue-500 to-purple-600")
    gradient: z.string().min(1, 'Gradient is required'),
    links,
    imageUrl: z.string().url().optional(),
    featured: z.boolean().optional(),
    order: z.number().int().optional(),
  }),
  params: z.object({ id: z.string().optional() }),
});
