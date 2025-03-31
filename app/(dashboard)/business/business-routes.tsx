import React from 'react';
import { AlignVerticalJustifyStart, LayoutGrid, Users } from 'lucide-react';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { CustomerPortalURL } from '@/components/dashboard/customer-portal-link';

const data = {
  mainNav: [
    {
      name: 'My Business',
      url: '/business',
      icon: LayoutGrid,
    },
    {
      name: 'Clients',
      url: '/business/clients',
      icon: Users,
    },
    {
      name: 'Customer Dashboard',
      url: '/dashboard',
      icon: AlignVerticalJustifyStart,
    },
  ],
};

export default function BusinessRoutes() {
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

      <SidebarMenu>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton>
            <LiaMoneyBillWaveSolid /> <CustomerPortalURL />
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
