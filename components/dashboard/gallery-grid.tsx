'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateGalleryDialog } from './create-gallery-dialog';

interface GalleryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  eventId?: string;
  galleries: {
    id: string;
    name: string;
    _count: {
      media: number;
    };
    createdAt: Date;
    event?: {
      id: string;
      title: string;
    };
  }[];
}

export function GalleryGrid({
  eventId,
  galleries,
  className,
  ...props
}: GalleryGridProps) {
  return (
    <div className={cn('', className)} {...props}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {eventId && (
          <CreateGalleryDialog eventId={eventId}>
            <Card className="cursor-pointer hover:bg-sidebar-accent">
              <CardHeader className="flex h-full min-h-[180px] flex-col items-center justify-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-10 w-10" />
                </div>
                <CardTitle className="text-xl">Create Gallery</CardTitle>
              </CardHeader>
            </Card>
          </CreateGalleryDialog>
        )}

        {galleries.map((gallery) => (
          <Link key={gallery.id} href={`/dashboard/galleries/${gallery.id}`}>
            <Card className="cursor-pointer hover:bg-sidebar-accent">
              <CardHeader>
                <CardTitle className="line-clamp-1">{gallery.name}</CardTitle>
                <div className="">
                  <p>{gallery._count.media} media items </p>
                  {gallery.event && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      From: {gallery.event.title}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Created{' '}
                    {new Date(gallery.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
