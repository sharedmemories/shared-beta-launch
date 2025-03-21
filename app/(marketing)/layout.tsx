import Header from '@/components/common/header';
// import { Analytics } from '@vercel/analytics/react';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      {/* <Analytics /> */}
    </div>
  );
}
