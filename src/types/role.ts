import { z } from 'zod';

import { TScope } from './scope';

import { roleFormSchema } from '@/schema/roleSchema';

export type TRoleFormSchema = z.infer<typeof roleFormSchema>;

export type TRole = {
  id: string;
  name: string;
  description: string;
  isDeveloper: true;
  updatedAt: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  createdAt: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  roleScope: {
    roleID: string;
    scopeID: string;
    scope: TScope;
  }[];
  parentAccountId: string;
};
