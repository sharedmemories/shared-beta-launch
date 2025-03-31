import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type Params = Promise<{ code: string }>;

export async function GET(_req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const code = params.code;

  try {


    // First get the event to verify it exists
    const event = await prisma.userEvent.findFirst({
      where: {
        code,
      },
      select: {
        id: true,
      },
    });

    if (!event) {
      console.log('Event not found');
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // First, get all media without filters to see what exists
    const allMedia = await prisma.media.findMany({
      where: {
        gallery: {
          eventId: event.id,
        },
        AND: [
          {
            type: 'IMAGE', // Explicitly filter for images only
          },
        ],
      },
      select: {
        id: true,
        url: true,
        status: true,
        createdAt: true,
        galleryId: true,
        metadata: true,
        gallery: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Now apply our filters but transform all items for debugging
    const transformedMedia = allMedia
      .filter((item) => item.status === 'APPROVED' || item.status === 'PENDING')
      .map((item) => {
        try {
          let description = null;

          if (typeof item.metadata === 'string') {
            const metadata = JSON.parse(item.metadata);
            description = metadata.description || null;
          }

          return {
            id: item.id,
            url: item.url,
            status: item.status,
            createdAt: item.createdAt,
            galleryId: item.galleryId,
            description: description,
          };
        } catch (e) {
          console.error('Error parsing metadata for item:', item.id, e);
          return {
            id: item.id,
            url: item.url,
            status: item.status,
            createdAt: item.createdAt,
            galleryId: item.galleryId,
            description: null,
          };
        }
      });

    // Return the media items directly
    return NextResponse.json({ media: transformedMedia });
  } catch (error) {
    console.error('[STORY_BOARD_EVENTS]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
