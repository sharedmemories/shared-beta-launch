import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchGalleries } from './fetch-galleries';
import { GallerySearchForm } from './gallery-search';
import { GalleryPagination } from './gallery-pagination';
import { GalleryGrid } from '@/components/dashboard/gallery-grid';
import { DashboardShell } from '@/components/dashboard/dash-shell';
import { EmptyPlaceholder } from '@/components/dashboard/empty-placeholder';
import { DashboardTitleHeader } from '@/components/dashboard/dash-title-header';

interface GalleriesPageProps {
  searchParams: { search?: string; page?: string };
}

export default async function GalleriesPage({
  searchParams,
}: GalleriesPageProps) {
  const resolvedSearchParams = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    redirect('/');
  }

  const currentPage = Number(resolvedSearchParams.page) || 1;
  const search = resolvedSearchParams.search || '';

  const { galleries, pages } = await fetchGalleries({
    page: currentPage,
    search,
  });

  return (
    <DashboardShell>
      <DashboardTitleHeader
        heading="Galleries"
        text="Manage all your galleries across events."
      >
        <GallerySearchForm initialQuery={search} />
      </DashboardTitleHeader>

      <Suspense fallback={<div>Loading...</div>}>
        {galleries.length === 0 ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="image" />
            <EmptyPlaceholder.Title>No galleries found</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {search
                ? 'No galleries match your search. Try a different query.'
                : "You haven't created any galleries yet. Start by creating a new event."}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        ) : (
          <div className="grid gap-8">
            <GalleryGrid galleries={galleries} />
            {pages > 1 && (
              <GalleryPagination
                currentPage={currentPage}
                totalPages={pages}
                searchQuery={search}
              />
            )}
          </div>
        )}
      </Suspense>
    </DashboardShell>
  );
}
