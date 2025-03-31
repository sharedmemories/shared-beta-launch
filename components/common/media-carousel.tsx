import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSwipeable } from 'react-swipeable';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface MediaCarouselProps {
  media: {
    id: string;
    url: string;
    type: string;
  }[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MediaCarousel({
  media,
  initialIndex,
  open,
  onOpenChange,
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when modal opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  const showPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [media.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        showPrevious();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: showNext,
    onSwipedRight: showPrevious,
    trackMouse: false,
  });

  const currentItem = media[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-screen-lg gap-0 p-0">
        <div
          className="relative flex min-h-[50vh] items-center justify-center"
          {...handlers}
        >
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute left-2 z-10 aspect-square h-auto p-1.5',
              'hover:bg-background/80 transition-colors',
              'hidden sm:flex'
            )}
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute right-2 z-10 aspect-square h-auto p-1.5',
              'hover:bg-background/80 transition-colors',
              'hidden sm:flex'
            )}
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Media content */}
          <div className="flex h-full w-full items-center justify-center">
            {currentItem?.type === 'IMAGE' ? (
              <div className="relative aspect-video w-full">
                <Image
                  src={currentItem?.url}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video w-full">
                <video
                  src={currentItem?.url}
                  className="h-full w-full"
                  controls
                  playsInline
                />
              </div>
            )}
          </div>
        </div>

        {/* Optional: Add counter */}
        <div className="bg-background/80 absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-2 py-1 text-sm">
          {currentIndex + 1} / {media.length}
        </div>
      </DialogContent>
    </Dialog>
  );
}
