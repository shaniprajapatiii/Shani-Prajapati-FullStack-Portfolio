import { z } from 'zod';

export const upsertCertificateSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Certificate title is required'),
    issuer: z.string().min(1, 'Issuer name is required'),
    issueDate: z.string().min(1, 'Issue date is required').refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
    expiryDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid date format'),
    credentialId: z.string().optional(),
    // Frontend allows certificate description to be empty
    description: z.string().optional(),
    skills: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    // Accept Tailwind gradient class names used by frontend
    gradient: z.string().min(1, 'Gradient is required'),
    verificationUrl: z.string().url().optional(),
    order: z.number().int().optional(),
  }),
  params: z.object({ id: z.string().optional() }),
});
