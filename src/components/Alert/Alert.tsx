import { type VariantProps } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

import { alertVariants } from './alertVariants';

import { cn } from '@/utils/cn';

export const Alert = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  ),
);
Alert.displayName = 'Alert';
