import { HTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface StepperItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'children'> {
  active: boolean;
  number: number;
  title: string;
  description?: string;
  currentStep: number;
}

export const StepperItem = forwardRef<HTMLLIElement, StepperItemProps>(
  ({ className, active, number, title, description, currentStep, ...props }, ref) => {
    return (
      <li
        className={cn(
          'step-item relative flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400',
          active && 'active text-blue-600 dark:text-blue-500',
          number < currentStep && 'complete',
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className={cn('step flex h-8 w-8 shrink-0 items-center justify-center rounded-full')}>
          {number < currentStep ? <Check size={16} /> : number}
        </span>
        <div className="">
          <h3 className="h-8 text-center text-[11px] font-medium leading-tight xs:text-sm">{title}</h3>
          {!!description && <p className="text-sm">{description}</p>}
        </div>
      </li>
    );
  },
);
