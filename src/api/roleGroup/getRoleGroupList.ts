import axios from 'axios';
import qs from 'qs';

import { TRoleGroup } from '../../types/roleGroup';

type Params = {
  page: number;
  perPage: number;
  isDeleted?: false;
};

type TGetRoleGroupListResponse = {
  message: string;
  roleGroupInformation: {
    list: TRoleGroup[];
    pagination: number[];
    currentPage: number;
  };
};

export const getRoleGroupList = async (params: Params | undefined = { page: 1, perPage: 20, isDeleted: false }) => {
  const requestBody = {
    filters: [{ deleted: false }],
  };
  const { data } = await axios.put<TGetRoleGroupListResponse>(`/role-group?${qs.stringify(params)}`, requestBody);

  return data.roleGroupInformation;
};
