import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Button } from '@/components/ui/button';
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

export function MediaCarousel({ media, initialIndex, open, onOpenChange }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);


  // Reset index when modal opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

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
      <DialogContent className="max-w-screen-lg w-full p-0 gap-0">
        <div className="relative flex items-center justify-center min-h-[50vh]" {...handlers}>
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute left-2 z-10 h-auto aspect-square p-1.5",
              "hover:bg-background/80 transition-colors",
              "hidden sm:flex"
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
              "absolute right-2 z-10 h-auto aspect-square p-1.5",
              "hover:bg-background/80 transition-colors",
              "hidden sm:flex"
            )}
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Media content */}
          <div className="w-full h-full flex items-center justify-center">
            {currentItem?.type === 'IMAGE' ? (
              <div className="relative w-full aspect-video">
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
              <div className="w-full aspect-video">
                <video
                  src={currentItem?.url}
                  className="w-full h-full"
                  controls
                  playsInline
                />
              </div>
            )}
          </div>
        </div>

        {/* Optional: Add counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-2 py-1 rounded-full text-sm">
          {currentIndex + 1} / {media.length}
        </div>
      </DialogContent>
    </Dialog>
  );
} 