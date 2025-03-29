import { prisma } from '@/lib/prisma';
import { generateQRCode, getUploadUrl, getMemoryWallURL } from '@/lib/share';

export async function fetchEvent({
  eventId,
  userId,
}: {
  eventId: string;
  userId: string;
}) {
  const event = await prisma.userEvent.findFirst({
    where: {
      id: eventId,
      OR: [{ userId }],
    },
    include: {
      galleries: {
        include: {
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
      },
    },
  });

  if (!event) {
    return null;
  }

  // Generate QR code for the upload URL
  const uploadUrl = getUploadUrl(event.code);
  const memoryWallUrl = getMemoryWallURL(event.code);
  const qrCode = await generateQRCode(uploadUrl);

  return {
    ...event,
    qrCode,
    uploadUrl,
    memoryWallUrl,
  };
}
