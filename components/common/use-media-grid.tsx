'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MediaCarousel } from './media-carousel';

interface Photo {
  id: number;
  src: string;
  caption?: string;
  hashtags: string[];
}

export default function UseCaseMediaGrid({
  photos,
  title,
  description,
}: {
  photos: Photo[];
  title: string;
  description: string;
}) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const router = useRouter();
  // Get unique hashtags from photos
  const allHashtags = Array.from(
    new Set(photos.flatMap((photo) => photo.hashtags))
  ).sort();

  // Filter photos based on active hashtag
  const filteredPhotos = activeFilter
    ? photos.filter((photo) => photo.hashtags.includes(activeFilter))
    : photos;

  // Handle opening the carousel
  const handleImageClick = (index: number) => {
    setCarouselIndex(index);
    setCarouselOpen(true);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      {/* Header Section */}
      <header className="mx-auto mb-12 max-w-6xl">
        <h1 className="mb-4 text-center font-serif text-4xl">{title}</h1>
        <p className="mb-8 text-center text-gray-600">{description}</p>
        <div className="mb-8 flex justify-center gap-4">
          <Button
            variant="outline"
            className="rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
            onClick={() => router.push('/memory-wall/')}
          >
            Photo wall
          </Button>
          <Button
            variant="outline"
            className="rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
          >
            More photos →
          </Button>
        </div>

        {/* Hashtag Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveFilter(null)}
            className={`rounded-md px-4 py-2 text-sm transition-colors ${
              activeFilter === null
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Photos
          </button>
          {allHashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag === activeFilter ? null : tag)}
              className={`rounded-md px-4 py-2 text-sm transition-colors ${
                activeFilter === tag
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Active Filter Display */}
        {activeFilter && (
          <div className="mb-8 text-center">
            <span className="inline-block rounded-md bg-purple-50 px-4 py-2 text-sm text-purple-600">
              Showing photos tagged with {activeFilter}
            </span>
          </div>
        )}
      </header>

      {/* Photo Grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo, index) => (
            <div key={photo.id} className="group relative">
              <div
                className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption || ''}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {photo.caption && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{photo.caption}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {photo.hashtags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveFilter(tag)}
                        className={`rounded-md px-2 py-1 text-xs transition-colors ${
                          activeFilter === tag
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Media Carousel */}
      <MediaCarousel
        media={filteredPhotos.map((photo) => ({
          id: photo.id.toString(),
          url: photo.src,
          type: 'IMAGE',
        }))}
        initialIndex={carouselIndex}
        open={carouselOpen}
        onOpenChange={setCarouselOpen}
      />
    </div>
  );
}
