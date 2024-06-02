import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/utils/cn';

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {}

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(({ className, ...props }, ref) => {
  return (
    <ol className={cn('flex w-full items-center justify-center space-x-8 space-y-0', className)} ref={ref} {...props} />
  );
});
