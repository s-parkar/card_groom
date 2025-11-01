import { z } from 'zod';

export const RsvpDataSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  attending: z.enum(['yes', 'no']),
  message: z.string().optional(),
});

export type RsvpData = z.infer<typeof RsvpDataSchema>;
