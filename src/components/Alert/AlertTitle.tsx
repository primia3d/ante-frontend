import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props}>
      {children}
    </h5>
  ),
);
AlertTitle.displayName = 'AlertTitle';
