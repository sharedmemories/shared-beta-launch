'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import { UploadMediaDialog } from './upload-media-dialog';
import { ShareGalleryDialog } from './share-gallery-dialog';
import { DeleteGalleryDialog } from './delete-gallery-dialog';

interface GalleryActionDropdownProps {
  galleryId: string;
  eventCode: string;
  galleryName: string;
}

export function GalleryActionDropdown({
  galleryId,
  eventCode,
  galleryName,
}: GalleryActionDropdownProps) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // console.log('isUploadDialogOpen', isUploadDialogOpen);
  // console.log('isShareDialogOpen', isShareDialogOpen);
  // console.log('isDeleteDialogOpen', isDeleteDialogOpen);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/dashboard/galleries" className="w-full">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Galleries
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsUploadDialogOpen(true)}>
            Upload Media
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsShareDialogOpen(true)}>
            Share Gallery
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setIsDeleteDialogOpen(true)}
            className="text-destructive"
          >
            Delete Gallery
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UploadMediaDialog
        eventCode={eventCode}
        galleryId={galleryId}
        galleryName={galleryName}
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />

      <ShareGalleryDialog
        eventCode={eventCode}
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
      />

      <DeleteGalleryDialog
        galleryId={galleryId}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
