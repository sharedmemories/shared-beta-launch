import { prisma } from '@/lib/prisma';

export async function getAnalyticsData(userId: string) {
  const [events, totalUploads, storageUsage, recentAnalytics, uploadsByDay] =
    await Promise.all([
      // Get total events
      prisma.userEvent.count({
        where: {
          OR: [{ userId }],
        },
      }),

      // Get total uploads
      prisma.media.count({
        where: {
          gallery: {
            event: {
              OR: [{ userId }],
            },
          },
        },
      }),

      // Get storage usage
      prisma.storage.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),

      // Get recent analytics
      prisma.analytics.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 50,
      }),

      // Get uploads by day for the last 30 days
      prisma.media.groupBy({
        by: ['createdAt'],
        where: {
          gallery: {
            event: {
              OR: [{ userId }],
            },
          },
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
        _count: true,
        orderBy: {
          createdAt: 'asc',
        },
      }),
    ]);

  return {
    events,
    totalUploads,
    storageUsage: storageUsage?.used || 0,
    recentAnalytics,
    uploadsByDay: uploadsByDay.map((day) => ({
      date: day.createdAt,
      uploads: day._count,
    })),
  };
}
