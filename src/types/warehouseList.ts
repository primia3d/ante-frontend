import { z } from 'zod';

import { warehouseFormSchema } from '@/schema/warehouseSchema';
export type warehouseFormSchema = z.infer<typeof warehouseFormSchema>;

export type TViewWarehouse = {
  id: string;
  name: string;
  location: string;
  size: number;
  capacity: number;
};
