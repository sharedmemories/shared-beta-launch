'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { gallerySchema } from '@/lib/validations/gallery';

export async function createGallery(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    // Parse form data using the schema
    const values = Object.fromEntries(formData.entries());
    const { name, eventId } = gallerySchema.parse(values);

    // Verify event ownership
    const event = await prisma.userEvent.findFirst({
      where: {
        id: eventId,
        userId: session.user.id,
      },
    });

    if (!event) {
      return { success: false, message: 'Event not found' };
    }

    await prisma.gallery.create({
      data: {
        name,
        eventId,
      },
    });

    // Revalidate the events list and the new event page

    revalidatePath(`/dashboard/events/${eventId}`);

    return { success: true, message: 'Gallery created successfully' };
  } catch (error) {
    console.error('[GALLERY_CREATE]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    };
  }
}

export async function deleteGallery(
  galleryId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    // Verify ownership before deletion
    const gallery = await prisma.gallery.findFirst({
      where: {
        id: galleryId,
        event: {
          OR: [{ userId: session.user.id }],
        },
      },
      include: {
        media: true,
      },
    });

    if (!gallery) {
      return { success: false, message: 'Gallery not found' };
    }

    // Delete all media first (this will cascade to delete related records)
    await prisma.media.deleteMany({
      where: {
        galleryId: galleryId,
      },
    });

    // Delete the gallery
    await prisma.gallery.delete({
      where: {
        id: galleryId,
      },
    });

    revalidatePath('/dashboard/galleries');
    return { success: true, message: 'Gallery deleted successfully' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    };
  }
}
