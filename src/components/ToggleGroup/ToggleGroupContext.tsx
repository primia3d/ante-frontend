import { VariantProps } from 'class-variance-authority';
import { createContext } from 'react';

import { toggleVariants } from '../Toggle';

export const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});
