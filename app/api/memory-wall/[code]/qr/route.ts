import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateQRCode, getUploadUrl } from '@/lib/share';

export const dynamic = 'force-dynamic';

type Params = Promise<{ code: string }>;

export async function GET(_req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const code = params.code;

  try {
    // First get the event to verify it exists
    const event = await prisma.userEvent.findFirst({
      where: {
        code,
      },
      select: {
        id: true,
        code: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Generate QR code for the upload URL
    const uploadUrl = getUploadUrl(event.code);
    const qrCode = await generateQRCode(uploadUrl);

    return NextResponse.json({ qrCode, uploadUrl });
  } catch (error) {
    console.error('[QR_CODE_FETCH]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
