import { prisma } from '@/lib/prisma';

export async function fetchGallery({
  galleryId,
  userId,
}: {
  galleryId: string;
  userId: string;
}) {
  const gallery = await prisma.gallery.findFirst({
    where: {
      id: galleryId,
      event: {
        OR: [{ userId }],
      },
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          code: true,
        },
      },
      media: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          url: true,
          type: true,
          status: true,
          createdAt: true,
          faceIds: true,
        },
      },
      _count: {
        select: {
          media: true,
        },
      },
    },
  });

  if (!gallery) {
    return null;
  }

  return {
    ...gallery,
  };
}
