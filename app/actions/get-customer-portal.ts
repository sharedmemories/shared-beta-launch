'use server';

import { prisma } from '@/lib/prisma';
import { polarApi } from '@/lib/polar';
import { getCachedSession } from '@/lib/auth-utils';

export async function getCustomerPortalLink() {
  const session = await getCachedSession();

  try {
    if (!session?.user?.id) {
      return { success: false, message: 'User not authenticated', url: null };
    }

    // Fetch customerId where userId matches
    const subscription = await prisma.subscription.findFirst({
      where: { userId: session.user.id },
      select: { customerId: true },
    });

    if (!subscription || !subscription.customerId) {
      return { success: false, message: 'No customer ID found', url: null };
    }

    // Create a customer session with Polar
    const result = await polarApi.customerSessions.create({
      customerId: subscription.customerId,
    });

    if (!result?.customerPortalUrl) {
      return {
        success: false,
        message: 'Failed to get customer portal link',
        url: null,
      };
    }

    return { success: true, url: result.customerPortalUrl };
  } catch (error) {
    console.error('Error fetching customer portal link:', error);
    return {
      success: false,
      message: 'Error fetching customer portal link',
      url: null,
    };
  }
}
