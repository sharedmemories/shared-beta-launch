'use client';
import React from 'react';
import { Calendar, Users, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  title: string;
  date: string;
  imageCount: number;
  guestCount: number;
  coverImage: string;
  url: string;
}

export default function EventCard({
  title,
  date,
  imageCount,
  guestCount,
  coverImage,
  url,
}: EventCardProps) {
  const router = useRouter();
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden hover:cursor-pointer" onClick={() => {
      router.push(url);
    }}>
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"  
          width={300}
          height={300}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ImageIcon className="w-4 h-4" />
            <span>{imageCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{guestCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
