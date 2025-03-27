import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
// import { Analytics } from '@vercel/analytics/react';

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const session = await auth.api.getSession({
      headers: await headers(),
    });
  return (
    <>
      <Header session={session}/>
      {children}
      {/* <Analytics /> */}
      <Footer />
    </>
  );
}
