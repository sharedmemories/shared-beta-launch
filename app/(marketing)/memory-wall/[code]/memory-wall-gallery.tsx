'use client';

import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GalleryResponse, MediaItem } from '@/app/actions/memory-wall-actions';

interface MemoryWallGalleryProps {
  code: string;
  initialGalleries: GalleryResponse[];
  initialMedia: MediaItem[];
}

interface Gallery extends GalleryResponse {
  selected: boolean;
}

export default function MemoryWallGallery({
  code,
  initialGalleries,
  initialMedia,
}: MemoryWallGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [showPendingImages] = useState(false);
  const [slideshowInterval] = useState(5);
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const queryClient = useQueryClient();

  // Initialize galleries from props
  useEffect(() => {
    setGalleries(
      initialGalleries.map((g: GalleryResponse) => ({
        ...g,
        selected: true,
      }))
    );
    setMedia(initialMedia);
  }, [initialGalleries, initialMedia]);

  // Set up SSE for real-time updates
  useEffect(() => {
    const eventSource = new EventSource(`/api/memory-wall/${code}/updates`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'UPLOAD' && data.eventCode === code) {
        setTimeout(async () => {
          // Fetch updated data
          const response = await fetch(`/api/memory-wall/${code}`);
          if (response.ok) {
            const newData = await response.json();
            setMedia(newData.media);
          }
        }, 2000);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    // Periodic refresh
    const intervalId = setInterval(async () => {
      const response = await fetch(`/api/memory-wall/${code}`);
      if (response.ok) {
        const newData = await response.json();
        setMedia(newData.media);
      }
    }, 30000);

    return () => {
      clearInterval(intervalId);
      eventSource.close();
    };
  }, [code, queryClient]);

  // Filter media based on selected galleries and status
  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const gallerySelected = galleries.some(
        (g) => g.selected && g.id === item.galleryId
      );
      const statusOk = showPendingImages || item.status === 'APPROVED';
      return gallerySelected && statusOk;
    });
  }, [media, galleries, showPendingImages]);

  // Set up slideshow interval
  useEffect(() => {
    if (filteredMedia.length === 0 || slideshowInterval === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % filteredMedia.length);
    }, slideshowInterval * 1000);

    return () => clearInterval(interval);
  }, [filteredMedia, slideshowInterval]);

  if (filteredMedia.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-xl text-white">No images to display</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={filteredMedia[currentImageIndex]?.url || '/placeholder.svg'}
        alt={filteredMedia[currentImageIndex]?.description || ''}
        fill
        className="object-contain"
        priority
      />
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-8">
        <p className="text-xl text-white">
          {filteredMedia[currentImageIndex]?.description}
        </p>
      </div>
    </div>
  );
}
