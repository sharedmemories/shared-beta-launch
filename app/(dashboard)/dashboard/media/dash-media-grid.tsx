'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Check, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  approveMedia,
  rejectMedia,
  deleteMedia,
} from '@/app/actions/media-actions';
import { toast } from 'sonner';
import { MediaCarousel } from '../../../../components/common/media-carousel';

interface DashMediaGridProps {
  media: {
    id: string;
    url: string;
    type: string;
    gallery: {
      event: {
        title: string;
      };
    };
    status: string;
  }[];
  hidePending?: boolean;
}

export function DashMediaGrid({ media, hidePending }: DashMediaGridProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleAction = async (
    mediaId: string,
    action: 'approve' | 'reject'
  ) => {
    setLoading((prev) => ({ ...prev, [mediaId]: true }));

    try {
      const result =
        action === 'approve'
          ? await approveMedia(mediaId)
          : await rejectMedia(mediaId);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(`There was an error ${action}ing the media: ${error}`);
    } finally {
      setLoading((prev) => ({ ...prev, [mediaId]: false }));
    }
  };

  const toggleSelection = (mediaId: string) => {
    setSelectedMedia((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(mediaId)) {
        newSet.delete(mediaId);
      } else {
        newSet.add(mediaId);
      }
      return newSet;
    });
  };

  const handleDelete = async () => {
    if (deleteConfirmText.toLowerCase() !== 'delete') {
      toast.warning('Please type "delete" to confirm');
      return;
    }

    setLoading((prev) => {
      const newLoading = { ...prev };
      selectedMedia.forEach((id) => {
        newLoading[id] = true;
      });
      return newLoading;
    });

    try {
      const result = await deleteMedia(Array.from(selectedMedia));

      if (result.success) {
        toast.success(
          result.message || `${selectedMedia.size} items deleted successfully`
        );
        setSelectedMedia(new Set());
        router.refresh();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(`There was an error deleting the media: ${error}`);
    } finally {
      setLoading((prev) => {
        const newLoading = { ...prev };
        selectedMedia.forEach((id) => {
          newLoading[id] = false;
        });
        return newLoading;
      });
      setIsDeleteDialogOpen(false);
      setDeleteConfirmText('');
    }
  };

  const handleMediaClick = (index: number) => {
    setCarouselIndex(index);
    setCarouselOpen(true);
  };

  const filteredMedia = media.filter((item) =>
    hidePending ? item.status === 'APPROVED' : item.status === 'PENDING'
  );

  return (
    <>
      <div className="relative">
        {selectedMedia.size > 0 && (
          <div className="fixed right-4 bottom-4 z-50">
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="shadow-lg"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected ({selectedMedia.size})
            </Button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-[2px] md:gap-[3px] lg:gap-[4px]">
          {filteredMedia.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-square cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelection(item.id);
                }}
                className={cn(
                  'absolute top-2 left-2 z-20 rounded-full p-1 transition-colors',
                  selectedMedia.has(item.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background/80 text-muted-foreground opacity-0 group-hover:opacity-100'
                )}
              >
                <Check className="h-4 w-4" />
              </button>

              <div
                className="h-full w-full"
                onClick={() => handleMediaClick(index)}
              >
                {item.type === 'IMAGE' ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={item.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      {item?.status !== 'APPROVED' && (
                        <div className="absolute right-0 bottom-0 left-0 flex gap-1 p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-background/80 hover:bg-background w-full text-purple-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(item.id, 'reject');
                            }}
                            disabled={loading[item.id]}
                          >
                            <X className="h-4 w-4" /> Reject
                          </Button>
                          <Button
                            size="sm"
                            className="bg-background/80 hover:bg-background w-full text-purple-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(item.id, 'approve');
                            }}
                            disabled={loading[item.id]}
                          >
                            <Check className="h-4 w-4" /> Approve
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted relative h-full w-full">
                    <video
                      src={item.url}
                      className="h-full w-full object-cover"
                    />
                    <div className="bg-background/80 absolute top-2 right-2 rounded-full p-1">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      {item?.status !== 'APPROVED' && (
                        <div className="absolute right-0 bottom-0 left-0 flex gap-1 p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-background/80 hover:bg-background w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(item.id, 'reject');
                            }}
                            disabled={loading[item.id]}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-background/80 hover:bg-background w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(item.id, 'approve');
                            }}
                            disabled={loading[item.id]}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Selected Media</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Type &quot;delete&quot; below to
              confirm.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder="Type 'delete' to confirm"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MediaCarousel
        media={filteredMedia}
        initialIndex={carouselIndex}
        open={carouselOpen}
        onOpenChange={setCarouselOpen}
      />
    </>
  );
}
