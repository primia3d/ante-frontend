import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
));
Table.displayName = 'Table';
