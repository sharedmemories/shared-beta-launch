import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ checkoutId?: string }>;
}) {
  const resolvedSearchParams = (await searchParams).checkoutId;

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-center">
          <p className="text-muted-foreground">
            Thank you! Your checkout is now being processed.
          </p>
          <p className="font-medium">
            Order ID: <span className="font-mono">{resolvedSearchParams}</span>
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            A confirmation email has been sent to your email address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
