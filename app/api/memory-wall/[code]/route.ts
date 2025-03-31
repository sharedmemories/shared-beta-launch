import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface MediaMetadata {
  description?: string;
  [key: string]: unknown;
}

type Params = Promise<{ code: string }>;

export async function GET(_req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const code = params.code;

  try {
    const event = await prisma.userEvent.findFirst({
      where: {
        code,
      },
      select: {
        id: true,
        galleries: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const media = await prisma.media.findMany({
      where: {
        galleryId: {
          in: event.galleries.map((g) => g.id),
        },
        status: {
          in: ['APPROVED', 'PENDING'],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        url: true,
        metadata: true,
        status: true,
        createdAt: true,
        galleryId: true,
      },
    });

    const transformedMedia = media.map((item) => {
      let description: string | null = null;

      if (item.metadata) {
        const metadata =
          typeof item.metadata === 'string'
            ? (JSON.parse(item.metadata) as MediaMetadata)
            : (item.metadata as MediaMetadata);

        description = metadata?.description || null;
      }

      return {
        ...item,
        description,
      };
    });

    return NextResponse.json({
      galleries: event.galleries,
      media: transformedMedia,
    });
  } catch (error) {
    console.error('[STORY_BOARD_GET]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
