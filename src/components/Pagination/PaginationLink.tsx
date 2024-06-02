import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';
import { ButtonProps, buttonVariants } from '@/components/Button';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  ComponentProps<'a'>;

export function PaginationLink({ className, isActive, size = 'icon', children, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
PaginationLink.displayName = 'PaginationLink';
