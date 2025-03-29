'use client';

import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export function GalleryPagination({
  currentPage,
  totalPages,
  searchQuery,
}: GalleryPaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(searchQuery && { search: searchQuery }),
    });
    router.push(`/galleries?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            // disabled={currentPage === 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            // disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
