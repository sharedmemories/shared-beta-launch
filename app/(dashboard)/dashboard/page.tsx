import { redirect } from 'next/navigation';
import {
  fetchRecentGalleries,
  fetchTotalEvents,
  fetchTotalGalleries,
  fetchTotalMedia,
  fetchUpcomingEvents,
  getStorageUsed,
} from '@/lib/queries/dashboard-stats';
import { getCachedSession } from '@/lib/auth-utils';
import { DashboardContent } from '../../../components/dashboard/dashboard-content';

export default async function DashboardPage() {
  const session = await getCachedSession();

  if (!session?.user) {
    redirect('/');
  }

  const [
    upcomingEvents,
    recentGalleries,
    totalEvents,
    totalGalleries,
    totalMedia,
    storageUsed,
  ] = await Promise.all([
    fetchUpcomingEvents(session.user.id),
    fetchRecentGalleries(session.user.id),
    fetchTotalEvents(session.user.id),
    fetchTotalGalleries(session.user.id),
    fetchTotalMedia(session.user.id),
    getStorageUsed(session.user.id),
  ]);

  return (
    <DashboardContent
      session={session}
      upcomingEvents={upcomingEvents}
      recentGalleries={recentGalleries}
      totalEvents={totalEvents}
      totalGalleries={totalGalleries}
      totalMedia={totalMedia}
      storageUsed={storageUsed}
    />
  );
}
