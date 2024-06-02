import axios from 'axios';

type AssignmentMode = 'assign_to_self' | 'assign_to_others';

type Params = {
  title: string;
  description: string;
  projectId: number;
  assignedMode: AssignmentMode;
  dueDate: string;
  assignedToId?: string;
  boardLaneId: number;
  collaboratorAccountIds?: string[];
};

type Collaborator = {
  id: number;
  taskId: number;
  accountId: string;
};

type ProjectInformation = {
  id: number;
  name: string;
  description: string;
  budget: number;
  clientId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  isDeleted: boolean;
};

type TaskInformation = {
  id: number;
  title: string;
  description: string;
  createdById: string;
  projectId: number;
  boardLaneId: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  updatedById: string;
  assignedToId?: string;
  isDeleted: boolean;
  dueDate: string;
  collaborators?: Collaborator[];
  projectInformation: ProjectInformation;
};

export type TCreateTaskResponse = {
  message: string;
  taskInformation: TaskInformation;
};

export const createTask = async (params: Params) => {
  return axios.post<TCreateTaskResponse>(`/task/create`, params);
};
