'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatBytes } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type Client = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  eventsCount: number;
  storageUsed: number;
  subscriptionPlan: string;
  subscriptionStatus: string;
  lastActive: Date;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.image} alt={row.original.name} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{row.original.name}</span>
            <span className="text-xs text-muted-foreground">
              {row.original.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original.role}</Badge>;
    },
  },
  {
    accessorKey: 'eventsCount',
    header: 'Events',
    cell: ({ row }) => {
      return <span>{row.original.eventsCount}</span>;
    },
  },
  {
    accessorKey: 'storageUsed',
    header: 'Storage Used',
    cell: ({ row }) => {
      return formatBytes(row.original.storageUsed);
    },
  },
  {
    accessorKey: 'subscriptionPlan',
    header: 'Plan',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>{row.original.subscriptionPlan}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.subscriptionStatus}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastActive',
    header: 'Last Active',
    cell: ({ row }) => {
      return (
        <span>{new Date(row.original.lastActive).toLocaleDateString()}</span>
      );
    },
  },
];