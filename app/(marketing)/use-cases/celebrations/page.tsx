import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Questions } from '@/components/home/questions';
import WhyUseCase from '@/components/usecases/why-usecase';
import HeroUseCase from '@/components/usecases/hero-usecase';
import HowItWorksUseCase from '@/components/usecases/hiw-usecase';
import PricingUseCase from '@/components/usecases/pricing-usecase';
import FeatureUseCase from '@/components/usecases/features-usecase';
import { weddingQuestionsList } from '../../../../lib/data/use-cases-faq';

export default async function CelebrationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="min-h-screen bg-white">
      <HeroUseCase
        session={session}
        heroHeading1="Don't Miss a Moment"
        heroHeading2="Celebrate Every Moment"
        heroText1="Know how much your guests enjoyed the celebration, and share the memories with everyone."
        image="/img/celebrations-use-case.jpg"
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
