import { auth } from "@/lib/auth";

export type AuthSession = typeof auth.$Infer.Session;

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