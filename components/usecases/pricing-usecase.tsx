'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { AuthSession } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store/auth-store';

type PricingUseCaseProps = {
  session: AuthSession | null;
};

export default function PricingUseCase({ session }: PricingUseCaseProps) {
  const { openAuthDialog } = useAuthStore();

  return (
    <section className="bg-white py-20 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-bold">Pricing</h2>
        <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-lg">
          <Card className="px-6 py-8">
            <CardHeader>
              <CardTitle className="mb-4 text-center text-2xl font-bold">
                Pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 justify-between">
                <div className="flex gap-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold">$19.99</span>
                    <span className="text-gray-600">/event</span>
                  </div>
                  <ul className="mb-8 space-y-4">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Unlimited photo uploads
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Digital guest book
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Custom QR code
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <p>
                    Ideal for preserving memories from weddings, parties,
                    corporate events, and more, for a chosen duration.{' '}
                  </p>
                  <p>
                    Discover more and compare plans on our{' '}
                    <Link href="/#pricing" className="text-purple-600">
                      pricing page
                    </Link>
                    .
                  </p>
                  <div className="w-40">
                    {!session ? (
                      <Button
                        onClick={openAuthDialog}
                        className="flex cursor-pointer items-center space-x-2 rounded-md px-8 py-5 text-white transition-colors"
                      >
                        Get Started
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="flex cursor-pointer items-center space-x-2 rounded-md px-8 py-5 text-white transition-colors"
                      >
                        <Link href="/dashboard">Get Started</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
