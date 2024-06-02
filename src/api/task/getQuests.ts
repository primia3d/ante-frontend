import axios from 'axios';

import { TTask } from '@/types/task';

type TGetQuestsResponse = {
  message: string;
  unAssignedTaskList: TTask[];
};

export const getQuests = async () => {
  const { data } = await axios.get<TGetQuestsResponse>('/task/quest-task');

  return data.unAssignedTaskList;
};
