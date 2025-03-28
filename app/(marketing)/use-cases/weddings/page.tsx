import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Questions } from '@/components/home/questions';
import WhyUseCase from '@/components/usecases/why-usecase';
import HeroUseCase from '@/components/usecases/hero-usecase';
import HowItWorksUseCase from '@/components/usecases/hiw-usecase';
import PricingUseCase from '@/components/usecases/pricing-usecase';
import FeatureUseCase from '@/components/usecases/features-usecase';
import { weddingQuestionsList } from '../../../../lib/data/use-cases-faq';

export default async function WeddingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-white">
      <HeroUseCase
        session={session}
        heroHeading1="Capture Every Angle of Your Wedding"
        heroHeading2="Effortlessly"
        heroText1="Create beautiful photo collections from your events. Let guests contribute their pictures and create memories that last forever."
        image="/img/wedding-use-case.jpg"
      />
      <HowItWorksUseCase />
      <FeatureUseCase />
      <PricingUseCase session={session} />
      <WhyUseCase />
      <section className="mx-auto bg-white">
        <Questions questions={weddingQuestionsList} />
      </section>
    </div>
  );
}
