import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SideBar from '../../../components/dashboard/side-bar';
import DashHeader from '../../../components/dashboard/dash-header';
import RootRoutes from './root-routes';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideBar>
        <RootRoutes />
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
