import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

export const Menubar = forwardRef<
  ElementRef<typeof MenubarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn('flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm', className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;
