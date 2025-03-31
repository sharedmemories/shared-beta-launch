import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import PricingCards from '@/components/home/pricing-cards';
import { polarPlans } from '@/lib/data/pricing-data';
import { authClient } from '@/lib/auth-client';

export function SubscribeDialog() {
  const { data: session } = authClient.useSession(); 
  return (
    <Dialog>
      <DialogTrigger className='cursor-pointer w-full' >
        Subscribe
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Choose the plan that&apos;s right for you.</DialogTitle>
        </DialogHeader>
        <ScrollArea className="my-8  max-h-[80vh]">
          <div className='grid grid-cols-1 gap-4'>

          <PricingCards plans={polarPlans} session={session} />  
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
