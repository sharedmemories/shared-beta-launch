import React from 'react';
import CTA from '@/components/home/cta';
import Hero from '@/components/home/hero';
import HomeEvents from '@/components/home/home-events';
import HowItWorks from '@/components/home/how-it-works';
import Testimonials from '@/components/home/testimonials';
import PricingSection from '@/components/home/pricing-section';
import QuestionsSection from '@/components/home/questions-section';
import WobbleWordSection from '@/components/home/wobble-word-section';

import { getCachedSession } from '@/lib/auth-utils';

export default async function Home() {
  const session = await getCachedSession();

  return (
    <>
      <Hero session={session} />
      <HomeEvents />
      <HowItWorks />
      <PricingSection session={session} />
      <Testimonials />
      <WobbleWordSection />
      <QuestionsSection />
      <CTA session={session} />
    </>
  );
}
