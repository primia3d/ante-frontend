import axios from 'axios';

import { TRole } from '@/types/role';

type Params = {
  id: string;
  name: string;
  description: string;
  scopeIDs: string[];
  placement: string;
  select: string;
};

type TUpdateRoleResponse = {
  message: string;
  roleInformation: TRole;
};

export const updateRole = async (params: Params) => {
  return axios.post<TUpdateRoleResponse>(`/role`, params);
};
