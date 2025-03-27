import { SubscriptionType } from '@/types';

export const subscriptionPlans: SubscriptionType[] = [
  {
    priceId:
      process.env.STRIPE_PRICE_ID_STANDARD || 'price_1QFvgbEC7qs86lGuhiK3UurM',
    title: 'Standard',
    description:
      'For small gatherings like family reunions or birthday parties',
    price: '$9.99',
    features: [
      'Photo & Video Upload',
      'Create up to 6 event galleries',
      'Share via QR code',
      '0 - 50 guests',
      '15GB storage',
    ],
    excludedFeatures: ['Sub-accounts', 'Memory wall'],
    buttonText: 'Buy Now',
  },
  {
    priceId:
      process.env.STRIPE_PRICE_ID_PRO || 'price_1QFvhJEC7qs86lGuMbcy3drH',
    title: 'Pro',
    description: 'For large gatherings like weddings or corporate events',
    price: '$19.99',
    features: [
      'Create 3 event galleries',
      'Unlimited guests',
      '50GB storage',
      '3 Month Uploads & Zip Download',
      'Memory wall',
      '10GB storage',
      '6 Months Uploads & Zip Download',
    ],
    excludedFeatures: ['Sub-accounts'],
    buttonText: 'Buy Now',
    mostPopular: true,
  },
  // {
  //   priceId: 'price_1QFviCEC7qs86lGuU6ok7sXN',
  //   title: 'Popular for Weddings',
  //   description: 'For weddings, engagements, and other special occasions',
  //   price: '$99.99',
  //   features: [
  //     'Albums',
  //     'Create unlimited event galleries',
  //     'Share via QR code or magic link',
  //     '101-250 guests',
  //     '10GB storage',
  //     '3 Month Uploads & Zip Download',
  //   ],
  //   excludedFeatures: ['Sub-accounts'],
  //   buttonText: 'Buy Now',
  //   mostPopular: true,
  // },
  {
    priceId:
      process.env.STRIPE_PRICE_ID_BUSINESS || 'price_1QFvilEC7qs86lGuLLNz6Qpl',
    title: 'Business',
    description: 'For businesses looking to offer gallery services to clients',
    price: '$149.99',
    features: [
      'All Individual Plan features',
      'Create up to 50 sub-accounts',
      'Unlimited galleries',
      'Branded galleries for clients',
      '500GB storage',
      'Priority support',
      '150GB storage',
      '12 Months Uploads & Zip Download',
    ],
    buttonText: 'Subscribe Now',
  },
];

export const polarPlans = [
  {
    id: process.env.NEXT_PUBLIC_POLAR_STANDARD_PRODUCT_ID,
    title: 'Standard',
    description:
      'For small gatherings like family reunions or birthday parties',
    price: '$9.99',
    features: [
      'Up to 5 events',
      'Share via QR code',
      '15GB storage',
    ],
    excludedFeatures: ['Sub-accounts'],
    buttonText: 'I want this',
  },
  {
    id: process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,
    title: 'Pro',
    description: 'For large gatherings like weddings or corporate events',
    price: '$19.99',
    features: [
      'All Standard Plan features',
      'Up to 10 events',
      '50GB storage',
      '3 Month Uploads & Zip Download',
      'Photo wall',
    ],
    excludedFeatures: ['Sub-accounts'],
    buttonText: 'I want this',
    mostPopular: true,
  },

  {
    id: process.env.NEXT_PUBLIC_POLAR_BUSINESS_PRODUCT_ID,
    title: 'Business',
    description: 'For businesses looking to offer gallery services to clients',
    price: '$199.99',
    features: [
      'All Individual Plan features',
      'Create up to 50 sub-accounts',
      'Unlimited events',
      '500GB storage',
      'Priority support',
      '12 Month Uploads & Zip Download',
    ],
    buttonText: 'I want this',
  },
];
