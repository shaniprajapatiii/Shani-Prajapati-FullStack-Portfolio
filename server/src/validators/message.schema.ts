import { z } from 'zod';

export const createMessageSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be at most 100 characters'),
    email: z
      .string()
      .email('Please provide a valid email address'),
    subject: z
      .string()
      .min(5, 'Subject must be at least 5 characters')
      .max(200, 'Subject must be at most 200 characters'),
    message: z
      .string()
      .min(10, 'Message must be at least 10 characters')
      .max(5000, 'Message must be at most 5000 characters'),
  }),
});

export type CreateMessageInput = z.TypeOf<typeof createMessageSchema>;
