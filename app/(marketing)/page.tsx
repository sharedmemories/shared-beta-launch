import React from 'react';

import HomeEvents from '@/components/home/home-events';
import HowItWorks from '@/components/home/how-it-works';
import CTA from '@/components/home/cta';
import Testimonials from '@/components/home/testimonials';
import WobbleWordSection from '@/components/home/wobble-word-section';
import QuestionsSection from '@/components/home/questions-section';
import PricingSection from '@/components/home/pricing-section';
import Hero from '@/components/home/hero';
import Footer from '@/components/common/footer';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Header from '@/components/common/header';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
