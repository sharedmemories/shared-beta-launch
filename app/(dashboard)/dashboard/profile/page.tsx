'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  updateProfile,
  changePassword,
  // updateSettings,
  getProfileData,
} from '@/app/actions/profile-actions';
import { toast } from 'sonner';
// import { BillingPortalButton } from '@/components/dashboard/stripe-routes';

// Schema definitions
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

// Subscription plan details
const PLAN_FEATURES = {
  STANDARD: {
    name: 'Standard',
    storage: 10, // GB
    features: ['Basic event features', '10 GB storage', 'Email support'],
  },
  PRO: {
    name: 'Pro',
    storage: 50, // GB
    features: [
      'Advanced analytics',
      '50 GB storage',
      'Priority support',
      'Custom branding',
    ],
  },
  BUSINESS: {
    name: 'Business',
    storage: 100, // GB
    features: [
      'Enterprise features',
      '100 GB storage',
      '24/7 support',
      'API access',
      'Custom integrations',
    ],
  },
} as const;

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [profileData, setProfileData] = React.useState<Awaited<
    ReturnType<typeof getProfileData>
  > | null>(null);

  // Initialize forms
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const settingsForm = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      theme: 'light',
      emailNotifications: true,
      pushNotifications: true,
    },
  });

  // Fetch profile data
  React.useEffect(() => {
    async function loadProfileData() {
      try {
        const data = await getProfileData();
        setProfileData(data);

        // Update form defaults
        profileForm.reset({
          name: data.user.name,
          email: data.user.email,
        });

        settingsForm.reset({
          theme: data.settings.theme as 'light' | 'dark' | 'system',
          emailNotifications: data.settings.emailNotifications,
          pushNotifications: data.settings.pushNotifications,
        });
      } catch (error) {
        console.error('Error loading profile data:', error);
        toast('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();
  }, [profileForm, settingsForm]);

  // Form submission handlers
  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      const result = await updateProfile(data);
      if (result.success) {
        toast(result.message);
        router.refresh();
      } else {
        toast(result.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast('Failed to update profile');
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    try {
      const result = await changePassword(data);
      if (result.success) {
        toast(result.message);
        passwordForm.reset();
      } else {
        toast(result.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast('Failed to change password');
    }
  };

  // const onSettingsSubmit = async (data: z.infer<typeof settingsSchema>) => {
  //   try {
  //     const result = await updateSettings(data);
  //     if (result.success) {
  //       toast({ title: result.message });
  //       router.refresh();
  //     } else {
  //       toast({ title: 'Error', description: result.message, variant: 'destructive' });
  //     }
  //   } catch (error) {
  //     console.error('Error updating settings:', error);
  //     toast({
  //       title: 'Error',
  //       description: 'Failed to update settings',
  //       variant: 'destructive',
  //     });
  //   }
  // };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentPlan = profileData?.subscription?.type || 'STANDARD';
  const planDetails = PLAN_FEATURES[currentPlan];
  const storageUsed = profileData?.storage?.used || 0;
  const storageLimit = planDetails.storage;
  const storagePercentage = Math.min((storageUsed / storageLimit) * 100, 100);

  return (
    <div className="container mx-auto space-y-8 py-10">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-4"
            >
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={profileForm.formState.isSubmitting}
                className="bg-purple-600 text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                {profileForm.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Theme and Notifications */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Manage your theme and notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...settingsForm}>
            <form
              onSubmit={settingsForm.handleSubmit(onSettingsSubmit)}
              className="space-y-6"
            >
              <FormField
                control={settingsForm.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={settingsForm.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Email Notifications</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about your events and
                        galleries
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-200"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={settingsForm.control}
                name="pushNotifications"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Push Notifications</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications about your events and
                        galleries
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-200"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={settingsForm.formState.isSubmitting}
                className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors"
              >
                {settingsForm.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card> */}

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={passwordForm.formState.isSubmitting}
                className="bg-purple-600 text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                {passwordForm.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Change Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Subscription Information */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            View and manage your subscription details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium">{planDetails.name} Plan</h3>
              <ul className="mt-2 space-y-2">
                {planDetails.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground flex items-center text-sm"
                  >
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {/* <BillingPortalButton text="Upgrade Plan" variant="outline"/> */}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Storage Used</h3>
              <span className="text-muted-foreground text-sm">
                {formatBytes(storageUsed * 1024 * 1024 * 1024)} of{' '}
                {storageLimit} GB
              </span>
            </div>
            <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${storagePercentage}%` }}
              />
            </div>
            {storagePercentage >= 90 && (
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                You&apos;re almost out of storage. Consider upgrading your plan.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
