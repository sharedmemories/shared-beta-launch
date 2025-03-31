import { prisma } from '@/lib/prisma';
import { getCachedSession } from '@/lib/auth-utils';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

type Params = Promise<{ code: string }>;

export async function DELETE(
  req: NextRequest,
  segmentData: { params: Params }
) {
  const params = await segmentData.params;
  const code = params.code;

  try {
    const session = await getCachedSession();

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { mediaIds } = await req.json();

    // Verify event ownership and get media items
    const event = await prisma.userEvent.findFirst({
      where: {
        code,
        userId: session.user.id,
      },
      include: {
        galleries: {
          include: {
            media: {
              where: {
                id: {
                  in: mediaIds,
                },
              },
            },
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { message: 'Event not found or unauthorized' },
        { status: 404 }
      );
    }

    // Collect all media items to delete
    const mediaItems = event.galleries.flatMap((gallery) => gallery.media);

    if (mediaItems.length === 0) {
      return NextResponse.json(
        { message: 'No media items found' },
        { status: 404 }
      );
    }

    // Delete files from S3
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Delete: {
        Objects: mediaItems.map((media) => ({
          Key: new URL(media.url).pathname.slice(1), // Remove leading slash
        })),
        Quiet: false,
      },
    });

    const deleteResult = await s3Client.send(deleteCommand);

    if (deleteResult.Errors?.length) {
      console.error('S3 deletion errors:', deleteResult.Errors);
      return NextResponse.json(
        {
          message: 'Some files could not be deleted',
          errors: deleteResult.Errors,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Files deleted successfully',
      deleted: deleteResult.Deleted?.length || 0,
    });
  } catch (error) {
    console.error('Error in delete route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
