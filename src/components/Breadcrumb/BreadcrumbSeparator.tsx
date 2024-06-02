import { ChevronRight } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
  return (
    <li role="presentation" aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
