import axios from 'axios';

import { TUser } from '@/types/user';

type Params = {
  searchQuery: string;
  page: number;
  perPage: number;
};

type SearchUserResponse = {
  message: string;
  accountInformation: {
    list: TUser[];
    pagination: number[];
    currentPage: number;
  };
  token: string;
};

export const searchUserList = async (params: Params) => {
  const { searchQuery, page, perPage } = params;
  
  const {
    data: { accountInformation },
  } = await axios.get<SearchUserResponse>(`/account/search-account`, {
    params: {
      searchQuery,
      page,
      perPage,
    },
  });

  return accountInformation;
};
