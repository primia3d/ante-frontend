import { z } from 'zod';

import { warehouseFormSchema } from '@/schema/warehouseSchema';

export type TWarehouse = {
  id: number;
  warehouseName: string;
  warehouseLocation: string;
  warehouseSize: number;
  warehouseCapacity: number;
};

export type TInventory = {
  id: string;
  itemNumber: number;
  description: string;
  stocks: number;
  uom: string;
  unitPrice: number;
  totalCost: number;
  location: string;
};

export type TWarehouseFormSchema = z.infer<typeof warehouseFormSchema>;
