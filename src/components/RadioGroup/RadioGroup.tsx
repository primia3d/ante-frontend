import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
