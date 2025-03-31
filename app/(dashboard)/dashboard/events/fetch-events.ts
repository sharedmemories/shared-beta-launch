import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getCachedSession } from '@/lib/auth-utils';

export async function fetchEvents(page: number, search: string) {
  const session = await getCachedSession();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const limit = 12;
  const skip = (page - 1) * limit;

  const where: Prisma.UserEventWhereInput = {
    userId: session.user.id,
    ...(search
      ? {
          title: {
            contains: search,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        }
      : {}),
  };

  const [events, total] = await Promise.all([
    prisma.userEvent.findMany({
      where,
      include: {
        _count: {
          select: { galleries: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.userEvent.count({ where }),
  ]);

  const pages = Math.ceil(total / limit);

  return { events, total, pages };
}
