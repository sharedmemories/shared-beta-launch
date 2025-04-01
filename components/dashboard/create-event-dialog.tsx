'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { createEvent } from '@/app/actions/events-actions';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { EventFormValues, eventSchema } from '@/lib/validations/events';
import { useSubscriptionStatus } from '@/hooks/use-subscription-status';
import { toast } from 'sonner';

export function CreateEventDialog({
  openDialogBox,
}: {
  openDialogBox?: boolean;
}) {
  const [isDataLoading, setDataLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { hasActiveSubscription, isLoading } = useSubscriptionStatus();

  useEffect(() => {
    setOpen(openDialogBox || false);
  }, [openDialogBox]);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      date: new Date(),
    },
  });

  const onDateSelect = useCallback(
    (
      date: Date | undefined,
      field: ControllerRenderProps<EventFormValues, 'date'>
    ) => {
      field.onChange(date);
    },
    []
  );
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        // Reset form when closing
        form.reset();
      }
      setOpen(newOpen);
    },
    [form]
  );

  const onSubmit = useCallback(
    async (values: EventFormValues) => {
      setDataLoading(true);
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          if (key === 'date' && value instanceof Date) {
            // Ensure the date is valid before sending
            const dateValue = new Date(value);
            if (!isNaN(dateValue.getTime())) {
              formData.append(key, dateValue.toISOString());
            }
          } else {
            formData.append(key, value as string);
          }
        }
      });

      try {
        const result = await createEvent(formData);

        if (!result.success) {
          toast.error(result.message || 'Failed to create event');
        }

        toast.success('Success');

        handleOpenChange(false);
      } catch {
        toast.info('Something went wrong');
      } finally {
        setDataLoading(false);
      }
    },
    [handleOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => {
          if (
            document
              .querySelector('[role="dialog"]')
              ?.contains(e.target as Node)
          ) {
            e.preventDefault();
          }
        }}
      >
        {!hasActiveSubscription ? (
          <DialogTitle>Subscribe First 😏</DialogTitle>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
              <DialogDescription>
                Enter the name for your new event here.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Wedding 2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A journey of love captured in moments."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Location</FormLabel>
                      <FormControl>
                        <Input placeholder="The Grand Hotel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          setDate={(date) => onDateSelect(date, field)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-purple-600 text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                  disabled={isLoading}
                >
                  {isDataLoading ? 'Creating...' : 'Create Event'}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
