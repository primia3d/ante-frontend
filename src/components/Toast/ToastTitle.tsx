import * as ToastPrimitives from '@radix-ui/react-toast';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

export const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitives.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn('font-semibold [&+div]:text-xs', className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
