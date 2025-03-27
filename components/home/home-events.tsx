import React from 'react'
import EventCard from './event-card';

const events = [
  {
    title: 'Greg & Sasha’s Wedding',
    date: 'March 15, 2024',
    imageCount: 247,
    guestCount: 120,
    coverImage:
      'https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?q=80&w=4480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: '/use-cases/weddings/gallery',
  },
  {
    title: 'Music Festival',
    date: 'December 10, 2024',
    imageCount: 183,
    guestCount: 75,
    coverImage:
      'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: '/use-cases/celebrations/gallery',
  },
  {
    title: 'Digital Marketing Conference 2024',
    date: 'March 5, 2024',
    imageCount: 394,
    guestCount: 350,
    coverImage:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    url: '/use-cases/corporate-events/gallery',
  },
];


export default function HomeEvents() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">View sample events</h2>
      <p className="text-gray-600">This could be your event soon 😉 </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
    </div>
  </section>
  )
}
