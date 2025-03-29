'use client';

import React from 'react';
import Link from 'next/link';
import { AuthSession } from '@/types';
import { Button } from '../ui/button';
import ChatPreview from './chat-preview';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';

const messages = [
  {
    text: 'Do you have a plan to share images during and after the event??? 🤔',
    isSender: true,
  },
  {
    text: 'Uhh, Airdrop? WhatsApp?',
    isSender: false,
  },
  {
    text: 'Hmm, not everyone uses an iPhone and WhatsApp compresses stuff.',
    isSender: true,
  },
  {
    text: 'Gimme a sec 🧐👩🏽‍💻',
    isSender: true,
  },
  {
    text: 'Wait for it...',
    isSender: true,
  },
  {
    text: 'Check out Shared Memories. Seems to be exactly what we need 👌🏾',
    isSender: true,
  },
  {
    text: 'Ah yes! This is PERFECT! 😅🥳🤩',
    isSender: false,
  },
];

export default function Hero({ session }: { session: AuthSession | null }) {
  const { openAuthDialog } = useAuthStore();

  return (
    <div className="relative px-4 pt-10 pb-20 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="flex flex-col space-y-6">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-gray-100">
              Share Your Moments
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text leading-normal text-transparent dark:from-purple-400 dark:to-pink-400">
                Effortlessly{' '}
                <span className="text-purple-600 dark:text-purple-400">📸</span>
              </span>
            </h1>
            <p className="max-w-xl text-center text-lg text-gray-600 md:text-left dark:text-gray-300">
              With Shared Memories, create stunning photo collections for your
              events in seconds. Let guests easily upload their photos—no apps,
              no sign-ups, just shared memories made simple. Create an album,
              share the link, and relive the moments together!
            </p>
            <div className="flex justify-center pt-4 md:justify-start">
              {!session ? (
                <Button
                  onClick={openAuthDialog}
                  className="flex cursor-pointer items-center text-lg space-x-2 rounded-md px-8 py-5 text-white transition-colors"
                >
                  <span>Get Started</span>
                  <ChevronRight size={12} />
                </Button>
              ) : (
                <Button
                  asChild
                  className="flex cursor-pointer items-center space-x-2 rounded-md px-8 py-5 text-white transition-colors"
                >
                  <Link href="/dashboard">
                    <span>Create your event</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column - Graph Illustration */}
          <div className="relative h-[400px] w-full">
            <ChatPreview messages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
}
