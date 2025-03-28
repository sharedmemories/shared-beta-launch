import { Spinner } from './spinner';
import { cn } from '@/lib/utils';

interface FullPageLoaderProps {
  className?: string;
  spinnerSize?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function FullPageLoader({
  className,
  spinnerSize = 'lg',
  text = 'Loading...',
}: FullPageLoaderProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background',
        className
      )}
    >
      <Spinner size={spinnerSize} className="text-primary" />
      <p className="mt-4 text-lg font-medium text-muted-foreground">{text}</p>
    </div>
  );
}
