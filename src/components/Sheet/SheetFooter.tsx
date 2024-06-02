import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export function SheetFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />;
}
SheetFooter.displayName = 'SheetFooter';
