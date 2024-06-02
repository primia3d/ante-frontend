import axios from 'axios';

import { TProjects } from '@/types/projects';

type Params = {
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: 'PROJECT' | 'LEAD';
  clientInformation: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    address: string;
  };
};

type TCreateProjectResponse = {
  message: string;
  projectInformation: TProjects;
};

export const createProject = async (params: Params) => {
  return axios.post<TCreateProjectResponse>(`/project`, params);
};
