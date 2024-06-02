import { createContext } from 'react';

import { CarouselContextProps } from './types';

export const CarouselContext = createContext<CarouselContextProps | null>(null);
