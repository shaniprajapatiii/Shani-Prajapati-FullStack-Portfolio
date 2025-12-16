import { z } from 'zod';

export const upsertSkillSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Skill name is required'),
    category: z.string().min(1, 'Category is required'),
    icon: z.string().min(1, 'Icon (emoji) is required'),
    // Allow common color inputs; frontend uses hex but may include named or rgb
    color: z.string().min(1, 'Color is required'),
    level: z.string().optional(),
    order: z.number().int().optional(),
  }),
  params: z.object({ id: z.string().optional() }),
});
