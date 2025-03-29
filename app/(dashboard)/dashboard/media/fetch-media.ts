import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function fetchPendingMedia() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
