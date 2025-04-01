'use client';

import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteGallery } from '@/app/actions/gallery-actions';
import { toast } from 'sonner';

interface DeleteGalleryDialogProps {
  galleryId: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
}

export function DeleteGalleryDialog({
  galleryId,
  isOpen,
  onOpenChange,
  triggerClassName,
}: DeleteGalleryDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [open, setOpen] = useState(isOpen || false);
  const handleOpenChange = onOpenChange || setOpen;

  useEffect(() => {
    setOpen(isOpen || false);
  }, [isOpen]);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteGallery(galleryId);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message);
      router.push('/dashboard/galleries');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {triggerClassName && (
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className={triggerClassName}
            disabled={isDeleting}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this gallery and all its media. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
