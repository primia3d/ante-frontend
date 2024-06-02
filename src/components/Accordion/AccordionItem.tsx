import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { cn } from '@/utils/cn';

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';
