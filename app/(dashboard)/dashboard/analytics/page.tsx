import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAnalyticsData } from './get-analytics-data';
import { AnalyticsDashboard } from './analytics-dashboard';
import { EventMetrics } from './event-metrics';
import { StorageMetrics } from './storage-metrics';
import { UploadChart } from './upload-chart';

export default async function AnalyticsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }
  const analytics = await getAnalyticsData(session.user.id);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            View your platform usage and metrics
          </p>
        </div>

        <AnalyticsDashboard data={analytics} />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Event Metrics</h3>
            <EventMetrics
              totalEvents={analytics.events}
              totalUploads={analytics.totalUploads}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Storage Metrics</h3>
            <StorageMetrics storageUsed={analytics.storageUsage} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Upload Activity</h3>
          <UploadChart data={analytics.uploadsByDay} />
        </div>
      </div>
    </div>
  );
}
