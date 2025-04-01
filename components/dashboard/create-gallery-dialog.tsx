'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { createGallery } from '@/app/actions/gallery-actions';
import { GalleryFormValues, gallerySchema } from '@/lib/validations/gallery';

interface CreateGalleryDialogProps {
  eventId: string;
  children: React.ReactNode;
}

export function CreateGalleryDialog({
  eventId,
  children,
}: CreateGalleryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      name: '',
      eventId: eventId,
    },
  });

  async function onSubmit(values: GalleryFormValues) {
    setIsLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      const result = await createGallery(formData);

      if (!result.success) {
        toast.error('Failed to create gallery');
      }

      toast.success(result.message);

      setIsOpen(false); // Close the dialog
    } catch {
      toast.info('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Gallery</DialogTitle>
          <DialogDescription>
            Create a new gallery to organize your event photos and videos.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallery Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ceremony Photos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              {isLoading ? 'Creating...' : 'Create Gallery'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
