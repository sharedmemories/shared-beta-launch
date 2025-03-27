import React from 'react';
import { Comments } from './comments';

export default function Testimonials() {
  return (
    <section className="w-full px-8 pt-10 sm:px-0 sm:pt-0 md:px-0 md:pt-0 xl:px-0 xl:pt-0 bg-white dark:bg-gray-900">
      <div className="flex h-full w-full flex-col items-center pb-[100px] pt-10">
        <div>
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-zinc-100 md:text-4xl">
            What people are saying 🗣️
          </h1>
        </div>
        <div className="mb-6 text-md text-gray-700 dark:text-zinc-300 md:text-xl">
          Don&apos;t just take our word for it. Here&apos;s what{' '}
          <span className="font-bold">real people</span> are saying about Shared
          Memories.
        </div>

        <div className="w-full overflow-x-hidden">
          <Comments />
        </div>
      </div>
    </section>
  );
}
