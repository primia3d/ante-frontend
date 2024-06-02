import { z } from 'zod';

import { projectFormSchema } from '@/schema/projectSchema';

export type TProjects = {
  id: number;
  name: string;
  description: string;
  budget: {
    formatName: string;
    formatted: string;
    raw: number;
  };
  isDeleted: false;
  startDate: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  endDate: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  status: 'PROJECT' | 'LEAD';
  client: {
    id: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    address: string;
    isDeleted: false;
    createdAt: {
      dateTime: string;
      time: string;
      date: string;
      dateFull: string;
      raw: string;
    };
  };
  computedDate: string;
};

export type TProjectFormSchema = z.infer<typeof projectFormSchema>;
