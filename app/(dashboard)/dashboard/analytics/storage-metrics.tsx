import { Database, HardDrive } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StorageMetricsProps {
  storageUsed: number;
}

export function StorageMetrics({ storageUsed }: StorageMetricsProps) {
  const formatStorage = (gb: number) => {
    if (gb < 1) {
      return `${Math.round(gb * 1024)} MB`;
    }
    return `${gb.toFixed(1)} GB`;
  };

  // Calculate storage distribution (example values)
  const imageStorage = storageUsed * 0.7; // 70% images
  const videoStorage = storageUsed * 0.3; // 30% videos

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Storage Distribution
          </CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Images</span>
                <span className="font-medium">{formatStorage(imageStorage)}</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Videos</span>
                <span className="font-medium">{formatStorage(videoStorage)}</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Total Storage</p>
                <p className="text-xs text-muted-foreground">
                  Currently used storage
                </p>
              </div>
              <div className="text-2xl font-bold">{formatStorage(storageUsed)}</div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Files</p>
                <p className="text-xs text-muted-foreground">
                  Images and videos
                </p>
              </div>
              <div className="text-sm font-medium">
                {Math.round(imageStorage * 1000)} images, {Math.round(videoStorage * 100)} videos
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 