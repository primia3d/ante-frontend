import * as ToastPrimitives from '@radix-ui/react-toast';
import { type VariantProps } from 'class-variance-authority';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import { toastVariants } from './toastVariants';

import { cn } from '@/utils/cn';

export const Toast = forwardRef<
  ElementRef<typeof ToastPrimitives.Root>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

export type ToastProps = ComponentPropsWithoutRef<typeof Toast>;
