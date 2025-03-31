import { getCachedSession } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

export async function fetchPendingMedia() {
  const session = await getCachedSession();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  const media = await prisma.media.findMany({
    where: {
      status: 'PENDING',
      gallery: {
        event: {
          OR: [{ userId }],
        },
      },
    },
    include: {
      gallery: {
        include: {
          event: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return media;
}
