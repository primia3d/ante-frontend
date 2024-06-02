import { z } from 'zod';

import { clientFormSchema } from '@/schema/clientSchema';

export type TClientFormSchema = z.infer<typeof clientFormSchema>;
