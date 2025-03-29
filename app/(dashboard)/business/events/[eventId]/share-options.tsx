'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Copy, Download, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

interface ShareOptionsProps {
  eventId: string;
  eventCode: string;
  qrCode: string;
  uploadUrl: string;
  memoryWallUrl: string;
}

export function ShareOptions({
  eventCode,
  qrCode,
  uploadUrl,
  memoryWallUrl,
}: ShareOptionsProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'The link has been copied to your clipboard.',
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Failed to copy',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `event-${eventCode}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>QR Code</CardTitle>
          <CardDescription>
            Display this QR code at your event for easy access.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative aspect-square w-full max-w-[200px]">
            <Image
              src={qrCode}
              alt="QR Code"
              fill
              className="rounded-lg object-contain"
            />
          </div>
          <Button variant="outline" onClick={downloadQRCode}>
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Share Links</CardTitle>
          <CardDescription>
            Share these links with your guests to let them upload media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Upload URL</Label>
            <div className="flex space-x-2">
              <Input value={uploadUrl} readOnly />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(uploadUrl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Event Code</Label>
            <div className="flex space-x-2">
              <Input value={eventCode} readOnly />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(eventCode)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Memory Wall</Label>
            <div className="flex space-x-2">
              <Input value={memoryWallUrl} readOnly />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(memoryWallUrl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/memory-wall/${eventCode}`} target="_blank">
                  <Presentation className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Display this page at your venue to show a live photo wall of all
              uploaded images.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}