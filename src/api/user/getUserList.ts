import axios from 'axios';
import QueryString from 'qs';

import { TUser } from '@/types/user';

type Params = {
  page: number;
  perPage: number;
};

type TGetUserListResponse = {
  message: string;
  accountInformation: {
    list: TUser[];
    pagination: number[];
    currentPage: number;
  };
  token: string;
};

export const getUserList = async (params: Params) => {
  const requestBody = {
    filters: [{ deleted: false }],
  };
  const {
    data: { accountInformation },
  } = await axios.put<TGetUserListResponse>(`/account?${QueryString.stringify(params)}`, requestBody);

  return accountInformation;
};
