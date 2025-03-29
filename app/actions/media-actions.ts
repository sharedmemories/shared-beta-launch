'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function approveMedia(
  mediaId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    await prisma.media.update({
      where: { id: mediaId },
      data: { status: 'APPROVED' },
    });
    revalidatePath('/dashboard/media/pending');
    revalidatePath('/dashboard/media/approved');
    return { success: true, message: 'Media approved successfully' };
  } catch (error) {
    console.error('Error approving media:', error);
    return { success: false, message: 'Failed to approve media' };
  }
}

export async function rejectMedia(
  mediaId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.media.update({
      where: { id: mediaId },
      data: { status: 'REJECTED' },
    });
    revalidatePath('/dashboard/media/pending');
    revalidatePath('/dashboard/media/approved');
    return { success: true, message: 'Media rejected successfully' };
  } catch (error) {
    console.error('Error rejecting media:', error);
    return { success: false, message: 'Failed to reject media' };
  }
}

export async function deleteMedia(mediaIds: string[]) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    // Get the media items with their event codes
    const mediaItems = await prisma.media.findMany({
      where: {
        id: { in: mediaIds },
        gallery: {
          event: {
            userId: session.user.id
          }
        }
      },
      include: {
        gallery: {
          include: {
            event: true
          }
        }
      }
    });

    if (mediaItems.length === 0) {
      return { success: false, message: 'No media items found' };
    }

    // Group media by event code for batch deletion
    const mediaByEvent = mediaItems.reduce((acc, media) => {
      const eventCode = media.gallery.event.code;
      if (!acc[eventCode]) {
        acc[eventCode] = [];
      }
      acc[eventCode].push(media.id);
      return acc;
    }, {} as Record<string, string[]>);

    // Get the headers we need to forward
    const headersList = headers();
    const cookie = (await headersList).get('cookie');

    // Delete media files from S3 and database for each event
    for (const [eventCode, ids] of Object.entries(mediaByEvent)) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`;
      const response = await fetch(`${baseUrl}/api/aws/delete/${eventCode}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie || '', // Forward the authentication cookie
        },
        body: JSON.stringify({ mediaIds: ids }),
        credentials: 'include', // Include credentials in the request
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete media files');
      }
    }

    // Delete the media records from the database
    await prisma.media.deleteMany({
      where: {
        id: { in: mediaIds },
      },
    });

    revalidatePath('/dashboard/media/pending');
    revalidatePath('/dashboard/media/approved');

    return { 
      success: true, 
      message: `Successfully deleted ${mediaIds.length} media item${mediaIds.length === 1 ? '' : 's'}` 
    };
  } catch (error) {
    console.error('Error deleting media:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to delete media' 
    };
  }
}
