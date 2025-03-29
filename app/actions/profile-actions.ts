'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { z } from 'zod';

//TODO: Fix actions

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

export async function updateProfile(data: z.infer<typeof profileSchema>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    const validatedData = profileSchema.parse(data);

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email: validatedData.email,
        NOT: { id: session.user.id },
      },
    });

    if (existingUser) {
      return { success: false, message: 'Email is already taken' };
    }

    await auth.api.updateUser({
      method: 'POST',
      body: {
        name: validatedData.name,
        email: validatedData.email,
      },
    });

    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: 'Failed to update profile' };
  }
}

export async function changePassword(data: z.infer<typeof passwordSchema>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    const validatedData = passwordSchema.parse(data);

    // Use better-auth's change password functionality
    await auth.api.changePassword({
      method: 'POST',
      body: {
        newPassword: validatedData.newPassword,
        currentPassword: validatedData.currentPassword,
        revokeOtherSessions: true,
      },
    });

    return { success: true, message: 'Password changed successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Failed to change password' };
  }
}

export async function updateSettings(data: z.infer<typeof settingsSchema>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' };
    }

    const validatedData = settingsSchema.parse(data);

    await prisma.userSettings.upsert({
      where: { userId: session.user.id },
      update: validatedData,
      create: {
        userId: session.user.id,
        ...validatedData,
      },
    });

    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: 'Failed to update settings' };
  }
}

export async function getProfileData() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    const [user, settings, subscription, storage] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          name: true,
          email: true,
          emailVerified: true,
        },
      }),
      prisma.userSettings.findUnique({
        where: { userId: session.user.id },
      }),
      prisma.subscription.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.storage.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      user,
      settings: settings || {
        theme: 'light',
        emailNotifications: true,
        pushNotifications: true,
      },
      subscription: subscription || { type: 'STANDARD' },
      storage: storage || { used: 0 },
    };
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
}
