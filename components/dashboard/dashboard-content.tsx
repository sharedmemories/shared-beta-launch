'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CalendarDays,
  FolderPlus,
  Image as ImageIcon,
  Plus,
  Calendar,
  Upload,
  MapPin,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { GalleryGrid } from './gallery-grid';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/dashboard/dash-shell';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CreateEventDialog } from '@/components/dashboard/create-event-dialog';

interface DashboardContentProps {
  session: {
    user: {
      id: string;
      name: string;
    };
  };
  upcomingEvents: Array<{
    id: string;
    title: string;
    date?: Date;
    location?: string | null;
    description?: string | null;
    status: string;
    code: string;
  }>;
  recentGalleries: Array<{
    id: string;
    name: string;
    createdAt: Date;
    event: {
      id: string;
      title: string;
    };
    _count: {
      media: number;
    };
  }>;
  totalEvents: number;
  totalGalleries: number;
  totalMedia: number;
  storageUsed: number;
  children?: React.ReactNode;
}

export function DashboardContent({
  session,
  upcomingEvents,
  recentGalleries,
  totalEvents,
  totalGalleries,
  totalMedia,
  storageUsed,
  children,
}: DashboardContentProps) {
  const storageLimit = 10;
  const isLowStorage = storageUsed > storageLimit * 0.8;
  const [open, setOpen] = useState(false);

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name}
          </p>
        </div>
      </div>
      {children}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="hover:bg-sidebar-accent cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Create Event</CardTitle>
            <Plus className="text-muted-foreground h-4 w-4" />
            {open && (
              <div style={{ display: 'none' }}>
                <CreateEventDialog openDialogBox={open} />
              </div>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              Start planning a new event
            </p>
          </CardContent>
        </Card>
        <Link href="/dashboard/events" prefetch>
          <Card className="hover:bg-sidebar-accent cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Manage your events
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/galleries" prefetch>
          <Card className="hover:bg-sidebar-accent cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Galleries</CardTitle>
              <FolderPlus className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Manage your photo galleries
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/media/pending" prefetch>
          <Card className="hover:bg-sidebar-accent cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Uploads
              </CardTitle>
              <ImageIcon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Review pending media uploads
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Galleries
            </CardTitle>
            <FolderPlus className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGalleries}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Items</CardTitle>
            <ImageIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMedia}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Upload className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBytes(storageUsed * 1024 * 1024 * 1024)}
            </div>
            <p className="text-muted-foreground text-xs">
              of {formatBytes(storageLimit * 1024 * 1024 * 1024)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        {isLowStorage && (
          <Alert variant="destructive">
            <AlertTitle>Low Storage Space</AlertTitle>
            <AlertDescription>
              You are using {Math.round((storageUsed / storageLimit) * 100)}% of
              your storage space. Consider upgrading your plan or removing
              unused media.
            </AlertDescription>
          </Alert>
        )}
        {upcomingEvents.length > 0 && (
          <Alert>
            <AlertTitle>Upcoming Events</AlertTitle>
            <AlertDescription>
              You have {upcomingEvents.length} upcoming event
              {upcomingEvents.length > 1 ? 's' : ''}. The next event is{' '}
              {upcomingEvents[0].title} on{' '}
              {upcomingEvents[0].date
                ? new Date(upcomingEvents[0].date).toLocaleDateString()
                : 'No date set'}
              .
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Events</h2>
          <Button variant="outline" asChild className="hover:bg-sidebar-accent">
            <Link href="/dashboard/events">View all events</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <Link key={event.id} href={`/dashboard/events/${event.id}`}>
              <Card className="hover:bg-sidebar-accent cursor-pointer">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                  <CardDescription>
                    {event.description}
                    {event.date
                      ? new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'No date set'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="text-muted-foreground h-4 w-4" />
                      {event.location || 'No location set'}
                    </span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Galleries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Recent Galleries
          </h2>
          <Button variant="outline" asChild className="hover:bg-sidebar-accent">
            <Link href="/dashboard/galleries" prefetch>
              View all galleries
            </Link>
          </Button>
        </div>
        <GalleryGrid galleries={recentGalleries} />
      </div>
    </DashboardShell>
  );
}
