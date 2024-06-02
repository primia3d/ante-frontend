import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import { NavigationMenuViewport } from './NavigationMenuViewport';

import { cn } from '@/utils/cn';

export const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;
