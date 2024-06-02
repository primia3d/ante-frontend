import { type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

import { badgeVariants } from './badgeVariants';

import { cn } from '@/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
