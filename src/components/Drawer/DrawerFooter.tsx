import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export function DrawerFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />;
}
DrawerFooter.displayName = 'DrawerFooter';
