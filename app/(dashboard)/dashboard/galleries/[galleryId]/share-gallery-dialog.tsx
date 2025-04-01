'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share2, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export interface ShareGalleryDialogProps {
  eventCode: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
}

export function ShareGalleryDialog({
  eventCode,
  isOpen,
  onOpenChange,
  triggerClassName,
}: ShareGalleryDialogProps) {
  const [open, setOpen] = useState(isOpen || false);
  const handleOpenChange = onOpenChange || setOpen;

  useEffect(() => {
    setOpen(isOpen || false);
  }, [isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('The code has been copied to your clipboard.');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {triggerClassName && (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className={triggerClassName}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Gallery</DialogTitle>
          <DialogDescription>
            Share this event code with your guests to let them upload photos and
            videos.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Event Code</Label>
            <div className="flex space-x-2">
              <Input value={eventCode} readOnly />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(eventCode)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
