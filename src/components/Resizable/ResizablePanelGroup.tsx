import * as ResizablePrimitive from 'react-resizable-panels';
import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export function ResizablePanelGroup({ className, ...props }: ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
      {...props}
    />
  );
}
