import { create } from 'zustand';

type SubscriptionPlan = 'STANDARD' | 'PRO' | 'BUSINESS' | null;

interface SubscriptionState {
  hasActiveSubscription: boolean;
  subscriptionPlan: SubscriptionPlan;
  message: string;
  setSubscription: (
    hasSubscription: boolean,
    plan: SubscriptionPlan,
    message: string
  ) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  hasActiveSubscription: false,
  subscriptionPlan: null,
  message: '',

  setSubscription: (hasSubscription, plan, message) =>
    set({
      hasActiveSubscription: hasSubscription,
      subscriptionPlan: plan,
      message,
    }),
}));
