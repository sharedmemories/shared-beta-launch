'use client';

import { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MediaUpload } from '@/components/dashboard/media-upload';

export interface UploadMediaDialogProps {
  eventCode: string;
  galleryId: string;
  galleryName: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
}

export function UploadMediaDialog({
  eventCode,
  galleryId,
  galleryName,
  isOpen,
  onOpenChange,
  triggerClassName,
}: UploadMediaDialogProps) {
  const [open, setOpen] = useState(isOpen || false);
  const handleOpenChange = onOpenChange || setOpen;

  useEffect(() => {
    setOpen(isOpen || false);
  }, [isOpen]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {triggerClassName && (
        <DialogTrigger asChild>
          <Button size="sm" className={triggerClassName}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Upload Media to {galleryName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <MediaUpload
            eventCode={eventCode}
            galleries={[{ id: galleryId, name: galleryName }]}
            preselectedGalleryId={galleryId}
            lockGallerySelection={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
