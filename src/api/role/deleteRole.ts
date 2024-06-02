import axios from 'axios';

import { TRole } from '@/types/role';

type Params = {
  id: string;
};

type TDeleteRoleResponse = {
  message: string;
  roleInformation: TRole;
};

export const deleteRole = async (params: Params) => {
  return axios.delete<TDeleteRoleResponse>('/role', { data: { id: params.id } });
};
