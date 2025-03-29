import React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  Calendar,
  CameraIcon,
  ChartColumn,
  Contact,
  LayoutGrid,
} from 'lucide-react';



export default function BusinessMembershipRoutes({slug}: {slug: string}) {

  const data = {
    mainNav: [
      {
        name: 'Main Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
      },
      {
        name: 'Membership Page',
        url: `/business-client/${slug}`,
        icon: Contact,
      },
      {
        name: 'Membership Events',
        url: '/business-client/events',
        icon: Calendar,
      },
      {
        name: 'Membership Galleries',
        url: '/business-client/galleries',
        icon: CameraIcon,
      },
      {
        name: 'Membership Analytics',
        url: '/business-client/analytics',
        icon: ChartColumn,
      },
    ],
  };
  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel> Navigation</SidebarGroupLabel>
        <SidebarMenu>
          {data.mainNav.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild tooltip={item.name}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
