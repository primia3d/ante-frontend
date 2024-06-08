import { z } from 'zod';

export const warehouseFormSchema = z.object({
  id: z.number().optional(),
  warehouseName: z
    .string()
    .min(1, {
      message: 'Warehouse Name is required.',
    })
    .max(50, {
      message: 'Warehouse Name must not be longer than 50 characters.',
    }),
  warehouseLocation: z
    .string()
    .min(1, {
      message: 'Warehouse Location is required.',
    })
    .max(200, {
      message: 'Warehouse Location must not be longer than 200 characters.',
    }),
  warehouseSize: z.number().min(1, {
    message: 'Warehouse size is required.',
  }),
  warehouseCapacity: z.number().min(1, {
    message: 'Warehouse capacity is required.',
  }),
});
