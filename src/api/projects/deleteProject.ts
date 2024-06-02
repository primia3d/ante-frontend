import axios from 'axios';

import { TProjects } from '@/types/projects';

type Params = {
  id: number;
  password: string;
};

type TDeleteProjectResponse = {
  message: string;
  projectInformation: TProjects;
};

export const deleteProject = async (params: Params) => {
  return axios.delete<TDeleteProjectResponse>(`/project`, { data: params });
};
