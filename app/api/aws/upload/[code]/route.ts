import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getPreSignedUrl } from '@/app/actions/s3-upload';

type UpdateMessage = {
  type: 'UPLOAD';
  eventCode: string;
  mediaId: string;
  timestamp: string;
};

const latestUpdates = new Map<string, UpdateMessage>();

const uploadRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
  galleryId: z.string(),
  description: z.string().optional(),
});

type Params = Promise<{ code: string }>;

export async function POST(req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const code = params.code;

  try {
    // Find event by code
    const event = await prisma.userEvent.findUnique({
      where: { code },
      include: {
        user: true,
      },
    });

    if (!event) {
      return new NextResponse('Event not found', { status: 404 });
    }

    const json = await req.json();
    const body = uploadRequestSchema.parse(json);

    // Verify gallery belongs to event
    const gallery = await prisma.gallery.findFirst({
      where: {
        id: body.galleryId,
        eventId: event.id,
      },
    });

    if (!gallery) {
      return new NextResponse('Gallery not found', { status: 404 });
    }

    // Check storage usage
    // const storageRecord = await prisma.storage.findFirst({
    //   where: { userId: event.userId },
    //   orderBy: { createdAt: 'desc' },
    // });

    // const currentUsage = storageRecord?.used || 0;
    // const newFileSize = body.size / (1024 * 1024 * 1024); // Convert bytes to GB
    // const newTotalUsage = currentUsage + newFileSize;

    // Generate S3 key and presigned URL

    // Get presigned URL
    const { url: presignedUrl, publicUrl } = await getPreSignedUrl(
      body.fileName,
      body.contentType,
      event.userId,
      event.id,
      gallery.id
    );

    // Create media record with pending status
    const media = await prisma.media.create({
      data: {
        url: publicUrl,
        type: body.contentType.startsWith('image/') ? 'IMAGE' : 'VIDEO',
        size: body.size / (1024 * 1024), // Convert bytes to MB
        galleryId: gallery.id,
        status: 'PENDING',
        faceIds: '[]', // Initialize empty face IDs array
        metadata: body.description
          ? JSON.stringify({ description: body.description })
          : undefined,
      },
    });

    // Notify memory wall clients about the new upload
    const updateMessage: UpdateMessage = {
      type: 'UPLOAD' as const,
      eventCode: code,
      mediaId: media.id,
      timestamp: new Date().toISOString(),
    };

    // Broadcast the update to all connected clients
    // const encoder = new TextEncoder();
    // const updateStream = encoder.encode(`data: ${JSON.stringify(updateMessage)}\n\n`);

    // Store the update in memory for new clients
    latestUpdates.set(code, updateMessage);

    // Create analytics record
    await prisma.analytics.create({
      data: {
        userId: event.userId,
        eventId: event.id,
        type: 'UPLOAD_COUNT',
        value: 1,
      },
    });

    return NextResponse.json({
      presignedUrl,
      mediaId: media.id,
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Server Error',
      { status: 500 }
    );
  }
}
