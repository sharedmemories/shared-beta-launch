import QRCode from 'qrcode';
import { nanoid } from 'nanoid';
import { prisma } from './prisma';

export async function generateQRCode(url: string): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
    return qrDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

export function generateEventCode(): string {
  return nanoid(6).toUpperCase();
}

export async function generateEventLink(
  userId: string,
  eventId: string
): Promise<string> {
  const token = nanoid(32);

  // Store the event link token
  await prisma.eventLink.create({
    data: {
      token,
      userId,
      eventId,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/share/${token}`;
}

export async function validateEventLink(token: string) {
  const eventLink = await prisma.eventLink.findUnique({
    where: { token },
    include: {
      event: true,
    },
  });

  if (!eventLink) {
    throw new Error('Invalid  link');
  }

  if (eventLink.expiresAt < new Date()) {
    throw new Error('Link has expired');
  }

  return eventLink;
}

export function getUploadUrl(eventCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/upload/${eventCode}`;
}

export function getMemoryWallURL(eventCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/memory-wall/${eventCode}`;
}

export function getShareableLink(eventCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/share/${eventCode}`;
}
