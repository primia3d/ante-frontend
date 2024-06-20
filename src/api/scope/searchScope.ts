import axios from 'axios';

import { TScope } from '@/types/scope';

type Params = {
    searchQuery: string;    
    page: number;
    perPage: number;
  };

type searchScopeResponse = {
  message: string;
  scopeInformation: {
    list: TScope[];
    pagination: number[];
    currentPage: number;
  };
  token: string;
};

export const getScopeList = async (params: Params) => {
  const { searchQuery, page, perPage } = params;
  const { data } = await axios.get<searchScopeResponse>(`/scope/search-scope`, {
    params: {
      searchQuery,
      page,
      perPage
    }
  });

  return data.scopeInformation;
};
