import { Users, Upload, HardDrive, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsDashboardProps {
  data: {
    events: number;
    totalUploads: number;
    storageUsage: number;
    recentAnalytics: {
      type: string;
      value: number;
      createdAt: Date;
    }[];
  };
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const formatStorage = (gb: number) => {
    if (gb < 1) {
      return `${Math.round(gb * 1024)} MB`;
    }
    return `${gb.toFixed(1)} GB`;
  };

  const getActivityTrend = () => {
    const recentUploads = data.recentAnalytics
      .filter((a) => a.type === 'UPLOAD_COUNT')
      .slice(0, 7);

    if (recentUploads.length < 2) return 0;

    const recent = recentUploads
      .slice(0, 3)
      .reduce((acc, curr) => acc + curr.value, 0);
    const previous = recentUploads
      .slice(3, 6)
      .reduce((acc, curr) => acc + curr.value, 0);

    if (previous === 0) return 100;
    return ((recent - previous) / previous) * 100;
  };

  const activityTrend = getActivityTrend();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.events}</div>
          <p className="text-xs text-muted-foreground">Active events</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
          <Upload className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalUploads}</div>
          <p className="text-xs text-muted-foreground">Media items</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatStorage(data.storageUsage)}
          </div>
          <p className="text-xs text-muted-foreground">Total storage</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activity</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {activityTrend > 0 ? '+' : ''}
            {activityTrend.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">Last 7 days</p>
        </CardContent>
      </Card>
    </div>
  );
}
