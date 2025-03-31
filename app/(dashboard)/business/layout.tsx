import SideBar from '../../../components/dashboard/side-bar';
import DashHeader from '../../../components/dashboard/dash-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import BusinessRoutes from './business-routes';

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideBar>
        <BusinessRoutes />
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
