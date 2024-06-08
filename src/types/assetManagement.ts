import { z } from 'zod';

import { warehouseFormSchema } from '@/schema/warehouseSchema';

export type TWarehouse = {
  id: number;
  warehouseName: string;
  warehouseLocation: string;
  warehouseSize: number;
  warehouseCapacity: number;
 
};

export type TWarehouseFormSchema = z.infer<typeof warehouseFormSchema>;
