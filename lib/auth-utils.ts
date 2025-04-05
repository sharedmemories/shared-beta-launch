import { cache } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { getPolarSubscription } from '@/app/actions/subscription-actions';
import { ActiveOrganization } from '@/types';

export const getCachedSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

type OrganizationRole = 'member' | 'admin' | 'owner';

/**
 * Checks if the user is authenticated and returns the session
 * Redirects to login page if not authenticated
 */
export async function requireAuth() {
  const session = await getCachedSession();

  if (!session) {
    redirect('/');
  }

  return session;
}

/**
 * Gets an organization by slug and verifies it exists
 * Calls notFound() if the organization doesn't exist
 */
export async function getOrganization(slug: string) {
  try {
    const businessOrg = await auth.api.getFullOrganization({
      headers: await headers(),
      query: {
        organizationSlug: slug,
      },
    });

    if (!businessOrg) {
      notFound();
    }

    return businessOrg;
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching organization:', error);

    // Handle specific API errors
    if (
      error instanceof Error &&
      error.message.includes('User is not a member')
    ) {
      redirect('/dashboard?error=not_a_member');
    }

    // For other errors, throw to be caught by error boundary
    throw error;
  }
}

/**
 * Checks if the user has the required role in the organization
 * Redirects to dashboard if not a member or doesn't have the required role
 */
export async function requireOrganizationRole(
  slug: string,
  requiredRole: OrganizationRole = 'member'
) {
  const session = await requireAuth();
  const businessOrg = await getOrganization(slug);

  // Check if user has the required role
  const hasRole = businessOrg.members.some(
    (member) =>
      member.userId === session.user.id && member.role === requiredRole
  );

  if (!hasRole) {
    redirect('/dashboard?error=insufficient_permissions');
  }

  return { session, businessOrg };
}

// Session non-nullable
export type AuthResult = {
  session: NonNullable<Awaited<ReturnType<typeof getCachedSession>>>;
  organization: ActiveOrganization | null;
  subscription: Awaited<ReturnType<typeof getPolarSubscription>>;
  userId: string;
};

/**
 * Middleware function to handle authentication and subscription validation
 * @param options Configuration options
 * @returns Authentication result with session, organization, and subscription data
 */
export async function withBusinessAuth(options: {
  redirectUnauthenticated?: string;
  redirectInvalidSubscription?: string;
}): Promise<AuthResult> {
  const {
    redirectUnauthenticated = '/',
    redirectInvalidSubscription = '/dashboard',
  } = options;

  const session = await getCachedSession();

  if (!session?.user?.id) {
    redirect(redirectUnauthenticated);
  }

  // Get  organization data
  const [organization, subscription] = await Promise.all([
    auth.api.getFullOrganization({
      headers: await headers(),
    }),
    getPolarSubscription(),
  ]);

  // Validate business subscription
  const isBusinessSubscriptionActive =
    subscription.subscriptionPlan === 'BUSINESS' &&
    subscription.hasActiveSubscription;

  if (!isBusinessSubscriptionActive) {
    redirect(redirectInvalidSubscription);
  }

  // At this point, we know session is not null
  return {
    session,
    organization,
    subscription,
    userId: session.user.id,
  };
}

/**
 * Middleware specifically for business pages that require subscription validation
 */
export async function withBusinessDashboardAuth() {
  return withBusinessAuth({
    redirectUnauthenticated: '/',
    redirectInvalidSubscription: '/dashboard',
  });
}
