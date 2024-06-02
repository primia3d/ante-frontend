import { z } from 'zod';

import { roleScopeSchema } from '@/schema/roleScopeSchema';

export type TRoleScopeSchema = z.infer<typeof roleScopeSchema>;
