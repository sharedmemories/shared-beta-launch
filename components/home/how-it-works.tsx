import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
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
            <Card key={step} className="text-center border-none">
              <CardHeader>
                <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    {step}
                  </span>
                </div>
                <CardTitle className="text-2xl font-semibold mb-4 ">
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
