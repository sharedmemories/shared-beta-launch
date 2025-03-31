import { prisma } from '@/lib/prisma';

export async function getEventDetails(code: string) {
  const event = await prisma.userEvent.findUnique({
    where: { code },
    include: {
      galleries: {
        select: {
          id: true,
          name: true,
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
      },
    },
  });

  if (!event) {
    return null;
  }

  return {
    eventName: event.title,
    galleries: event.galleries,
  };
}
