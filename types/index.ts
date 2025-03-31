import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';

export type AuthSession = typeof auth.$Infer.Session;
export type Invitation = typeof authClient.$Infer.Invitation;
export type ActiveOrganization = typeof authClient.$Infer.ActiveOrganization;


export type Organization = {
  id: string
  name: string
  slug: string
  logo: string | null
  metadata: string | null
  createdAt: Date
  invitations: {
    id: string
    email: string
    inviterId: string
    organizationId: string
    role: string
    status: string
    expiresAt: Date
    createdAt: Date
  }[]
  members: {
    id: string
    userId: string
    organizationId: string
    role: string
    createdAt: Date
    user?: {
      id: string
      name: string
      email: string
      image: string | null
    }
  }[]
  teams: {
    id: string
    name: string
    organizationId: string
    createdAt: Date
    updatedAt?: Date
  }[] | null
}


export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    linkedIn?: string;
    tiktok?: string;
  };
  keywords: string[];
};

export type SubscriptionPlan = {
  id: string | undefined;
  title: string;
  description: string;
  price: string;
  features: string[];
  excludedFeatures?: string[];
  buttonText: string;
  mostPopular?: boolean;
};

export type SubscriptionType = {
  priceId: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  excludedFeatures?: string[];
  buttonText: string;
  mostPopular?: boolean;
  paymentLink?: string;
};
