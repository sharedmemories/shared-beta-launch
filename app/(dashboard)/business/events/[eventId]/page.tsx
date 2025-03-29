import React from 'react';
import { EventHeader } from './event-header';
import { fetchEvent } from './fetch-event';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShareOptions } from './share-options';
import { GalleryGrid } from '@/components/dashboard/gallery-grid';

export default async function EventPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  const userEvent = await fetchEvent({
    eventId: params.eventId,
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
