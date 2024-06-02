import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
