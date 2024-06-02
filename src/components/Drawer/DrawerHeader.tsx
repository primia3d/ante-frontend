import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export function DrawerHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />;
}
DrawerHeader.displayName = 'DrawerHeader';
