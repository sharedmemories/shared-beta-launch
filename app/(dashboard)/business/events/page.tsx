import { Suspense } from 'react';
import { EventsList } from './events-list';
import { EventsSearch } from './events-search';
import { DashboardShell } from '@/components/dashboard/dash-shell';
import { DashboardTitleHeader } from '@/components/dashboard/dash-title-header';
import { DashboardSkeleton } from '@/components/dashboard/dash-skeleton';
import { CreateEventDialog } from '../../../../components/dashboard/create-event-dialog';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// `dynamic = 'force-dynamic'` and `revalidate = 0` to ensure the page is always up-to-date
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {

  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session?.user?.id) {
      redirect('/');
    }
    
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';

  return (
    <DashboardShell>
      <DashboardTitleHeader
        heading="Events"
        text="Create and manage your events for your clients."
      >
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2 w-full">
          <div className="w-full sm:w-auto">
            <EventsSearch />
          </div>
          <div className="w-full sm:w-auto">
            <CreateEventDialog />
          </div>
        </div>
      </DashboardTitleHeader>
      <div className="w-full overflow-x-auto">
        <Suspense fallback={<DashboardSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <EventsList page={page} search={search} />
        </Suspense>
      </div>
    </DashboardShell>
  );
}