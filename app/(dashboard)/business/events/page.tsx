import { Suspense } from 'react';
import { EventsList } from './events-list';
import { redirect } from 'next/navigation';
import { EventsSearch } from './events-search';
import { getCachedSession } from '@/lib/auth-utils';
import { DashboardShell } from '@/components/dashboard/dash-shell';
import { DashboardSkeleton } from '@/components/dashboard/dash-skeleton';
import { DashboardTitleHeader } from '@/components/dashboard/dash-title-header';
import { CreateEventDialog } from '../../../../components/dashboard/create-event-dialog';

// `dynamic = 'force-dynamic'` and `revalidate = 0` to ensure the page is always up-to-date
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await getCachedSession();

  if (!session) {
    redirect('/');
  }

  const page = Number(resolvedSearchParams.page) || 1;
  const search = resolvedSearchParams.search || '';

  return (
    <DashboardShell>
      <DashboardTitleHeader
        heading="Events"
        text="Create and manage your events for your clients."
      >
        <div className="flex w-full flex-col items-center justify-end gap-2 sm:flex-row">
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
          <EventsList page={page} search={search} />
        </Suspense>
      </div>
    </DashboardShell>
  );
}
