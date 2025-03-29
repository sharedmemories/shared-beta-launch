'use server';

import { nanoid } from 'nanoid';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { eventSchema } from '@/lib/validations/events';
import { getPolarSubscription } from './subscription-actions';

export async function createEvent(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const subscription = await getPolarSubscription();
    const hasSub = subscription.hasActiveSubscription;
    const subscriptionPlan = subscription.subscriptionPlan;

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    if (!hasSub) {
      return { success: false, message: 'Subscribe first to create and event' };
    }

    const eventsCreated = await prisma.userEvent.count({
      where: {
        userId: session.user.id,
      },
    });

    if (subscriptionPlan === 'PRO') {
      if (eventsCreated >= 10) {
        return {
          success: false,
          message: 'You have reached the maximum number of events',
        };
      }
    }

    if (subscriptionPlan === 'STANDARD') {
      if (eventsCreated >= 5) {
        return {
          success: false,
          message:
            'You have reached the maximum number of events. Upgrade to PRO to create more events',
        };
      }
    }

    // Parse form data and convert date string to Date object
    const values = Object.fromEntries(formData.entries());
    const parsedValues = {
      ...values,
      date: values.date ? new Date(values.date as string) : undefined,
    };

    const { title, description, date, location } =
      eventSchema.parse(parsedValues);

    // Generate a unique code for the event
    const code = nanoid(6).toUpperCase();

    const event = await prisma.userEvent.create({
      data: {
        title,
        description,
        date,
        location,
        code,
        userId: session.user.id,
      },
    });

    // Revalidate the events list and the new event page
    revalidatePath('/dashboard/events');
    revalidatePath(`/dashboard/events/${event.id}`);

    return { success: true, message: 'Event created successfully' };
  } catch (error) {
    console.error('[EVENT_CREATE]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    };
  }
}
