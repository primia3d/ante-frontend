import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />;
}
SheetHeader.displayName = 'SheetHeader';
