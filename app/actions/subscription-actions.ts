'use server';

import { auth } from '@/lib/auth';
import { polarApi } from '@/lib/polar';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  message: string;
  subscriptionPlan: string | null;
}

export async function getPolarSubscription(): Promise<SubscriptionStatus> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    if (!session?.user?.id) {
      return {
        hasActiveSubscription: false,
        message: 'User not authenticated',
        subscriptionPlan: null,
      };
    }

    // Fetch subscriptionId where userId matches
    const subscription = await prisma.subscription.findFirst({
      where: { userId: session.user.id },
      select: { subscriptionId: true, status: true, type: true },
    });

    if (!subscription || !subscription.subscriptionId) {
      return {
        hasActiveSubscription: false,
        message: 'No subscription found',
        subscriptionPlan: null,
      };
    }

    const { subscriptionId, status, type: subscriptionPlan } = subscription;

    // Fetch subscription details from Polar using subscriptionId
    const polarSubscription = await polarApi.subscriptions.get({
      id: subscriptionId,
    });

    const isActive = ['active', 'trialing'].includes(polarSubscription.status);

    if (isActive && status !== 'active') {
      await prisma.subscription.update({
        where: { subscriptionId },
        data: { status: 'active' },
      });
    }

    return {
      hasActiveSubscription: isActive,
      message: isActive
        ? 'Active subscription confirmed with Polar'
        : 'Subscription is not active',
      subscriptionPlan,
    };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return {
      hasActiveSubscription: false,
      message: 'Error checking subscription status',
      subscriptionPlan: null,
    };
  }
}
