import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { ClientCard } from './client-card';
import { prisma } from '@/lib/prisma';
import { DashboardContent } from '../../../components/dashboard/dashboard-content';
import {
  fetchRecentGalleries,
  fetchTotalEvents,
  fetchTotalGalleries,
  fetchTotalMedia,
  fetchUpcomingEvents,
} from '@/lib/queries/dashboard-stats';
import { getPolarSubscription } from '@/lib/polar/get-polar-subscription';

async function getStorageUsed(userId: string) {
  const storage = await prisma.storage.findFirst({
    where: { userId },
  });
  return storage?.used || 0;
}

export default async function BusinessDashboard() {
  const [session, organization] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    auth.api.getFullOrganization({
      headers: await headers(),
    }),
  ]).catch(() => {
    throw redirect('/dashboard');
  });

  if (!session?.user?.id) {
    redirect('/');
  }

  // Fetch and validate the subscription
  const subscription = await getPolarSubscription();

  const isBusinessSubscriptionActive =
    subscription.subscriptionPlan === 'BUSINESS' &&
    subscription.hasActiveSubscription;

  if (!isBusinessSubscriptionActive) {
    throw redirect('/dashboard'); // Redirect if subscription is invalid
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
    >
      <ClientCard
        session={JSON.parse(JSON.stringify(session))}
        activeOrganization={JSON.parse(JSON.stringify(organization))}
      />
    </DashboardContent>
  );
}
