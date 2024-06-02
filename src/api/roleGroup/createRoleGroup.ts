import axios from 'axios';

import { TRoleGroup } from '../../types/roleGroup';

type Params = {
  name: string;
  description: string;
};

type TCreateRoleGroupResponse = {
  message: string;
  roleGroupInformation: TRoleGroup;
};

export const createRoleGroup = async (params: Params) => {
  return axios.post<TCreateRoleGroupResponse>(`/role-group`, params);
};
