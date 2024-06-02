import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { ComponentProps } from 'react';

import { PaginationLink } from './PaginationLink';

import { cn } from '@/utils/cn';

export function PaginationPrevious({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
}
PaginationPrevious.displayName = 'PaginationPrevious';
