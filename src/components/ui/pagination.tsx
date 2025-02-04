import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronDoubleLeft, ChevronDoubleRight } from '@/icons';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      'flex flex-row items-center gap-1 overflow-x-auto',
      className,
    )}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  isDisabled?: boolean;
} & React.ComponentProps<'a'>;

const PaginationLink = ({
  href,
  className,
  isActive,
  isDisabled,
  ...props
}: PaginationLinkProps) => (
  <Link
    href={href || ''}
    scroll={false}
    className={cn(
      buttonVariants({
        size: 'pagination',
        variant: 'pagination',
      }),
      isActive && 'border-situational-primary bg-surface-brand text-white',
      isDisabled && 'pointer-events-none opacity-50',
      className,
    )}
    aria-current={isActive ? 'page' : undefined}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = (
  props: React.ComponentProps<typeof PaginationLink>,
) => (
  <PaginationLink aria-label='Go to previous page' {...props}>
    <ChevronDoubleLeft />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label='Go to next page' {...props}>
    <ChevronDoubleRight />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    aria-hidden
    className={cn(
      'border-primary flex size-10 items-center justify-center rounded-md border bg-surface-primary text-sm text-text-secondary',
      className,
    )}
    {...props}
  >
    ...
    <span className='sr-only'>More pages</span>
  </div>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
