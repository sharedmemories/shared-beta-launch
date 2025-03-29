import React from 'react';
import { MediaGrid } from '../media-grid';
import { fetchPendingMedia } from '../fetch-media';
import { EmptyPlaceholder } from '@/components/dashboard/empty-placeholder';

export default async function PendingMediaPage() {
  const pendingMedia = await fetchPendingMedia();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Pending Media</h2>
          <p className="text-muted-foreground">
            Review and approve media uploaded by your guests.
          </p>
        </div>
      </div>

      <div className="mt-8">
        {pendingMedia.length === 0 ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="image" />
            <EmptyPlaceholder.Title>No pending media</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&#39;t have any media waiting for approval.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        ) : (
          <MediaGrid media={pendingMedia} />
        )}
      </div>
    </div>
  );
}
