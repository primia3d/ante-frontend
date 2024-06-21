import { z } from 'zod';

import { boardLaneFormSchema } from '@/schema/boardLaneSchema';

export type TBoardLaneFormSchema = z.infer<typeof boardLaneFormSchema>;

export type TBoardLane = {
  id: number;
  order: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  key?: string;
  isDefault: boolean;
};
