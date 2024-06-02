import axios from 'axios';

import { TTask } from '@/types/task';

type TGetTasksResponse = {
  message: string;
  taskList: TTask[];
};

export const getMyTasks = async () => {
  const { data } = await axios.get<TGetTasksResponse>('/task/own-task');

  return data.taskList;
};
