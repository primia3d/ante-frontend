import { ArrowRightIcon } from '@radix-ui/react-icons';
import { forwardRef, ComponentProps } from 'react';

import { useCarousel } from './useCarousel';

import { cn } from '@/utils/cn';
import { Button } from '@/components/Button';

export const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? '-right-12 top-1/2 -translate-y-1/2'
            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRightIcon className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = 'CarouselNext';
