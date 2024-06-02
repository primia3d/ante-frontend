import { Slot } from '@radix-ui/react-slot';
import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/utils/cn';

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
    pathName: string;
  }
>(({ asChild, pathName, className, ...props }, ref) => {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp to={pathName} ref={ref} className={cn('transition-colors hover:text-foreground', className)} {...props} />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';
