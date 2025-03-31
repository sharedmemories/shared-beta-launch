import type React from 'react';
import SideBar from '@/components/dashboard/side-bar';
import { requireOrganizationRole } from '@/lib/auth-utils';
import DashHeader from '@/components/dashboard/dash-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import BusinessMembershipRoutes from './business-client-routes';

export default async function BusinessMembershipLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const resolvedParams = await params;

  const slug = resolvedParams.slug || '';

  // This will handle authentication, organization existence, and role checks
  // It will automatically redirect if any check fails
  await requireOrganizationRole(slug, 'member');

  return (
    <SidebarProvider>
      <SideBar>
        <BusinessMembershipRoutes slug={slug} />
      </SideBar>
      <section className="flex flex-1 flex-col">
        <SidebarInset>
          <DashHeader />
          <div className="p-4">{children}</div>
        </SidebarInset>
      </section>
    </SidebarProvider>
  );
}
