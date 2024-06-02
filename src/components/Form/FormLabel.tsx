import * as LabelPrimitive from '@radix-ui/react-label';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import { useFormField } from '.';

import { Label } from '@/components/Label';
import { cn } from '@/utils/cn';

export type FormLabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { variant?: 'normal' | 'top' };

export const FormLabel = forwardRef<ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
  ({ className: baseClassName, variant = 'normal', ...props }, ref) => {
    const { error, formItemId } = useFormField();
    let className = baseClassName;

    if (variant === 'top')
      className = cn(
        'absolute text-sm text-gray-500 peer-placeholder-shown:text-gray-500 cursor-text pointer-events-none dark:text-gray-400 duration-150 transform -translate-y-5 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-0 peer-focus:z-10',
        baseClassName,
      );

    return <Label ref={ref} className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />;
  },
);
FormLabel.displayName = 'FormLabel';
