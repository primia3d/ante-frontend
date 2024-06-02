import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ComponentProps } from 'react';

import { PaginationLink } from './PaginationLink';

import { cn } from '@/utils/cn';

export function PaginationNext({ className, ...props }: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn('gap-1 pr-2.5', className)} {...props}>
      <span>Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}
PaginationNext.displayName = 'PaginationNext';
