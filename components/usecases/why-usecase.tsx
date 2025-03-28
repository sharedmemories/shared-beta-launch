import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function WhyUseCase() {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20 dark:from-purple-900 dark:to-pink-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
          Why choose Shared Memories digital guest book?
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              step: 1,
              title: '🎉 Effortless guest contributions',
              description:
                'Invite guests to share photos and messages in your digital guest book seamlessly. With a simple QR code or link, they can contribute instantly—no apps, no registrations, just memories shared effortlessly.',
            },
            {
              step: 2,
              title: '📸 Real-time photo sharing',
              description:
                'Watch your event come alive as guests’ photos appear instantly on a dynamic photo wall. Real-time uploads create an interactive and engaging atmosphere that keeps the energy high and the memories flowing.',
            },
            {
              step: 3,
              title: '🎨 Customizable and secure',
              description:
                'Customize your guest book with captions and hashtags. Protect your cherished moments with password privacy, ensuring a secure and personal experience for you and your guests.',
            },
          ].map(({ step, title, description }) => (
            <Card key={step} className="border-none text-center">
              <CardHeader>
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
