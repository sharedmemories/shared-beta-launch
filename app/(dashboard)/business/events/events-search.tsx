'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

export function EventsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/dashboard/events?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <Input
        type="search"
        name="search"
        placeholder="Search events..."
        className="h-9 w-[150px] lg:w-[250px]"
        defaultValue={searchParams.get('search') ?? ''}
      />
      <Button type="submit" size="sm" variant="secondary">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search events</span>
      </Button>
    </form>
  );
}