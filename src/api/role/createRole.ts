import axios from 'axios';

import { TRole } from '@/types/role';

type Params = {
  name: string;
  description: string;
  roleGroupId: string;
  scopeIDs: string[];
  placement: string;
  select: string;
  parentRoleId?: string;
};

type TCreateRoleResponse = {
  message: string;
  roleInformation: TRole;
};

export const createRole = async (params: Params) => {
  return axios.post<TCreateRoleResponse>(`/role`, params);
};
