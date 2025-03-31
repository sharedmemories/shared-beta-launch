'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthSession } from '@/types';
import { Button } from '../ui/button';
import { useAuthStore } from '@/lib/store/auth-store';

type HeroUseCaseProps = {
  image: string;
  session: AuthSession | null;
  heroHeading1?: string;
  heroHeading2?: string;
  heroText1?: string;
};

export default function HeroUseCase({
  image,
  session,
  heroHeading1,
  heroHeading2,
  heroText1,
}: HeroUseCaseProps) {
  const { openAuthDialog } = useAuthStore();
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt="Wedding couple background"
          fill
          className="object-cover brightness-50"
          priority
          quality={75}
        />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {heroHeading1}
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              {heroHeading2}
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-200">
            {heroText1}
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            {!session ? (
              <Button onClick={openAuthDialog}>Create your event</Button>
            ) : (
              <Link
                href="/create-album"
                className="w-full rounded-md bg-white px-8 py-3 text-gray-900 transition-colors hover:bg-gray-100 sm:w-auto"
              >
                Create your event
              </Link>
            )}

            <Link
              href="/use-cases/weddings/gallery"
              className="w-full rounded-md border border-white bg-transparent px-8 py-3 text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              View sample gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
