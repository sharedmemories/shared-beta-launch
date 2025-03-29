import * as z from 'zod';

export const gallerySchema = z.object({
  name: z.string().min(1, 'Gallery name is required').max(30, {
    message: 'Gallery name must not be longer than 30 characters.',
  }),
  eventId: z.string().min(1, 'Event ID is required'),
});

export type GalleryFormValues = z.infer<typeof gallerySchema>;
