import axios from 'axios';

import { TRoleGroup } from '../../types/roleGroup';

type Params = {
  searchQuery: string;
  page: number;
  perPage: number;

};

type SearchGroupResponse = {
  message: string;
  roleGroupInformation: {
    list: TRoleGroup[];
    pagination: number[];
    currentPage: number;
  };
  token: string;
};

export const SearchRoleGroup = async (params: Params) => {
  const { searchQuery, page, perPage} = params;
  const { data } = await axios.get<SearchGroupResponse>(`/role-group/search-role-group`, {
    params: {
        searchQuery,
        page,
        perPage
    }
  });

  return data.roleGroupInformation;
};
