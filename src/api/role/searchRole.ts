import axios from 'axios';

import { TRole } from '@/types/role';

type Params = {
  searchQuery: string;
  page: number;
  perPage: number;
};

type SearchRoleResponse = {
  message: string;
  roleInformation: {
    list: TRole[];
    pagination: number[];
    currentPage: number;
  };
};

export const searchRoleList = async (params: Params) => {
  const { searchQuery, page, perPage } = params;

  const { data } = await axios.get<SearchRoleResponse>(`/role/search-role`, {
    params: {
      searchQuery,
      page,
      perPage,
    }
  });

  return data.roleInformation;
};
