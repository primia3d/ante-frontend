import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export function CommandShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />;
}
CommandShortcut.displayName = 'CommandShortcut';
