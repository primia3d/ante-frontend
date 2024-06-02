import axios from 'axios';

import { TRoleGroup } from '../../types/roleGroup';

type Params = {
  id: string;
  name: string;
  description: string;
};

type TUpdateRoleGroupResponse = {
  message: string;
  roleGroupInformation: TRoleGroup;
};

export const updateRoleGroup = async (params: Params) => {
  return axios.patch<TUpdateRoleGroupResponse>(`/role-group`, params);
};
