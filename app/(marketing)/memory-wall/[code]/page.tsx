import {
  getMemoryWallData,
  getQRCodeData,
} from '@/app/actions/memory-wall-actions';
import { Spinner } from '@/components/loaders/spinner';
import QRCodeDisplay from './qr-code-display';
import MemoryWallGallery from './memory-wall-gallery';

export default async function StoryBoard({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const resolvedParams = await params;
  const code = resolvedParams.code;

  try {
    // Fetch data on the server
    const [memoryWallData, qrCodeData] = await Promise.all([
      getMemoryWallData(code),
      getQRCodeData(code),
    ]);

    if (!memoryWallData) {
      return (
        <div className="flex h-screen items-center justify-center">
          <p className="text-xl">Memory wall not found</p>
        </div>
      );
    }

    return (
      <div className="relative h-screen w-screen bg-black">
        {qrCodeData && <QRCodeDisplay qrCode={qrCodeData.qrCode} />}

        <MemoryWallGallery
          code={code}
          initialGalleries={memoryWallData.galleries}
          initialMedia={memoryWallData.media}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading memory wall:', error);
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
}
