'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash, Presentation } from 'lucide-react';

interface EventHeaderProps {
  event: {
    id: string;
    name: string;
    code: string;
  } | null;
}

export function EventHeader({ event }: EventHeaderProps) {
  if (!event) {
    return <div>No event found</div>; // Fallback UI
  }
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{event.name}</h2>
        <p className="text-muted-foreground text-sm">
          Event Code: {event.code}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/memory-wall/${event.code}`} target="_blank">
              <Presentation className="mr-2 h-4 w-4" />
              Open Memory Wall
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Event
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
