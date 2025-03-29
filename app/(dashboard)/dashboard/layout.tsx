import UserRoutes from './user-routes';
import SideBar from '../../../components/dashboard/side-bar';
import DashHeader from '../../../components/dashboard/dash-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';


export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <SidebarProvider>
      <SideBar>
        <UserRoutes />
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
