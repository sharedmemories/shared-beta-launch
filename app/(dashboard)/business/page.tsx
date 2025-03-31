import React from 'react';
import {
  fetchRecentGalleries,
  fetchTotalEvents,
  fetchTotalGalleries,
  fetchTotalMedia,
  fetchUpcomingEvents,
} from '@/lib/queries/dashboard-stats';
import { prisma } from '@/lib/prisma';
import { ClientCard } from './client-card';
import { withBusinessAuth } from '@/lib/auth-utils';
import { DashboardContent } from '../../../components/dashboard/dashboard-content';

async function getStorageUsed(userId: string) {
  const storage = await prisma.storage.findFirst({
    where: { userId },
  });
  return storage?.used || 0;
}

export default async function BusinessDashboard() {
  const { session, organization, userId } = await withBusinessAuth({
    redirectUnauthenticated: '/',
    redirectInvalidSubscription: '/dashboard',
  });

  const [
    upcomingEvents,
    recentGalleries,
    totalEvents,
    totalGalleries,
    totalMedia,
    storageUsed,
  ] = await Promise.all([
    fetchUpcomingEvents(userId),
    fetchRecentGalleries(userId),
    fetchTotalEvents(userId),
    fetchTotalGalleries(userId),
    fetchTotalMedia(userId),
    getStorageUsed(userId),
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
    >
      <ClientCard session={session} activeOrganization={organization} />
    </DashboardContent>
  );
}
