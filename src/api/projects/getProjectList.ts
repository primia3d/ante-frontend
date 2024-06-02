import axios from 'axios';
import qs from 'qs';

import { TProjects } from '@/types/projects';

type Params = {
  page: number;
  perPage: number;
};

type TGetProjectListResponse = {
  message: string;
  projectInformation: {
    list: TProjects[];
    pagination: number[];
    currentPage: number;
  };
};

export const getProjectList = async (params: Params | undefined = { page: 1, perPage: 20 }) => {
  const requestBody = {
    filters: [{ deleted: false }],
  };
  const { data } = await axios.put<TGetProjectListResponse>(`/project?${qs.stringify(params)}`, requestBody);

  return data.projectInformation;
};
