import React from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ChevronLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import { fetchGallery } from './fetch-gallery';
import { Button } from '@/components/ui/button';
import { MediaGrid } from '../../media/media-grid';
import { UploadMediaDialog } from './upload-media-dialog';
import { ShareGalleryDialog } from './share-gallery-dialog';
import { DeleteGalleryDialog } from './delete-gallery-dialog';
import { GalleryActionDropdown } from './gallery-action-dropdown';
import { DashboardShell } from '@/components/dashboard/dash-shell';
import { DashboardTitleHeader } from '@/components/dashboard/dash-title-header';
import { EmptyPlaceholder } from '@/components/dashboard/empty-placeholder';

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ galleryId?: string }>;
}) {
  const resolvedParams = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  const galleryId = resolvedParams.galleryId || '';

  const gallery = await fetchGallery({
    galleryId,
    userId: session.user.id,
  });

  if (!gallery) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="image" />
        <EmptyPlaceholder.Title>Gallery not found</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          This gallery may have been deleted or you may not have permission to
          view it.
        </EmptyPlaceholder.Description>
        <Button variant="outline" asChild>
          <Link href="/dashboard/galleries">Go back to galleries</Link>
        </Button>
      </EmptyPlaceholder>
    );
  }

  const transformedMedia = gallery.media.map((mediaItem) => ({
    ...mediaItem,
    gallery: {
      event: {
        title: gallery.event.title,
      },
    },
  }));

  return (
    <DashboardShell>
      <DashboardTitleHeader
        heading={gallery.name}
        text={`From event: ${gallery.event.title}`}
      >
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
          {/* Desktop view */}
          <div className="hidden w-full items-center justify-end gap-2 sm:flex">
            {/* All buttons grouped together on the right */}
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/galleries">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <UploadMediaDialog
              eventCode={gallery.event.code}
              galleryId={gallery.id}
              galleryName={gallery.name}
              triggerClassName="sm:flex"
            />
            <ShareGalleryDialog
              eventCode={gallery.event.code}
              triggerClassName="sm:flex"
            />
            <DeleteGalleryDialog
              galleryId={gallery.id}
              triggerClassName="sm:flex"
            />
          </div>

          {/* Mobile view with dropdown */}
          <div className="ml-auto sm:hidden">
            <GalleryActionDropdown
              galleryId={gallery.id}
              eventCode={gallery.event.code}
              galleryName={gallery.name}
            />
          </div>
        </div>
      </DashboardTitleHeader>

      {gallery.media.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="image" />
          <EmptyPlaceholder.Title>No media yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Share the event code with your guests to start collecting photos and
            videos.
          </EmptyPlaceholder.Description>
          <div className="text-center text-lg font-medium">
            Event Code: {gallery.event.code}
          </div>
          <div className="text-muted-foreground my-4 text-center text-sm font-normal">
            Or upload media directly to the gallery.
          </div>
          <UploadMediaDialog
            eventCode={gallery.event.code}
            galleryId={gallery.id}
            galleryName={gallery.name}
            triggerClassName="w-full sm:w-auto"
          />
        </EmptyPlaceholder>
      ) : (
        <MediaGrid media={transformedMedia} hidePending />
      )}
    </DashboardShell>
  );
}
