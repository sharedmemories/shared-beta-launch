import * as React from 'react';
import { Image, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

export type EmptyPlaceholderProps = React.HTMLAttributes<HTMLDivElement>;

type EmptyPlaceholderComponent = React.ForwardRefExoticComponent<
  EmptyPlaceholderProps & React.RefAttributes<HTMLDivElement>
> & {
  Icon: typeof EmptyPlaceholderIcon;
  Title: typeof EmptyPlaceholderTitle;
  Description: typeof EmptyPlaceholderDescription;
};

// eslint-disable-next-line react/display-name
const EmptyPlaceholder = React.forwardRef<
  HTMLDivElement,
  EmptyPlaceholderProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50',
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}) as EmptyPlaceholderComponent;

interface EmptyPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: 'upload' | 'image';
}

const EmptyPlaceholderIcon = React.forwardRef<
  SVGSVGElement,
  EmptyPlaceholderIconProps
>(({ name, className, ...props }, ref) => {
  const Icon = name === 'upload' ? Upload : Image;

  return (
    <div
      className={cn(
        'flex h-20 w-20 items-center justify-center rounded-full bg-muted',
        className
      )}
    >
      <Icon className={cn('h-10 w-10', className)} ref={ref} {...props} />
    </div>
  );
});

EmptyPlaceholderIcon.displayName = 'EmptyPlaceholder.Icon';

type EmptyPlaceholderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const EmptyPlaceholderTitle = React.forwardRef<
  HTMLHeadingElement,
  EmptyPlaceholderTitleProps
>(({ className, ...props }, ref) => {
  return (
    <h2
      className={cn('mt-6 text-xl font-semibold', className)}
      ref={ref}
      {...props}
    />
  );
});

EmptyPlaceholderTitle.displayName = 'EmptyPlaceholder.Title';

type EmptyPlaceholderDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

const EmptyPlaceholderDescription = React.forwardRef<
  HTMLParagraphElement,
  EmptyPlaceholderDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(
        'mt-3 mb-8 text-center text-sm font-normal leading-6 text-muted-foreground',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

EmptyPlaceholderDescription.displayName = 'EmptyPlaceholder.Description';

EmptyPlaceholder.Icon = EmptyPlaceholderIcon;
EmptyPlaceholder.Title = EmptyPlaceholderTitle;
EmptyPlaceholder.Description = EmptyPlaceholderDescription;

export { EmptyPlaceholder };
