import { z } from 'zod';

import { scopeFormSchema } from '@/schema/scopeSchema';

export type TScopeFormSchema = z.infer<typeof scopeFormSchema>;

export type TScope = {
  id: string;
  type: string;
  name: string;
  description: string;
  parentID?: string;
  isDeleted: boolean;
};

export type TScopeTree = TScope & {
  child?: TScopeTree[];
};
