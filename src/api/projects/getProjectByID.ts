import axios from 'axios';

import { TProjects } from '@/types/projects';

type TGetProjectIDResponse = {
  message: string;
  projectInformation: TProjects;
};

export const getProjectByID = async ({ id }: { id: string }) => {
  const { data } = await axios.get<TGetProjectIDResponse>(`/project?id=${id}`);

  return data.projectInformation;
};
