import axios from 'axios';
import qs from 'qs';

import { TCollaborators } from '@/types/task';

type Params = {
  page: number;
  perPage: number;
};

type TGetCollaboratorsResponse = {
  message: string;
  data: {
    list: TCollaborators[];
    pagination: {
      total: number;
      currentPage: number;
    };
  };
};

export const getCollaborators = async (params: Params | undefined = { page: 1, perPage: 10 }) => {
  const { data } = await axios.get<TGetCollaboratorsResponse>(`/account/search-collab?${qs.stringify(params)}`);

  return data.data.list;
};
