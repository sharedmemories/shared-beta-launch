import { Prisma } from '@prisma/client';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

type FetchGalleriesArgs = {
  page: number;
  search: string;
};

export async function fetchGalleries({ page, search }: FetchGalleriesArgs) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const limit = 12;
  const skip = (page - 1) * limit;

  const where: Prisma.GalleryWhereInput = {
    event: {
      OR: [{ userId: session.user.id }],
    },
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            { event: { title: { contains: search, mode: 'insensitive' } } },
          ],
        }
      : {}),
  };

  const [galleries, total] = await Promise.all([
    prisma.gallery.findMany({
      where,
      include: {
        _count: {
          select: { 
            media: {
              where: {
                status: 'APPROVED'
              }
            } 
          },
        },
        event: {
          select: { id: true, title: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.gallery.count({ where }),
  ]);

  const pages = Math.ceil(total / limit);

  return { galleries, total, pages };
}
