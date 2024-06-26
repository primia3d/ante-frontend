import axios from 'axios';

import { TTaskWithBoardLaneInformation } from '@/types/task';

type TGetTasksResponse = {
  message: string;
  taskList: TTaskWithBoardLaneInformation[];
};

export const getMyTasks = async () => {
  const { data } = await axios.get<TGetTasksResponse>('/task/own-task');

  return data.taskList;
};
