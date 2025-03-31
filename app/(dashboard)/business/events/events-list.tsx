import Link from 'next/link';
import { fetchEvents } from './fetch-events';
import { Button } from '@/components/ui/button';
import { EventsPagination } from './events-pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateEventDialog } from '@/components/dashboard/create-event-dialog';
import { EmptyPlaceholder } from '@/components/dashboard/empty-placeholder';

export async function EventsList({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const { events, pages } = await fetchEvents(page, search);

  if (events.length === 0) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="image" />
        <EmptyPlaceholder.Title>No events found</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          {search
            ? 'No events match your search. Try a different query.'
            : "You haven't created any events yet. Create one to get started."}
        </EmptyPlaceholder.Description>
        <CreateEventDialog />
      </EmptyPlaceholder>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link key={event.id} href={`/dashboard/events/${event.id}`}>
            <Card className="hover:bg-sidebar-accent cursor-pointer">
              <CardHeader>
                <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                <div>
                  <p>{event._count.galleries} galleries</p>
                  <p className="mt-1 text-sm">Code: {event.code}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">
                    Created{' '}
                    {new Date(event.createdAt).toLocaleDateString('en-US', {
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

      {pages > 1 && <EventsPagination totalPages={pages} currentPage={page} />}
    </div>
  );
}
