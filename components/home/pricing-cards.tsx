'use client';

import { Check, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth-store';
import { AuthSession, SubscriptionPlan } from '@/types';

type PricingCardsProps = {
  plans: SubscriptionPlan[];
  session: AuthSession | null;
};

export default function PricingCards({ plans, session }: PricingCardsProps) {
  const { openAuthDialog } = useAuthStore();

  const handlePlanSelection = (planId: string | undefined) => {
    if (!planId) return;

    if (!session) {
      openAuthDialog();
      return;
    }

    const customerEmail = encodeURIComponent(session.user?.email || '');
    const customerName = encodeURIComponent(session.user?.name || '');

    window.location.href = `/api/checkout?productId=${planId}&customer_email=${customerEmail}&customer_name=${customerName}`;
  };

  return (
    <>
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`flex h-full flex-col ${
            plan.mostPopular ? 'border-purple-500 shadow-lg' : ''
          }`}
        >
          {plan.mostPopular && (
            <div className="-mt-4 mb-[-0.9rem] flex justify-center">
              <span className="inline-block rounded-md bg-purple-600 px-3 py-1 text-sm font-bold text-white">
                🔥 Most Popular
              </span>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">{plan.title}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-4 text-4xl font-bold">{plan.price}</div>
            <ul className="space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.excludedFeatures?.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-400">
                  <X className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-red-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto pt-4">
            <Button
              onClick={() => handlePlanSelection(plan.id)}
              className={`w-full rounded-md px-8 py-3 transition-colors ${
                plan.mostPopular
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
