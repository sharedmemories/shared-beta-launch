import { Calendar, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <ImageIcon className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageUploadsPerEvent}</div>
          <p className="text-muted-foreground text-xs">Media items per event</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Event Distribution
          </CardTitle>
          <Calendar className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Active Events</p>
                <p className="text-muted-foreground text-xs">
                  Currently running events
                </p>
              </div>
              <div className="text-2xl font-bold">{totalEvents}</div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Total Uploads</p>
                <p className="text-muted-foreground text-xs">
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
