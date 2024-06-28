import { z } from 'zod';

import { TRole } from './role';

import { userFormSchema } from '@/schema/userSchema';

export type TUser = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  createdAt: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  role: TRole;
  roleAccess: string[];
  parentAccountId: string;
  image?: string;
};

export type TUserFormSchema = z.infer<typeof userFormSchema>;
