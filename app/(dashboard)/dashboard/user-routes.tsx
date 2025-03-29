'use client';

import React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Calendar,
  CameraIcon,
  // ChartColumn,
  ChevronRight,
  Contact,
  LayoutGrid,
  MonitorPlay,
  Receipt,
  Settings2,
  BriefcaseBusiness,
} from 'lucide-react';
import { MembershipRoutes } from './membership-routes';
import Link from 'next/link';
import { SubscribeDialog } from './subscribe-dialog';
import { CustomerPortalURL } from '@/components/dashboard/customer-portal-link';
import { useSubscriptionStatus } from '@/hooks/use-subscription-status';
import { cn } from '@/lib/utils';

const data = {
  mainNav: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: LayoutGrid,
    },
    {
      name: 'Events',
      url: '/dashboard/events',
      icon: Calendar,
    },
    {
      name: 'Galleries',
      url: '/dashboard/galleries',
      icon: CameraIcon,
    },
    {
      name: 'Pending Uploads',
      url: '/dashboard/media/pending',
      icon: MonitorPlay,
    },
    // {
    //   name: 'Analytics',
    //   url: '/dashboard/analytics',
    //   icon: ChartColumn,
    // },
  ],
  routesWithSubRoutes: [
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Profile',
          url: '/dashboard/profile',
        },
      ],
    },
  ],
};

export default function DashUserRoutes() {
  const { hasActiveSubscription, isLoading, subscriptionPlan } =
    useSubscriptionStatus();

  const isBusinessSubscription =
    subscriptionPlan === 'BUSINESS' && hasActiveSubscription;

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
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

      {hasActiveSubscription ? (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Billing</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton>
                <Receipt /> <CustomerPortalURL />
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenu>
        </SidebarGroup>
      ) : (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Billing</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                className={cn(
                  'border-primary text-purple-800 from-primary/10',
                  'to-primary/20 hover:from-primary/20 hover:to-primary/30',
                  'w-full rounded-full border bg-gradient-to-r',
                  'px-4 py-4 text-start transition-all hover:bg-gradient-to-r'
                )}
              >
                <SubscribeDialog />
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenu>
        </SidebarGroup>
      )}

      {isBusinessSubscription ? (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Business</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton>
                <BriefcaseBusiness />{' '}
                <Link href="/business">Business Portal</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenu>
        </SidebarGroup>
      ) : (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Memberships</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton>
                <Contact /> <MembershipRoutes />
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenu>
        </SidebarGroup>
      )}

      <SidebarGroup>
        <SidebarGroupLabel>Config</SidebarGroupLabel>
        <SidebarMenu>
          {data.routesWithSubRoutes.map((item) => (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
