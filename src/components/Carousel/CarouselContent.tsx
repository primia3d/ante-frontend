import { HTMLAttributes, forwardRef } from 'react';

import { useCarousel } from './useCarousel';

import { cn } from '@/utils/cn';

export const CarouselContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = 'CarouselContent';
