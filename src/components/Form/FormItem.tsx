import { forwardRef, HTMLAttributes, useId, useMemo } from 'react';

import { FormItemContext } from './FormItemContext';

import { cn } from '@/utils/cn';

export const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const id = useId();
  const value = useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={value}>
      <div ref={ref} className={cn('relative', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';
