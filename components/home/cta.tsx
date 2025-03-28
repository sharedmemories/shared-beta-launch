'use client';

import React from 'react';
import Link from 'next/link';
import { AuthSession } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '../ui/button';

export default function CTA({ session }: { session: AuthSession | null }) {
  const { openAuthDialog } = useAuthStore();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-10 md:px-6 dark:from-purple-900 dark:to-pink-900">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl dark:from-purple-400 dark:to-pink-400">
              Start Sharing Your Memories Today
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Join thousands of users who are already creating and sharing
              unforgettable moments with Shared Memories. Sign up now and
              experience the joy of effortless memory sharing!
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            {!session ? (
              <Button
                onClick={openAuthDialog}
                className="flex cursor-pointer items-center space-x-2 rounded-md px-8 py-5 transition-colors"
              >
                <span>Create your event</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                asChild
                className="flex cursor-pointer items-center space-x-2 rounded-md px-8 py-5 text-white transition-colors hover:bg-purple-700"
              >
                <Link href="/dashboard">
                  <span>Create your event</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
