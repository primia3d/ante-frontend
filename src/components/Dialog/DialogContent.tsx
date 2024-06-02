import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { DialogOverlay } from './DialogOverlay';

import { cn } from '@/utils/cn';

export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  variant?: 'normal' | 'side' | 'top';
};

export const DialogContent = forwardRef<ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className: baseClassName, variant = 'normal', children, ...props }, ref) => {
    let className = baseClassName;

    if (variant === 'normal')
      className = cn(
        'fixed rounded-xl left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] fixed z-[60] grid w-full max-w-lg border bg-background shadow-lg !duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        baseClassName,
      );

    if (variant === 'top')
      className = cn(
        'overflow-y-auto rounded-xl bg-white text-[13px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-xl max-h-[90dvh] fixed w-full grid z-[60] !duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-full data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-full data-[state=open]:slide-in-from-left-1/2',
        baseClassName,
      );

    return (
      <DialogPrimitive.DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content ref={ref} className={cn(className)} {...props}>
          {children}
          {/* <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close> */}
        </DialogPrimitive.Content>
      </DialogPrimitive.DialogPortal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
