'use client';

import { useMediaQuery } from 'react-responsive';
import {
  Pagination as Wrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export interface PaginationProps {
  page: number;
  lastPage: number;
}

export function Pagination({ page, lastPage }: PaginationProps) {
  const isMobile = useMediaQuery({ maxWidth: '640px' });

  const currentPage = +page;
  const totalPages = +lastPage;
  const pagesToShow = isMobile ? 3 : 5;

  const sidePages = Math.floor(pagesToShow / 2);

  let startPage = Math.max(1, currentPage - sidePages);
  let endPage = Math.min(totalPages, currentPage + sidePages);

  if (endPage - startPage + 1 < pagesToShow) {
    if (startPage === 1) {
      endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Wrapper>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${currentPage - 1}`}
            isDisabled={currentPage === 1}
          />
        </PaginationItem>

        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href='1'>1</PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={`${pageNumber}`}
              isActive={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={`${totalPages}`}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={`${currentPage + 1}`}
            isDisabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Wrapper>
  );
}
