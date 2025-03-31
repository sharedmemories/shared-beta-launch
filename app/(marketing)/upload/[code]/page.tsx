import { getEventDetails } from './get-event-details';
import { MediaUpload } from '@/components/dashboard/media-upload';
import { EmptyPlaceholder } from '@/components/dashboard/empty-placeholder';

export default async function UploadPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const resolvedParams = await params;
  const code = resolvedParams.code;

  const eventDetails = await getEventDetails(code);

  if (!eventDetails) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="image" />
        <EmptyPlaceholder.Title>No Event</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          No event found
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    );
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center px-5 py-12 md:px-10">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {eventDetails.eventName}
          </h1>
          <p className="text-muted-foreground mt-2">
            Share your photos and videos from the event. They will be reviewed
            before being added to the gallery.
          </p>
        </div>

        {/* <div className="flex items-center justify-center">
          <FaceSearch galleryId={eventDetails.galleries[0].id} />
        </div> */}

        <MediaUpload eventCode={code} galleries={eventDetails.galleries} />
      </div>
    </div>
  );
}
