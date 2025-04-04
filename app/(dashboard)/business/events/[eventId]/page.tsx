import React from 'react';
import { redirect } from 'next/navigation';
import { fetchEvent } from './fetch-event';
import { EventHeader } from './event-header';
import { ShareOptions } from './share-options';
import { getCachedSession } from '@/lib/auth-utils';
import { GalleryGrid } from '@/components/dashboard/gallery-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function EventPage({
  params,
}: {
  params: Promise<{
    eventId: string;
  }>;
}) {
  const session = await getCachedSession();

  const resolvedParams = await params;
  if (!session) {
    redirect('/');
  }

  const userEvent = await fetchEvent({
    eventId: resolvedParams.eventId,
    userId: session.user.id,
  });

  return (
    <>
      <EventHeader
        event={
          userEvent
            ? { id: userEvent.id, name: userEvent.title, code: userEvent.code }
            : null
        }
      />
      <Tabs defaultValue="galleries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="galleries">Galleries</TabsTrigger>
          <TabsTrigger value="sharing">Sharing</TabsTrigger>
          {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
        </TabsList>
        <TabsContent value="galleries" className="space-y-4">
          {userEvent && (
            <GalleryGrid
              eventId={userEvent.id}
              galleries={userEvent.galleries}
              className="mt-6"
            />
          )}
        </TabsContent>
        <TabsContent value="sharing" className="space-y-4">
          {userEvent && (
            <ShareOptions
              eventId={userEvent.id}
              eventCode={userEvent.code}
              qrCode={userEvent.qrCode}
              uploadUrl={userEvent.uploadUrl}
              memoryWallUrl={userEvent.memoryWallUrl}
            />
          )}
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          {/* Event settings form will go here */}
        </TabsContent>
      </Tabs>
    </>
  );
}
