import React from 'react';

export default function FeatureUseCase() {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20 dark:from-purple-900 dark:to-pink-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
          Explore our Features
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Real-time Sharing 📸</h3>
            <p className="text-gray-600">
              Instantly collect and share photos from all your guests in one
              place.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">
              Digital Guest Book 📖
            </h3>
            <p className="text-gray-600">
              Collect messages and well-wishes from guests in a beautiful
              digital format.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Custom QR Codes 🔗</h3>
            <p className="text-gray-600">
              Personalized QR codes that match your wedding theme.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
