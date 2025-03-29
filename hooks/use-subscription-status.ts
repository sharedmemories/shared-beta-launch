import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSubscriptionStore } from '@/lib/store/subscription-store';
import { getPolarSubscription } from '@/app/actions/subscription-actions';

export function useSubscriptionStatus() {
  const { hasActiveSubscription, subscriptionPlan, message, setSubscription } =
    useSubscriptionStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['subscriptionStatus'],
    queryFn: getPolarSubscription,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: true, // Refetch if user focuses window
    refetchOnMount: false, // Don't refetch immediately if data is already there
  });

  useEffect(() => {
    if (data) {
      setSubscription(
        data.hasActiveSubscription,
        data.subscriptionPlan as 'STANDARD' | 'PRO' | 'BUSINESS' | null,
        data.message
      );
    }
  }, [data, setSubscription]);

  return {
    hasActiveSubscription,
    subscriptionPlan,
    message,
    isLoading,
    isError,
  };
}
