'use client';

import React, { useState } from 'react';

import { getCustomerPortalLink } from '@/app/actions/get-customer-portal';
import { toast } from 'sonner';

export function CustomerPortalURL() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await getCustomerPortalLink();
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        toast.success(result.message || 'Could not open billing portal');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Manage Billing'}
    </button>
  );
}
