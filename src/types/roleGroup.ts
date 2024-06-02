import { z } from 'zod';

import { roleGroupFormSchema } from '@/schema/roleGroupSchema';

export type TRoleGroupFormSchema = z.infer<typeof roleGroupFormSchema>;

export type TRoleGroup = {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
};
