import axios from 'axios';
import qs from 'qs';

import { TScope } from '@/types/scope';

type Params = {
  page: number;
  perPage: number;
};

type TGetScopeListResponse = {
  message: string;
  scopeInformation: {
    list: TScope[];
    pagination: number[];
    currentPage: number;
  };
};

export const getScopeList = async (params: Params | undefined = { page: 1, perPage: 20 }) => {
  const requestBody = {
    filters: [{ deleted: false }],
  };
  const { data } = await axios.put<TGetScopeListResponse>(`/scope?${qs.stringify(params)}`, requestBody);

  return data.scopeInformation;
};
