import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
export async function getBusinessClients() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect('/');
  }

  // Get the organization where the current user is a member
  const member = await prisma.member.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      organization: true,
    },
  })

  if (!member) throw new Error("No organization found")

  // Get all members of the organization with their details
  const members = await prisma.member.findMany({
    where: {
      organizationId: member.organizationId,
    },
    include: {
      user: {
        include: {
          events: {
            select: {
              id: true,
            },
          },
          storage: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
          subscriptions: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
          sessions: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
      },
    },
  })

  // Transform the data to match our Client type
  return members.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    email: member.user.email,
    image: member.user.image || undefined,
    role: member.role,
    eventsCount: member.user.events.length,
    storageUsed: member.user.storage[0]?.used || 0,
    subscriptionPlan: member.user.subscriptions[0]?.type || 'FREE',
    subscriptionStatus: member.user.subscriptions[0]?.status || 'INACTIVE',
    lastActive: member.user.sessions[0]?.createdAt || member.user.createdAt,
  }))
} 