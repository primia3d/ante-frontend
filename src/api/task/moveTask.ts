import axios, { AxiosError } from 'axios';

export interface TTaskResponse {
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
  assignedToId: string;
  isDeleted: boolean;
  dueDate: Date;
  isRead: boolean;
}

export interface TMoveTaskResponse {
  message: string;
  updatedTaskInformation: TTaskResponse;
}

interface Params {
  id: number;
}

async function moveTask<T>(url: string, parameters: Params): Promise<T> {
  try {
    const { data } = await axios.put<T>(url, parameters);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export const moveTaskToInProgress = (parameters: Params): Promise<TMoveTaskResponse> => {
  return moveTask<TMoveTaskResponse>('/task/start-task', parameters);
};

export const moveTaskToDone = (parameters: Params): Promise<TMoveTaskResponse> => {
  return moveTask<TMoveTaskResponse>('/task/mark-task-done', parameters);
};
