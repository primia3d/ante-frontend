import { ComponentProps } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export function Drawer({ shouldScaleBackground = true, ...props }: ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />;
}
Drawer.displayName = 'Drawer';
