import axios from 'axios';
import qs from 'qs';

import { TTask } from '@/types/task';

type Params = {
  id: number;
};

type TGetTaskInformationResponse = {
  message: string;
  taskInformation: TTask;
};

export const getTaskInformationById = async (params: Params) => {
  const { data } = await axios.get<TGetTaskInformationResponse>(`/task/task-by-id?${qs.stringify(params)}`);

  return data.taskInformation;
};
