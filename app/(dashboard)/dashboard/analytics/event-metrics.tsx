import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Image as ImageIcon } from 'lucide-react';

interface EventMetricsProps {
  totalEvents: number;
  totalUploads: number;
}

export function EventMetrics({ totalEvents, totalUploads }: EventMetricsProps) {
  const averageUploadsPerEvent =
    totalEvents > 0 ? Math.round(totalUploads / totalEvents) : 0;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Uploads per Event
          </CardTitle>
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageUploadsPerEvent}</div>
          <p className="text-xs text-muted-foreground">Media items per event</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Event Distribution
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Active Events</p>
                <p className="text-xs text-muted-foreground">
                  Currently running events
                </p>
              </div>
              <div className="text-2xl font-bold">{totalEvents}</div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Total Uploads</p>
                <p className="text-xs text-muted-foreground">
                  Across all events
                </p>
              </div>
              <div className="text-2xl font-bold">{totalUploads}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
