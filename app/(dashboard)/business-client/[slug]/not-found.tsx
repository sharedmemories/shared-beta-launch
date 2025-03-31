import Link from 'next/link';
import { FolderX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
        <FolderX className="h-10 w-10 text-amber-600" />
      </div>
      <h2 className="text-2xl font-bold">Organization Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The organization you&apos;re looking for doesn&apos;t exist or you don&apos;t
        have access to it.
      </p>
      <Button asChild>
        <Link href="/dashboard">Return to dashboard</Link>
      </Button>
    </div>
  );
}
