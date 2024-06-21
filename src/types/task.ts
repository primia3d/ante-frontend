import { z } from 'zod';

import { taskFormSchema } from '@/schema/taskSchema';

export type TTaskFormSchema = z.infer<typeof taskFormSchema>;

export type TaskWidgetTabs = 'all' | 'completed' | 'pastDue';

export type TCollaborators = {
  id: string;
  fullName: string;
  userImage: string;
  roleName: string;
  isSelected: boolean;
};

export type TTask = {
  id: number;
  title: string;
  description: string;
  createdById: string;
  projectId: number;
  boardLaneId: number;
  order: number;
  createdAt: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  updatedAt: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  updatedById: string;
  assignedToId: string;
  isDeleted: boolean;
  dueDate: {
    dateTime: string;
    time: string;
    date: string;
    dateFull: string;
    raw: string;
  };
  createdBy: {
    name: string;
    image: string; 
  };
  boardLane: {
    name: string;
  };
  timeAgo: string;
};


export type TAssigneeUser = {
  id: string;
  fullName: string;
  name: string;
};

export type TAssignedRoleData = {
  role: string;
  users: TAssigneeUser[];
};
