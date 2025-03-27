import React from 'react';
import { WobbleCardShow } from './wobble-card-show';
import { WordReveal } from './word-reveal';

export default function WobbleWordSection() {
  return (
    <section className="hidden h-[100vh] w-full xl:block">
      <div className="flex h-full w-full justify-between px-[80px]">
        <div className="flex w-[60%] flex-col pr-4 pt-40">
          <WobbleCardShow />
        </div>
        <div className="h-full w-[40%]">
          <div className="flex flex-col pl-[120px]">
            <WordReveal text="View your event from every angle with Shared Memories" />
          </div>
        </div>
      </div>
    </section>
  );
}
