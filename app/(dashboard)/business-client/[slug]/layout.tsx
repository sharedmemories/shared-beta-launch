import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import SideBar from '@/components/dashboard/side-bar';
import DashHeader from '@/components/dashboard/dash-header';
import BusinessMembershipRoutes from './business-client-routes';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function BusinessMembershipLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const { slug } = params;

  const businessOrg = await auth.api.getFullOrganization({
    headers: await headers(),
    query: {
      organizationSlug: slug,
    },
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!businessOrg) {
    redirect('/dashboard');
  }

  // Check if session.user.id is in businessOrg.members.userId
  const isMember = businessOrg.members.some(
    (member) => member.userId === session?.user.id && member.role === 'member'
  );

  if (!isMember) {
    redirect('/dashboard');
  }

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
