import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function HowItWorksUseCase() {
  return (
    <section className="bg-white py-20 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              step: 1,
              title: 'Create Your Event',
              description: 'Set up your digital wedding galleries in minutes.',
            },
            {
              step: 2,
              title: 'Share with Your Guests',
              description:
                'Share your unique QR code with guests to easily collect photos, videos, and messages.',
            },
            {
              step: 3,
              title: 'Enjoy Contributions',
              description:
                'Watch as your gallery fills with precious moments and heartfelt messages from loved ones.',
            },
          ].map(({ step, title, description }) => (
            <Card key={step} className="border-none text-center">
              <CardHeader>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pink-50">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
                    {step}
                  </span>
                </div>
                <CardTitle className="mb-4 text-xl font-semibold">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
