import { prisma } from '@/lib/prisma';
import { Webhooks } from '@polar-sh/nextjs';
import { SubscriptionPlan } from '@prisma/client';

const subscriptionPlanMap: Record<string, SubscriptionPlan> = {
  standard: SubscriptionPlan.STANDARD,
  pro: SubscriptionPlan.PRO,
  business: SubscriptionPlan.BUSINESS,
};

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    try {
      const { type, data } = payload;

      switch (type) {
        case 'subscription.created': {
          const subscription = await prisma.subscription.create({
            data: {
              userId: data.customer.externalId,
              subscriptionId: data.id,
              customerId: data.customerId,
              priceId: data.priceId,
              currentPeriodEnd: data.currentPeriodEnd,
              status: data.status,
              type:
                subscriptionPlanMap[
                  data.product.name.toLowerCase() as keyof typeof subscriptionPlanMap
                ] ?? SubscriptionPlan.STANDARD, // Default fallback
            },
          });

          console.log('Subscription created:', subscription);
          break;
        }

        case 'subscription.updated': {
          const subscription = await prisma.subscription.update({
            where: { subscriptionId: data.id },
            data: {
              status: data.status,
              currentPeriodEnd: data.currentPeriodEnd,
              updatedAt: new Date(),
            },
          });

          console.log('Subscription updated:', subscription);
          break;
        }

        case 'subscription.canceled': {
          const subscription = await prisma.subscription.update({
            where: { subscriptionId: data.id },
            data: { status: 'canceled' },
          });

          console.log('Subscription canceled:', subscription);
          break;
        }

        default:
          console.log('Unhandled event:', type);
          break;
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  },
});
