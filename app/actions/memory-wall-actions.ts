'use server';

import { revalidatePath } from 'next/cache';

export interface GalleryResponse {
  id: string;
  name: string;
}

export interface MediaItem {
  id: string;
  url: string;
  description: string | null;
  status: 'PENDING' | 'APPROVED';
  createdAt: Date;
  galleryId: string;
}

export interface QRCodeData {
  qrCode: string;
  uploadUrl: string;
}

export interface MemoryWallData {
  galleries: GalleryResponse[];
  media: MediaItem[];
}

export async function getMemoryWallData(
  code: string
): Promise<MemoryWallData | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/memory-wall/${code}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch memory wall data');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching memory wall data:', error);
    return null;
  }
}

export async function getQRCodeData(code: string): Promise<QRCodeData | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/memory-wall/${code}/qr`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch QR code');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching QR code:', error);
    return null;
  }
}

export async function refreshMemoryWallData(code: string) {
  revalidatePath(`/memory-wall/${code}`);
}
