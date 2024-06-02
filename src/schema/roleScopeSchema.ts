import { z } from 'zod';

export const roleScopeSchema = z.object({
  roleID: z.string(),
  scopeIDs: z.array(z.string()),
});
