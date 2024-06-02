import { z } from 'zod';

export const IDSchema = z.object({
  id: z.string(),
});

export const paginationSchema = z.object({
  search: z.string().optional(),
  pageSize: z.number(),
  currentPage: z.number(),
  isDeleted: z.boolean().optional(),
});
