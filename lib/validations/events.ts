import * as z from 'zod';

export const eventSchema = z.object({
  title: z.string().min(5, 'Event name must be at least 5 characters'),
  description: z.string().min(5, 'Event description must be at least 5 characters'),
  date: z.date(),
  location: z.string().min(5, 'Event location must be at least 5 characters'),
});

export type EventFormValues = z.infer<typeof eventSchema>;
