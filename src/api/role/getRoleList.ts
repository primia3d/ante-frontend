import axios from 'axios';
import qs from 'qs';

import { TRole } from '@/types/role';

type Params = {
  page: number;
  perPage: number;
};

type TGetRoleListResponse = {
  message: string;
  roleInformation: {
    list: TRole[];
    pagination: number[];
    currentPage: number;
  };
};

export const getRoleList = async (params: Params | undefined = { page: 1, perPage: 5 }) => {
  const requestBody = {
    filters: [{ deleted: false }],
  };
  const { data } = await axios.put<TGetRoleListResponse>(`/role?${qs.stringify(params)}`, requestBody);

  return data.roleInformation;
};
