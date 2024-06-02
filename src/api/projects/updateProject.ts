import axios from 'axios';

import { TProjects } from '@/types/projects';

type Params = {
  id: number;
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
};

type TCreateProjectResponse = {
  message: string;
  projectInformation: TProjects;
};

export const updateProject = async (params: Params) => {
  return axios.patch<TCreateProjectResponse>(`/project`, params);
};
