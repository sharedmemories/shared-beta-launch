import { prisma } from '@/lib/prisma';

export async function fetchUpcomingEvents(userId: string) {
  return prisma.$queryRaw`
    SELECT id, title, date, location, status, code
    FROM "user_events"
    WHERE "userId" = ${userId}
    AND date >= NOW()
    ORDER BY date ASC
    LIMIT 4
  ` as Promise<
    Array<{
      id: string;
      title: string;
      date: Date;
      location: string | null;
      description: string | null;
      status: string;
      code: string;
    }>
  >;
}

export async function fetchRecentGalleries(userId: string) {
  return prisma.gallery.findMany({
    where: {
      event: {
        userId,
      },
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
        },
      },
      _count: {
        select: {
          media: {
            where: {
              status: 'APPROVED',
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  });
}

export async function fetchTotalEvents(userId: string) {
  return prisma.userEvent.count({
    where: { userId },
  });
}

export async function fetchTotalGalleries(userId: string) {
  return prisma.gallery.count({
    where: {
      event: { userId },
    },
  });
}

export async function fetchTotalMedia(userId: string) {
  return prisma.media.count({
    where: {
      gallery: {
        event: { userId },
      },
      status: 'APPROVED',
    },
  });
}

export async function getStorageUsed(userId: string) {
  const storage = await prisma.storage.findFirst({
    where: { userId },
  });
  return storage?.used || 0;
}
