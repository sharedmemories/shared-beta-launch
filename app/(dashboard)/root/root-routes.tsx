import React from 'react';
import { LayoutGrid, Users } from 'lucide-react';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  mainNav: [
    {
      name: 'Overview',
      url: '/root',
      icon: LayoutGrid,
    },
    {
      name: 'Users',
      url: '/organisations/users',
      icon: Users,
    },
  ],
};

export default function RootRoutes() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {data.mainNav.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
