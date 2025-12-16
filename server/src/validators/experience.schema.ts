import { z } from 'zod';

export const upsertExperienceSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company name is required'),
    startDate: z.string().min(1, 'Start date is required').refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
    endDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid date format'),
    isCurrently: z.boolean().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    order: z.number().int().optional(),
  }),
  params: z.object({ id: z.string().optional() }),
});
